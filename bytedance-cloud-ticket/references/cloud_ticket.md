# Cloud Ticket（工单平台）

## 常用命令

```bash
# 列出支持的站点与 vregion（best-effort）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-sites

# 待我审批（默认最近 3 个月）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-pending-approval

# 我发起的
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-created

# 全部
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-all

# 通过工单（自动选择 next 操作）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket approve --ticket-id 98045537

# 持续审批（同一审批人场景）
# 说明：若审批通过后仍由你继续审批，先看工单状态/可执行操作，再决定是否继续执行下一次 approve；
# 如果可执行操作仍有 `next`，说明可继续；否则停止（通常表示已进入执行/终态或其他审批人节点）。

# 手动指定操作参数
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket approve --ticket-id 98045537 --op-key next --status waiting_execute --current-status biz_reviewers_reviewing
```

## 过滤与时间范围

```bash
# 按工单 ID/关键字/状态/申请人过滤
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-pending-approval \\
  --ticket-id 123 \\
  --keyword "cert" \\
  --status 1,2 \\
  --applicant "alice"

# 指定最近 1 小时
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-created --range 1h

# 指定时间区间（支持时间戳/RFC3339）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-all \\
  --start 1700000000 --end 1700100000
```

## 站点切换

```bash
# BOE
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-created --cloud-ticket-site boe

# I18N
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-created --cloud-ticket-site i18n
```
