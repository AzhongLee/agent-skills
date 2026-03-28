# ByteDoc

ByteDoc 数据库搜索、列表、详情、关注、集合查询、数据查询与慢查询分析统一收敛在 `bytedoc db <action>`。

## 常见命令

```bash
# 搜索数据库
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytedoc db search --keyword "demo_orders" --deploy-mode classic
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytedoc db search --keyword "bytedoc.demo_catalog" --deploy-mode cloud-native

# 查看我关注的库 / 数据库详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db list
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db list --all --deploy-mode cloud-native
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db get --service "demo_orders" --deploy-mode classic

# 集合与慢查询
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db collections --service "demo_orders"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db collections --db-name demo_catalog
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db slow-query overview --service "demo_orders" --deploy-mode classic --millis 100
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db slow-query metrics --service "demo_orders" --deploy-mode classic --interval 5m

# 数据查询（自动识别 classic / cloud-native）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db query --service "demo_orders" --collection "demo_records" --query 'find().limit(10)'
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db query --service "demo_orders" --collection "demo_records" --query-file ./query.mongo
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytedoc db query --db-name demo_catalog --collection "demo_items" --query 'find().limit(10)'
```

## 说明

- `bytedoc db list` 默认展示关注列表；未显式传 `--deploy-mode` 时会合并 classic 和 cloud-native 的关注列表。
- `bytedoc db list --all` 展示全量数据库；未显式传 `--deploy-mode` 时默认查 `classic`。
- `db get` / `db slow-query *` 可以传 `--db-name` 或 `--service`；经典版支持先用服务名解析数据库名。
- `bytedoc db collections` 不再需要 `--deploy-mode`；CLI 会自动识别 classic 或 cloud-native 数据库。
- `bytedoc db query` 不再需要 `--deploy-mode`；CLI 会自动识别 classic 或 cloud-native 数据库，并在 cloud-native 场景下自动切到 DMS 查询链路。
- `db slow-query subscribers` / `metrics` / `index-recommend` 在 classic 和 cloud-native 下都会统一走 slowquery 服务；只给 classic `--db-name` 时，CLI 会先解析 service。
- `db slow-query detail` 在 classic 下既支持直接传 24 位 ObjectId，也支持传 `overview` 里的 fingerprint id；CLI 会自动尝试把 fingerprint 展开成 `_ids` 再查询 detail。
- `bytedoc db query` 的输入仍是 `--collection` 和 Mongo shell 风格 `--query` / `--query-file`；cloud-native 查询会自动改写成 `db.<collection>.<query>` 后再发给 DMS。
- `bytedoc db query` 会把 classic 的 Mongo shell 原始文本尽量归一化成和 cloud-native(DMS) 接近的结构化结果，统一输出 `type`、`printable.documents` 和 `source.namespace`。
