# har-tools

Deterministic, HAR-SEMANTIC parsing and inspection of **HTTP Archive (HAR 1.2)**
files — the JSON format browsers' devtools, mitmproxy, and CI performance tooling
export to capture a session's network traffic. Built for the
[Axiom](https://axiomide.com) marketplace, handle `christiangeorgelucas`.

Distinct from generic JSON tooling (`dataformat-tools`, `json-schema-tools`), a
single raw HTTP wire-message parser (`http-message-tools`), URL parsing
(`url-tools`), and plaintext access-log parsing (`weblog-tools`): this package
understands the HAR document's own structure — log, creator/browser, pages, and
the entries array of paired request/response captures with timing breakdowns —
and pulls out exactly what a web-performance/debugging/QA agent needs.

## Use it from your agent or app

Every node in this package is a **live, auto-scaling API endpoint** on the
[Axiom](https://axiomide.com) marketplace — call it from an AI agent or your own
code, with nothing to self-host.

**📦 See it on the marketplace:**
https://dev.axiomide.com/marketplace/christiangeorgelucas/har-tools@0.1.0

**Hook it up to an AI agent (MCP).** Add Axiom's hosted MCP server to any MCP
client and every node becomes a typed tool your agent can call — search the
catalog, inspect a schema, and invoke it directly.

```bash
# Claude Code
claude mcp add --transport http axiom https://api.axiomide.com/mcp \
  --header "Authorization: Bearer $AXIOM_API_KEY"
```

Claude Desktop, Cursor, or any config-based client:

```json
{
  "mcpServers": {
    "axiom": {
      "type": "http",
      "url": "https://api.axiomide.com/mcp",
      "headers": { "Authorization": "Bearer YOUR_AXIOM_API_KEY" }
    }
  }
}
```

**Call it from the CLI.**

```bash
axiom invoke christiangeorgelucas/har-tools/ParseSummary --input '{ ... }'
```

**Call it over HTTP.**

```bash
curl -X POST https://api.axiomide.com/invocations/v1/nodes/christiangeorgelucas/har-tools/0.1.0/ParseSummary \
  -H "Authorization: Bearer $AXIOM_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{ ... }'
```

> Input/output schema for each node is on the marketplace page above, or via
> `axiom inspect node christiangeorgelucas/har-tools/ParseSummary`.

### Get started free

Install the CLI:

```bash
# macOS / Linux — Homebrew
brew install axiomide/tap/axiom

# macOS / Linux — install script
curl -fsSL https://raw.githubusercontent.com/AxiomIDE/axiom-releases/main/install.sh | sh
```

**Windows:** download the `windows/amd64` `.zip` from the
[releases page](https://github.com/AxiomIDE/axiom-releases/releases), unzip it,
and put `axiom.exe` on your `PATH`.

Then `axiom version` to verify, `axiom login` (GitHub or Google) to authenticate,
and create an API key under **Console → API Keys**. Docs and sign-up at
**[axiomide.com](https://axiomide.com)**.

## Nodes

- **ParseSummary** — top-level metadata: HAR version, creator/browser, page and
  entry counts.
- **ListEntries** — every entry as a lightweight summary (method, URL, status,
  time).
- **GetEntry** — expand a single entry by index into its full request/response/
  timings.
- **ExtractRequests** — every request in full (headers, query string, cookies,
  post body).
- **ExtractResponses** — every response in full (headers, cookies, content
  metadata + capped body preview).
- **ExtractTimings** — the `blocked/dns/connect/send/wait/receive/ssl` breakdown
  per entry — the core performance node.
- **ExtractPages** — every `log.pages[]` entry (id, title, onContentLoad/onLoad).
- **ExtractDomains** — the network inventory: every distinct host contacted, with
  counts.
- **ExtractUrls** — every request URL, correlated by index.
- **FilterByStatus** — entries matching a status code or class (`4xx`, `5xx`,
  ...) — the error-finding node.
- **FilterByMimeType** — entries matching a response MIME type or family.
- **FilterByDomain** — entries matching a request host.
- **ComputeStats** — aggregate stats: transfer size, total time, status/MIME
  breakdowns, slowest 3.
- **ExtractCookies** — every cookie set across responses.
- **ExtractHeaderValues** — every value of a named header across all entries.
- **ExtractSlowest** — top-N entries ranked by time or size.
- **DetectHeaderPresence** — entries that carry a named header at all.
- **ValidateHar** — structural validation against the HAR 1.2 JSON Schema.

## Design

HAR is JSON, not an algorithmically hard format to parse — so all HAR-domain
extraction (walking `log`/`entries`/`request`/`response`/`timings`/`pages`) is
this package's own code, the same pattern `k8s-manifest-tools` and `sbom-tools`
use. The one node where a library genuinely owns the hard part is **ValidateHar**,
which defers to [`har-schema`](https://github.com/ahmadnassri/har-schema) (ISC,
the widely-used HAR 1.2 JSON Schema definitions) plus [`ajv`](https://ajv.js.org/)
(MIT) and [`ajv-formats`](https://github.com/ajv-validator/ajv-formats) (MIT) —
`ajv-formats` is required so `format` keywords (`date-time`/`uri`/`ipv4`/`ipv6`)
are actually enforced; without it, `serverIPAddress`'s `oneOf: [ipv4, ipv6]`
spuriously fails validation on any real HAR export.

The HAR document is always caller-supplied text — no network, no browser, no
wall-clock, no randomness; every field is read verbatim, never generated, and
output ordering is always stable. Input is bounded (3 MiB text, a pre-parse JSON
nesting-depth guard, and per-node caps on entries/body-text processed and
returned, comfortably inside Axiom's ~4 MiB node transport limit) and a
malformed, oversized, or structurally-invalid HAR returns a structured error
instead of a crash.

## License

MIT — Copyright (c) 2026 Christian George Lucas.
