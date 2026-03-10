---
name: bytedance-log
description: "Operate log service via bytedcli: search logs by PSM/LogID/instance/pod, view log clusters. Use when tasks mention log search, logid lookup, instance logs, or log clustering."
---

# bytedcli Log

## When to use

- 按 PSM / 时间搜索日志
- 按 LogID 查询日志
- 按环境 / 实例 / Pod 搜索日志
- 查看日志聚类

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
# PSM 日志搜索
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00"

# PSM 日志搜索（直接输出到控制台）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00" --output console

# PSM 日志搜索（指定输出文件）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00" --output file --output-file "/tmp/bytedcli.search.log"

# PSM 日志搜索（按 KV 过滤）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "coze.coding.deploy" --keyword "deploy" --kv-filter "method=Deploy|Rollback" --kv-filter "_idc=lf|hl"

# LogID 查询
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log get-logid-log "20260202085428C91A145A63CB5F0B9D80" --psm "psm.name"

# LogID 查询（直接输出到控制台）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log get-logid-log "20260202085428C91A145A63CB5F0B9D80" --psm "psm.name" --output console

# LogID 查询（指定输出文件）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log get-logid-log "20260202085428C91A145A63CB5F0B9D80" --psm "psm.name" --output file --output-file "/tmp/bytedcli.logid.log"

# 泳道实例日志
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log get-lane-instance-log "psm.name" --env "ppe_xxx" --start "2026-02-02T08:00:00"

# 生产实例日志（按 Pod）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-prod-instance-log --psm "psm.name" --env prod --region "China-North" --range 1h --keyword "error"

# 生产实例日志（直接输出到控制台）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-prod-instance-log --psm "psm.name" --env prod --region "China-North" --range 1h --keyword "error" --output console

# 生产实例日志（指定输出文件）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-prod-instance-log --psm "psm.name" --env prod --region "China-North" --range 1h --keyword "error" --output file --output-file "/tmp/bytedcli.prod.instance.log"

# 日志聚类
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log get-log-cluster "psm.name" --start "2026-02-02T08:00:00"
```

## Notes

- `--start/--end` 支持 RFC3339 或时间戳（秒/毫秒），不传则默认近 1 小时
- `--range` 和 `--start -1h` 相对语法仅 `search-prod-instance-log` 支持
- `--keyword/--exclude` 支持重复或逗号分隔
- `search-psm-log` 支持 `--kv-filter key=value1|value2`，可重复传递多个过滤条件
- `--idc` 在 `search-psm-log` 中会自动映射为 `_idc` 过滤
- `search-psm-log` / `get-logid-log` 使用 `--vregion`，`search-prod-instance-log` / `get-lane-instance-log` 使用 `--region`
- 切换 i18n 站点时建议显式使用 `--site i18n-bd` 或 `--site i18n-tt`（`--site i18n` 会归一化为 `i18n-bd`）
- 人类模式下直接输出纯文本，结构化输出加 `--json`
- `search-psm-log` / `search-prod-instance-log` / `get-logid-log` 默认 `--output file`，会在控制台打印输出文件路径；可用 `--output console` 直接打印日志
- 日志时间统一按 UTC+8 输出

## References

- `references/log.md`
