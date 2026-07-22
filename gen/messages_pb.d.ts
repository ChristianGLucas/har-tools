// package: christiangeorgelucas.har_tools
// file: messages.proto

import * as jspb from "google-protobuf";

export class HarDocument extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HarDocument.AsObject;
  static toObject(includeInstance: boolean, msg: HarDocument): HarDocument.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HarDocument, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HarDocument;
  static deserializeBinaryFromReader(message: HarDocument, reader: jspb.BinaryReader): HarDocument;
}

export namespace HarDocument {
  export type AsObject = {
    text: string,
  }
}

export class EntryIndexRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getIndex(): number;
  setIndex(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntryIndexRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EntryIndexRequest): EntryIndexRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntryIndexRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntryIndexRequest;
  static deserializeBinaryFromReader(message: EntryIndexRequest, reader: jspb.BinaryReader): EntryIndexRequest;
}

export namespace EntryIndexRequest {
  export type AsObject = {
    text: string,
    index: number,
  }
}

export class StatusFilterRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getStatusFilter(): string;
  setStatusFilter(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StatusFilterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: StatusFilterRequest): StatusFilterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StatusFilterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StatusFilterRequest;
  static deserializeBinaryFromReader(message: StatusFilterRequest, reader: jspb.BinaryReader): StatusFilterRequest;
}

export namespace StatusFilterRequest {
  export type AsObject = {
    text: string,
    statusFilter: string,
  }
}

export class MimeTypeFilterRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getMimeType(): string;
  setMimeType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MimeTypeFilterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MimeTypeFilterRequest): MimeTypeFilterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MimeTypeFilterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MimeTypeFilterRequest;
  static deserializeBinaryFromReader(message: MimeTypeFilterRequest, reader: jspb.BinaryReader): MimeTypeFilterRequest;
}

export namespace MimeTypeFilterRequest {
  export type AsObject = {
    text: string,
    mimeType: string,
  }
}

export class DomainFilterRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getDomain(): string;
  setDomain(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainFilterRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DomainFilterRequest): DomainFilterRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainFilterRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainFilterRequest;
  static deserializeBinaryFromReader(message: DomainFilterRequest, reader: jspb.BinaryReader): DomainFilterRequest;
}

export namespace DomainFilterRequest {
  export type AsObject = {
    text: string,
    domain: string,
  }
}

export class HeaderValueRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getHeaderName(): string;
  setHeaderName(value: string): void;

  getDirection(): string;
  setDirection(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HeaderValueRequest.AsObject;
  static toObject(includeInstance: boolean, msg: HeaderValueRequest): HeaderValueRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HeaderValueRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HeaderValueRequest;
  static deserializeBinaryFromReader(message: HeaderValueRequest, reader: jspb.BinaryReader): HeaderValueRequest;
}

export namespace HeaderValueRequest {
  export type AsObject = {
    text: string,
    headerName: string,
    direction: string,
  }
}

export class TopNRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getLimit(): number;
  setLimit(value: number): void;

  getSortBy(): string;
  setSortBy(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TopNRequest.AsObject;
  static toObject(includeInstance: boolean, msg: TopNRequest): TopNRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TopNRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TopNRequest;
  static deserializeBinaryFromReader(message: TopNRequest, reader: jspb.BinaryReader): TopNRequest;
}

export namespace TopNRequest {
  export type AsObject = {
    text: string,
    limit: number,
    sortBy: string,
  }
}

export class Header extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Header.AsObject;
  static toObject(includeInstance: boolean, msg: Header): Header.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Header, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Header;
  static deserializeBinaryFromReader(message: Header, reader: jspb.BinaryReader): Header;
}

export namespace Header {
  export type AsObject = {
    name: string,
    value: string,
  }
}

export class QueryParam extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): QueryParam.AsObject;
  static toObject(includeInstance: boolean, msg: QueryParam): QueryParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: QueryParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): QueryParam;
  static deserializeBinaryFromReader(message: QueryParam, reader: jspb.BinaryReader): QueryParam;
}

export namespace QueryParam {
  export type AsObject = {
    name: string,
    value: string,
  }
}

export class CookieInfo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getDomain(): string;
  setDomain(value: string): void;

  getPath(): string;
  setPath(value: string): void;

  getExpires(): string;
  setExpires(value: string): void;

  getHttpOnly(): boolean;
  setHttpOnly(value: boolean): void;

  getSecure(): boolean;
  setSecure(value: boolean): void;

  getSameSite(): string;
  setSameSite(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CookieInfo.AsObject;
  static toObject(includeInstance: boolean, msg: CookieInfo): CookieInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CookieInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CookieInfo;
  static deserializeBinaryFromReader(message: CookieInfo, reader: jspb.BinaryReader): CookieInfo;
}

export namespace CookieInfo {
  export type AsObject = {
    name: string,
    value: string,
    domain: string,
    path: string,
    expires: string,
    httpOnly: boolean,
    secure: boolean,
    sameSite: string,
  }
}

export class PostDataParam extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  getFileName(): string;
  setFileName(value: string): void;

  getContentType(): string;
  setContentType(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostDataParam.AsObject;
  static toObject(includeInstance: boolean, msg: PostDataParam): PostDataParam.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostDataParam, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostDataParam;
  static deserializeBinaryFromReader(message: PostDataParam, reader: jspb.BinaryReader): PostDataParam;
}

export namespace PostDataParam {
  export type AsObject = {
    name: string,
    value: string,
    fileName: string,
    contentType: string,
  }
}

export class PostDataInfo extends jspb.Message {
  getMimeType(): string;
  setMimeType(value: string): void;

  getText(): string;
  setText(value: string): void;

  getTextTruncated(): boolean;
  setTextTruncated(value: boolean): void;

  clearParamsList(): void;
  getParamsList(): Array<PostDataParam>;
  setParamsList(value: Array<PostDataParam>): void;
  addParams(value?: PostDataParam, index?: number): PostDataParam;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PostDataInfo.AsObject;
  static toObject(includeInstance: boolean, msg: PostDataInfo): PostDataInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PostDataInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PostDataInfo;
  static deserializeBinaryFromReader(message: PostDataInfo, reader: jspb.BinaryReader): PostDataInfo;
}

export namespace PostDataInfo {
  export type AsObject = {
    mimeType: string,
    text: string,
    textTruncated: boolean,
    paramsList: Array<PostDataParam.AsObject>,
  }
}

export class ContentInfo extends jspb.Message {
  getSize(): number;
  setSize(value: number): void;

  getCompression(): number;
  setCompression(value: number): void;

  getMimeType(): string;
  setMimeType(value: string): void;

  getText(): string;
  setText(value: string): void;

  getTextTruncated(): boolean;
  setTextTruncated(value: boolean): void;

  getEncoding(): string;
  setEncoding(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ContentInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ContentInfo): ContentInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ContentInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ContentInfo;
  static deserializeBinaryFromReader(message: ContentInfo, reader: jspb.BinaryReader): ContentInfo;
}

export namespace ContentInfo {
  export type AsObject = {
    size: number,
    compression: number,
    mimeType: string,
    text: string,
    textTruncated: boolean,
    encoding: string,
  }
}

export class RequestInfo extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getMethod(): string;
  setMethod(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getHttpVersion(): string;
  setHttpVersion(value: string): void;

  clearHeadersList(): void;
  getHeadersList(): Array<Header>;
  setHeadersList(value: Array<Header>): void;
  addHeaders(value?: Header, index?: number): Header;

  clearQueryStringList(): void;
  getQueryStringList(): Array<QueryParam>;
  setQueryStringList(value: Array<QueryParam>): void;
  addQueryString(value?: QueryParam, index?: number): QueryParam;

  clearCookiesList(): void;
  getCookiesList(): Array<CookieInfo>;
  setCookiesList(value: Array<CookieInfo>): void;
  addCookies(value?: CookieInfo, index?: number): CookieInfo;

  hasPostData(): boolean;
  clearPostData(): void;
  getPostData(): PostDataInfo | undefined;
  setPostData(value?: PostDataInfo): void;

  getHasPostData(): boolean;
  setHasPostData(value: boolean): void;

  getHeadersSize(): number;
  setHeadersSize(value: number): void;

  getBodySize(): number;
  setBodySize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RequestInfo.AsObject;
  static toObject(includeInstance: boolean, msg: RequestInfo): RequestInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RequestInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RequestInfo;
  static deserializeBinaryFromReader(message: RequestInfo, reader: jspb.BinaryReader): RequestInfo;
}

export namespace RequestInfo {
  export type AsObject = {
    index: number,
    method: string,
    url: string,
    httpVersion: string,
    headersList: Array<Header.AsObject>,
    queryStringList: Array<QueryParam.AsObject>,
    cookiesList: Array<CookieInfo.AsObject>,
    postData?: PostDataInfo.AsObject,
    hasPostData: boolean,
    headersSize: number,
    bodySize: number,
  }
}

export class ResponseInfo extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getStatus(): number;
  setStatus(value: number): void;

  getStatusText(): string;
  setStatusText(value: string): void;

  getHttpVersion(): string;
  setHttpVersion(value: string): void;

  clearHeadersList(): void;
  getHeadersList(): Array<Header>;
  setHeadersList(value: Array<Header>): void;
  addHeaders(value?: Header, index?: number): Header;

  clearCookiesList(): void;
  getCookiesList(): Array<CookieInfo>;
  setCookiesList(value: Array<CookieInfo>): void;
  addCookies(value?: CookieInfo, index?: number): CookieInfo;

  hasContent(): boolean;
  clearContent(): void;
  getContent(): ContentInfo | undefined;
  setContent(value?: ContentInfo): void;

  getRedirectUrl(): string;
  setRedirectUrl(value: string): void;

  getHeadersSize(): number;
  setHeadersSize(value: number): void;

  getBodySize(): number;
  setBodySize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ResponseInfo.AsObject;
  static toObject(includeInstance: boolean, msg: ResponseInfo): ResponseInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ResponseInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ResponseInfo;
  static deserializeBinaryFromReader(message: ResponseInfo, reader: jspb.BinaryReader): ResponseInfo;
}

export namespace ResponseInfo {
  export type AsObject = {
    index: number,
    status: number,
    statusText: string,
    httpVersion: string,
    headersList: Array<Header.AsObject>,
    cookiesList: Array<CookieInfo.AsObject>,
    content?: ContentInfo.AsObject,
    redirectUrl: string,
    headersSize: number,
    bodySize: number,
  }
}

export class TimingsInfo extends jspb.Message {
  getBlocked(): number;
  setBlocked(value: number): void;

  getDns(): number;
  setDns(value: number): void;

  getConnect(): number;
  setConnect(value: number): void;

  getSend(): number;
  setSend(value: number): void;

  getWait(): number;
  setWait(value: number): void;

  getReceive(): number;
  setReceive(value: number): void;

  getSsl(): number;
  setSsl(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TimingsInfo.AsObject;
  static toObject(includeInstance: boolean, msg: TimingsInfo): TimingsInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: TimingsInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): TimingsInfo;
  static deserializeBinaryFromReader(message: TimingsInfo, reader: jspb.BinaryReader): TimingsInfo;
}

export namespace TimingsInfo {
  export type AsObject = {
    blocked: number,
    dns: number,
    connect: number,
    send: number,
    wait: number,
    receive: number,
    ssl: number,
  }
}

export class EntrySummary extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getStartedDateTime(): string;
  setStartedDateTime(value: string): void;

  getMethod(): string;
  setMethod(value: string): void;

  getUrl(): string;
  setUrl(value: string): void;

  getStatus(): number;
  setStatus(value: number): void;

  getTime(): number;
  setTime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntrySummary.AsObject;
  static toObject(includeInstance: boolean, msg: EntrySummary): EntrySummary.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntrySummary, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntrySummary;
  static deserializeBinaryFromReader(message: EntrySummary, reader: jspb.BinaryReader): EntrySummary;
}

export namespace EntrySummary {
  export type AsObject = {
    index: number,
    startedDateTime: string,
    method: string,
    url: string,
    status: number,
    time: number,
  }
}

export class FullEntry extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getPageref(): string;
  setPageref(value: string): void;

  getStartedDateTime(): string;
  setStartedDateTime(value: string): void;

  getTime(): number;
  setTime(value: number): void;

  hasRequest(): boolean;
  clearRequest(): void;
  getRequest(): RequestInfo | undefined;
  setRequest(value?: RequestInfo): void;

  hasResponse(): boolean;
  clearResponse(): void;
  getResponse(): ResponseInfo | undefined;
  setResponse(value?: ResponseInfo): void;

  hasTimings(): boolean;
  clearTimings(): void;
  getTimings(): TimingsInfo | undefined;
  setTimings(value?: TimingsInfo): void;

  getServerIpAddress(): string;
  setServerIpAddress(value: string): void;

  getConnection(): string;
  setConnection(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FullEntry.AsObject;
  static toObject(includeInstance: boolean, msg: FullEntry): FullEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FullEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FullEntry;
  static deserializeBinaryFromReader(message: FullEntry, reader: jspb.BinaryReader): FullEntry;
}

export namespace FullEntry {
  export type AsObject = {
    index: number,
    pageref: string,
    startedDateTime: string,
    time: number,
    request?: RequestInfo.AsObject,
    response?: ResponseInfo.AsObject,
    timings?: TimingsInfo.AsObject,
    serverIpAddress: string,
    connection: string,
    comment: string,
  }
}

export class PageInfo extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getTitle(): string;
  setTitle(value: string): void;

  getStartedDateTime(): string;
  setStartedDateTime(value: string): void;

  getOnContentLoad(): number;
  setOnContentLoad(value: number): void;

  getOnLoad(): number;
  setOnLoad(value: number): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PageInfo.AsObject;
  static toObject(includeInstance: boolean, msg: PageInfo): PageInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PageInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PageInfo;
  static deserializeBinaryFromReader(message: PageInfo, reader: jspb.BinaryReader): PageInfo;
}

export namespace PageInfo {
  export type AsObject = {
    id: string,
    title: string,
    startedDateTime: string,
    onContentLoad: number,
    onLoad: number,
    comment: string,
  }
}

export class CreatorInfo extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getVersion(): string;
  setVersion(value: string): void;

  getComment(): string;
  setComment(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreatorInfo.AsObject;
  static toObject(includeInstance: boolean, msg: CreatorInfo): CreatorInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CreatorInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreatorInfo;
  static deserializeBinaryFromReader(message: CreatorInfo, reader: jspb.BinaryReader): CreatorInfo;
}

export namespace CreatorInfo {
  export type AsObject = {
    name: string,
    version: string,
    comment: string,
  }
}

export class CountEntry extends jspb.Message {
  getKey(): string;
  setKey(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CountEntry.AsObject;
  static toObject(includeInstance: boolean, msg: CountEntry): CountEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CountEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CountEntry;
  static deserializeBinaryFromReader(message: CountEntry, reader: jspb.BinaryReader): CountEntry;
}

export namespace CountEntry {
  export type AsObject = {
    key: string,
    count: number,
  }
}

export class ParseSummaryResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  getHarVersion(): string;
  setHarVersion(value: string): void;

  hasCreator(): boolean;
  clearCreator(): void;
  getCreator(): CreatorInfo | undefined;
  setCreator(value?: CreatorInfo): void;

  getBrowserName(): string;
  setBrowserName(value: string): void;

  getBrowserVersion(): string;
  setBrowserVersion(value: string): void;

  getPageCount(): number;
  setPageCount(value: number): void;

  getEntryCount(): number;
  setEntryCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParseSummaryResult.AsObject;
  static toObject(includeInstance: boolean, msg: ParseSummaryResult): ParseSummaryResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParseSummaryResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParseSummaryResult;
  static deserializeBinaryFromReader(message: ParseSummaryResult, reader: jspb.BinaryReader): ParseSummaryResult;
}

export namespace ParseSummaryResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    harVersion: string,
    creator?: CreatorInfo.AsObject,
    browserName: string,
    browserVersion: string,
    pageCount: number,
    entryCount: number,
  }
}

export class ListEntriesResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearEntriesList(): void;
  getEntriesList(): Array<EntrySummary>;
  setEntriesList(value: Array<EntrySummary>): void;
  addEntries(value?: EntrySummary, index?: number): EntrySummary;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListEntriesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ListEntriesResult): ListEntriesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListEntriesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListEntriesResult;
  static deserializeBinaryFromReader(message: ListEntriesResult, reader: jspb.BinaryReader): ListEntriesResult;
}

export namespace ListEntriesResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    entriesList: Array<EntrySummary.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class GetEntryResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  hasEntry(): boolean;
  clearEntry(): void;
  getEntry(): FullEntry | undefined;
  setEntry(value?: FullEntry): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetEntryResult.AsObject;
  static toObject(includeInstance: boolean, msg: GetEntryResult): GetEntryResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetEntryResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetEntryResult;
  static deserializeBinaryFromReader(message: GetEntryResult, reader: jspb.BinaryReader): GetEntryResult;
}

export namespace GetEntryResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    entry?: FullEntry.AsObject,
  }
}

export class ExtractRequestsResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearRequestsList(): void;
  getRequestsList(): Array<RequestInfo>;
  setRequestsList(value: Array<RequestInfo>): void;
  addRequests(value?: RequestInfo, index?: number): RequestInfo;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractRequestsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractRequestsResult): ExtractRequestsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractRequestsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractRequestsResult;
  static deserializeBinaryFromReader(message: ExtractRequestsResult, reader: jspb.BinaryReader): ExtractRequestsResult;
}

export namespace ExtractRequestsResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    requestsList: Array<RequestInfo.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class ExtractResponsesResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearResponsesList(): void;
  getResponsesList(): Array<ResponseInfo>;
  setResponsesList(value: Array<ResponseInfo>): void;
  addResponses(value?: ResponseInfo, index?: number): ResponseInfo;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractResponsesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractResponsesResult): ExtractResponsesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractResponsesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractResponsesResult;
  static deserializeBinaryFromReader(message: ExtractResponsesResult, reader: jspb.BinaryReader): ExtractResponsesResult;
}

export namespace ExtractResponsesResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    responsesList: Array<ResponseInfo.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class EntryTimings extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getUrl(): string;
  setUrl(value: string): void;

  hasTimings(): boolean;
  clearTimings(): void;
  getTimings(): TimingsInfo | undefined;
  setTimings(value?: TimingsInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntryTimings.AsObject;
  static toObject(includeInstance: boolean, msg: EntryTimings): EntryTimings.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntryTimings, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntryTimings;
  static deserializeBinaryFromReader(message: EntryTimings, reader: jspb.BinaryReader): EntryTimings;
}

export namespace EntryTimings {
  export type AsObject = {
    index: number,
    url: string,
    timings?: TimingsInfo.AsObject,
  }
}

export class ExtractTimingsResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearTimingsList(): void;
  getTimingsList(): Array<EntryTimings>;
  setTimingsList(value: Array<EntryTimings>): void;
  addTimings(value?: EntryTimings, index?: number): EntryTimings;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractTimingsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractTimingsResult): ExtractTimingsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractTimingsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractTimingsResult;
  static deserializeBinaryFromReader(message: ExtractTimingsResult, reader: jspb.BinaryReader): ExtractTimingsResult;
}

export namespace ExtractTimingsResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    timingsList: Array<EntryTimings.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class ExtractPagesResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearPagesList(): void;
  getPagesList(): Array<PageInfo>;
  setPagesList(value: Array<PageInfo>): void;
  addPages(value?: PageInfo, index?: number): PageInfo;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractPagesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractPagesResult): ExtractPagesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractPagesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractPagesResult;
  static deserializeBinaryFromReader(message: ExtractPagesResult, reader: jspb.BinaryReader): ExtractPagesResult;
}

export namespace ExtractPagesResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    pagesList: Array<PageInfo.AsObject>,
    count: number,
  }
}

export class DomainCount extends jspb.Message {
  getDomain(): string;
  setDomain(value: string): void;

  getCount(): number;
  setCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DomainCount.AsObject;
  static toObject(includeInstance: boolean, msg: DomainCount): DomainCount.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DomainCount, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DomainCount;
  static deserializeBinaryFromReader(message: DomainCount, reader: jspb.BinaryReader): DomainCount;
}

export namespace DomainCount {
  export type AsObject = {
    domain: string,
    count: number,
  }
}

export class ExtractDomainsResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearDomainsList(): void;
  getDomainsList(): Array<DomainCount>;
  setDomainsList(value: Array<DomainCount>): void;
  addDomains(value?: DomainCount, index?: number): DomainCount;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractDomainsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractDomainsResult): ExtractDomainsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractDomainsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractDomainsResult;
  static deserializeBinaryFromReader(message: ExtractDomainsResult, reader: jspb.BinaryReader): ExtractDomainsResult;
}

export namespace ExtractDomainsResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    domainsList: Array<DomainCount.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class EntryUrl extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getUrl(): string;
  setUrl(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntryUrl.AsObject;
  static toObject(includeInstance: boolean, msg: EntryUrl): EntryUrl.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntryUrl, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntryUrl;
  static deserializeBinaryFromReader(message: EntryUrl, reader: jspb.BinaryReader): EntryUrl;
}

export namespace EntryUrl {
  export type AsObject = {
    index: number,
    url: string,
  }
}

export class ExtractUrlsResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearUrlsList(): void;
  getUrlsList(): Array<EntryUrl>;
  setUrlsList(value: Array<EntryUrl>): void;
  addUrls(value?: EntryUrl, index?: number): EntryUrl;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractUrlsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractUrlsResult): ExtractUrlsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractUrlsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractUrlsResult;
  static deserializeBinaryFromReader(message: ExtractUrlsResult, reader: jspb.BinaryReader): ExtractUrlsResult;
}

export namespace ExtractUrlsResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    urlsList: Array<EntryUrl.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class ComputeStatsResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  getEntryCount(): number;
  setEntryCount(value: number): void;

  getTotalTransferSize(): number;
  setTotalTransferSize(value: number): void;

  getTotalTime(): number;
  setTotalTime(value: number): void;

  clearCountByStatusClassList(): void;
  getCountByStatusClassList(): Array<CountEntry>;
  setCountByStatusClassList(value: Array<CountEntry>): void;
  addCountByStatusClass(value?: CountEntry, index?: number): CountEntry;

  clearCountByMimeTypeList(): void;
  getCountByMimeTypeList(): Array<CountEntry>;
  setCountByMimeTypeList(value: Array<CountEntry>): void;
  addCountByMimeType(value?: CountEntry, index?: number): CountEntry;

  clearSlowestList(): void;
  getSlowestList(): Array<EntrySummary>;
  setSlowestList(value: Array<EntrySummary>): void;
  addSlowest(value?: EntrySummary, index?: number): EntrySummary;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ComputeStatsResult.AsObject;
  static toObject(includeInstance: boolean, msg: ComputeStatsResult): ComputeStatsResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ComputeStatsResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ComputeStatsResult;
  static deserializeBinaryFromReader(message: ComputeStatsResult, reader: jspb.BinaryReader): ComputeStatsResult;
}

export namespace ComputeStatsResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    entryCount: number,
    totalTransferSize: number,
    totalTime: number,
    countByStatusClassList: Array<CountEntry.AsObject>,
    countByMimeTypeList: Array<CountEntry.AsObject>,
    slowestList: Array<EntrySummary.AsObject>,
    truncated: boolean,
  }
}

export class EntryCookie extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getUrl(): string;
  setUrl(value: string): void;

  hasCookie(): boolean;
  clearCookie(): void;
  getCookie(): CookieInfo | undefined;
  setCookie(value?: CookieInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EntryCookie.AsObject;
  static toObject(includeInstance: boolean, msg: EntryCookie): EntryCookie.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: EntryCookie, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EntryCookie;
  static deserializeBinaryFromReader(message: EntryCookie, reader: jspb.BinaryReader): EntryCookie;
}

export namespace EntryCookie {
  export type AsObject = {
    index: number,
    url: string,
    cookie?: CookieInfo.AsObject,
  }
}

export class ExtractCookiesResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearCookiesList(): void;
  getCookiesList(): Array<EntryCookie>;
  setCookiesList(value: Array<EntryCookie>): void;
  addCookies(value?: EntryCookie, index?: number): EntryCookie;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractCookiesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractCookiesResult): ExtractCookiesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractCookiesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractCookiesResult;
  static deserializeBinaryFromReader(message: ExtractCookiesResult, reader: jspb.BinaryReader): ExtractCookiesResult;
}

export namespace ExtractCookiesResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    cookiesList: Array<EntryCookie.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class HeaderValueEntry extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): void;

  getDirection(): string;
  setDirection(value: string): void;

  getValue(): string;
  setValue(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): HeaderValueEntry.AsObject;
  static toObject(includeInstance: boolean, msg: HeaderValueEntry): HeaderValueEntry.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: HeaderValueEntry, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): HeaderValueEntry;
  static deserializeBinaryFromReader(message: HeaderValueEntry, reader: jspb.BinaryReader): HeaderValueEntry;
}

export namespace HeaderValueEntry {
  export type AsObject = {
    index: number,
    direction: string,
    value: string,
  }
}

export class ExtractHeaderValuesResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearValuesList(): void;
  getValuesList(): Array<HeaderValueEntry>;
  setValuesList(value: Array<HeaderValueEntry>): void;
  addValues(value?: HeaderValueEntry, index?: number): HeaderValueEntry;

  getCount(): number;
  setCount(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExtractHeaderValuesResult.AsObject;
  static toObject(includeInstance: boolean, msg: ExtractHeaderValuesResult): ExtractHeaderValuesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExtractHeaderValuesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExtractHeaderValuesResult;
  static deserializeBinaryFromReader(message: ExtractHeaderValuesResult, reader: jspb.BinaryReader): ExtractHeaderValuesResult;
}

export namespace ExtractHeaderValuesResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    valuesList: Array<HeaderValueEntry.AsObject>,
    count: number,
    truncated: boolean,
  }
}

export class DetectHeaderPresenceResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  clearMatchesList(): void;
  getMatchesList(): Array<EntrySummary>;
  setMatchesList(value: Array<EntrySummary>): void;
  addMatches(value?: EntrySummary, index?: number): EntrySummary;

  getCount(): number;
  setCount(value: number): void;

  getTotalEntries(): number;
  setTotalEntries(value: number): void;

  getTruncated(): boolean;
  setTruncated(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DetectHeaderPresenceResult.AsObject;
  static toObject(includeInstance: boolean, msg: DetectHeaderPresenceResult): DetectHeaderPresenceResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DetectHeaderPresenceResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DetectHeaderPresenceResult;
  static deserializeBinaryFromReader(message: DetectHeaderPresenceResult, reader: jspb.BinaryReader): DetectHeaderPresenceResult;
}

export namespace DetectHeaderPresenceResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    matchesList: Array<EntrySummary.AsObject>,
    count: number,
    totalEntries: number,
    truncated: boolean,
  }
}

export class ValidateHarResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  getValid(): boolean;
  setValid(value: boolean): void;

  clearIssuesList(): void;
  getIssuesList(): Array<string>;
  setIssuesList(value: Array<string>): void;
  addIssues(value: string, index?: number): string;

  getHarVersion(): string;
  setHarVersion(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ValidateHarResult.AsObject;
  static toObject(includeInstance: boolean, msg: ValidateHarResult): ValidateHarResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ValidateHarResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ValidateHarResult;
  static deserializeBinaryFromReader(message: ValidateHarResult, reader: jspb.BinaryReader): ValidateHarResult;
}

export namespace ValidateHarResult {
  export type AsObject = {
    ok: boolean,
    error: string,
    valid: boolean,
    issuesList: Array<string>,
    harVersion: string,
  }
}

