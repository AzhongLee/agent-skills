---
name: bytedance-bmq
description: "Operate BMQ (ByteCloud Message Queue / Kafka) via bytedcli: list/search topics, clusters, consumer groups, mirrors. Use when tasks mention Kafka, message queues, BMQ topics, consumers, or data mirrors."
---

# bytedcli BMQ

## When to use

- Kafka / BMQ 话题搜索与详情
- 集群列表与搜索
- 消费组列表与搜索
- Mirror（跨区复制）列表与搜索

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
# Topic 列表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq topics --vregion "US-BOE" --page 1 --size 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq topics --vregion "Singapore-Central" --search "pipo" --all

# Topic 详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq topic 12345 --vregion "US-BOE"

# Cluster 列表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq clusters --vregion "US-BOE" --all
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq clusters --vregion "Singapore-Central" --search "public"

# Consumer Group 列表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq consumers --vregion "US-BOE" --page 1 --size 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq consumers --vregion "Singapore-Central" --search "data_inventory" --all

# Mirror 列表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq mirrors --vregion "Singapore-Central" --status RUNNING --all
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bmq mirrors --vregion "Singapore-Central" --search "topic_name" --size 10
```

## 多站点支持

BMQ 支持多个站点，通过 `--site` 切换：

- `boe` / `boei18n`: BOE 环境 (`cloud-boe.bytedance.net`)
- `i18n-tt`: TikTok ROW (`cloud.tiktok-row.net`)，EU 区域自动路由到 `cloud-eu.tiktok-row.net`
- `i18n-bd`: ByteIntl (`cloud.byteintl.net`)
- `prod`: 中国站 (`cloud.bytedance.net`)

```bash
# TikTok ROW
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site i18n-tt bmq topics --vregion "Singapore-Central" --all

# BOE
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe bmq topics --vregion "US-BOE" --all
```

## Notes

- 需要结构化输出加 `--json`
- `--vregion` 指定虚拟区域（如 `US-BOE`、`Singapore-Central`、`CN` 等）
- `--all` 查看所有资源（默认只看自己拥有的）

## References

- `references/bmq.md`
