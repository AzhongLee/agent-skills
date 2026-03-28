# Netlink

Netlink 相关能力用于排查域名接入、TLB servername 与 Location(path) 配置。

## 环境与站点

- CN: `--netlink-site cn`（默认）
- BOE: `--netlink-site boe`
- I18N(BD): `--netlink-site i18n`

站点差异（bytedcli 内部已处理）：

- CN/BOE：API host 在 ByteCloud 控制台域名下（`cloud.bytedance.net` / `cloud-boe.bytedance.net`），请求需要 `x-bcgw-tenant-id: bytedance`
- I18N：API host 为 `netlink-i18nbd.byteintl.net`，JWT 从 `cloud.byteintl.net` 获取

## 命令映射

- `netlink search-domain`：通过 domain list 搜索域名，返回 `servername_id/namespace_id` 等信息
- `netlink list-domain-configs`：拉取 servername 详情并列出所有 Location
- `netlink search-path`：在 servername locations 中按关键字搜索
- `netlink get-path-config`：获取单个 Location（支持 `=/path` 或 `/path`）
- `netlink get-topology`：按域名获取拓扑信息（best-effort）
- `netlink get-servername`：按 servername id 获取完整配置（best-effort）

## 参数

- `--unified-platform-id`：少数场景需要覆盖；默认值按站点内置，通常无需手动传

