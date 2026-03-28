# AGW (API Gateway)

## 产品管理

```bash
# 收藏产品列表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest agw list-starred-product [--page-num <n>] [--page-size <n>]

# 搜索产品
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest agw search-product --keyword <keyword> [--page-num <n>] [--page-size <n>]

# 产品详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest agw get-product --product <product>
```

| 命令 | 参数 | 说明 |
|------|------|------|
| `list-starred-product` | `--page-num` | 页码（默认 1） |
| | `--page-size` | 每页条数（默认 20） |
| `search-product` | `--keyword` | 搜索关键词（必填） |
| | `--page-num` | 页码（默认 1） |
| | `--page-size` | 每页条数（默认 20） |
| `get-product` | `--product` | 产品名称（必填） |

## 服务搜索

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest agw search-service --input <keyword>
```

| 参数 | 说明 |
|------|------|
| `--input` | 搜索关键词，支持 PSM、路径等（必填） |

## IDL 更新与发布

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest agw update-idl --service-id <id> --env <env> [options]
```

| 参数 | 说明 |
|------|------|
| `--service-id` | AGW 服务 ID（必填） |
| `--env` | AGW 环境名，如 `boe_default`、`ppe_xxx`（必填） |
| `--bam-psm` | 覆盖 BAM PSM（默认从 AGW 配置推断） |
| `--bam-version` | 目标 BAM IDL 版本（默认最新） |
| `--description` | 配置描述（默认 "bytedcli update idl"） |
| `--publish-mode` | 发布模式：`auto`（默认）/ `manual` |
| `--poll-interval-ms` | 自动发布后轮询间隔（默认 2000） |
| `--max-wait-ms` | 自动发布后最大等待时间（默认 30000） |
