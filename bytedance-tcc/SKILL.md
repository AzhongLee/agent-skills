---
name: bytedance-tcc
description: "Operate TCC via bytedcli: list/search namespaces, list/get configs, create/update/deploy configs, list directories, import base config, and inspect metadata. Use when tasks mention TCC or config center."
---

# bytedcli TCC

## When to use

- Namespace/Config 查询
- 配置创建、更新、发布
- 目录查询与基准配置导入

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-sites
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-starred-namespace --tcc-site prod --page 1 --size 50
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc search-namespace "keyword" --tcc-site prod --scope all --page 1 --size 50
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-config "namespace" --region CN
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc get-config "namespace" "config_name" --region CN --dir "/default"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-dir "namespace" --env ppe_xxx --tcc-site i18n-bd
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc list-meta-data --env ppe_xxx --tcc-site i18n-bd
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc create-config "namespace" "config_name" --env ppe --tcc-site prod --region CN --dir "/default" --value "a: b"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc update-config "namespace" "config_name" --env ppe --tcc-site prod --region CN --value "a: b"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env ppe --tcc-site prod --region CN
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc import-base-config "namespace" --config-ids "123,456" --target-env ppe_xxx --tcc-site i18n-bd
# Only create deployment, do not start (and no auto-finish)
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env ppe --region CN --no-start
```

## Notes

- 环境/region/dir 建议显式指定
- 站点 `--tcc-site` 支持：`prod|boe|i18n-bd|i18n-tt|us-ttp|eu-ttp`（别名：`boei18n/boe-i18n/i18n` -> `i18n-bd`）
- 需要结构化输出加 `--json`
- `tcc deploy-config` 默认会自动执行 `start` + `finish`（完成工单）；可用 `--no-start` 禁用

## References

- `references/tcc.md`
