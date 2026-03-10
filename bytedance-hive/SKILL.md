---
name: bytedance-hive
description: "Search and explore Hive/Clickhouse/Doris data assets via bytedcli: search databases and tables, get detailed schema information with columns, view entity lineage. Use when tasks mention Hive, DataLeap, data catalog, table schema, or data lineage."
---

# bytedcli Hive (DataLeap Data Catalog)

## When to use

- Search for Hive databases and tables in DataLeap
- Get detailed table/database information including schema and columns
- View data lineage relationships
- Explore Clickhouse and Doris data assets

## Supported Asset Types

| Type | Description |
|------|-------------|
| `HiveDB` | Hive databases |
| `HiveTable` | Hive tables |
| `ClickhouseDB` | Clickhouse databases |
| `ClickhouseTable` | Clickhouse tables |
| `DorisTable` | Doris tables |
| `DataTopics` | Data topics |

## Supported Regions

| Region | Description | Endpoint |
|--------|-------------|----------|
| `cn` | China (default) | data.bytedance.net |
| `sg` | Singapore ROW | dataleap-sg.tiktok-row.net |
| `gcp` / `eu` | EU Compliance2 | dataleap-gp-ttp-eu.tiktok-eu.net |

## Quick start

```bash
# Search for Hive databases
bytedcli hive search --query "my_database" --type HiveDB --region cn

# Search for Hive tables
bytedcli hive search --query "user" --type HiveTable --region gcp

# Get database details
bytedcli hive detail my_database --region cn

# Get table details with full schema (columns, types, comments)
bytedcli hive detail my_database my_table --region gcp

# Get entity details by GUID (from search results)
bytedcli hive get <guid> --region cn

# View data lineage
bytedcli hive lineage <guid> --region cn --depth 3
```

## Notes

- Use `--json` for structured JSON output
- Default region is `cn` if not specified
- Default asset type for search is `HiveDB`
- The `detail` and `get` commands show full schema including column names, types, and comments
- Lineage shows upstream and downstream data dependencies

## References

- `references/hive.md`
- `references/invocation.md`
