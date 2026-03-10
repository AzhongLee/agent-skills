# Hive (DataLeap Data Catalog) CLI Reference

The Hive CLI provides commands to search and explore data assets in the DataLeap data catalog, including Hive, Clickhouse, and Doris databases and tables.

## Commands

### search

Search for databases and tables in DataLeap.

```bash
bytedcli hive search [options]
```

**Options:**
- `--query <query>` - Search query (required)
- `-t, --type <type>` - Asset type: HiveDB, HiveTable, ClickhouseDB, ClickhouseTable, DorisTable, DataTopics (default: "HiveDB")
- `-r, --region <region>` - Region: cn, sg, gcp (default: "cn")
- `-p, --page <page>` - Page number (default: 1)
- `--size <size>` - Page size (default: 20)

**Examples:**
```bash
# Search for Hive databases
bytedcli hive search --query "privacy" --type HiveDB --region gcp

# Search for Hive tables with pagination
bytedcli hive search --query "user" --type HiveTable --region cn --page 1 --size 50

# Search for Clickhouse tables
bytedcli hive search --query "events" --type ClickhouseTable --region sg
```

**Output:**
- Name, Type, Description, Owner, Environment, Location
- For table searches: preview of columns for first matching table

---

### detail

Get detailed database or table information including full schema.

```bash
bytedcli hive detail [database] [table] [options]
```

**Arguments:**
- `database` - Database name (required)
- `table` - Table name (optional, omit for database details)

**Options:**
- `-r, --region <region>` - Region: cn, sg, gcp (default: "cn")
- `-t, --type <type>` - Asset type (HiveDB, HiveTable, ClickhouseDB, etc.)

**Examples:**
```bash
# Get database details
bytedcli hive detail my_database --region gcp

# Get table details with full schema
bytedcli hive detail my_database my_table --region gcp

# Get Clickhouse database details
bytedcli hive detail clickhouse_db --type ClickhouseDB --region cn
```

**Output:**
- GUID, Type, Name, Qualified Name, Description
- Parent DB, DB Type, Environment, Location
- Table Type, Latest Partition (for tables)
- **Columns**: Name, Type, Comment (for tables)
- **Partition Keys**: Name, Type, Comment (for tables)

---

### get

Get entity details by GUID with full schema information.

```bash
bytedcli hive get [guid] [options]
```

**Arguments:**
- `guid` - Entity GUID from search results (required)

**Options:**
- `-r, --region <region>` - Region: cn, sg, gcp (default: "cn")

**Examples:**
```bash
# Get table details by GUID
bytedcli hive get d57dbbcc-bf37-497c-9d2d-63b71b68a91e --region gcp

# Get database details by GUID
bytedcli hive get 42a2ae28-1d37-44fe-8cab-dc910b73361e --region gcp
```

**Output:**
Same as `detail` command - includes full schema with columns and partition keys.

---

### lineage

Get entity lineage showing upstream and downstream data dependencies.

```bash
bytedcli hive lineage [guid] [options]
```

**Arguments:**
- `guid` - Entity GUID (required)

**Options:**
- `-r, --region <region>` - Region: cn, sg, gcp (default: "cn")
- `-d, --depth <depth>` - Lineage depth (default: 3)

**Examples:**
```bash
# Get lineage with default depth
bytedcli hive lineage d57dbbcc-bf37-497c-9d2d-63b71b68a91e --region gcp

# Get deeper lineage
bytedcli hive lineage d57dbbcc-bf37-497c-9d2d-63b71b68a91e --region gcp --depth 5
```

**Output:**
- Base entity GUIDs
- Related entities (Type, Name, GUID)
- Relations (From -> To)

---

## Asset Types

| Type | Description |
|------|-------------|
| `HiveDB` | Hive database |
| `HiveTable` | Hive table |
| `ClickhouseDB` | Clickhouse database |
| `ClickhouseTable` | Clickhouse table |
| `DorisTable` | Doris table |
| `DataTopics` | Data topics |

## Regions

| Region | Aliases | CID | Endpoint |
|--------|---------|-----|----------|
| `cn` | china | 0 | data.bytedance.net |
| `sg` | singapore, row | 6 | dataleap-sg.tiktok-row.net |
| `gcp` | eu, texas | 31 | dataleap-gp-ttp-eu.tiktok-eu.net |

## Qualified Name Format

The qualified name uniquely identifies an asset:

- **Database**: `{Type}:///{database}@{cid}`
  - Example: `HiveDB:///my_database@0`
- **Table**: `{Type}:///{database}/{table}@{cid}`
  - Example: `HiveTable:///my_database/my_table@31`

## Common Column Types

| Type | Description |
|------|-------------|
| `string` | String/text data |
| `bigint` | 64-bit integer |
| `int` | 32-bit integer |
| `tinyint` | 8-bit integer |
| `boolean` | True/false |
| `double` | Double precision float |
| `date` | Date without time |
| `timestamp` | Date with time |
| `array<T>` | Array of type T |
| `map<K,V>` | Map with key K and value V |

## Authentication

The CLI uses JWT authentication via SSO. Ensure you are logged in:

```bash
bytedcli auth login
```

## JSON Output

Use `--json` flag for structured output:

```bash
bytedcli --json hive search --query "test" --type HiveTable --region cn
```

Output structure:
```json
{
  "status": "success",
  "data": {
    "entities": [...],
    "total": 100,
    "page": 1,
    "page_size": 20
  },
  "context": {
    "execution_time_ms": 500,
    "timestamp": "2026-03-05T10:00:00.000Z"
  }
}
```
