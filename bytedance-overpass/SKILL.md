---
name: bytedance-overpass
description: "Operate Overpass: IDL-based codegen for kitex/hertz/lust/euler/jet/js, sync IDL, query config, and generate branches."
---

# Overpass（bytedcli）

Overpass 用于 **基于 IDL 生成代码**（Kitex / Hertz / Lust / Euler / Jet / JS 等框架）。

## When to use

- 同步 IDL / 查询 repo 配置
- 生成分支代码并拉取生成产物

## 前置条件

- 使用通用调用方式：`references/invocation.md`
- 需要登录 SSO：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 获取 repo 配置
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest overpass get-repo-info --psm "flow.marketplace.product"

# 同步/查询 IDL
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest overpass sync-idl-info --psm "flow.marketplace.product" --branch "feat/demo"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest overpass get-branch-idl --psm "flow.marketplace.product" --branch "feat/demo"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest overpass get-latest-idl --psm "flow.marketplace.product"

# 分支生成与任务查询
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest overpass generate-branch --psm "flow.marketplace.product" --branch "feat/demo"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest overpass search-branch-task --psm "flow.marketplace.product" --framework-type 0
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest overpass search-main-task --psm "flow.marketplace.product" --framework-type 0
```

## Notes

- `generate-branch` 默认执行 `go get` 获取生成后的 Go 代码
- 非 Go 生态可使用 `--disable-goget`
- 需要结构化输出加 `--json`

## References

- `references/invocation.md`
