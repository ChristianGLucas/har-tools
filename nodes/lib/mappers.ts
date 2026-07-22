// Plain-object (types.ts) -> protobuf (gen/messages_pb) translation, kept in
// one place so every node's mapping logic stays consistent.

import {
  Header,
  QueryParam,
  CookieInfo,
  PostDataParam,
  PostDataInfo,
  ContentInfo,
  RequestInfo,
  ResponseInfo,
  TimingsInfo,
  EntrySummary,
  FullEntry,
  PageInfo,
  CreatorInfo,
  CountEntry,
} from '../../gen/messages_pb';
import {
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

export function headerToMsg(h: NHeader): Header {
  const m = new Header();
  m.setName(h.name);
  m.setValue(h.value);
  return m;
}

export function queryParamToMsg(q: NQueryParam): QueryParam {
  const m = new QueryParam();
  m.setName(q.name);
  m.setValue(q.value);
  return m;
}

export function cookieToMsg(c: NCookie): CookieInfo {
  const m = new CookieInfo();
  m.setName(c.name);
  m.setValue(c.value);
  m.setDomain(c.domain);
  m.setPath(c.path);
  m.setExpires(c.expires);
  m.setHttpOnly(c.httpOnly);
  m.setSecure(c.secure);
  m.setSameSite(c.sameSite);
  return m;
}

export function postDataParamToMsg(p: NPostDataParam): PostDataParam {
  const m = new PostDataParam();
  m.setName(p.name);
  m.setValue(p.value);
  m.setFileName(p.fileName);
  m.setContentType(p.contentType);
  return m;
}

export function postDataToMsg(pd: NPostData): PostDataInfo {
  const m = new PostDataInfo();
  m.setMimeType(pd.mimeType);
  m.setText(pd.text);
  m.setTextTruncated(pd.textTruncated);
  m.setParamsList(pd.params.map(postDataParamToMsg));
  return m;
}

export function contentToMsg(c: NContent): ContentInfo {
  const m = new ContentInfo();
  m.setSize(c.size);
  m.setCompression(c.compression);
  m.setMimeType(c.mimeType);
  m.setText(c.text);
  m.setTextTruncated(c.textTruncated);
  m.setEncoding(c.encoding);
  return m;
}

export function requestToMsg(r: NRequest): RequestInfo {
  const m = new RequestInfo();
  m.setIndex(r.index);
  m.setMethod(r.method);
  m.setUrl(r.url);
  m.setHttpVersion(r.httpVersion);
  m.setHeadersList(r.headers.map(headerToMsg));
  m.setQueryStringList(r.queryString.map(queryParamToMsg));
  m.setCookiesList(r.cookies.map(cookieToMsg));
  m.setHasPostData(r.hasPostData);
  if (r.postData) m.setPostData(postDataToMsg(r.postData));
  m.setHeadersSize(r.headersSize);
  m.setBodySize(r.bodySize);
  return m;
}

export function responseToMsg(r: NResponse): ResponseInfo {
  const m = new ResponseInfo();
  m.setIndex(r.index);
  m.setStatus(r.status);
  m.setStatusText(r.statusText);
  m.setHttpVersion(r.httpVersion);
  m.setHeadersList(r.headers.map(headerToMsg));
  m.setCookiesList(r.cookies.map(cookieToMsg));
  m.setContent(contentToMsg(r.content));
  m.setRedirectUrl(r.redirectURL);
  m.setHeadersSize(r.headersSize);
  m.setBodySize(r.bodySize);
  return m;
}

export function timingsToMsg(t: NTimings): TimingsInfo {
  const m = new TimingsInfo();
  m.setBlocked(t.blocked);
  m.setDns(t.dns);
  m.setConnect(t.connect);
  m.setSend(t.send);
  m.setWait(t.wait);
  m.setReceive(t.receive);
  m.setSsl(t.ssl);
  return m;
}

export function entrySummaryToMsg(e: NEntrySummary): EntrySummary {
  const m = new EntrySummary();
  m.setIndex(e.index);
  m.setStartedDateTime(e.startedDateTime);
  m.setMethod(e.method);
  m.setUrl(e.url);
  m.setStatus(e.status);
  m.setTime(e.time);
  return m;
}

export function fullEntryToMsg(e: NFullEntry): FullEntry {
  const m = new FullEntry();
  m.setIndex(e.index);
  m.setPageref(e.pageref);
  m.setStartedDateTime(e.startedDateTime);
  m.setTime(e.time);
  m.setRequest(requestToMsg(e.request));
  m.setResponse(responseToMsg(e.response));
  m.setTimings(timingsToMsg(e.timings));
  m.setServerIpAddress(e.serverIPAddress);
  m.setConnection(e.connection);
  m.setComment(e.comment);
  return m;
}

export function pageToMsg(p: NPage): PageInfo {
  const m = new PageInfo();
  m.setId(p.id);
  m.setTitle(p.title);
  m.setStartedDateTime(p.startedDateTime);
  m.setOnContentLoad(p.onContentLoad);
  m.setOnLoad(p.onLoad);
  m.setComment(p.comment);
  return m;
}

export function creatorToMsg(c: NCreator): CreatorInfo {
  const m = new CreatorInfo();
  m.setName(c.name);
  m.setVersion(c.version);
  m.setComment(c.comment);
  return m;
}

export function countEntry(key: string, count: number): CountEntry {
  const m = new CountEntry();
  m.setKey(key);
  m.setCount(count);
  return m;
}
