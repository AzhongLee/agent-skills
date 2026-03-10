---
name: bytedance-cloud-ticket
description: "Operate Cloud Ticket workflow tickets: pending approvals, created by me, all tickets with filters/time ranges, and approve workflow transitions."
---

# Cloud Ticket（bytedcli）

## When to use

- 查询待我审批的工单
- 查询我发起的工单
- 查询全部工单并按条件过滤（ID/关键字/状态/申请人/时间范围）
- 对工单执行“通过/流转”操作（approve）

## 前置条件

- 使用通用调用方式：`references/invocation.md`
- 需要鉴权的命令先登录：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login`

## Quick start

```bash
# 站点/环境列表（best-effort）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-sites

# 待我审批（默认最近 3 个月）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-pending-approval

# 我发起的
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-created

# 全部
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket list-all

# 通过工单（自动选择 next）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest cloud-ticket approve --ticket-id 98045537

# 通过链式审批（同一审批人可继续时自动跟进）
# 说明：一次 approve 后如果你仍是下一节点的可审批人，可再次执行 approve。
# 判断方法：先执行 cloud-ticket list-all（或 list-pending-approval）确认工单仍在待办，
# 且下一步可执行操作可见 next；再重复执行 cloud-ticket approve。
# 连续通过时无需复杂脚本，按人工/脚本循环“approve + 查询状态”即可。
```

## Notes

- 默认时间范围为最近 3 个月，可用 `--start/--end/--range` 覆盖
- 站点切换用 `--cloud-ticket-site cn|boe|i18n`
- 需要结构化输出加 `--json`

## References

- `references/cloud_ticket.md`
