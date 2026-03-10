---
name: bytedance-apm
description: "Operate APM via bytedcli: service preview, QPS, Redis monitoring dashboards, runtime/TLB/TCC/MySQL/AGW monitoring via Byteheart and Argos. Use when tasks mention APM, service monitoring, QPS, or Redis monitoring."
---

# bytedcli APM

## When to use

- 服务预览、QPS 查询
- Redis 监控（overview/client/server/proxy）
- 运行时 / 中间件监控（runtime/TLB/TCC/MySQL/AGW）

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 服务预览
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-preview --psm "psm.name" --service-type redis

# QPS
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm redis-qps --psm "toutiao.redis.coze_coding"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm redis-traffic --psm "toutiao.redis.coze_coding"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-qps --psm "coze.coding.deploy"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-qps --psm "coze.coding.deploy" --metric "service.request.server.throughput.total"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm downstream-qps --psm "coze.coding.deploy"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm downstream-qps --psm "coze.coding.deploy" --metric "service.request.downstream.throughput.total"

# Redis 监控
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm redis-overview --psm "toutiao.redis.coze_coding"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm redis-client --psm "toutiao.redis.coze_coding"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm redis-server --psm "toutiao.redis.coze_coding"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm redis-proxy --psm "toutiao.redis.coze_coding"

# 运行时 / 中间件
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-preview --psm "psm.name" --service-type runtime
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-preview --psm "psm.name" --service-type tlb
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-preview --psm "psm.name" --service-type tcc
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-preview --psm "psm.name" --service-type mysql
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest apm service-preview --psm "psm.name" --service-type agw_sidecar
```

## Notes

- `service-preview/runtime/tlb/tcc/mysql/agw-sidecar` 调用 Byteheart 全局视图接口
- Redis 相关命令返回 Grafana/Argos 监控入口链接（按集群维度）
- `service-qps` 基于 Argos measurement 接口，可用 `--metric` 指定指标
- `downstream-qps` 基于 Argos measurement 接口，默认指标为 `service.request.downstream.throughput.total`，用于查看服务调用下游依赖的 QPS
- `redis-qps/redis-traffic` 基于 Cache 服务详情的当前统计值
- 需要结构化输出加 `--json`

## References

- `references/apm.md`
