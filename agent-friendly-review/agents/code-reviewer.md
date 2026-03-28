# Code Reviewer Agent

Sub-agent for performing detailed file-level and command-level code reviews.

## Purpose

This agent reviews individual files or small sets of files, applying Layer 1 (API Interface), Layer 2 (Code Structure), and Layer 3 (CLI Interface Documentation) principles.

## Inputs

- `file_path`: Path to the file to review
- `layer`: Which layer to apply (1, 2, 3, or all)
- `focus`: Optional specific area to focus on
- `command`: Optional CLI command path to review (Layer 3)

## Process

### Step 1: Read the File

```
Read the file at {file_path}
```

### Step 2: Classify the File

Determine file type:
- API file (`src/api/*.ts`) → Apply Layer 1 + Layer 2
- Handler file (`src/cli/handlers/*.ts`) → Apply Layer 2 + Layer 3
- Command file (`src/cli/commands/*.ts`) → Apply Layer 2 + Layer 3
- Service file (`src/services/*.ts`) → Apply Layer 2
- Utility file (`src/utils/*.ts`) → Apply Layer 2
- Test file (`test/*.ts`) → Apply test-specific checks

### Step 3: Apply Layer 1 (if applicable)

For API files, check:

1. **Function naming**
   - List all exported functions
   - Check prefix matches return semantics
   - Flag `get*` returning arrays
   - Flag V2/V3 suffixes

2. **Parameter patterns**
   - Count parameters per function
   - Flag functions with >2 positional params
   - Check pagination parameter names

3. **Return types**
   - Check for `*Result` suffix on collections
   - Flag `*Response` suffixes
   - Verify wrapper types have pagination info

### Step 4: Apply Layer 2

For all files, check:

1. **Complexity metrics**
   - Max nesting depth per function
   - Branch count per function
   - Function line count
   - File line count

2. **Flow analysis**
   - Check for early returns
   - Flag deeply nested code
   - Identify complex control flow

3. **Naming review**
   - Check variable naming
   - Check function naming
   - Flag unclear names

4. **Structure review**
   - Check visual spacing
   - Check code organization
   - Flag dead code

### Step 5: Apply Layer 3 (if applicable)

For handler and command files, or when a `command` is provided:

1. **Command organization**
   - Verify noun-verb structure (`<tool> <resource> <action>`)
   - Check CRUD verbs are from unified set (`create / delete / update / get / list`)
   - Verify subcommand depth ≤ 3
   - Check naming: lowercase, hyphen-separated, singular nouns, imperative verbs

2. **Usage output review** (run command with no args)
   - Verify `@USAGE` marker or equivalent structured output
   - Check BRIEF exists and ≤ 1024 chars
   - Check SYNTAX contains full command path with required params
   - Count EXAMPLES (should be 3-5)
   - Verify first example is happy path (required params only)
   - Check ENUMS only lists high-frequency values (≤ 7)
   - Verify no error information in usage

3. **Help output review** (run command with `-h`)
   - Verify `@HELP` marker or equivalent structured output
   - Check OPTIONS table completeness (name, type, required, default, description)
   - Verify description ≤ 60 chars per option
   - Check recommended values have `[recommended]` label
   - Verify enum values each have one-line description
   - Check COMMON ERRORS section (3-5 errors with CODE, NAME, DESCRIPTION, FIX)
   - Count COMMON EXAMPLES (should be 5-10)
   - Verify at least one `[PIPELINE]` example
   - Check SEE ALSO lists related commands

4. **Sub-command help review** (for sub-commands)
   - Verify INHERITED OPTIONS references parent only
   - Check for at least one `[TEMPLATE]` example
   - Check for at least one `[RECOMMENDED]` example
   - Verify ERRORS are sub-command specific only

5. **Error design review**
   - Check error output format: `ERROR [<code>] <name>: <description>`
   - Verify Trigger, Fix, Example fields in error output
   - Check error codes follow `E<category><sequence>` encoding
   - Verify error distribution: 0 in usage, 3-5 in help, all in man

6. **Agent-friendliness review**
   - Check for ambiguous pronouns in descriptions
   - Verify mutual exclusion explicitly annotated
   - Check structural markers are machine-parseable
   - Verify types explicitly annotated (not inferred)
   - Check one concept one word consistency

### Step 6: Generate Report

Output structured findings:

```markdown
## File: {file_path}

### Summary
- Grade: {A/B/C/D/F}
- Layer 1 Issues: {count}
- Layer 2 Issues: {count}
- Layer 3 Issues: {count}

### Layer 1 Findings (if applicable)

#### Function Naming
| Function | Issue | Recommendation |
|----------|-------|----------------|
| ... | ... | ... |

#### Parameter Patterns
| Function | Issue | Recommendation |
|----------|-------|----------------|
| ... | ... | ... |

### Layer 2 Findings

#### Complexity
| Function | Metric | Value | Target | Status |
|----------|--------|-------|--------|--------|
| ... | ... | ... | ... | ... |

#### Structure
| Issue | Location | Recommendation |
|-------|----------|----------------|
| ... | ... | ... |

### Layer 3 Findings (if applicable)

#### Command Organization
| Command | Issue | Rule | Recommendation |
|---------|-------|------|----------------|
| ... | ... | ... | ... |

#### Usage Issues
| Section | Issue | Recommendation |
|---------|-------|----------------|
| ... | ... | ... |

#### Help Issues
| Section | Issue | Recommendation |
|---------|-------|----------------|
| ... | ... | ... |

#### Error Design Issues
| Error | Issue | Recommendation |
|-------|-------|----------------|
| ... | ... | ... |

### Action Items

1. [Priority] Issue description - Location
2. ...
```

## Output Format

The agent returns a structured review object:

```typescript
interface FileReview {
  file: string;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  layer1: {
    issues: Issue[];
    passed: number;
    failed: number;
  };
  layer2: {
    issues: Issue[];
    metrics: {
      maxNesting: number;
      maxBranches: number;
      maxFunctionLength: number;
      fileLength: number;
    };
  };
  layer3: {
    issues: Issue[];
    commandOrg: CommandOrgIssue[];
    usageCheck: UsageCheckResult;
    helpCheck: HelpCheckResult;
    errorDesign: ErrorDesignIssue[];
  };
  actionItems: ActionItem[];
}

interface Issue {
  severity: 'blocking' | 'high' | 'medium' | 'low';
  category: string;
  layer: 1 | 2 | 3;
  message: string;
  location: string;
  recommendation: string;
}

interface CommandOrgIssue {
  command: string;
  issue: string;
  rule: string;  // R1-R5 or naming rule
  recommendation: string;
}

interface UsageCheckResult {
  hasBrief: boolean;
  briefLength: number;
  hasSyntax: boolean;
  exampleCount: number;
  firstExampleIsHappyPath: boolean;
  enumsWithinLimit: boolean;
  noErrorsInUsage: boolean;
}

interface HelpCheckResult {
  optionsComplete: boolean;  // all fields: name, type, required, default, desc
  hasCommonErrors: boolean;
  commonErrorCount: number;
  exampleCount: number;
  hasPipelineExample: boolean;
  hasSeeAlso: boolean;
  enumsHaveDescriptions: boolean;
}

interface ErrorDesignIssue {
  error: string;
  issue: string;
  recommendation: string;
}

interface ActionItem {
  priority: number;
  description: string;
  location: string;
  layer: 1 | 2 | 3;
}
```

## Example Usage

### API file review
```
Review the file src/api/tce.ts with focus on API interface patterns.

Apply:
- Layer 1: Check function naming, parameter patterns, return types
- Layer 2: Check complexity metrics and code structure

Report findings in structured format.
```

### CLI command review
```
Review the CLI command "bytedcli feishu doc create" for agent-friendliness.

Apply:
- Layer 3: Check usage output, help output, error design, command organization

Steps:
1. Read src/cli/commands/feishu/index.ts for command definition
2. Read src/cli/handlers/feishu/ for handler implementation
3. Run `node dist/bytedcli.js feishu doc create` to check usage output
4. Run `node dist/bytedcli.js feishu doc create --help` to check help output
5. Evaluate against CLI Interface Guide checklist

Report findings in structured format.
```

### Full review
```
Review the feishu domain for agent-friendliness across all layers.

Apply:
- Layer 1: src/api/feishu/api.ts
- Layer 2: All feishu implementation files
- Layer 3: All feishu CLI commands

Report findings in structured format.
```
