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

## 重试策略（Skill 行为）

- 默认不自动重试：日志查询命令执行失败时，不要在后台静默重跑。
- 失败后交互确认：首次失败后，必须清晰展示失败原因，并询问用户是否重试；用户确认后才进行下一次尝试。
- 可控重试次数：默认最多重试 1 次；若用户明确要求，可按用户给定上限执行，但是最多3次重试，且每一次重试都必须再次询问确认。
- 不建议重试的场景：参数校验失败（如缺少必填参数、格式错误）应提示用户修正参数，不进入重试流程。

## 查询策略（Skill 喜好）

- PSM 关键词查询默认不启用索引加速：除非用户明确要求开启索引（或明确要求短语查询），否则一律不加 `--enable-index`。
- LogID 查询优先级更高：当用户诉求包含某个/某些 LogID（即便同时给出 PSM），优先用 `log get-logid-log <logid> --psm <psm>` 查询。
- 任何情况下不并发查询：同一轮对话中如需多次查询（多 LogID、多 PSM、多时间段），必须串行执行，上一条完成后再发下一条。
- 时间范围尽量精准且渐进扩展：优先使用用户给出的精确时间点（或从告警/工单/调用链获得的时间），先用 15m~30m 窗口定位；只有在证据不足时才逐步扩大窗口，避免一上来用小时级或天级范围。
- 日志条数尽量最小且可控：首次 PSM 查询优先设置较小的收集上限（如 `--max-logs 200`）与单次请求上限（如 `--limit 50` 或 `--limit 100`）；除非用户明确要求，不要使用 `--max-logs 0`（无限制）。
- 扩大范围前先收窄条件：时间窗口不变时，优先通过 `--keyword/--exclude/--kv-filter/--idc` 收敛结果，再考虑扩大时间范围或提高 `--max-logs`。
- 关键词传参优先用重复选项：多关键词场景优先重复传 `--keyword/--exclude`（例如 `--keyword "a,b" --keyword "c"`），避免使用逗号分隔写法导致关键词内包含逗号时被误拆分。

## Quick start

```bash
# PSM 日志搜索
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00"

# PSM 日志搜索（直接输出到控制台）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00" --output console

# PSM 日志搜索（指定输出文件）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00" --output file --output-file "/tmp/bytedcli.search.log"

# PSM 日志搜索（按 KV 过滤）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "example.service.api" --keyword "deploy" --kv-filter "method=Deploy|Rollback" --kv-filter "_idc=lf|hl"

# PSM 日志搜索（索引加速查询：enable_index=true）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00" --keyword "error" --enable-index

# PSM 日志搜索（索引加速 + 短语查询：is_term=true，不分词）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log search-psm-log --psm "psm.name" --start "2026-02-02T08:00:00" --end "2026-02-02T09:00:00" --term "User not found" --enable-index

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

# 日志聚类（按 KV 过滤，如日志级别）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest log get-log-cluster "psm.name" --start "2026-02-02T08:00:00" --kv-filter "level=ERROR|WARN"
```

## Notes

- `--start/--end` 支持 RFC3339 或时间戳（秒/毫秒），不传则默认近 1 小时
- `--range` 和 `--start -1h` 相对语法仅 `search-prod-instance-log` 支持
- 日志查询时间范围上限为 7 天（`end - start <= 7d`），超出会报错
- `--keyword/--exclude` 支持重复或逗号分隔
- `search-psm-log` 可用 `--enable-index` 开启索引加速查询（`enable_index=true`），适用于 PSM 关键词搜索
- `search-psm-log` 可用 `--term` 开启短语查询（`is_term=true`，不分词）；短语查询必须配合索引加速（`--enable-index`）
- `search-psm-log` 开启 `--enable-index` 时会提示二次确认 PSM 是否已开索引，并给出索引说明文档：`https://bytedance.larkoffice.com/docx/K1lHdQppSo0d1HxkAMscn1Wfnff`；非交互场景可加 `--yes` 跳过确认
- `search-psm-log` 默认最多收集 1000 条日志（`--max-logs 1000`）；传 `--max-logs 0` 表示无限制
- `search-psm-log` 和 `get-log-cluster` 支持 `--kv-filter key=value1|value2`，可重复传递多个过滤条件
- `--idc` 在 `search-psm-log` 中会自动映射为 `_idc` 过滤
- `get-log-cluster` 使用 `--kv-filter` 可按日志级别等字段过滤聚类结果，例如 `--kv-filter "level=ERROR|WARN"`
- `search-psm-log` / `get-logid-log` 使用 `--vregion`，`search-prod-instance-log` / `get-lane-instance-log` 使用 `--region`
- 切换 i18n 站点时建议显式使用 `--site i18n-bd` 或 `--site i18n-tt`（`--site i18n` 会归一化为 `i18n-bd`）。认证隔离按 SSO 环境生效：`i18n-tt` 与 `prod/i18n-bd/boei18n` 隔离，使用前需先确认对应站点已登录（如 `BYTEDCLI_CLOUD_SITE=i18n-tt ... auth status`），否则可能报 `获取字节云 JWT 失败: 401`，详见 `references/troubleshooting.md`
- 人类模式下直接输出纯文本，结构化输出加 `--json`（全局选项，放在子命令之前，如 `NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json log search-psm-log ...`）
- `search-psm-log` / `search-prod-instance-log` / `get-logid-log` 默认 `--output file`，会在控制台打印输出文件路径；可用 `--output console` 直接打印日志
- 日志时间统一按 UTC+8 输出

## References

- `references/log.md`
