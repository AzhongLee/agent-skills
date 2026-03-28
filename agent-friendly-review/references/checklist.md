# Agent-Friendly Code Review Checklist

Combined checklist for Layer 1 (API Interface), Layer 2 (Code Structure), and Layer 3 (CLI Interface Documentation) reviews.

## Layer 1: API Interface Review

### Function Naming

- [ ] `get*` functions return single item, not arrays
- [ ] `list*` functions return collections/paginated results
- [ ] `search*` functions accept query parameters
- [ ] `create*`/`update*`/`delete*` used for CRUD operations
- [ ] No V2/V3 suffixes (use deprecation instead)
- [ ] Consistent vocabulary across codebase

### Parameters

- [ ] Functions with >2 params use options object
- [ ] Optional parameters are in options object
- [ ] Pagination uses `page` and `pageSize` (not `pn`, `rn`, `no`, `size`)
- [ ] Options interface is exported and named `*Options`
- [ ] Required params are clearly distinguished from optional

### Return Types

- [ ] List/collection results use `*Result` suffix
- [ ] No `*Response` suffix on return types (too HTTP-specific)
- [ ] No `*List` suffix on return types (ambiguous)
- [ ] Paginated results include `total`, `page`, `pageSize`
- [ ] Return type matches function prefix semantics

### Type Safety

- [ ] All public functions have explicit return types
- [ ] Options interfaces are defined (not inline)
- [ ] No `any` types in public APIs
- [ ] Error types are structured (`AppError`)

### Deprecation

- [ ] Deprecated functions have `@deprecated` JSDoc
- [ ] Deprecated functions reference replacement
- [ ] Migration path is documented

### Module Structure

- [ ] API module uses folder pattern (`types.ts`, `client.ts`, `parsers.ts`, `api.ts`, `index.ts`)
- [ ] Handler module uses folder pattern (domain files + `index.ts` barrel)
- [ ] Service module uses folder pattern (domain files + `index.ts` barrel)
- [ ] Command module uses folder pattern (`index.ts` with `registerXxxCommands`)
- [ ] `api/index.ts` uses mutable spread export (`export const xxx = { ..._xxx }`)
- [ ] Type references use `import type { T } from "@/api/<domain>"` (not `api.xxx.TypeName`)
- [ ] No `.ts` extension in import/require paths
- [ ] `index.ts` uses explicit named re-exports

## Layer 2: Code Structure Review

### Complexity

- [ ] Nesting depth ≤ 3 levels
- [ ] Conditional branches ≤ 5 per function
- [ ] Function length ≤ 20 lines
- [ ] File length ≤ 300 lines
- [ ] Parameter count ≤ 3 (or use options object)

### Flow Control

- [ ] Uses early returns/guard clauses
- [ ] No deeply nested if/else chains
- [ ] Linear, top-to-bottom flow
- [ ] No goto or complex control flow

### Dependencies

- [ ] No global state
- [ ] All dependencies passed explicitly
- [ ] No magic values (use constants)
- [ ] Imports are at top of file

### Naming

- [ ] Variables use clear, descriptive names
- [ ] Functions use verb+noun format
- [ ] Consistent naming patterns
- [ ] No single-letter variables (except loops)

### Structure

- [ ] Related code is co-located
- [ ] Visual spacing between logical sections
- [ ] Comments explain "why", not "what"
- [ ] No dead code or commented-out code

### Error Handling

- [ ] Consistent error handling pattern
- [ ] Errors are structured (`AppError`)
- [ ] Error messages are descriptive
- [ ] Errors include context (endpoint, params)

### Testing

- [ ] Functions have corresponding tests
- [ ] Tests use table-driven pattern where applicable
- [ ] Tests are independent (no shared state)
- [ ] Edge cases are covered

## Layer 3: CLI Interface Documentation Review

### Command Organization

- [ ] Commands follow noun-verb structure: `<tool> <resource> <action>`
- [ ] CRUD actions use unified verbs: `create / delete / update / get / list`
- [ ] Subcommand depth ≤ 3 levels
- [ ] Command names: lowercase, hyphen-separated, singular nouns, imperative verbs
- [ ] No abbreviations unless more well-known than full word
- [ ] High-frequency aliases declared in man docs with explicit mapping
- [ ] Aliases do not introduce new parameters

### Usage (@USAGE) Check

- [ ] Has exactly one BRIEF line (≤ 1024 chars)
- [ ] SYNTAX contains full command path and all required params
- [ ] EXAMPLES count is 3-5 (not more, not fewer)
- [ ] First example is the simplest call (happy path, required params only)
- [ ] ENUMS only lists high-frequency enums (values ≤ 7)
- [ ] Enums with >7 values show top 3 + `...  # full list in help`
- [ ] No error information in usage

### Help (@HELP) Check

- [ ] OPTIONS table: every entry has name, type, required, default, description
- [ ] OPTIONS description ≤ 60 chars with constraints
- [ ] Recommended values marked with `[recommended]`
- [ ] Enum options: every value has one-line description
- [ ] COMMON ERRORS lists 3-5 highest frequency errors
- [ ] COMMON ERRORS entries have CODE, NAME, DESCRIPTION, FIX
- [ ] COMMON EXAMPLES count is 5-10
- [ ] At least one `[PIPELINE]` example in COMMON EXAMPLES
- [ ] SEE ALSO lists related commands
- [ ] DESCRIPTION is 2-4 sentences covering core behavior, prerequisites, side effects

### Sub-command Help Check

- [ ] INHERITED OPTIONS references parent (name only, no redefinition)
- [ ] Only sub-command specific options listed in OPTIONS
- [ ] At least one `[TEMPLATE]` example with `<placeholder>` for transferable patterns
- [ ] At least one `[RECOMMENDED]` example
- [ ] ERRORS only lists sub-command specific errors (may reference common)
- [ ] PARENT field declares parent command path

### Man (@MAN) Check

- [ ] SCHEMA section uses JSON Schema draft-07 format
- [ ] Every schema field has `type` + `description` + `example`
- [ ] `required` array explicit at schema top level
- [ ] Enum values inlined in field definitions (no external references)
- [ ] EXIT CODES section complete (0-8 standard codes)
- [ ] ERRORS table has CODE, NAME, TRIGGER, RECOVERY for every error
- [ ] CAVEATS lists known limitations
- [ ] COMPATIBILITY records breaking changes (if any)
- [ ] EXAMPLES categorized: Basic, Advanced, Pipeline, Error Recovery
- [ ] Each enum value has `[since:]` version marker

### Error Design Check

- [ ] Error output format: `ERROR [<code>] <name>: <description>` + Trigger + Fix + Example
- [ ] Error codes follow encoding: `E<category><sequence>` (1xxx-5xxx)
- [ ] No error info in usage layer
- [ ] 3-5 errors in help layer
- [ ] Full error list in man layer
- [ ] Fix field provides actionable recovery command
- [ ] Example field shows correct command after fix

### Agent-Friendliness Check

- [ ] All sections use uppercase block labels (`OPTIONS:`, `ENUMS:`, etc.)
- [ ] No ambiguous pronouns ("it", "this", "above", "the above")
- [ ] Mutual exclusion explicitly annotated (in Constraint or description)
- [ ] Supports `--schema` for JSON Schema output
- [ ] Supports `--commands` for subcommand list output
- [ ] Example set covers 6 patterns: minimal, single-option, combined, pipeline, template, error-recovery
- [ ] `[RECOMMENDED]` labels on best-practice examples
- [ ] Structural markers parseable via `^@(USAGE|HELP|MAN)\s+(.+)$`
- [ ] Block labels parseable via `^([A-Z ]+):$`
- [ ] Types explicitly annotated (not inferred from context)
- [ ] One concept one word (no mixing token/ID/key for same concept)

## Quick Review Checklist

For fast reviews, check these critical items:

### Must Fix (Blocking)
- [ ] get* returning arrays (should be list*)
- [ ] >5 positional parameters
- [ ] Functions >50 lines
- [ ] Nesting >4 levels
- [ ] Global state
- [ ] Command with no usage output when invoked without args
- [ ] Help output with no OPTIONS table
- [ ] Error messages with no error code or fix suggestion

### Should Fix (High Priority)
- [ ] Missing `*Result` wrapper types
- [ ] Inconsistent pagination params
- [ ] V2 suffixes without deprecation
- [ ] Missing error handling
- [ ] No tests for public functions
- [ ] Help missing COMMON ERRORS section
- [ ] No `[PIPELINE]` examples in help
- [ ] Enum >7 values not truncated in usage
- [ ] Missing SCHEMA section in man

### Nice to Fix (Low Priority)
- [ ] Dense code without spacing
- [ ] Minor naming inconsistencies
- [ ] Missing JSDoc on public APIs
- [ ] Code organization improvements
- [ ] Missing `[RECOMMENDED]` labels on examples
- [ ] Verbose descriptions (>60 chars in OPTIONS)
- [ ] Missing `[TEMPLATE]` in sub-command help

## Grading Scale

| Grade | Criteria |
|-------|----------|
| A | No blocking issues, ≤2 high priority |
| B | No blocking issues, ≤5 high priority |
| C | ≤1 blocking issue, multiple high priority |
| D | 2-3 blocking issues |
| F | >3 blocking issues |

## Common Fixes Reference

### Rename get* to list*
```typescript
// Before
export async function getItems(): Promise<Item[]>

// After
export async function listItems(): Promise<ItemListResult>
```

### Add options object
```typescript
// Before
export async function search(q: string, page: number, size: number)

// After
export interface SearchOptions {
  query: string;
  page?: number;
  pageSize?: number;
}
export async function search(options: SearchOptions)
```

### Add Result wrapper
```typescript
// Before
export interface UserResponse { users: User[] }

// After
export interface UserListResult {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}
```

### Add deprecation
```typescript
// Before
export async function getUsersV2()

// After
export async function listUsers()

/**
 * @deprecated Use listUsers instead
 */
export async function getUsersV2() {
  return listUsers();
}
```

### Fix help OPTIONS table
```
// Before (missing fields)
  --folder   Folder token

// After (complete entry)
  --folder, -f      token       no        ~          Parent folder token (^fldr[A-Za-z0-9]+$)
```

### Fix error message format
```
// Before
Error: folder and wiki conflict

// After
ERROR [E1002] CONFLICT_LOCATION: Cannot specify both --folder and --wiki
  Trigger:  feishu doc create "title" --folder fldrXX --wiki wikcnYY
  Fix:      Remove one of --folder or --wiki
  Example:  feishu doc create "title" --wiki wikcnYY
```

### Add [PIPELINE] example to help
```
// Before: only basic examples

// After: add pipeline example
COMMON EXAMPLES:
  # [PIPELINE] Create doc then append content
  ID=$(feishu doc create "New Doc") && feishu doc update $ID --append "## Chapter 1"
```
