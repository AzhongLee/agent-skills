---
name: bytedance-netlink
description: "Operate Netlink (DNS/TLB) via bytedcli: search domains, search paths, list domain configs, and fetch topology/servername details across CN/BOE/I18N. Use when tasks mention Netlink, domain routing, or path configs."
---

# bytedcli Netlink

## When to use

- Netlink 平台：域名检索、路由/Location 配置排查
- 在一个域名内搜索 path/location
- 拉取 servername(TLB) 配置与拓扑（best-effort）

## 前置条件

- 使用通用调用方式：`references/invocation.md`
- 需要鉴权的命令先登录：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 发现 Netlink 支持的站点（best-effort）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink list-sites

# 搜索域名（CN 默认）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink search-domain --keyword "api.coze.cn" --page 1 --size 10

# 列出一个域名的所有 Location 配置（TLB servername locations）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink list-domain-configs --domain "api.coze.cn"

# 搜索一个域名内的 path/location
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink search-path --domain "api.coze.cn" --keyword "submit_tool_outputs"

# 查看具体 path 的配置（支持 =/path 或 /path）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink get-path-config --domain "api.coze.cn" --path "=/v3/chat/submit_tool_outputs"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink get-path-config --domain "api.coze.cn" --path "/v3/chat/submit_tool_outputs"

# 切换环境（BOE / I18N）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink search-domain --netlink-site boe --keyword "example.com"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest netlink search-domain --netlink-site i18n --keyword "docs.coze.com"

# 需要结构化输出时加 --json
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json netlink list-domain-configs --domain "api.coze.cn"
```

## Notes

- `--netlink-site` 支持：`cn|boe|i18n`（默认 `cn`）
- `unified_platform_id` 默认按站点内置（也可用 `--unified-platform-id` 覆盖）

## References

- `references/netlink.md`

