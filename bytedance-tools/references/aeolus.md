# Aeolus CLI Reference

The Aeolus CLI provides commands to interact with the Aeolus BI/data analytics platform, including listing datasets, viewing field details, and executing SQL queries.

## Commands

### list-authorized

List dashboards and datasets you have access to.

```bash
bytedcli aeolus list-authorized [options]
```

**Options:**
- `-r, --region <region>` - Region: cn, sg, va (required)
- `-t, --type <type>` - Filter by type: dashboard, data_set
- `--limit <limit>` - Number of results (default: 20)
- `--offset <offset>` - Pagination offset (default: 0)

**Examples:**
```bash
# List all authorized resources (VA region)
bytedcli aeolus list-authorized -r va

# List only datasets (CN region)
bytedcli aeolus list-authorized -r cn --type data_set --limit 50

# Pagination (SG region)
bytedcli aeolus list-authorized -r sg --offset 20 --limit 20
```

**Output:**
- ID, Type, Name, Owner, App, Last Visit Time

---

### dataset-fields

Get dataset dimensions and metrics (field details).

```bash
bytedcli aeolus dataset-fields <datasetId> [options]
```

**Arguments:**
- `datasetId` - Dataset ID (from list-authorized output)

**Options:**
- `-r, --region <region>` - Region: cn, sg, va (required)
- `--json` is a global option and must appear before `aeolus`

**Examples:**
```bash
# Get dataset fields (VA region)
bytedcli aeolus dataset-fields -r va 1576311

# Get dataset fields (CN region, JSON output)
bytedcli --json aeolus dataset-fields -r cn 185503
```

**Output:**
- Dataset name
- **Dimensions**: ID, Name, Type, Partition flag, Description
- **Metrics**: ID, Name, Type, Expression, Description

---

### query

Execute SQL query against a dataset.

```bash
bytedcli aeolus query <datasetId> <sql> [options]
```

**Arguments:**
- `datasetId` - Dataset ID
- `sql` - SQL query string

**Options:**
- `-r, --region <region>` - Region: cn, sg, va (required)
- `--json` is a global option and must appear before `aeolus`
- `--version <version>` - API version (default: "v2")
- `--limit <limit>` - Limit rows in output (default: 100)

**Examples:**
```bash
# Simple query (VA region)
bytedcli aeolus query -r va 1576311 "SELECT \`[p_date]\`, \`[scene]\` FROM \`[DatasetName]\` WHERE \`[p_date]\` = '2026-03-01' LIMIT 5"

# Query with JSON output (SG region)
bytedcli --json aeolus query -r sg 1228178 "SELECT \`[是否需要拉闸]\` FROM \`[vdc纬度表]\` LIMIT 10"
```

**Output:**
- Column headers
- Data rows in table format

---

## SQL Syntax

Aeolus uses ClickHouse SQL syntax with special formatting requirements:

### Table Name Format

Use backticks wrapping brackets:
```sql
FROM `[Dataset Name]`
```

### Field Name Format

Use backticks wrapping brackets (same as table name):
```sql
SELECT `[field_name]`, `[another_field]`
```

### Partition Fields

If a dataset has partition fields (e.g., `p_date`), you **must** include them in the WHERE clause:
```sql
WHERE `[p_date]` = '2026-03-01'
```

### Complete Example

```sql
SELECT `[p_date]`, `[scene]`, `[count]`
FROM `[PL-分切面数据使用点绑定PA]`
WHERE `[p_date]` = '2026-03-01'
LIMIT 10
```

---

## Resource Types

| Type | Description |
|------|-------------|
| `dashboard` | Aeolus dashboard |
| `data_set` | Aeolus dataset |

## Regions

| Region | Description | Endpoint |
|--------|-------------|----------|
| `cn` | China | data.bytedance.net |
| `sg` | Singapore | aeolus-sg.bytedance.net |
| `va` | US East (Virginia) | aeolus-va.bytedance.net |

## Authentication

Aeolus uses ClientID/ClientSecret authentication.

### ClientID/ClientSecret

1. Visit the Aeolus Developer Console to get your credentials:
   - **CN**: https://data.bytedance.net/aeolus/pages/developer/console/certification
   - **SG**: https://aeolus-sg.bytedance.net/pages/developer/console/certification
   - **VA**: https://aeolus-va.bytedance.net/pages/developer/console/certification

2. Configure in `.aeolus.env` file (choose one location):
   - **Global**: `~/.bytedcli/.aeolus.env` (recommended for npm global install)
   - **Local**: `./.aeolus.env` in current working directory (overrides global)

```bash
# Region-specific credentials
BYTEDCLI_AEOLUS_CN_CLIENT_ID=your_cn_client_id
BYTEDCLI_AEOLUS_CN_CLIENT_SECRET=your_cn_client_secret
BYTEDCLI_AEOLUS_SG_CLIENT_ID=your_sg_client_id
BYTEDCLI_AEOLUS_SG_CLIENT_SECRET=your_sg_client_secret
BYTEDCLI_AEOLUS_VA_CLIENT_ID=your_va_client_id
BYTEDCLI_AEOLUS_VA_CLIENT_SECRET=your_va_client_secret
```

## JSON Output

Use `--json` flag for structured output:

```bash
bytedcli --json aeolus list-authorized -r va
```

Output structure:
```json
{
  "status": "success",
  "data": {
    "resources": [...],
    "total": 100,
    "region": "va"
  },
  "context": {
    "execution_time_ms": 500,
    "timestamp": "2026-03-10T10:00:00.000Z"
  }
}
```
