# API Interface Patterns

This document defines the conventions for agent-friendly API design. APIs following these patterns are easier for LLM agents to understand and call correctly.

## 1. Function Naming Conventions

### 1.1 Prefix Semantics

| Prefix | Semantics | Input | Returns | Example |
|--------|-----------|-------|---------|---------|
| `get*` | Fetch single item by ID | identifier | `T \| null` | `getUser(id)` |
| `list*` | Fetch collection/paginated | options | `*Result` | `listUsers(options)` |
| `search*` | Query with filters | query object | `*Result` | `searchUsers(query)` |
| `create*` | Create new resource | data object | `T` | `createUser(data)` |
| `update*` | Modify existing resource | id + data | `T` | `updateUser(id, data)` |
| `delete*` | Remove resource | identifier | `void` | `deleteUser(id)` |
| `set*` | Write/replace value | key + value | `void` | `setConfig(key, value)` |
| `check*` | Validate/verify | condition | `boolean` | `checkPermission(user, action)` |
| `ensure*` | Create if not exists | data | `T` | `ensureDirectory(path)` |
| `run*` | Execute operation | params | varies | `runMigration()` |
| `cancel*` | Abort operation | identifier | `void` | `cancelDeployment(id)` |

### 1.2 Naming Rules

**DO:**
- Use verb+noun format: `listUsers`, `getConfig`, `createTicket`
- Use consistent vocabulary across the codebase
- Match prefix to return type semantics

**DON'T:**
- Use `get*` for functions returning arrays (use `list*`)
- Use ambiguous names like `fetchData`, `handle`, `process`
- Add version suffixes like `V2` (use deprecation instead)

### 1.3 Examples

```typescript
// GOOD: Clear semantics from name
async function getUser(id: number): Promise<User | null>
async function listUsers(options: ListUsersOptions): Promise<UserListResult>
async function searchUsers(query: UserSearchQuery): Promise<UserSearchResult>
async function createUser(data: CreateUserData): Promise<User>
async function updateUser(id: number, data: UpdateUserData): Promise<User>
async function deleteUser(id: number): Promise<void>

// BAD: Ambiguous semantics
async function fetchUsers(): Promise<User[]>  // Should be listUsers
async function getUserList(): Promise<User[]>  // Confusing get* with list
async function getUsers(): Promise<User[]>  // get* should return single item
```

## 2. Parameter Patterns

### 2.1 When to Use Options Objects

| Condition | Use Options Object |
|-----------|-------------------|
| >2 parameters | Yes |
| Any optional parameters | Yes |
| Pagination parameters | Yes |
| Filter/query parameters | Yes |
| 1-2 required parameters only | No (use positional) |

### 2.2 Options Object Pattern

```typescript
// GOOD: Options object for complex parameters
interface ListServicesOptions {
  search?: string;
  subscriber?: string;
  env?: string;
  page?: number;
  pageSize?: number;
}

async function listServices(options: ListServicesOptions): Promise<ServiceListResult>

// GOOD: Positional for simple required params
async function getService(serviceId: number): Promise<Service>

// BAD: Too many positional parameters
async function listServices(
  search: string | null,
  subscriber: string | null,
  env: string | null,
  pageNum: number,
  pageSize: number
): Promise<ServiceListResult>
```

### 2.3 Pagination Parameters

Standard pagination parameters:

```typescript
interface PaginationOptions {
  page: number;      // 1-indexed page number
  pageSize: number;  // Items per page
}
```

**Naming consistency:**
- Use `page` (not `pageNum`, `pn`, `no`)
- Use `pageSize` (not `size`, `rn`, `limit`)

### 2.4 Common Options Patterns

```typescript
// List operation with pagination and filters
interface ListOptions<TFilter = unknown> {
  page?: number;
  pageSize?: number;
  filter?: TFilter;
  sort?: SortOptions;
}

// Search operation
interface SearchOptions {
  query: string;
  page?: number;
  pageSize?: number;
  filters?: Record<string, unknown>;
}

// Get operation with optional includes
interface GetOptions {
  include?: string[];
  fields?: string[];
}
```

## 3. Return Type Patterns

### 3.1 Result Wrapper Types

For paginated/list results, use `*Result` suffix:

```typescript
// GOOD: Wrapper with metadata
interface UserListResult {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  hasMore?: boolean;
}

// BAD: Raw array (no pagination info)
type UserListResult = User[];

// BAD: Using *Response suffix
interface UserListResponse {  // Should be UserListResult
  users: User[];
  total: number;
}
```

### 3.2 Suffix Conventions

| Suffix | Usage | Example |
|--------|-------|---------|
| `*Result` | Paginated/list results | `ServiceListResult` |
| `*Options` | Function input options | `ListServicesOptions` |
| `*Query` | Search/filter query | `ServiceSearchQuery` |
| `*Data` | Create/update payload | `CreateServiceData` |
| `*Detail` | Extended single item | `ServiceDetail` |

**Avoid these suffixes for API returns:**
- `*Response` (too HTTP-specific)
- `*List` (ambiguous with arrays)
- `*Info` (too generic)

### 3.3 Generic Result Pattern

```typescript
// Generic paginated result
interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Usage
type UserListResult = PaginatedResult<User>;
type ServiceListResult = PaginatedResult<Service>;
```

## 4. Agent-Friendly Design Principles

### 4.1 Predictable Naming

LLMs parse function names to understand intent. Consistent naming helps:

```typescript
// Agent can infer: "To get a list of services, I should call listServices"
// Agent can infer: "listServices returns a result object with pagination"
async function listServices(options: ListServicesOptions): Promise<ServiceListResult>
```

### 4.2 Explicit Types

Clear input/output contracts reduce ambiguity:

```typescript
// GOOD: Explicit interface
interface CreateServiceOptions {
  name: string;
  env: string;
  tags?: string[];
}

// BAD: Generic object
function createService(options: Record<string, unknown>)
```

### 4.3 Single Responsibility

Each function should do one thing:

```typescript
// GOOD: Separate concerns
async function getService(id: number): Promise<Service>
async function getServiceWithClusters(id: number): Promise<ServiceWithClusters>

// BAD: Mixed concerns
async function getService(id: number, includeClusters?: boolean): Promise<Service | ServiceWithClusters>
```

### 4.4 Error Handling

Consistent error types:

```typescript
// GOOD: Structured errors
class ApiError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: unknown
  ) {
    super(message);
  }
}

// Usage
throw new ApiError("Service not found", "SERVICE_NOT_FOUND", { serviceId });
```

## 5. Migration Guide

### 5.1 Renaming Functions

When renaming functions:

1. Add new function with correct name
2. Add `@deprecated` to old function
3. Make old function call new function
4. Update all call sites
5. Remove deprecated function in next major version

```typescript
/**
 * @deprecated Use listPipelineRuns instead
 */
export async function getPipelineRuns(pipelineId: number) {
  return listPipelineRuns(pipelineId);
}

export async function listPipelineRuns(pipelineId: number) {
  // Implementation
}
```

### 5.2 Adding Options Object

When adding options object overload:

```typescript
// Before: positional params
export async function listServices(
  search: string | null,
  page: number,
  pageSize: number
): Promise<ServiceListResult>

// After: options object (backward compatible)
export interface ListServicesOptions {
  search?: string;
  page?: number;
  pageSize?: number;
}

export async function listServices(
  options: ListServicesOptions
): Promise<ServiceListResult>;

// Keep old signature for backward compatibility
export async function listServices(
  searchOrOptions: string | null | ListServicesOptions,
  page?: number,
  pageSize?: number
): Promise<ServiceListResult> {
  // Handle both signatures
  const opts = typeof searchOrOptions === 'object' && searchOrOptions !== null
    ? searchOrOptions
    : { search: searchOrOptions ?? undefined, page, pageSize };
  // Implementation
}
```

## 6. Checklist

Before committing API changes, verify:

- [ ] Function name matches prefix semantics (get/list/search/create/update/delete)
- [ ] get* returns single item, list* returns collection
- [ ] >2 params use options object
- [ ] Pagination uses `page` and `pageSize`
- [ ] Return types use `*Result` suffix for collections
- [ ] No `*Response` suffix on return types
- [ ] Deprecated functions have `@deprecated` annotation
- [ ] No V2 suffix on function names
