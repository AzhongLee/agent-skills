# Dorado (DataLeap) CLI Reference

Dorado is part of the DataLeap platform for data pipeline orchestration. This CLI provides commands to manage batch tasks, view instances, and update SQL queries.

## Commands

### list-projects

List Dorado projects accessible to the user.

```bash
bytedcli dorado list-projects [options]
```

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")
- `-p, --page <page>` - Page number (default: 1)
- `--size <size>` - Page size (default: 50)

**Example:**
```bash
bytedcli dorado list-projects --region boei18n
```

---

### list-tasks

List Dorado batch tasks.

```bash
bytedcli dorado list-tasks [options]
```

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")
- `--project-id <projectId>` - Filter by project ID
- `--task-id <taskId>` - Filter by task ID
- `--task-name <taskName>` - Filter by task name
- `--owner <owner>` - Filter by owner
- `-p, --page <page>` - Page number (default: 1)
- `--size <size>` - Page size (default: 20)

**Example:**
```bash
bytedcli dorado list-tasks --region boei18n --project-id 458 --owner yushuo.lin
```

---

### search-tasks

Search Dorado tasks with status and folder filtering.

```bash
bytedcli dorado search-tasks [options]
```

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")
- `--project-id <projectId>` - Filter by project ID (required)
- `--folder-id <folderId>` - Filter by folder ID (required by API)
- `--status <status>` - Filter by status (e.g. "init", "runnable", "closed"), comma-separated
- `--keyword <keyword>` - Filter by keyword in task name
- `-p, --page <page>` - Page number (default: 1)
- `--size <size>` - Page size (default: 20)

**Example:**
```bash
# Search for tasks in 'init' status in a specific folder
bytedcli dorado search-tasks --region boei18n --project-id 458 --folder-id 123456 --status "init"

# Search with multiple statuses and keyword
bytedcli dorado search-tasks --region boei18n --project-id 458 --folder-id 123456 --status "runnable,closed" --keyword "daily_report"
```

---

### get-task

Get Dorado task details including dependency task IDs, source/target info for DTS tasks, and SQL code for hsql tasks.

```bash
bytedcli dorado get-task [taskId] [options]
```

**Arguments:**
- `taskId` - Task ID (required)

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")

**Example:**
```bash
bytedcli dorado get-task 100274211 --region boei18n
```

**Output for DTS tasks:**
- Source Type, Source DB, Source Table, Source Region
- Target Type, Target DB, Target Table, Target Region

**Output for tasks with dependencies:**
- Dependency Task IDs

**Output for hsql tasks:**
- SQL Code section with the query

---

### update-query

Update SQL query for a task (hsql/fsql/stream_sql, saves as draft).

```bash
bytedcli dorado update-query [taskId] [options]
```

**Arguments:**
- `taskId` - Task ID (required)

**Options:**
- `-q, --query <query>` - New SQL query (required)
- `-r, --region <region>` - Dorado region (default: "cn")

**Example:**
```bash
bytedcli dorado update-query 100274211 --query "SELECT * FROM users WHERE active = 1" --region boei18n
```

**Note:** This command supports hsql, fsql, and stream_sql task types. It will reject unsupported task types.

---

### diff-query

Compare SQL between two versions of a task.

```bash
bytedcli dorado diff-query [taskId] [options]
```

**Arguments:**
- `taskId` - Task ID (required)

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")
- `--from <version>` - Source version number (default: latest published)
- `--to <version>` - Target version number, -1 for draft (default: -1 = draft)

**Examples:**
```bash
# Compare latest published version vs draft (default)
bytedcli dorado diff-query 100274211 --region boei18n

# Compare two specific versions
bytedcli dorado diff-query 100274211 --from 5 --to 6 --region boei18n

# Compare a specific version vs draft
bytedcli dorado diff-query 100274211 --from 5 --region boei18n
```

**Output:** Unified diff of SQL code between the two versions. With `--json`, returns structured object including `from_sql`, `to_sql`, `has_diff`, and `diff` fields.

---

### list-versions

List version history for a task.

```bash
bytedcli dorado list-versions [taskId] [options]
```

**Arguments:**
- `taskId` - Task ID (required)

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")
- `-p, --page <page>` - Page number (default: 1)
- `--size <size>` - Page size (default: 20)
- `--include-draft` - Include latest draft in results (default: false)

**Example:**
```bash
bytedcli dorado list-versions 100052730 --region boei18n
```

---

### list-instances

List Dorado task instances.

```bash
bytedcli dorado list-instances [options]
```

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")
- `--project-id <projectId>` - Filter by project ID (required for listing)
- `--task-id <taskId>` - Filter by task ID
- `--status <status>` - Filter by status (running, success, failed, etc.)
- `--start-time <time>` - Filter by start time (ISO format)
- `--end-time <time>` - Filter by end time (ISO format)
- `-p, --page <page>` - Page number (default: 1)
- `--size <size>` - Page size (default: 20)

**Example:**
```bash
bytedcli dorado list-instances --region boei18n --project-id 458 --task-id 100052730
```

---

### get-instance

Get Dorado instance details.

```bash
bytedcli dorado get-instance [instanceId] [options]
```

**Arguments:**
- `instanceId` - Instance ID (required)

**Options:**
- `-r, --region <region>` - Dorado region (default: "cn")

**Example:**
```bash
bytedcli dorado get-instance 258345284 --region boei18n
```

---

### adhoc-exec

Execute an ad-hoc SQL query via the Dorado ad-hoc query API. Requires a pre-existing query task as the execution carrier — create one in Dorado (Project > Ad-hoc Query > New Query, 即"临时查询"), and it is recommended to switch the engine to Spark on the query page before saving. Then configure dc/cluster/queue, save the task, and pass its ID via `--task-id`. The task only needs to be created once; dc/cluster/queue are inherited from the saved configuration. bytedcli also auto-loads `DORADO_EXEC_TASK_ID` from `~/.bytedcli/.dorado.env` and the current directory's `./.dorado.env`, with the local project file taking precedence over the global file.

With `--wait`, polls until completion and fetches the result (first 10 rows previewed in text mode; full data in JSON mode). With `-o`, downloads the full result as CSV.

```bash
bytedcli dorado adhoc-exec [sql] [options]
```

**Arguments:**
- `sql` - SQL query (or provide via stdin)

**Options:**
- `--task-id <taskId>` - Ad-hoc query task ID (临时查询任务 ID), created in Dorado (Project > Ad-hoc Query > New Query). Only needs to be created once. Can also set via `DORADO_EXEC_TASK_ID`
- `--project-id <projectId>` - Project ID (auto-detected if omitted)
- `-r, --region <region>` - Dorado region (default: "cn")
- `--dc <dc>` - Data center
- `--cluster <cluster>` - Cluster
- `--queue <queue>` - Queue
- `--engine-type <type>` - Engine type (default: "auto")
- `--username <username>` - Owner username (defaults to task owner)
- `--date <date>` - Schedule date in YYYYMMDD format (defaults to yesterday)
- `-o, --output <path>` - Download result CSV to file
- `--no-wait` - Submit only, do not wait for completion
- `--timeout <seconds>` - Poll timeout in seconds (default: 600)

**Examples:**
```bash
# Execute and display results (default: waits for completion)
bytedcli dorado adhoc-exec "SELECT count(*) FROM db.table" --task-id 100274211 --region boei18n

# SQL from stdin
echo "SELECT * FROM db.table LIMIT 10" | bytedcli dorado adhoc-exec --task-id 100274211 --region boei18n

# Download full result as CSV
bytedcli dorado adhoc-exec "SELECT * FROM db.table LIMIT 10" --task-id 100274211 -o result.csv

# Async: submit only, get debugId for later status/result queries
bytedcli dorado adhoc-exec "复杂SQL" --task-id 100274211 --no-wait

# Using .dorado.env defaults (auto-loaded from ~/.bytedcli/.dorado.env or ./.dorado.env)
# DORADO_EXEC_TASK_ID=100274211
bytedcli dorado adhoc-exec "SELECT 1" --region boei18n

# JSON output (includes full result data)
bytedcli dorado adhoc-exec "SELECT * FROM db.table" --task-id 100274211 --json
```

---

### adhoc-get-status

Get ad-hoc execution status by debug ID. Use to check whether an async `adhoc-exec` has completed.

```bash
bytedcli dorado adhoc-get-status [options]
```

**Options:**
- `--debug-id <debugId>` - Debug ID (from `adhoc-exec` output)
- `--task-id <taskId>` - Task ID (or `DORADO_EXEC_TASK_ID`)
- `--project-id <projectId>` - Project ID (auto-detected if omitted)
- `-r, --region <region>` - Dorado region (default: "cn")

**Status values:** `pending`, `running`, `succeed`, `failed`, `aborted`

**Example:**
```bash
bytedcli dorado adhoc-get-status --debug-id 12977673 --task-id 119886373
```

---

### adhoc-get-result

Get ad-hoc execution result by debug ID. Displays as a table (text mode) or returns full data (JSON mode). Use `-o` to download as CSV.

```bash
bytedcli dorado adhoc-get-result [options]
```

**Options:**
- `--debug-id <debugId>` - Debug ID (from `adhoc-exec` output)
- `--task-id <taskId>` - Task ID (or `DORADO_EXEC_TASK_ID`)
- `--project-id <projectId>` - Project ID (auto-detected if omitted)
- `-r, --region <region>` - Dorado region (default: "cn")
- `-o, --output <path>` - Download result as CSV to file

**Examples:**
```bash
# Display result (first 10 rows in text mode)
bytedcli dorado adhoc-get-result --debug-id 12977673 --task-id 119886373 --region cn

# Download as CSV
bytedcli dorado adhoc-get-result --debug-id 12977673 --task-id 119886373 -o result.csv

# Full data in JSON
bytedcli dorado adhoc-get-result --debug-id 12977673 --task-id 119886373 --json
```

---

### adhoc-list-history

List ad-hoc execution history for a task.

```bash
bytedcli dorado adhoc-list-history [options]
```

**Options:**
- `--task-id <taskId>` - Task ID (or `DORADO_EXEC_TASK_ID`)
- `--project-id <projectId>` - Project ID (auto-detected if omitted)
- `-r, --region <region>` - Dorado region (default: "cn")
- `--page-num <page>` - Page number (default: 1)
- `--page-size <size>` - Page size (default: 20)
- `--only-mine` - Show only my executions

**Examples:**
```bash
# List ad-hoc history for a task
bytedcli dorado adhoc-list-history --task-id 119886373

# Show only my executions
bytedcli dorado adhoc-list-history --task-id 119886373 --only-mine

# JSON output
bytedcli dorado adhoc-list-history --task-id 119886373 --json
```

---

## Task Types

| Type | Description |
|------|-------------|
| `hsql` | Hive SQL task - runs SQL queries |
| `fsql` | Flink SQL task - runs streaming SQL queries |
| `stream_sql` | Stream SQL task - continuous streaming SQL processing |
| `mysql->hive` | DTS task - syncs data from MySQL to Hive |
| `hive->bmq` | DTS task - syncs data from Hive to BMQ |
| `common-dts-batch` | Generic DTS batch task |

## Instance Status

| Status | Description |
|--------|-------------|
| `pending` | Waiting to run |
| `running` | Currently executing |
| `success` | Completed successfully |
| `failed` | Failed execution |

## Authentication

The CLI uses JWT authentication via SSO. Ensure you are logged in:

```bash
bytedcli auth login
```
