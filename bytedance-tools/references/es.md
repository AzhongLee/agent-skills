# ES 命令参考

> 统一使用内部源 npx 调用：`references/invocation.md`

## 命令

### 1) es search

执行 ES 查询。

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest es search \
  --psm byte.es.kefu_data_center \
  --index kefu_incoming_ivr \
  --query '{"query":{"match_all":{}}}'
```

### 参数说明

| 参数 | 必填 | 说明 |
|------|------|------|
| `--psm` | 是 | Kibana 实例 PSM 标识（如 `byte.es.kefu_data_center`） |
| `--index` | 是 | ES 索引名称 |
| `--query` | 是 | ES DSL 查询 JSON 字符串 |
| `--size` | 否 | 返回文档数量 |
| `--from` | 否 | 分页偏移量 |
| `--output` | 否 | 输出模式：`console`（默认）或 `file` |
| `--output-file` | 否 | 输出文件路径（默认：`es-search-{psm}-{index}-{timestamp}.json`）

### 查询示例

```json
{
  "query": {
    "terms": {
      "sub_channel_id": [
        "C2LFZZ202602251454577D0367B3EDC6A66B",
        "C2LFZZ2026022515012974ED38440EA648D8"
      ]
    }
  }
}
```

```json
{
  "query": {
    "bool": {
      "must": [
        { "match": { "status": "success" } }
      ],
      "filter": [
        { "range": { "timestamp": { "gte": "2026-01-01", "lte": "2026-01-31" } } }
      ]
    }
  },
  "sort": [{ "timestamp": "desc" }],
  "size": 100
}
```
