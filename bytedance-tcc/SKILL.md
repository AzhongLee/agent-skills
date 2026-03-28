---
name: bytedance-tcc
description: "Operate TCC via bytedcli: list/search namespaces, list/get configs, create/update/deploy configs, list directories, import base config, and inspect metadata. Use when tasks mention TCC or config center."
---

# bytedcli TCC

## When to use

- Namespace/Config 查询
- 配置创建、更新、发布（通过 `--publish-mode` 控制发布策略）
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
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc create-config "namespace" "config_name" --env ppe --tcc-site prod --region CN --dir "/default" --description "demo config" --value "a: b"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc update-config "namespace" "config_name" --env ppe --tcc-site prod --region CN --value "a: b"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env ppe --tcc-site prod --region CN
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc import-base-config "namespace" --config-ids "123,456" --target-env ppe_xxx --tcc-site i18n-bd
# Only create deployment, do not start (manual mode)
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env ppe --region CN --publish-mode manual
# Deploy with review support (auto mode, default): auto-publish if no review, otherwise return review info
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env prod --tcc-site prod --region CN --publish-mode auto
# Force auto-publish regardless of review requirement
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc deploy-config "namespace" "config_name" --env prod --tcc-site prod --region CN --publish-mode force-auto
# Query publish details by deployment ID or control-panel URL
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc publish-detail "1234567890123456" --env prod --tcc-site prod
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc publish-detail "https://cloud.bytedance.net/tcc/namespace/example.namespace/publish-details/1234567890123456?x-resource-account=public&x-bc-region-id=bytedance" --env prod
# Operate deployment or approve/reject current review step
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc operate-deployment "1234567890123456" --operation start --env prod
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc approve-deployment "https://cloud.bytedance.net/tcc/namespace/example.namespace/publish-details/1234567890123456?x-resource-account=public&x-bc-region-id=bytedance" --env prod
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tcc reject-deployment "1234567890123456" --env prod
```

## Notes

- 环境/region/dir 建议显式指定
- 站点 `--tcc-site` 支持：`prod|boe|i18n-bd|i18n-tt|us-ttp|eu-ttp`（别名：`boei18n/boe-i18n/i18n` -> `i18n-bd`）
- 需要结构化输出加 `--json`（全局选项，放在子命令之前，如 `NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json tcc list-config "namespace" --region CN ...`）
- `tcc create-config` 需要显式传 `--description`；TCC Web 创建接口要求 description 非空，CLI 会先在本地校验
- `tcc create-config` 在 `former_tcc` / `tcc_v2` namespace 上会自动回退到 V2 `service_id` 创建接口，不需要手写内部 API
- `tcc update-config` 在 `former_tcc` / `tcc_v2` namespace 上会自动回退到 V2 `service_id` 的 `config/upsert/v2` 接口，按传入的 `--region` 和 `--dir` 更新对应副本
- `tcc update-config` 遇到同步区域组时会自动补齐该组内所有已存在副本的 `extend_regions` 和 `update_base_version`；例如同一配置同时存在于 `CN` / `China-East` 时，不需要手动拆成多次更新，JSON 输出会返回实际覆盖的 `regions`
- `tcc deploy-config` 在 `former_tcc` / `tcc_v2` namespace 上会自动切到 TCC AG 的 V2 发布链路：先用 `service_id` 读取配置，再调用 `config/upsert_deploy/v2` 创建或复用 activity 发布单，并按 `deployment/step_info` 判断是否继续推进 `next`；未发布配置会按目标最新版本构造 V2 deploy payload，并把备注写入 `config_data.note`
- `tcc deploy-config` 遇到同步区域组时会自动补齐该组内所有已存在副本的 `config_changes` 与 `check_review conf_ids`；例如同一配置同时存在于 `CN` / `China-East` 时，不需要手动拆成多次发布，JSON 输出会返回实际覆盖的 `regions` / `config_ids`
- `tcc deploy-config` 通过 `--publish-mode` 控制发布策略：
  - `auto`（默认）：不需要 review 时自动推进后续 `next` 步骤；需要 review 时创建审批工单并返回当前 review 工单信息
  - `manual`：只创建发布工单，不自动 start/finish
  - `force-auto`：无论是否需要 review，都尝试继续推进后续 `next` 步骤
  - 被 SCP 策略封禁时，返回逃逸申请链接
- `tcc deployment-detail` / `tcc publish-detail` 支持直接传 TCC 控制台 `publish-details` URL；未显式传 `--tcc-site` 时，会优先按 URL host 自动推断站点
- `tcc operate-deployment` 直接透传底层 `deployment/operate`；未显式传 `--current-step-index` 时，会自动调用 `get_step` 推断当前步骤
- `tcc approve-deployment` / `tcc reject-deployment` 分别封装 review 步骤的 `review_pass` / `review_reject`

## References

- `references/tcc.md`
