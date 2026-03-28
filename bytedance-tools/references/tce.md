# TCE

## 站点

```bash
# 列出支持的站点
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-sites
```

## 服务查询

```bash
# 收藏的服务
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-starred-service --page-num 1 --page-size 10

# 搜索服务
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --keyword "keyword" --env "ppe_xxx" --page-num 1 --page-size 10

# 获取服务详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce get-service <service_id> --tce-site prod

# 列出服务集群
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-clusters --service-id <service_id> --tce-site prod --page-num 1 --page-size 10
```

## 服务实例

```bash
# 推荐方式：使用 --psm + --env
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-instance --psm example.service.api --env prod --tce-site prod
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-instance --psm example.service.api --env prod --ordering -cpu --tce-site prod

# 兼容方式：使用 --service-id
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-instance --service-id <service_id> --tce-site prod --page-num 1 --page-size 10

NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-instance --service-id <service_id> --ordering cpu --page-num 1 --page-size 10 --tce-site prod

# 强制刷新缓存
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-instance --psm example.service.api --env prod --force-update

# 获取全部实例（不分页）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-instance --psm example.service.api --env prod --no-pagination
```

## 发布工单

```bash
# 查询发布工单列表（按服务 ID + 类型筛选）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-deployment --service-id <service_id> --type upgrade

# 按状态筛选
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-deployment --service-id <service_id> --status finished --page-num 2

# 获取发布工单详情（返回 meta + pipeline stages + runtime）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce get-deployment <deployment_id>

# 跨站点查询工单
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-deployment --service-id <service_id> --tce-site boe
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce get-deployment <deployment_id> --tce-site byteintl
```

## 环境级联查询

```bash
# 查询 PSM 的环境级联信息
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm example.service.api

# 指定分区
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm example.service.api --partition CN

# 指定环境
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm example.service.api --env prod

# 排除分区
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm example.service.api --excluded-partitions SG,VA
```

## 泳道部署

```bash
# 部署泳道
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce deploy-lane \
  --env ppe_demo \
  --standard-env online_cn \
  --psm example.service.api \
  --flow-base prod \
  --branch master

# 部署指定 SCM 版本（仅提交指定仓库，不携带完整 SCM 列表）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce deploy-lane \
  --env prod \
  --standard-env boe \
  --psm example.service.api \
  --flow-base boe \
  --scm-repo-name example/service/api \
  --scm-repo-version 1.0.0.8 \
  --action upgrade
```

## 跨站点示例

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site boe --keyword "my-service"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site byteintl --keyword "my-service"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site ttp-us-limited --keyword "my-service"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --tce-site ttp-eu --keyword "my-service"
```

## Notes

- 站点别名：`cn=prod`、`i18n=byteintl`、`tx-ttp=ttp-us-limited`、`eu-ttp=ttp-eu`
- `list-instance` 推荐使用 `--psm + --env`；兼容方式也支持 `--service-id`
- `--ordering` 可选值：`cpu/-cpu/mem/-mem/idc/-idc/createtime/-createtime/podstatus/-podstatus`；`-` 前缀表示倒序，不带 `-` 表示升序
