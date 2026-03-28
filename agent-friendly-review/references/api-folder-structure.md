# API Folder-Based Module Structure

Every API module in `src/api/` follows a folder-based structure. This document defines the conventions agents must follow when creating, modifying, or reviewing API modules.

## Folder Layout

```
src/api/<domain>/
  types.ts      # All TypeScript interfaces, type aliases, Zod schemas, constants
  client.ts     # Auth headers, base URLs, response envelope unwrapping
  parsers.ts    # Response-to-type parsing functions
  api.ts        # Exported async API functions (the public surface)
  index.ts      # Barrel re-exports from all sub-files
```

Larger modules may split `api.ts` by subdomain:

```
src/api/dorado/
  project/      # { types.ts, api.ts, index.ts }
  task/         # { types.ts, api.ts, index.ts }
  instance/     # { types.ts, api.ts, index.ts }
  mutation/     # { types.ts, api.ts, index.ts }

src/api/apm/
  byteheart.ts  # Byteheart-specific API functions
  argos.ts      # Argos-specific API functions

src/api/cache/
  service.ts    # Service CRUD functions
  cluster.ts    # Cluster operations (commands, slow logs)
  bigkey.ts     # Big key analysis
```

## File Responsibilities

### types.ts

- All exported interfaces and type aliases for the domain
- Zod schemas (if used for validation)
- Options interfaces for API functions (`*Options`)
- Result interfaces for collections (`*Result`)
- Constants (site configs, region maps, etc.)

```typescript
// types.ts
export interface DoradoProject { ... }
export interface ProjectListResult { projects: DoradoProject[]; total: number; }
export interface ListProjectsOptions { region: string; page?: number; pageSize?: number; }
```

### client.ts

- Auth header construction (renamed from private `getHeaders` to `get<Domain>Headers`)
- Base URL builders
- Response envelope unwrapping / error extraction
- Uses `import type { SSOClient }` when SSOClient is only a parameter type

```typescript
// client.ts
import type { SSOClient } from "@/auth/sso";

export async function getDoradoHeaders(region: DoradoRegion): Promise<Record<string, string>> { ... }
export function getDoradoApiBaseUrl(region: DoradoRegion): string { ... }
export function handleDoradoResponse(response: unknown, url: string): unknown { ... }
```

### parsers.ts

- Pure functions that transform raw API responses into typed structures
- Primitive helpers (`toNumber`, `toString`, `toBool`, etc.)
- All parse functions exported (even if only used internally)

```typescript
// parsers.ts
export function parseServiceDetail(value: unknown): CacheServiceDetail { ... }
export function parseClusterDetail(value: unknown): CacheClusterDetail { ... }
```

### api.ts

- Exported async functions that call HTTP endpoints
- Imports `SSOClient` as **value** (uses `new SSOClient()`)
- Uses helpers from `client.ts` and `parsers.ts`
- Follows naming conventions from [api-interface-patterns.md](api-interface-patterns.md)

```typescript
// api.ts
import { SSOClient } from "@/auth/sso";
import { getDoradoHeaders, handleDoradoResponse } from "./client";
import type { ListProjectsOptions, ProjectListResult } from "./types";

export async function listProjects(options: ListProjectsOptions): Promise<ProjectListResult> { ... }
```

### index.ts

- Barrel file that re-exports everything
- Module-level JSDoc comment listing all exported functions
- Uses `export *` from each sub-file (or explicit named exports)

```typescript
/**
 * Cache API - Redis/Abase cache service management
 * @module cache
 *
 * Service: listServices, getService, listServiceWorkflows, listServiceTickets
 * Cluster: getCluster, listCommands, executeCommand, startSlowLog, getSlowLog
 * Big Keys: listBigKeys
 */
export * from "./types";
export { getHeaders, cacheBaseUrl, unwrapResponse } from "./client";
export * from "./parsers";
export * from "./service";
export * from "./cluster";
export * from "./bigkey";
```

## Barrel Export (api/index.ts)

All API modules are re-exported through `src/api/index.ts` using the **mutable export pattern**:

```typescript
import * as _dorado from "@/api/dorado";
export const dorado: typeof _dorado & Record<string, unknown> = { ..._dorado };
```

This spread-copy creates a plain object with writable properties, enabling test mocking via `api.dorado.getTask = mockFn`. The `& Record<string, unknown>` annotation allows dynamic property assignment in tests.

**Why not `export * as dorado`?** TypeScript's CJS compilation of `export *` creates getter-only properties via `__createBinding`, making them non-writable. Tests that stub `api.dorado.someFunction = mock` would fail with "Cannot set property which has only a getter".

## Import Patterns

### In handlers/services (runtime code)

```typescript
// Function calls — use the barrel
import * as api from "@/api";
await api.dorado.listProjects({ region: "cn", page: 1 });

// Type references — import directly from the module
import type { DoradoProject, ProjectListResult } from "@/api/dorado";
function renderProject(project: DoradoProject): void { ... }
```

**Why?** The barrel's `export const dorado = { ..._dorado }` is a value export, not a namespace. TypeScript cannot resolve `api.dorado.DoradoProject` as a type through a value export. Direct type imports from `@/api/dorado` resolve correctly.

### In tests

```typescript
// Mock through the barrel (writable properties)
const api = require("@/api/index");
api.dorado.listProjects = async () => ({ projects: [], total: 0 });

// Import module directly for API-level tests
const dorado = require("@/api/dorado");
```

**Never use `.ts` extension** in require paths — `require("@/api/dorado")` resolves to the folder's `index.ts`.

## Checklist for New API Modules

- [ ] Create folder: `src/api/<domain>/`
- [ ] Split into: `types.ts`, `client.ts`, `parsers.ts`, `api.ts`, `index.ts`
- [ ] Rename private `getHeaders` → `get<Domain>Headers` (exported)
- [ ] Use `import type` for type-only imports (lint rule: `@typescript-eslint/consistent-type-imports`)
- [ ] Use `import type { SSOClient }` in `client.ts`; value import in `api.ts`
- [ ] Export all functions from `parsers.ts` and `client.ts`
- [ ] Add mutable export in `api/index.ts`
- [ ] Fix `api.<domain>.TypeName` refs in handlers/services → direct `import type` from `@/api/<domain>`
- [ ] Verify: `npm run build`, `npm run lint`, API tests pass
- [ ] No stub `.ts` file needed — folder resolution handles `@/api/<domain>` automatically

## Checklist for Modifying Existing Modules

- [ ] Add new types to `types.ts`
- [ ] Add new parse functions to `parsers.ts`
- [ ] Add new API functions to `api.ts` (or domain-specific file)
- [ ] Re-export new additions from `index.ts` (if using explicit exports)
- [ ] Keep function signatures agent-friendly (see [api-interface-patterns.md](api-interface-patterns.md))
