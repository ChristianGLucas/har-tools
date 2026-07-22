// Structural validation against the HAR 1.2 JSON Schema. This is the one
// node where a library genuinely owns the hard part: JSON Schema validation
// (ref resolution across 18 interlinked schema documents, draft-06 keyword
// semantics) is exactly what ajv is built for, and the schema documents
// themselves are ahmadnassri/har-schema's transcription of the HAR 1.2 spec
// — not something worth hand-rolling.
import Ajv, { ValidateFunction } from 'ajv';
import addFormats from 'ajv-formats';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const draft06MetaSchema = require('ajv/dist/refs/json-schema-draft-06.json');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const harSchemas = require('har-schema') as Record<string, object>;

let cachedValidate: ValidateFunction | null = null;

function buildValidator(): ValidateFunction {
  const ajv = new Ajv({ allErrors: true, strict: false });
  ajv.addMetaSchema(draft06MetaSchema);
  // The HAR 1.2 schema (ahmadnassri/har-schema) leans on JSON Schema
  // `format` keywords (date-time/uri/ipv4/ipv6) — notably serverIPAddress's
  // `oneOf: [{format:"ipv4"}, {format:"ipv6"}]`. Without ajv-formats
  // registered, ajv treats an unknown `format` as a no-op, so BOTH oneOf
  // branches trivially match any string and the oneOf spuriously fails
  // ("must match exactly one schema") for every entry that has a
  // serverIPAddress — which real browser/devtools HAR exports always do.
  addFormats(ajv);
  for (const schema of Object.values(harSchemas)) {
    ajv.addSchema(schema);
  }
  const fn = ajv.getSchema('har.json#');
  if (!fn) {
    throw new Error('har-schema: failed to compile the "har.json#" root schema');
  }
  return fn;
}

function getValidator(): ValidateFunction {
  if (!cachedValidate) cachedValidate = buildValidator();
  return cachedValidate;
}

export interface HarValidationResult {
  valid: boolean;
  issues: string[];
}

// Validates an already-parsed JSON value (NOT raw text — callers run
// parseJsonGuarded first so a JSON syntax error is reported as ok=false
// before validation ever runs, per this package's documented contract).
export function validateHarStructure(doc: unknown): HarValidationResult {
  const validate = getValidator();
  const valid = validate(doc) === true;
  if (valid) return { valid: true, issues: [] };
  const issues = (validate.errors ?? []).map((e) => {
    const path = e.instancePath && e.instancePath.length > 0 ? e.instancePath : '/';
    return `${path}: ${e.message ?? 'invalid'}`;
  });
  return { valid: false, issues };
}
