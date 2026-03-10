---
name: bytedance-tce
description: "Operate TCE via bytedcli: list starred services, search services, fetch details, list clusters, list instances, env cascader, deploy lane. Use when tasks mention TCE services or environment queries."
---

# bytedcli TCE

## When to use

- 服务列表/详情
- 集群信息查询
- 环境级联查询
- 泳道部署

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 列出支持的站点
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-sites

# 收藏的服务
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-starred-service --page 1 --size 10

# 搜索服务
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --keyword "keyword" --env "ppe_xxx" --page 1 --size 10

# 获取服务详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce get-service <service_id> --tce-site prod

# 列出服务集群
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-clusters <service_id> --tce-site prod --page 1 --size 10

# 列出服务实例（推荐使用 --psm + --env）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-instance --psm coze.coding.deploy --env prod --tce-site prod

# 列出服务实例（兼容方式：使用 service_id）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-instance --service-id <service_id> --tce-site prod --page 1 --size 10
```

## 环境级联查询

```bash
# 查询 PSM 的环境级联信息（partition -> env -> lane）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm coze.coding.deploy

# 指定分区
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm coze.coding.deploy --partition CN

# 指定环境
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm coze.coding.deploy --env prod
```

## 泳道部署

```bash
# 部署泳道（需要指定 env、standard-env、psm、flow-base、branch）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce deploy-lane \
  --env ppe_demo \
  --standard-env online_cn \
  --psm coze.coding.deploy \
  --flow-base prod \
  --branch master
```

## 跨站点示例

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site boe --keyword "my-service"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site byteintl --keyword "my-service"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site ttp-us-limited --keyword "my-service"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site ttp-eu --keyword "my-service"
```

## Notes

- 需要结构化输出加 `--json`
- 站点选择用 `--tce-site`（`prod|boe|boei18n|byteintl|ttp-us-limited|ttp-eu`），不传则默认跟随 `BYTEDCLI_CLOUD_SITE`
- 常用别名：`cn=prod`、`i18n=byteintl`、`tx-ttp=ttp-us-limited`、`eu-ttp=ttp-eu`
- `list-service-instance` 推荐使用 `--psm + --env` 组合，原 `service_id` 位置参数改为 `--service-id` 选项

## References

- `references/tce.md`
