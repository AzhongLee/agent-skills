# CLI Interface Design Guide for Agents

This document defines the conventions for agent-friendly CLI interface design. CLI commands following these patterns enable LLM agents to discover, understand, and invoke commands with minimal context loading.

## 1. Design Philosophy

Three core principles:

| # | Principle | Description |
|---|-----------|-------------|
| 1 | Progressive Disclosure | Information density increases from usage → help → man; agents only need the first two layers for 95% of calls |
| 2 | Examples as Specification | Every documentation layer anchors on executable examples, not descriptive prose |
| 3 | Structured First | All output uses fixed delimiters and format conventions for zero-shot LLM extraction |

## 2. Command Organization

### 2.1 Noun-Verb Two-Level Structure

```
<tool> <resource> <action> [options] [positional-args]
```

| Rule | Description | Example |
|------|-------------|---------|
| R1: Resource first | First-level subcommand is a resource/domain noun | `feishu doc`, `feishu task` |
| R2: Action second | Second-level subcommand is an action verb | `feishu doc create`, `feishu doc search` |
| R3: High-freq promotion | Actions used >60% of the time may be promoted to top-level aliases | `feishu search` → `feishu doc search` |
| R4: Unified CRUD verbs | Use fixed verb set for CRUD | `create / delete / update / get / list` |
| R5: Depth ≤ 3 | No more than 3 levels of subcommand nesting | `feishu doc comment list` max |

### 2.2 When to Use Subcommand vs Option

| Scenario | Recommendation | Reason |
|----------|---------------|--------|
| Different operation semantics (create vs delete) | Subcommand | Different verbs = different param sets |
| Same semantics, different output format | Option `--format` | Core logic identical, only presentation differs |
| Boolean behavior modifier (silent mode) | Flag `--quiet` | Doesn't affect core param structure |
| Different views of same resource (summary vs detail) | Option `--detail` or flag | Same resource, different granularity |

### 2.3 Naming Rules

**Commands and subcommands:**
- All lowercase, hyphen-separated: `doc-comment` (not `docComment`)
- Verbs in present imperative: `create`, `list`, `search` (not `creating`, `listed`)
- Avoid abbreviations unless more well-known: `list` (not `ls`), `delete` (not `rm`)
- Singular nouns for resource types: `feishu doc` (not `feishu docs`)

**Options and flags:**
- Long options: `--<noun-phrase>` e.g. `--output-format`, `--max-results`
- Short options: `-<single-char>` only for top-5 frequency params
- Boolean flags take no value: `--verbose` (not `--verbose=true`)
- Negation flags use `--no-` prefix: `--no-cache`
- Assignment via space or `=`: `--format json` or `--format=json`

**Aliases:**
- Must be declared in man documentation with explicit mapping
- Do not introduce new parameters — only combine subcommand + default options
- Marked with `alias:` label in help output

## 3. Information Layers

### 3.1 Layer Triggers

| User Action | CLI Shows | Doc Level | Marker |
|-------------|-----------|-----------|--------|
| Command with no args (and command can't execute) | Usage — minimal syntax + 3-5 examples | `@USAGE` |
| Command with `-h` or `--help` | Help — full param table, enums, common errors | `@HELP` |
| `man <command>` or `--man` | Man — JSON Schema, all error codes, caveats | `@MAN` |

### 3.2 Usage Layer (@USAGE)

**Goal:** Agent reads usage and covers 80% of daily invocations.

**Fixed structure:**
```
@USAGE <command-path>

BRIEF: <one-line description, ≤ 1024 chars>

SYNTAX:
  <command-path> <required-arg> [optional-arg] [options]

EXAMPLES:
  # <use case description, one sentence>
  <complete executable command>

ENUMS:
  --<option-name>: <value1> | <value2> | <value3>   # high-freq enums only
```

**Example selection (3-5, max 5):**

| Priority | Criteria | Description |
|----------|----------|-------------|
| P0 | Simplest call (happy path) | Required params only |
| P1 | One common option | Most frequently used optional param |
| P2 | Combination / pipeline | Shows chaining with other commands |
| P3 | Edge / special mode | stdin, batch operations |

**Enum exposure:** Only list enums where:
1. Total values ≤ 7
2. Option appears in high-frequency examples
3. Values not self-evident from name

Enums with >7 values: show top 3 + `...   # full list in help`

### 3.3 Help Layer (@HELP)

**Goal:** Covers 95% of actual invocation scenarios.

**Fixed structure:**
```
@HELP <command-path>

BRIEF: <same as usage>

SYNTAX:
  <command-path> <args> [options]

DESCRIPTION:
  <2-4 sentences: core behavior, prerequisites, side effects>

OPTIONS:
  Name              Type        Required  Default    Description
  ─────────────────────────────────────────────────────────
  <title>           string      yes       -          Doc title (1-255 chars)
  --folder, -f      token       no        ~          Parent folder token
  ...

ENUMS:
  --format:
    plain       Plain text, no markup
    markdown    Standard Markdown + extensions

COMMON EXAMPLES:
  # <example 1>
  <command>
  ...

COMMON ERRORS:
  CODE   NAME              DESCRIPTION                    FIX
  E1001  TITLE_TOO_LONG    Title exceeds 255 chars        Shorten title
  ...

SEE ALSO:
  <related-command>    <description>
```

**OPTIONS table required fields:**

| Field | Required | Description |
|-------|----------|-------------|
| Name (long+short) | Yes | Short option may be empty |
| Type | Yes | string / int / float / bool / enum / token / string[] / JSON |
| Required | Yes | yes / no |
| Default | Yes | `-` if none |
| Description | Yes | ≤ 60 chars, include constraints |

**Recommended values:** Mark with `[recommended]` in description:
```
  --concurrency     int       no    4         Concurrency (1-32) [recommended: 8]
```

**Common examples (5-10):** Include at least one `[PIPELINE]` example.

**Common errors (3-5):** Highest frequency errors with fix guidance.

### 3.4 Sub-command Help Layer

**Additional requirements beyond help:**
```
@HELP <command> <sub-command> <action>

PARENT: <command> <sub-command>

INHERITED OPTIONS:
  <options inherited from parent — name only, with "see: <parent> help" reference>
```

**Information layering:**

| Info Category | Appears In | Rule |
|---------------|-----------|------|
| Inherited options (--format, --verbose) | Top-level help only | Sub-command uses `INHERITED OPTIONS` reference |
| Sub-command specific options | Sub-command help only | Not in top-level help |
| Resource-level description | Top-level DESCRIPTION | Sub-command does not repeat |
| Action-level prerequisites | Sub-command DESCRIPTION | Write explicitly |
| Error codes | Common in top-level, specific in sub-command | Sub-command may reference common errors |

**Required labels:**
- At least one `[TEMPLATE]` example (with `<placeholder>` for transferable patterns)
- At least one `[RECOMMENDED]` example

### 3.5 Man Layer (@MAN)

**Goal:** Complete reference. Only consulted for edge cases, full error codes, field-level schema.

**Required sections:**
```
@MAN <command-path>

NAME
SYNOPSIS
DESCRIPTION
OPTIONS          # Full list with Type, Required, Default, Constraint, Since, Desc
ARGUMENTS
ENUMS            # Full values with [since:] and [deprecated:] markers
SCHEMA           # JSON Schema draft-07 for input/output
EXAMPLES         # Categorized: Basic, Advanced, Pipeline, Error Recovery
EXIT CODES       # 0-8 standard codes
ERRORS           # Full table: CODE, NAME, TRIGGER, RECOVERY
CAVEATS
COMPATIBILITY
SEE ALSO
```

**SCHEMA conventions:**
- Explicit `required` array at top level
- Explicit `type` for every field
- Inline `enum` values (no external references)
- `description` field ≤ 40 chars per field
- `example` field with typical value

**Exit codes:**

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Generic error |
| 2 | Argument error (missing or invalid) |
| 3 | Auth failure |
| 4 | Permission denied |
| 5 | Resource not found |
| 6 | Conflict (mutual exclusion, resource exists) |
| 7 | Rate limit |
| 8 | Server error |

## 4. Error Design

### 4.1 Standard Error Format

```
ERROR [<code>] <name>: <one-line description>
  Trigger:  <trigger condition>
  Fix:      <fix suggestion>
  Example:  <correct command example>
```

### 4.2 Error Code Encoding

```
E<CATEGORY><SEQUENCE>

  1xxx  Argument/input errors (client-fixable)
  2xxx  Auth/permission errors
  3xxx  Resource state errors (not found, locked, conflict)
  4xxx  Rate/quota limits
  5xxx  Server errors (client cannot fix)
```

### 4.3 Error Distribution Across Layers

| Layer | Content | Count |
|-------|---------|-------|
| usage | No errors | 0 |
| help | COMMON ERRORS: highest frequency | 3-5 |
| sub-command help | Sub-command specific errors, may reference common | 2-3 |
| man | ERRORS: complete error code list | All |

## 5. Agent-Friendly Writing Style

| Principle | Good | Bad |
|-----------|------|-----|
| No ambiguous pronouns | "This option controls output format" | "It controls format" |
| Explicit required/optional | `Required: yes` | "Usually needs to be provided" |
| Deterministic verbs | "Creates a document" | "Can be used to create a document" |
| Self-describing param names | `--max-results` | `--n` |
| Explicit type annotation | `Type: string` | No type annotation |
| One concept one word | Use "token" consistently | Mix "token / ID / key" |

## 6. Structural Markers

```
@USAGE <path>    → Usage block start
@HELP <path>     → Help block start
@MAN <path>      → Man block start
```

**Block labels** (uppercase, followed by colon and newline):
```
BRIEF:, SYNTAX:, DESCRIPTION:, OPTIONS:, ENUMS:, EXAMPLES:,
ERRORS:, COMMON ERRORS:, SCHEMA:, EXIT CODES:, INHERITED OPTIONS:,
SEE ALSO:, CAVEATS:, COMPATIBILITY:
```

**Example labels** (inline comments):
```
# [RECOMMENDED]   Recommended pattern
# [TEMPLATE]      Transferable invocation template
# [PIPELINE]      Pipeline composition usage
# [ADVANCED]      Advanced usage
# [ERROR RECOVERY] Error recovery pattern
```

Agent can locate doc level via regex `^@(USAGE|HELP|MAN)\s+(.+)$`, blocks via `^([A-Z ]+):$`.

## 7. Example Coverage Strategy

Each command's example set must cover these six invocation patterns (distributed across usage + help + man):

| Pattern | Layer | Label | Description |
|---------|-------|-------|-------------|
| Minimal invocation | usage | (none) | Required params only |
| Single option | usage | (none) | One high-freq option added |
| Combined options | help | (none) | 2-3 options combined |
| Pipeline | help | [PIPELINE] | stdin/stdout chaining with other commands |
| Call template | sub-command help | [TEMPLATE] | Placeholders showing generic pattern |
| Error recovery | man | [ERROR RECOVERY] | Retry command after specific error |

## 8. Machine-Parseable Schema

CLI should support:
```bash
# Output complete JSON Schema for a command
<tool> <resource> <action> --schema

# Output all subcommands as JSON array
<tool> <resource> --commands
```

Output is fixed JSON format for direct agent parsing.

## 9. Caching Strategy

| Strategy | Description |
|----------|-------------|
| Pre-load usage at session init | Small payload, high info density |
| Load help on demand | Only when usage is insufficient |
| Rarely load man | Only for error recovery or schema extraction |
| Cache --schema output | Long-lived, update with version changes |
