---
name: bytedance-neptune
description: "Operate Neptune via bytedcli: list sites/zones and fetch security/stability/rate-limit/dispatch configs for ingress/egress across CN/BOE/ByteIntl. Use when tasks mention Neptune governance, stability, dispatch, rate limit, or security."
---

# bytedcli Neptune

## When to use

- Neptune 平台：安全/稳定性/限流/调度配置排查
- 同时关注入流量（ingress）与出流量（egress）
- 跨环境（CN/BOE/ByteIntl）排查配置差异

## 前置条件

- 使用通用调用方式：`references/invocation.md`
- 需要鉴权的命令先登录：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login`

## Quick start

```bash
# 发现 Neptune 支持的站点（best-effort）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune list-sites

# 查看某个站点支持的 zones/vregions（best-effort）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune list-cp-regions --neptune-site cn
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune list-cp-regions --neptune-site boe
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune list-cp-regions --neptune-site byteintl

# 安全配置（method 默认 *；direction 默认 ingress）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune security --psm coze.coding.deploy --cluster default --zone CN --method "*" --direction ingress

# 稳定性配置
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune stability --psm coze.coding.deploy --cluster default --zone CN --direction ingress

# 限流配置（v2 仅对 ingress 生效）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune rate-limit --psm coze.coding.deploy --cluster default --zone CN --direction ingress
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune rate-limit --psm coze.coding.deploy --cluster default --zone CN --direction ingress --v2

# 调度配置
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune dispatch --psm coze.coding.deploy --cluster default --zone CN --direction ingress

# 切换环境（BOE/ByteIntl）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune stability --neptune-site boe --psm stone.openapi.toolbox_backend --cluster faas-cn-north --zone BOE --direction egress
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest neptune stability --neptune-site byteintl --psm your.psm --cluster default --zone TEXAS --direction ingress

# 需要结构化输出时加 --json
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json neptune stability --psm coze.coding.deploy --cluster default --zone CN
```

## Notes

- `--neptune-site` 支持：`cn|boe|byteintl`（默认 `cn`）
- `--direction` 支持：`ingress|egress`（默认 `ingress`）
- `--zone` 建议显式传入；如不传，默认：`CN(cn/byteintl)`、`BOE(boe)`；可用 `neptune list-cp-regions` 查看可选值

## References

- `references/neptune.md`

