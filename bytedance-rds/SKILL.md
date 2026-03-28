---
name: bytedance-rds
description: "Operate RDS via bytedcli: list starred DBs, search databases, list tables, run SQL, view diagnostics, and manage BPM work orders. Use when tasks mention RDS or database operations."
---

# bytedcli RDS

## When to use

- 搜索/列出数据库
- 查看表、执行 SQL
- 数据库诊断和监控
- BPM 工单管理（DDL/DML 变更）

## 前置条件

- 使用通用调用方式：`references/invocation.md`
- 需要鉴权时先登录：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 列出收藏的数据库
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest rds list-starred-db --region cn

# 搜索数据库
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest rds search-db "keyword" --region cn --page 0 --size 50

# 列出表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest rds list-db-table "dbname" --region cn

# 执行 SQL
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest rds query-db "dbname" "SELECT * FROM users LIMIT 10" --region cn

# 数据库概览（详情 + 拓扑，可选 QPS）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest rds get-db-overview "dbname" --region cn --qps
```

## BPM 工单管理（仅 boe/boei18n）

```bash
# 创建 DDL 工单 - ALTER（workflow-config-id: 812=DDL, 810=DML）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe rds bpm-create \
  --workflow-config-id 812 \
  --ticket-type alter \
  --dbname "my_database" \
  --sql "ALTER TABLE users ADD COLUMN age INT;" \
  --background "添加年龄字段"

# 申请个人库权限工单（支持 maliva 等区域；示例使用 i18n-bd 站点）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site i18n-bd rds bpm-apply-permission \
  --dbname "my_database" \
  --region "maliva" \
  --user-list "user1,user2" \
  --background "Apply for dev usage"

# 创建 DDL 工单 - CREATE
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe rds bpm-create \
  --workflow-config-id 812 \
  --ticket-type create \
  --dbname "my_database" \
  --sql "CREATE TABLE new_table (id INT PRIMARY KEY);" \
  --background "创建新表"

# 查看工单详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe rds bpm-get 3935899

# 列出工单
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe rds bpm-list --dbname "my_database"

# 取消工单
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe rds bpm-cancel 3935899 --reason "不再需要"

# 更新工单 SQL（重试）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe rds bpm-update-sql 3935899 --sql "新的 SQL"
```

## Notes

- 需要结构化输出加 `--json`（全局选项，放在子命令之前，如 `NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json rds list-starred-db`）
- BPM 工单仅在 `boe`/`boei18n` 站点可用
- BPM 审批/拒绝请使用 BPM Web UI
- DDL 工单需要指定 `--ticket-type`：`alter`（修改表）或 `create`（创建表）

## References

- `references/rds.md`
