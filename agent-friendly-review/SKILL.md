---
name: agent-friendly-review
description: Comprehensive code review for agent-friendly design. Layer 1 reviews API interfaces (naming, parameters, return types, consistency). Layer 2 reviews code structure (complexity, readability, patterns). Layer 3 reviews CLI interface documentation (usage/help/man progressive disclosure, command organization, error design). Use when designing APIs, reviewing code, auditing CLI help output, or preparing code for LLM agent consumption.
---

# Agent-Friendly Code Review Skill

A three-layer code review skill that evaluates code for LLM agent consumption and developer experience.

## Overview

This skill provides comprehensive code review with three complementary layers:

| Layer | Focus | Target |
|-------|-------|--------|
| Layer 1 | API Interface Review | `src/api/*/api.ts`, exported functions |
| Layer 2 | Agent-First Code Review | All implementation files |
| Layer 3 | CLI Interface Documentation Review | Command help output, usage text, man pages, error messages |

## Quick Start

```
/agent-friendly-review [path]           # Review a specific file or directory
/agent-friendly-review --layer 1        # API interface review only
/agent-friendly-review --layer 2        # Code structure review only
/agent-friendly-review --layer 3        # CLI interface documentation review only
/agent-friendly-review --diff           # Review only changed files
/agent-friendly-review --cli <command>  # Review CLI help output for a specific command
```

## Layer 1: API Interface Review

Reviews API function signatures for agent-friendliness:

### Function Naming
| Prefix | Semantics | Returns | Example |
|--------|-----------|---------|---------|
| `get*` | Single item by ID | `T \| null` | `getUser(id)` |
| `list*` | Collection/paginated | `*Result` | `listUsers(options)` |
| `search*` | Filtered query | `*Result` | `searchUsers(query)` |
| `create*` | New resource | `T` | `createUser(data)` |
| `update*` | Modify existing | `T` | `updateUser(id, data)` |
| `delete*` | Remove resource | `void` | `deleteUser(id)` |

### Parameter Patterns
| Pattern | When to Use |
|---------|-------------|
| Options object | >2 params OR optional params |
| Positional | 1-2 required params |
| Named pagination | `{ page, pageSize }` |

### Return Types
| Pattern | When to Use |
|---------|-------------|
| `*Result` suffix | Paginated/list results |
| Wrapper type | Collection with metadata |
| Raw type | Single item |

See [api-interface-patterns.md](references/api-interface-patterns.md) for full conventions.

## Layer 2: Agent-First Code Review

Reviews code structure for LLM comprehension:

### Core Principles
| # | Principle | Target |
|---|-----------|--------|
| 1 | Minimize nesting | ≤ 3 levels |
| 2 | Reduce branches | ≤ 5 per function |
| 3 | Linear flow | Early returns, no goto |
| 4 | Explicit dependencies | No globals, no magic |
| 5 | Consistent patterns | One way per problem |
| 6 | Self-documenting names | Verb+noun |
| 7 | Function length | ≤ 20 lines |
| 8 | Avoid premature abstraction | 3+ use cases first |
| 9 | Visual spacing | Blank lines between sections |
| 10 | Tests enable autonomy | Table-driven, fast |
| 11 | Small diff friendly | ≤ 200 lines per change |
| 12 | Context co-location | Group by domain |

See [principles.md](references/principles.md) for detailed explanations.

## Layer 3: CLI Interface Documentation Review

Reviews CLI command help output for agent-friendly progressive disclosure:

### Information Layers
| Layer | Trigger | Goal | Key Sections |
|-------|---------|------|-------------|
| Usage (`@USAGE`) | Command with no args | 80% coverage | BRIEF, SYNTAX, EXAMPLES (3-5), ENUMS |
| Help (`@HELP`) | `-h` / `--help` | 95% coverage | OPTIONS table, ENUMS (full), COMMON ERRORS (3-5), COMMON EXAMPLES (5-10) |
| Sub-command Help | Sub-command `-h` | Specialized | INHERITED OPTIONS, [TEMPLATE], [RECOMMENDED] |
| Man (`@MAN`) | `--man` | 100% coverage | SCHEMA (JSON Schema), EXIT CODES, full ERRORS, CAVEATS |

### Command Organization
| Rule | Description |
|------|-------------|
| R1: Resource first | `<tool> <resource> <action>` noun-verb structure |
| R2: Unified CRUD verbs | `create / delete / update / get / list` |
| R3: Depth ≤ 3 | No more than 3 levels of subcommand nesting |
| R4: Naming | Lowercase hyphen-separated, singular nouns, imperative verbs |

### Error Design
| Layer | Error Content | Count |
|-------|--------------|-------|
| usage | None | 0 |
| help | COMMON ERRORS | 3-5 |
| sub-command help | Sub-command specific | 2-3 |
| man | Full error code list | All |

### Writing Style
- No ambiguous pronouns ("it", "this", "above")
- Explicit required/optional marking
- Deterministic verbs ("creates", not "can be used to create")
- Self-describing parameter names (`--max-results`, not `--n`)
- One concept one word (consistent terminology)

See [cli-interface-guide.md](references/cli-interface-guide.md) for full conventions.

## Workflow

```
Phase 1 ──► Phase 2 ──► Phase 3 ──► Phase 4 ──► Phase 5
Scope       API Review  Code Review CLI Review  Report
Analysis    (Layer 1)   (Layer 2)   (Layer 3)
```

### Phase 1: Scope Analysis
- Identify files to review (git diff or component path)
- Classify files: API layer vs implementation vs CLI command/handler
- Load review references

### Phase 2: API Interface Review (Layer 1)
For `src/api/*/api.ts` files:
- Check function naming conventions
- Validate parameter patterns
- Review return type consistency
- Verify folder structure (`types.ts`, `client.ts`, `parsers.ts`, `api.ts`, `index.ts`)
- Verify mutable export in `api/index.ts`
- Check type import pattern (direct `import type` from module, not `api.xxx.TypeName`)

### Phase 3: Code Review (Layer 2)
For implementation files:
- Apply agent-first principles
- Check complexity metrics
- Validate naming and structure
- Review test coverage

### Phase 4: CLI Interface Documentation Review (Layer 3)
For CLI commands and handlers:
- Run each command with no args → check usage output structure
- Run each command with `-h` → check help output structure
- Verify OPTIONS table completeness (name, type, required, default, description)
- Check example coverage (minimal, single-option, combined, pipeline, template, error-recovery)
- Verify error message format (code + name + trigger + fix)
- Check command naming (noun-verb, lowercase-hyphen, singular nouns)
- Validate enum exposure strategy (≤7 in usage, full in help)
- Check structural markers (`@USAGE`, `@HELP`, `@MAN`, uppercase block labels)

### Phase 5: Consolidated Report
- Combine Layer 1, Layer 2, and Layer 3 findings
- Calculate overall grade
- List actionable improvements

## Output Format

The review produces a structured report with:

1. **Executive Summary** - Overall grade and key findings
2. **Layer 1 Findings** - API interface issues
3. **Layer 2 Findings** - Code structure issues
4. **Layer 3 Findings** - CLI interface documentation issues
5. **Action Items** - Prioritized improvements

See [report.md](report.md) for template.

## References

- [API Interface Patterns](references/api-interface-patterns.md) - Layer 1 conventions
- [API Folder Structure](references/api-folder-structure.md) - Module folder layout, barrel exports, import patterns
- [Agent-First Principles](references/principles.md) - Layer 2 principles
- [CLI Interface Guide](references/cli-interface-guide.md) - Layer 3 conventions
- [Review Checklist](references/checklist.md) - Combined checklist
- [Code Reviewer Agent](agents/code-reviewer.md) - Sub-agent for detailed review
