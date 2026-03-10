---
name: bytedance-env
description: "Operate ENV platform via bytedcli: list/search env, baseline create flow, deploy TCE/TCC, manage devices, and inspect tickets."
---

# bytedcli ENV

## When to use

- 查看我收藏的 ENV
- 查看我管理的 ENV
- 按环境标识搜索 ENV
- 按服务（PSM）搜索 ENV
- 列出创建流程可选基准环境
- 查看基准环境可用机房
- 创建前校验环境名
- 创建 ENV
- 向 ENV 部署 TCE/TCC 服务
- 升级 TCE 服务（可指定集群和分支）
- 设备管理（新增/续期/解绑/列表）
- 工单查询（列表/详情）
- 需要跨站点（cn/boe/i18n-tt/i18n-bd/us-ttp/eu-ttp）统一查询

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 查看站点与动态 standard_env 列表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-sites

# 查看收藏/管理 ENV（默认查全部站点）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-starred-env --page 1 --size 10
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-managed-env --page 1 --size 10

# 指定站点（支持重复或逗号）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-starred-env --env-site cn --env-site boe
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-managed-env --env-site i18n-tt,us-ttp

# 按环境标识搜索
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env search-env --keyword "ppe_coze" --env-site eu-ttp

# 按服务搜索（先 service suggest，再按 psm 查询）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env search-service --service "coze.coding.deploy" --env-site cn,boe

# 创建流程：基准环境 / 机房 / 名称校验 / 创建
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-baseline-envs
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-baseline-zones --standard-env online_cn
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env check-name --name "ppe_demo" --standard-env online_cn
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env create-env --name "ppe_demo" --standard-env online_cn --idc LF --visibility private

# 部署/升级服务
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env deploy-tce-service --env "ppe_demo" --standard-env online_i18nbd --psm "flow.bot.open_gateway" --flow-base prod
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env deploy-tcc-service --env "ppe_demo" --standard-env online_i18nbd --psm "ocean.cloud.bot_adapter"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env upgrade-tce-service --env "ppe_demo" --standard-env online_i18nbd --psm "flow.bot.open_gateway" --cluster-id 350079955 --branch "feat/demo"

# 设备管理
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-device --env "ppe_demo" --standard-env online_i18nbd
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env add-device --env "ppe_demo" --standard-env online_i18nbd --device-id 4252524525 --expire-at "2026-02-19T01:19:40.471Z"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env update-device-expire --env "ppe_demo" --standard-env online_i18nbd --device-id 4252524525 --expire-at "2026-02-19T09:19:58+08:00"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env unbind-device --standard-env online_i18nbd --device-id 4252524525

# 工单
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env list-ticket --env "ppe_demo" --standard-env online_i18nbd --page 1 --size 10
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest env get-ticket --ticket-id 2021755505366867968 --standard-env online_i18nbd
```

## Notes

- 需要结构化输出加 `--json`
- `--env-site` 支持：`cn|boe|i18n-tt|i18n-bd|us-ttp|eu-ttp`
- `create-env` 名称规则：
  - `online_*` 必须 `ppe_` 前缀
  - `boe*` 必须 `boe_` 前缀

## References

- `references/env.md`
