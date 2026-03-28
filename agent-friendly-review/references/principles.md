# Agent-First Code Principles

Code designed for LLM agent comprehension and modification. These principles reduce cognitive load, improve pattern recognition, and enable autonomous operation.

## Core Principles

### 1. Minimize Nesting

**Target:** ≤ 3 levels of indentation

Deep nesting forces agents to track multiple contexts simultaneously, increasing error rates.

```typescript
// BAD: 5 levels deep
function process(items) {
  if (items) {
    for (const item of items) {
      if (item.valid) {
        for (const prop of item.props) {
          if (prop.enabled) {
            // Hard to track context
          }
        }
      }
    }
  }
}

// GOOD: Flat structure
function process(items) {
  if (!items) return;

  for (const item of items) {
    processItem(item);
  }
}

function processItem(item) {
  if (!item.valid) return;

  for (const prop of item.props) {
    if (prop.enabled) {
      processProp(prop);
    }
  }
}
```

### 2. Reduce Branches

**Target:** ≤ 5 conditional branches per function

Complex branching creates exponential path combinations that overwhelm context.

```typescript
// BAD: Too many branches
function getStatus(user, order, payment) {
  if (!user) return 'no_user';
  if (!order) return 'no_order';
  if (!payment) return 'no_payment';
  if (user.banned) return 'banned';
  if (order.cancelled) return 'cancelled';
  if (payment.failed) return 'payment_failed';
  if (payment.pending) return 'payment_pending';
  if (order.shipped) return 'shipped';
  return 'processing';
}

// GOOD: Strategy pattern
const statusChecks = [
  { check: (ctx) => !ctx.user, status: 'no_user' },
  { check: (ctx) => !ctx.order, status: 'no_order' },
  { check: (ctx) => ctx.user.banned, status: 'banned' },
  // ...
];

function getStatus(user, order, payment) {
  const ctx = { user, order, payment };
  for (const { check, status } of statusChecks) {
    if (check(ctx)) return status;
  }
  return 'processing';
}
```

### 3. Linear Flow

**Guideline:** Early returns, guard clauses, no goto

Linear code is predictable. Agents can follow execution path without backtracking.

```typescript
// BAD: Non-linear flow
function validate(data) {
  let result = { valid: true, errors: [] };

  if (data.name) {
    if (data.name.length > 100) {
      result.valid = false;
      result.errors.push('name too long');
    }
  } else {
    result.valid = false;
    result.errors.push('name required');
  }

  return result;
}

// GOOD: Linear with early returns
function validate(data) {
  const errors = [];

  if (!data.name) {
    errors.push('name required');
  } else if (data.name.length > 100) {
    errors.push('name too long');
  }

  return { valid: errors.length === 0, errors };
}
```

### 4. Explicit Dependencies

**Guideline:** No globals, no magic, no implicit state

Every dependency should be visible at the call site.

```typescript
// BAD: Hidden dependencies
let config;  // Global state
function initConfig() { config = loadConfig(); }
function getTimeout() { return config.timeout; }

// GOOD: Explicit dependencies
interface Config {
  timeout: number;
}

function getTimeout(config: Config): number {
  return config.timeout;
}

// Even better: Dependency injection
class TimeoutService {
  constructor(private config: Config) {}

  getTimeout(): number {
    return this.config.timeout;
  }
}
```

### 5. Consistent Patterns

**Guideline:** One way per problem throughout the codebase

Pattern consistency enables agents to apply learned solutions.

```typescript
// BAD: Inconsistent error handling
function a() {
  try { ... } catch (e) { throw e; }
}
function b() {
  return { error: null, data: result };
}
function c() {
  if (failed) return null;
}

// GOOD: Consistent error handling
function a() {
  if (failed) throw new AppError('message', { code: 'CODE' });
}
function b() {
  if (failed) throw new AppError('message', { code: 'CODE' });
}
function c() {
  if (failed) throw new AppError('message', { code: 'CODE' });
}
```

### 6. Self-Documenting Names

**Guideline:** Verb+noun format, domain vocabulary

Names should reveal intent without comments.

```typescript
// BAD: Unclear names
function proc(d) { ... }
function handleIt() { ... }
const x = getData();

// GOOD: Self-documenting
function processPayment(payment: Payment) { ... }
function validateUserCredentials(credentials: Credentials) { ... }
const userProfile = getUserProfile(userId);
```

### 7. Function Length

**Target:** ≤ 20 lines per function

Short functions have clear purpose and are easier to understand atomically.

```typescript
// BAD: Long function
function processOrder(order) {
  // 50+ lines of validation, transformation, API calls, etc.
}

// GOOD: Decomposed functions
function processOrder(order: Order): ProcessedOrder {
  validateOrder(order);
  const normalized = normalizeOrder(order);
  const enriched = enrichWithUserData(normalized);
  return submitOrder(enriched);
}
```

### 8. Avoid Premature Abstraction

**Guideline:** Wait for 3+ use cases before abstracting

Premature abstractions create wrong patterns that agents will replicate.

```typescript
// BAD: Premature abstraction (only 1 use case)
interface GenericHandler<T, R> {
  handle(input: T): R;
  validate(input: T): boolean;
  transform(input: T): T;
}

// GOOD: Concrete implementation first
function handlePayment(payment: Payment): PaymentResult {
  if (!validatePayment(payment)) {
    throw new ValidationError('Invalid payment');
  }
  return processPayment(payment);
}

// Abstract only when patterns emerge from 3+ similar implementations
```

### 9. Visual Spacing

**Guideline:** Blank lines between logical sections

Visual structure aids pattern recognition.

```typescript
// BAD: Dense code
function process(data) {
  const validated = validate(data);
  if (!validated) return null;
  const transformed = transform(data);
  const result = save(transformed);
  log('Saved:', result.id);
  notify(result);
  return result;
}

// GOOD: Visual sections
function process(data) {
  // Validation
  const validated = validate(data);
  if (!validated) return null;

  // Transformation
  const transformed = transform(data);

  // Persistence
  const result = save(transformed);

  // Side effects
  log('Saved:', result.id);
  notify(result);

  return result;
}
```

### 10. Tests Enable Autonomy

**Guideline:** Table-driven tests, fast feedback

Tests allow agents to verify changes independently.

```typescript
// GOOD: Table-driven tests
const testCases = [
  { input: '', expected: false, name: 'empty string' },
  { input: 'valid', expected: true, name: 'valid input' },
  { input: 'x'.repeat(101), expected: false, name: 'too long' },
];

describe('validate', () => {
  testCases.forEach(({ input, expected, name }) => {
    it(`should handle ${name}`, () => {
      expect(validate(input)).toBe(expected);
    });
  });
});
```

### 11. Small Diff Friendly

**Target:** ≤ 200 lines per change

Large changes are hard to review and increase error risk.

```typescript
// BAD: Single commit with 500+ line changes

// GOOD: Series of focused commits
// 1. Add new types (50 lines)
// 2. Implement core logic (100 lines)
// 3. Add tests (80 lines)
// 4. Update handlers (60 lines)
```

### 12. Context Co-location

**Guideline:** Group related code by domain

Related code in the same location reduces context switching.

```
// BAD: Technical grouping
src/
  controllers/
  services/
  models/
  utils/

// GOOD: Domain grouping
src/
  users/
    api.ts
    service.ts
    types.ts
  orders/
    api.ts
    service.ts
    types.ts
```

## Metrics Summary

| Principle | Metric | Target |
|-----------|--------|--------|
| Nesting | Max indentation | ≤ 3 levels |
| Branching | Conditions per function | ≤ 5 |
| Function length | Lines per function | ≤ 20 |
| Diff size | Lines per change | ≤ 200 |
| File length | Lines per file | ≤ 300 |
| Parameter count | Params per function | ≤ 3 (or use options) |

## Anti-Patterns to Avoid

1. **God functions** - Functions doing multiple unrelated things
2. **Hidden state** - Global variables, singletons with state
3. **Magic strings/numbers** - Unexplained literal values
4. **Implicit coupling** - Dependencies not visible at call site
5. **Inconsistent naming** - Same concept, different names
6. **Over-engineering** - Abstractions without multiple use cases
7. **Dense code** - No visual separation of concerns
8. **Long parameter lists** - More than 3 positional parameters
