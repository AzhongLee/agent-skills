---
name: codeagent
description: Use when invoking codeagent-wrapper for multi-backend coding tasks, session resume, or dependency-aware parallel execution in the current workspace.
---

# Codeagent Wrapper

## Overview

`codeagent-wrapper` is a unified CLI for multiple coding backends:

- `codex` (default)
- `claude`
- `gemini`
- `opencode`

Use it when you want one stable invocation surface for single-task execution, session resume, worktree-isolated changes, or parallel task orchestration.

## Use It Like This

**Single task, default backend (`codex`):**

```bash
codeagent-wrapper "analyze internal/app/cli.go"
```

**Single task with explicit backend:**

```bash
codeagent-wrapper --backend claude "explain the parallel config format"
```

**HEREDOC for multi-line tasks:**

```bash
codeagent-wrapper - . <<'EOF'
Refactor the auth flow:
- separate token validation
- add clearer error paths
- update tests
EOF
```

**Resume an existing session:**

```bash
codeagent-wrapper resume <session_id> "continue the previous task"
```

**Parallel execution:**

```bash
codeagent-wrapper --parallel <<'EOF'
---TASK---
id: analyze
workdir: .
backend: codex
---CONTENT---
List the main modules and responsibilities.
---TASK---
id: review
dependencies: analyze
backend: claude
---CONTENT---
Based on analyze, identify refactoring risks.
EOF
```

## What Changed From Older Usage

Older wrapper behavior and older skill text are no longer reliable. Use the rules below instead:

- `--backend` is optional. If omitted, the wrapper defaults to `codex`.
- `opencode` is supported alongside `codex`, `claude`, and `gemini`.
- Parallel mode can rely on the global/default backend, or override backend per task.
- `model:` is not a valid parallel task metadata field. If present, parsing now fails explicitly.
- Wrapper logs are written to temp log files managed by `codeagent-wrapper`; do not assume old `/tmp/claude/.../tasks/...output` paths or any `TaskOutput` helper contract.

## Backend Rules

### Codex

- This is the default backend when nothing is specified.
- By default, wrapper adds Codex sandbox bypass behavior.
- To disable that default, set `CODEX_BYPASS_SANDBOX=false`.

Example:

```bash
codeagent-wrapper "find likely race conditions"
CODEX_BYPASS_SANDBOX=false codeagent-wrapper "run with sandbox protections"
```

### Claude

- Claude runs through `claude -p ... --output-format stream-json`.
- Wrapper disables Claude setting sources to avoid recursive prompt/skill loading.
- Wrapper skips Claude permission prompts by default.
- To re-enable Claude permission prompts, set `CODEAGENT_SKIP_PERMISSIONS=false`.
- `--skip-permissions` or `--dangerously-skip-permissions` still force skip behavior explicitly.

Example:

```bash
codeagent-wrapper --backend claude "summarize the service boundaries"
CODEAGENT_SKIP_PERMISSIONS=false codeagent-wrapper --backend claude "run with permission prompts enabled"
```

### Gemini

- Use when you specifically want the Gemini CLI backend.
- `CODEAGENT_SKIP_PERMISSIONS` is a Claude-specific control and should not be described as Gemini behavior.

### OpenCode

- Use `--backend opencode` when you want the OpenCode CLI backend.
- Structured backend errors are now preserved by the wrapper instead of being replaced with a generic exit-status message.

## Parallel Mode

Parallel mode reads task config from stdin and executes tasks in dependency order.

**Valid metadata fields:**

- `id:` required
- `workdir:` optional
- `backend:` optional
- `dependencies:` optional
- `agent:` optional
- `reasoning_effort:` optional
- `skills:` optional
- `skip_permissions:` optional
- `worktree:` optional
- `session_id:` optional

**Important constraints:**

- Unknown metadata fields now fail parsing instead of being silently ignored.
- Malformed metadata lines now fail parsing instead of being skipped.
- `model:` is invalid and will fail fast.
- If a task overrides backend, backend-specific agent settings do not leak from the original preset backend.

**Default output behavior:**

- `--parallel` returns a structured summary by default.
- Add `--full-output` only when you really need the full task transcript for debugging.

## Agent And Config Behavior

Wrapper supports agent presets from `~/.codeagent/models.json`.

Use this when you need:

- a preset backend
- a prompt file
- reasoning defaults
- Claude tool restrictions
- backend-specific API config

Current behavior to remember:

- Wrapper does not manage model selection.
- Older `model` fields in agent config are ignored for backward compatibility.
- If you pick an agent and then override `--backend`, only compatible settings carry over.
- Claude-only settings like `allowed_tools` / `disallowed_tools` must not be assumed to apply after switching to `codex`, `gemini`, or `opencode`.

## Invocation Patterns

**Preferred single-task form:**

```text
codeagent-wrapper [--backend <backend>] <task> [workdir]
```

**Preferred multi-line form:**

```text
codeagent-wrapper [--backend <backend>] - [workdir] <<'EOF'
...
EOF
```

**Preferred resume form:**

```text
codeagent-wrapper [--backend <backend>] resume <session_id> <task>
```

**Preferred parallel form:**

```text
codeagent-wrapper [--backend <backend>] --parallel <<'EOF'
...
EOF
```

Global `--backend` is optional in parallel mode. Per-task `backend:` is also optional. If neither is provided, the wrapper falls back to its normal default backend resolution.

## Operational Safety

Do not invent wrapper internals that are not part of the current CLI contract.

Safe guidance:

- Let long-running wrapper tasks continue unless there is a clear reason to stop them.
- Use wrapper stderr/stdout and the emitted log file path for debugging.
- If a run fails, inspect the actual wrapper error first before assuming the backend only returned a plain exit code.

Unsafe guidance to avoid:

- Do not tell users to tail old hard-coded `/tmp/claude/.../tasks/...output` paths.
- Do not rely on a `TaskOutput(...)` helper unless the current environment actually provides one.
- Do not claim `--backend` is mandatory.
- Do not claim Claude permission prompts are enabled by default.

## Environment Variables

- `CODEAGENT_BACKEND`: default backend override
- `CODEAGENT_AGENT`: default agent preset
- `CODEAGENT_REASONING_EFFORT`: reasoning effort override
- `CODEAGENT_SKIP_PERMISSIONS`: Claude permission control, default effectively `true`; set `false` to re-enable prompts
- `CODEAGENT_MAX_PARALLEL_WORKERS`: limit worker count in parallel mode
- `CODEAGENT_FULL_OUTPUT`: request full parallel output
- `CODEX_TIMEOUT`: backend timeout; accepts seconds (e.g. `7200`) or milliseconds (values >10000 are auto-converted to seconds, e.g. `7200000`); default 7200s (2 hours)
- `CODEX_BYPASS_SANDBOX`: Codex sandbox bypass control, default effectively `true`; set `false` to disable

## Quick Decision Guide

- Use default invocation for most code tasks: `codeagent-wrapper "<task>"`
- Use `--backend claude` when you specifically want Claude behavior
- Use `--backend gemini` for Gemini
- Use `--backend opencode` for OpenCode
- Use `resume` when continuing an existing session
- Use `--parallel` when the work can be decomposed into dependency-linked tasks
- Use `--full-output` only for debugging, not as the default mode
