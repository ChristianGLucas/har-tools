// Plain-object HAR shapes, kept deliberately parallel to the proto messages
// in messages.proto — the mapper functions in mappers.ts do the plain-object
// -> protobuf translation at the node boundary. Every field here is either
// read verbatim from the caller-supplied document or a documented default
// when the (optional, per HAR 1.2) field is absent — never generated.

export interface NHeader {
  name: string;
  value: string;
}

export interface NQueryParam {
  name: string;
  value: string;
}

export interface NCookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: string;
  httpOnly: boolean;
  secure: boolean;
  sameSite: string;
}

export interface NPostDataParam {
  name: string;
  value: string;
  fileName: string;
  contentType: string;
}

export interface NPostData {
  mimeType: string;
  text: string;
  textTruncated: boolean;
  params: NPostDataParam[];
}

export interface NContent {
  size: number;
  compression: number;
  mimeType: string;
  text: string;
  textTruncated: boolean;
  encoding: string;
}

export interface NRequest {
  index: number;
  method: string;
  url: string;
  httpVersion: string;
  headers: NHeader[];
  queryString: NQueryParam[];
  cookies: NCookie[];
  postData: NPostData | null;
  hasPostData: boolean;
  headersSize: number;
  bodySize: number;
}

export interface NResponse {
  index: number;
  status: number;
  statusText: string;
  httpVersion: string;
  headers: NHeader[];
  cookies: NCookie[];
  content: NContent;
  redirectURL: string;
  headersSize: number;
  bodySize: number;
}

export interface NTimings {
  blocked: number;
  dns: number;
  connect: number;
  send: number;
  wait: number;
  receive: number;
  ssl: number;
}

export interface NEntrySummary {
  index: number;
  startedDateTime: string;
  method: string;
  url: string;
  status: number;
  time: number;
}

export interface NFullEntry {
  index: number;
  pageref: string;
  startedDateTime: string;
  time: number;
  request: NRequest;
  response: NResponse;
  timings: NTimings;
  serverIPAddress: string;
  connection: string;
  comment: string;
}

export interface NPage {
  id: string;
  title: string;
  startedDateTime: string;
  onContentLoad: number;
  onLoad: number;
  comment: string;
}

export interface NCreator {
  name: string;
  version: string;
  comment: string;
}

// Result of the shared parse/guard step every node starts from.
export interface ParsedHar {
  ok: boolean;
  error: string;
  log: Record<string, unknown>;
  entriesRaw: unknown[];
}

export function failedParse(error: string): ParsedHar {
  return { ok: false, error, log: {}, entriesRaw: [] };
}
