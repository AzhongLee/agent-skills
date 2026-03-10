# TCE

## 站点

```bash
# 列出支持的站点
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-sites
```

## 服务查询

```bash
# 收藏的服务
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-starred-service --page 1 --size 10

# 搜索服务
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce search-service --keyword "keyword" --env "ppe_xxx" --page 1 --size 10

# 获取服务详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce get-service <service_id> --tce-site prod

# 列出服务集群
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-clusters <service_id> --tce-site prod --page 1 --size 10
```

## 服务实例

```bash
# 推荐方式：使用 --psm + --env
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-instance --psm coze.coding.deploy --env prod --tce-site prod

# 兼容方式：使用 --service-id
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-instance --service-id <service_id> --tce-site prod --page 1 --size 10

# 强制刷新缓存
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-instance --psm coze.coding.deploy --env prod --force-update

# 获取全部实例（不分页）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce list-service-instance --psm coze.coding.deploy --env prod --no-pagination
```

## 环境级联查询

```bash
# 查询 PSM 的环境级联信息
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm coze.coding.deploy

# 指定分区
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm coze.coding.deploy --partition CN

# 指定环境
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm coze.coding.deploy --env prod

# 排除分区
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest tce env-cascader --psm coze.coding.deploy --excluded-partitions SG,VA
```

## 泳道部署

```bash
# 部署泳道
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

- 站点别名：`cn=prod`、`i18n=byteintl`、`tx-ttp=ttp-us-limited`、`eu-ttp=ttp-eu`
- `list-service-instance` 推荐使用 `--psm + --env`，原位置参数改为 `--service-id` 选项
