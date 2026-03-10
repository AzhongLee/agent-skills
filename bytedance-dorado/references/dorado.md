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

### get-task

Get Dorado task details including source/target info for DTS tasks and SQL code for hsql tasks.

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

**Output for hsql tasks:**
- SQL Code section with the query

---

### update-query

Update SQL query for an hsql task (saves as draft).

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

**Note:** This command only supports hsql task types. It will reject non-hsql tasks.

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

## Task Types

| Type | Description |
|------|-------------|
| `hsql` | Hive SQL task - runs SQL queries |
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
