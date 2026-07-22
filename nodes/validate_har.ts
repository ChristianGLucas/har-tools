import { HarDocument, ValidateHarResult } from '../gen/messages_pb';
import { AxiomContext } from '../gen/axiomContext';
import { parseJsonGuarded } from './lib/harParse';
import { validateHarStructure } from './lib/validateHar';

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/**
 * Validate the document against the HAR 1.2 JSON Schema (the
 * ahmadnassri/har-schema definitions, via ajv). `valid` is false and
 * `issues` lists every schema violation (JSON-pointer path + message) for a
 * structurally non-conformant document; a document that isn't even valid
 * JSON returns ok=false with a parse error instead (validation never runs
 * on unparseable input). Deterministic; never throws.
 *
 * @param ax - Platform context: ax.log for logging, ax.secrets for secrets.
 */
export function validateHar(ax: AxiomContext, input: HarDocument): ValidateHarResult {
  const guarded = parseJsonGuarded(input.getText());
  const out = new ValidateHarResult();
  if (!guarded.ok) {
    out.setOk(false);
    out.setError(guarded.error);
    return out;
  }

  out.setOk(true);
  out.setError('');
  const result = validateHarStructure(guarded.value);
  out.setValid(result.valid);
  out.setIssuesList(result.issues);
  if (isPlainObject(guarded.value)) {
    const log = guarded.value['log'];
    if (isPlainObject(log) && typeof log['version'] === 'string') {
      out.setHarVersion(log['version'] as string);
    }
  }
  return out;
}
