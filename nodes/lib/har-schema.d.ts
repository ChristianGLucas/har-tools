// har-schema (ISC, ahmadnassri/har-schema) ships no TypeScript types; it is
// a CommonJS module exporting a plain object of the 18 HAR 1.2 JSON Schema
// definitions (draft-06). Declared as `any` here — validateHar.ts treats
// each value as an opaque JSON Schema object handed straight to ajv.
declare module 'har-schema';
