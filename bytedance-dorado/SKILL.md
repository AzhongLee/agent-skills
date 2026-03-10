---
name: bytedance-dorado
description: "Operate Dorado (DataLeap) batch tasks via bytedcli: list projects/tasks/instances, get task details, update SQL queries, view version history. Use when tasks mention Dorado, DataLeap, batch tasks, data pipelines, or hsql tasks."
---

# bytedcli Dorado

## When to use

- Dorado/DataLeap 批处理任务管理
- 查看项目、任务、实例列表
- 获取任务详情（包括源/目标数据库信息、SQL 代码）
- 更新 hsql 任务的 SQL 查询
- 查看任务版本历史

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 项目列表
bytedcli dorado list-projects --region boei18n --page 1 --size 20

# 任务列表
bytedcli dorado list-tasks --region boei18n --project-id 458 --page 1 --size 20

# 获取任务详情（包括源/目标信息、SQL 代码）
bytedcli dorado get-task 100274211 --region boei18n

# 更新 hsql 任务的 SQL 查询
bytedcli dorado update-query 100274211 --query "SELECT * FROM table" --region boei18n

# 查看任务版本历史
bytedcli dorado list-versions 100274211 --region boei18n

# 实例列表
bytedcli dorado list-instances --region boei18n --project-id 458 --task-id 100274211

# 获取实例详情
bytedcli dorado get-instance 258345284 --region boei18n
```

## Supported Regions

| Region | Description | Endpoint |
|--------|-------------|----------|
| `cn` | China (default) | data.bytedance.net |
| `sg` | Singapore Central | dataleap-sg.tiktok-row.net |
| `gcp` / `eu` | EU Compliance2 | dataleap-gp-ttp-eu.tiktok-eu.net |
| `boe` | BOE (CN) | data-boe.bytedance.net |
| `boei18n` | BOE (International) | data-boe.bytedance.net |
| `va` | US East (Virginia) | dataleap-va.tiktok-row.net |

## Notes

- 需要结构化输出加 `--json`
- `update-query` 仅支持 hsql 类型任务
- `list-instances` 需要 `--project-id` 参数
- DTS 任务会显示源/目标数据库和表信息
- hsql 任务会显示 SQL 代码

## References

- `references/dorado.md`
