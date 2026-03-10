---
name: bytedance-cloud-docs
description: "Search and fetch Cloud Docs via bytedcli: search docs, get doc details, list businesses and docs. Use when tasks mention Cloud Docs or doc search."
---

# bytedcli Cloud Docs

## When to use

- 搜索/获取 Cloud Docs
- 查询业务域与 API 文档

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-docs search "keyword"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-docs get "doc_id"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-docs list-business
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-docs list-docs "business_id" --api-doc "tce:v1"
```

## Notes

- 需要结构化输出加 `--json`

## References

- `references/cloud-docs.md`
