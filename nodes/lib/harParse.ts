// HAR 1.2 structural extraction. HAR is JSON — there is no algorithmically
// hard parsing step to defer to a library for; this module IS the package's
// domain knowledge, walking log/entries/request/response/timings/pages per
// the HAR 1.2 spec (http://www.softwareishard.com/blog/har-12-spec/) and
// normalizing into the plain-object shapes in types.ts. Every extractor is a
// pure function of the parsed document: no network, no wall-clock, no
// randomness, stable ordering.

import { maxJsonNestingDepth, safeJsonParse, isPlainObject } from './jsonSafe';
import { MAX_NESTING_DEPTH } from './limits';
import {
  ParsedHar,
  failedParse,
  NHeader,
  NQueryParam,
  NCookie,
  NPostDataParam,
  NPostData,
  NContent,
  NRequest,
  NResponse,
  NTimings,
  NEntrySummary,
  NFullEntry,
  NPage,
  NCreator,
} from './types';

// ---- primitive coercions: defensive reads over an untrusted, loosely-typed
// document. A field of the wrong type or absent never throws — it falls
// back to a documented default, and downstream nodes read that default
// rather than guessing or coercing further. ----

function str(v: unknown, fallback = ''): string {
  return typeof v === 'string' ? v : fallback;
}

function num(v: unknown, fallback = 0): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback;
}

function bool(v: unknown, fallback = false): boolean {
  return typeof v === 'boolean' ? v : fallback;
}

function arr(v: unknown): unknown[] {
  return Array.isArray(v) ? v : [];
}

function obj(v: unknown): Record<string, unknown> {
  return isPlainObject(v) ? v : {};
}

// ---- shared parse + guard step ----

export interface GuardedJson {
  ok: boolean;
  error: string;
  value: unknown;
}

// JSON-syntax guard only — deliberately does NOT check HAR structure (no
// "log"/"entries" requirement), because ValidateHar needs the raw parsed
// value even when that structure is exactly what's missing/wrong (a
// structural violation is reported as `valid: false` + issues, not a hard
// parse failure). Every other node builds on top of this via parseHar below.
export function parseJsonGuarded(text: string): GuardedJson {
  if (typeof text !== 'string' || text.length === 0) {
    return { ok: false, error: 'empty input: expected HAR JSON text', value: undefined };
  }
  if (maxJsonNestingDepth(text, MAX_NESTING_DEPTH) === -1) {
    return { ok: false, error: `input exceeds nesting depth limit (${MAX_NESTING_DEPTH})`, value: undefined };
  }
  const parsed = safeJsonParse(text);
  if (!parsed.ok) {
    return { ok: false, error: parsed.error, value: undefined };
  }
  return { ok: true, error: '', value: parsed.value };
}

export function parseHar(text: string): ParsedHar {
  const guarded = parseJsonGuarded(text);
  if (!guarded.ok) {
    return failedParse(guarded.error);
  }
  if (!isPlainObject(guarded.value)) {
    return failedParse('not a HAR document: top-level value is not a JSON object');
  }
  const log = guarded.value['log'];
  if (!isPlainObject(log)) {
    return failedParse('not a HAR document: missing top-level "log" object');
  }
  const entries = log['entries'];
  if (!Array.isArray(entries)) {
    return failedParse('not a HAR document: "log.entries" is not an array');
  }
  return { ok: true, error: '', log, entriesRaw: entries };
}

// ---- per-record extraction ----

function toHeaders(v: unknown): NHeader[] {
  return arr(v).map((h) => {
    const o = obj(h);
    return { name: str(o.name), value: str(o.value) };
  });
}

function toQueryParams(v: unknown): NQueryParam[] {
  return arr(v).map((q) => {
    const o = obj(q);
    return { name: str(o.name), value: str(o.value) };
  });
}

function toCookie(c: unknown): NCookie {
  const o = obj(c);
  return {
    name: str(o.name),
    value: str(o.value),
    domain: str(o.domain),
    path: str(o.path),
    expires: str(o.expires),
    httpOnly: bool(o.httpOnly),
    secure: bool(o.secure),
    sameSite: str(o.sameSite),
  };
}

export function toCookies(v: unknown): NCookie[] {
  return arr(v).map(toCookie);
}

function toPostDataParam(p: unknown): NPostDataParam {
  const o = obj(p);
  return { name: str(o.name), value: str(o.value), fileName: str(o.fileName), contentType: str(o.contentType) };
}

function toPostData(v: unknown): NPostData | null {
  if (!isPlainObject(v)) return null;
  return {
    mimeType: str(v.mimeType),
    text: str(v.text),
    textTruncated: false,
    params: arr(v.params).map(toPostDataParam),
  };
}

function toContent(v: unknown): NContent {
  const o = obj(v);
  return {
    size: num(o.size, -1),
    compression: num(o.compression, 0),
    mimeType: str(o.mimeType),
    text: str(o.text),
    textTruncated: false,
    encoding: str(o.encoding),
  };
}

export function toEntrySummary(eRaw: unknown, index: number): NEntrySummary {
  const e = obj(eRaw);
  const request = obj(e.request);
  const response = obj(e.response);
  return {
    index,
    startedDateTime: str(e.startedDateTime),
    method: str(request.method),
    url: str(request.url),
    status: num(response.status, 0),
    time: num(e.time, 0),
  };
}

export function toRequestInfo(eRaw: unknown, index: number): NRequest {
  const e = obj(eRaw);
  const r = obj(e.request);
  const hasPostData = isPlainObject(r.postData);
  return {
    index,
    method: str(r.method),
    url: str(r.url),
    httpVersion: str(r.httpVersion),
    headers: toHeaders(r.headers),
    queryString: toQueryParams(r.queryString),
    cookies: toCookies(r.cookies),
    postData: hasPostData ? toPostData(r.postData) : null,
    hasPostData,
    headersSize: num(r.headersSize, -1),
    bodySize: num(r.bodySize, -1),
  };
}

export function toResponseInfo(eRaw: unknown, index: number): NResponse {
  const e = obj(eRaw);
  const resp = obj(e.response);
  return {
    index,
    status: num(resp.status, 0),
    statusText: str(resp.statusText),
    httpVersion: str(resp.httpVersion),
    headers: toHeaders(resp.headers),
    cookies: toCookies(resp.cookies),
    content: toContent(resp.content),
    redirectURL: str(resp.redirectURL),
    headersSize: num(resp.headersSize, -1),
    bodySize: num(resp.bodySize, -1),
  };
}

export function toTimings(eRaw: unknown): NTimings {
  const e = obj(eRaw);
  const t = obj(e.timings);
  return {
    blocked: num(t.blocked, -1),
    dns: num(t.dns, -1),
    connect: num(t.connect, -1),
    send: num(t.send, 0),
    wait: num(t.wait, 0),
    receive: num(t.receive, 0),
    ssl: num(t.ssl, -1),
  };
}

export function toFullEntry(eRaw: unknown, index: number): NFullEntry {
  const e = obj(eRaw);
  return {
    index,
    pageref: str(e.pageref),
    startedDateTime: str(e.startedDateTime),
    time: num(e.time, 0),
    request: toRequestInfo(eRaw, index),
    response: toResponseInfo(eRaw, index),
    timings: toTimings(eRaw),
    serverIPAddress: str(e.serverIPAddress),
    connection: str(e.connection),
    comment: str(e.comment),
  };
}

export function toPage(pRaw: unknown): NPage {
  const p = obj(pRaw);
  const pt = obj(p.pageTimings);
  return {
    id: str(p.id),
    title: str(p.title),
    startedDateTime: str(p.startedDateTime),
    onContentLoad: num(pt.onContentLoad, -1),
    onLoad: num(pt.onLoad, -1),
    comment: str(p.comment),
  };
}

export function toCreator(v: unknown): NCreator {
  const o = obj(v);
  return { name: str(o.name), version: str(o.version), comment: str(o.comment) };
}

// Lowercased hostname of a URL string, or '' when the URL cannot be parsed
// (a malformed request URL is skipped by inventory/filter nodes, not fatal).
export function hostOf(url: string): string {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return '';
  }
}

// One entry pre-decorated with the fields the three filter nodes need
// (status/mimeType/host), built once per call rather than recomputed per
// filter predicate.
export interface FilterRow {
  summary: NEntrySummary;
  mimeType: string;
  host: string;
}

export function buildFilterRows(entriesRaw: unknown[]): FilterRow[] {
  return entriesRaw.map((eRaw, i) => {
    const summary = toEntrySummary(eRaw, i);
    const e = obj(eRaw);
    const response = obj(e.response);
    const content = obj(response.content);
    return { summary, mimeType: str(content.mimeType), host: hostOf(summary.url) };
  });
}

export interface HeaderOccurrence {
  direction: string; // "request" | "response"
  value: string;
}

export interface DirectionMatcher {
  ok: boolean;
  error: string;
  wantRequest: boolean;
  wantResponse: boolean;
}

// Validates a HeaderValueRequest.direction: "", "request", or "response"
// (case-insensitive), "" meaning both.
export function parseDirection(raw: string): DirectionMatcher {
  const d = (raw ?? '').trim().toLowerCase();
  if (d === '') return { ok: true, error: '', wantRequest: true, wantResponse: true };
  if (d === 'request') return { ok: true, error: '', wantRequest: true, wantResponse: false };
  if (d === 'response') return { ok: true, error: '', wantRequest: false, wantResponse: true };
  return {
    ok: false,
    error: `invalid direction ${JSON.stringify(raw)}: expected "request", "response", or "" for both`,
    wantRequest: false,
    wantResponse: false,
  };
}

// Every occurrence of a named header (case-insensitive) on one entry's
// request and/or response headers, per `direction`.
export function findHeaderOccurrences(eRaw: unknown, headerNameLower: string, dir: DirectionMatcher): HeaderOccurrence[] {
  const e = obj(eRaw);
  const out: HeaderOccurrence[] = [];
  if (dir.wantRequest) {
    for (const h of toHeaders(obj(e.request).headers)) {
      if (h.name.toLowerCase() === headerNameLower) out.push({ direction: 'request', value: h.value });
    }
  }
  if (dir.wantResponse) {
    for (const h of toHeaders(obj(e.response).headers)) {
      if (h.name.toLowerCase() === headerNameLower) out.push({ direction: 'response', value: h.value });
    }
  }
  return out;
}

export function hasHeader(eRaw: unknown, headerNameLower: string, dir: DirectionMatcher): boolean {
  return findHeaderOccurrences(eRaw, headerNameLower, dir).length > 0;
}

const STATUS_CLASS_RE = /^([1-5])xx$/i;
const STATUS_EXACT_RE = /^\d{3}$/;

export interface StatusMatcher {
  ok: boolean;
  error: string;
  matches: (status: number) => boolean;
}

// Parse a StatusFilterRequest.status_filter into a matcher. Accepts an exact
// 3-digit code ("404") or a class shorthand ("4xx"). A response status of 0
// (no response recorded) never matches any filter.
export function parseStatusFilter(raw: string): StatusMatcher {
  const filter = (raw ?? '').trim();
  const classMatch = filter.match(STATUS_CLASS_RE);
  if (classMatch) {
    const cls = Number(classMatch[1]);
    return { ok: true, error: '', matches: (status) => status > 0 && Math.floor(status / 100) === cls };
  }
  if (STATUS_EXACT_RE.test(filter)) {
    const exact = Number(filter);
    return { ok: true, error: '', matches: (status) => status === exact };
  }
  return {
    ok: false,
    error: `invalid status_filter ${JSON.stringify(raw)}: expected a 3-digit code (e.g. "404") or a class shorthand (e.g. "4xx")`,
    matches: () => false,
  };
}
