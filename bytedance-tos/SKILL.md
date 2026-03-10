---
name: bytedance-tos
description: "Operate TOS (ByteDance object storage) via bytedcli: list buckets, view user records, and discover supported sites/VRegions. Use when tasks mention TOS or object storage."
---

# bytedcli TOS

## When to use

- TOS 控制台能力（Bucket 列表、收藏 Bucket、申请/审批记录）
- 需要查询 TOS 支持的站点与 VRegion（best-effort，带 1 天缓存）

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 站点与 VRegion 自动发现（best-effort）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tos list-sites

# 当前用户信息
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tos user-info

# 收藏的 bucket
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tos list-starred-buckets --page 1 --size 5

# 可访问的 bucket
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tos list-viewable-buckets --page 1 --size 5

# 申请记录（apply/toaudit）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tos list-records --status apply --record-type 1 --page 1 --size 5
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tos list-records --status toaudit --page 1 --size 5

# BOE / BOEi18n
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe tos list-starred-buckets --page 1 --size 5
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boei18n tos list-starred-buckets --page 1 --size 5
```

## Notes

- 默认文本模式；结构化输出加 `--json`
- 环境切换使用 `--site`（或 `BYTEDCLI_CLOUD_SITE`）

## References

- `references/tos.md`

