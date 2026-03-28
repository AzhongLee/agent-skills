# Agent-Friendly Code Review Report Template

## Report Structure

```markdown
# Code Review Report

**Date:** {date}
**Reviewer:** Agent-Friendly Review Skill
**Scope:** {files reviewed}

---

## Executive Summary

### Overall Grade: {A/B/C/D/F}

| Metric | Value |
|--------|-------|
| Files Reviewed | {count} |
| Layer 1 Issues | {count} |
| Layer 2 Issues | {count} |
| Layer 3 Issues | {count} |
| Blocking Issues | {count} |
| High Priority | {count} |

### Key Findings

1. {Most critical finding}
2. {Second most critical finding}
3. {Third most critical finding}

---

## Layer 1: API Interface Review

### Function Naming Issues

| File | Function | Current | Recommendation | Severity |
|------|----------|---------|----------------|----------|
| {file} | {function} | {current name} | {new name} | {blocking/high/medium/low} |

### Parameter Pattern Issues

| File | Function | Issue | Recommendation |
|------|----------|-------|----------------|
| {file} | {function} | {description} | {fix} |

### Return Type Issues

| File | Type | Current | Recommendation |
|------|------|---------|----------------|
| {file} | {type name} | {current suffix} | {new suffix} |

### Merge Opportunities

| Files | Functions | Recommendation |
|-------|-----------|----------------|
| {files} | {functions} | {merge strategy} |

---

## Layer 2: Code Structure Review

### Complexity Metrics

| File | Function | Nesting | Branches | Length | Status |
|------|----------|---------|----------|--------|--------|
| {file} | {function} | {n} | {n} | {n} | {pass/fail} |

### Structural Issues

| File | Location | Issue | Recommendation |
|------|----------|-------|----------------|
| {file} | {line} | {description} | {fix} |

### Naming Issues

| File | Location | Current | Recommendation |
|------|----------|---------|----------------|
| {file} | {line} | {name} | {new name} |

---

## Layer 3: CLI Interface Documentation Review

### Command Organization Issues

| Command | Issue | Rule Violated | Recommendation | Severity |
|---------|-------|---------------|----------------|----------|
| {command path} | {description} | {R1-R5 or naming rule} | {fix} | {blocking/high/medium/low} |

### Usage (@USAGE) Issues

| Command | Issue | Recommendation | Severity |
|---------|-------|----------------|----------|
| {command} | Missing BRIEF / BRIEF > 1024 chars | {fix} | {severity} |
| {command} | EXAMPLES count not 3-5 | {fix} | {severity} |
| {command} | First example is not happy path | {fix} | {severity} |
| {command} | ENUMS lists >7 values without truncation | {fix} | {severity} |

### Help (@HELP) Issues

| Command | Issue | Recommendation | Severity |
|---------|-------|----------------|----------|
| {command} | OPTIONS table missing field (type/required/default/desc) | {fix} | {severity} |
| {command} | Missing COMMON ERRORS section | {fix} | {severity} |
| {command} | No [PIPELINE] example in COMMON EXAMPLES | {fix} | {severity} |
| {command} | Enum values missing descriptions | {fix} | {severity} |
| {command} | Ambiguous pronoun in description | {fix} | {severity} |

### Sub-command Help Issues

| Command | Issue | Recommendation | Severity |
|---------|-------|----------------|----------|
| {command} | Repeats inherited options instead of referencing parent | {fix} | {severity} |
| {command} | Missing [TEMPLATE] example | {fix} | {severity} |
| {command} | Missing [RECOMMENDED] example | {fix} | {severity} |

### Man (@MAN) Issues

| Command | Issue | Recommendation | Severity |
|---------|-------|----------------|----------|
| {command} | Missing SCHEMA section | {fix} | {severity} |
| {command} | SCHEMA missing required/type/description/example | {fix} | {severity} |
| {command} | Missing EXIT CODES section | {fix} | {severity} |
| {command} | ERRORS table incomplete (missing TRIGGER/RECOVERY) | {fix} | {severity} |
| {command} | Missing CAVEATS section | {fix} | {severity} |

### Error Design Issues

| Command | Error | Issue | Recommendation | Severity |
|---------|-------|-------|----------------|----------|
| {command} | {error code or message} | {missing code/name/trigger/fix} | {fix} | {severity} |

### Writing Style Issues

| Command | Location | Issue | Recommendation |
|---------|----------|-------|----------------|
| {command} | {section} | Ambiguous pronoun / implicit required / non-deterministic verb | {fix} |

---

## Action Items

### Blocking (Must Fix)

1. [ ] **{Issue}** - {file}:{line} or {command}
   - Current: {description}
   - Fix: {recommendation}

### High Priority

1. [ ] **{Issue}** - {file}:{line} or {command}
   - Current: {description}
   - Fix: {recommendation}

### Medium Priority

1. [ ] **{Issue}** - {file}:{line} or {command}
   - Current: {description}
   - Fix: {recommendation}

### Low Priority

1. [ ] **{Issue}** - {file}:{line} or {command}
   - Current: {description}
   - Fix: {recommendation}

---

## Implementation Plan

### Phase 1: Quick Wins (Non-Breaking)
{List of changes that don't affect external API or CLI behavior}

### Phase 2: Parameter Standardization
{List of parameter pattern changes}

### Phase 3: Function Renaming (Breaking)
{List of function renames with migration path}

### Phase 4: Merge Operations
{List of function merges}

### Phase 5: CLI Documentation Improvements
{List of help/usage/man output changes}

### Phase 6: Error Message Standardization
{List of error format improvements}

---

## Verification

After implementing changes:

- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm test` passes
- [ ] Manual testing of affected commands
- [ ] Verify `<command> --help` output matches help spec
- [ ] Verify `<command>` (no args) output matches usage spec
- [ ] Verify error messages follow structured format

---

## Appendix

### Files Reviewed

{List of all files with summary}

### Commands Reviewed

{List of all CLI commands with layer 3 review status}

### References

- [API Interface Patterns](references/api-interface-patterns.md)
- [Agent-First Principles](references/principles.md)
- [CLI Interface Guide](references/cli-interface-guide.md)
- [Review Checklist](references/checklist.md)
```

---

## Grade Calculation

```typescript
function calculateGrade(issues: Issue[]): Grade {
  const blocking = issues.filter(i => i.severity === 'blocking').length;
  const high = issues.filter(i => i.severity === 'high').length;

  if (blocking > 3) return 'F';
  if (blocking > 1) return 'D';
  if (blocking > 0) return 'C';
  if (high > 5) return 'C';
  if (high > 2) return 'B';
  return 'A';
}
```

## Severity Classification

| Severity | Criteria | Examples |
|----------|----------|----------|
| Blocking | Violates core conventions, breaks agent usage | `get*` returning arrays, >5 positional params, no usage output, help with no OPTIONS table |
| High | Significant deviation from standards | Missing `*Result` wrappers, V2 suffixes, help missing COMMON ERRORS, no [PIPELINE] examples |
| Medium | Minor consistency issues | Inconsistent pagination params, enum >7 not truncated in usage, minor naming inconsistency |
| Low | Style preferences | Dense code, minor naming issues, missing [RECOMMENDED] label, verbose descriptions |
