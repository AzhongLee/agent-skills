<!-- bytedcli: skip-shared-reference-sync -->

# 常见问题与处理

## 1. Not authenticated

- 原因：还没有完成 Feishu/Lark bot OAuth，或 token 已过期
- 处理：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu login
```

## 2. scope 不足 / 需要重新授权

- 现象：命令提示重新授权，或明确要求执行 `feishu login --force-oauth`
- 特别是 `feishu im message send/reply` 依赖应用权限 `im:message:send_as_bot`；它不属于用户 OAuth scope，不能通过 `--scope` 申请
- 处理：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu login --force-oauth
```

## 3. 缺少必填参数

- 现象：命令直接输出 `Missing ...` 和 help
- 处理：先执行对应命令的 `-h`，确认最小输入

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu calendar event create -h
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu task task create -h
```

## 4. 会议或待办涉及人名，但没有 open_id

- 原因：Feishu 接口通常要求 `open_id`
- 处理：先查人，再做写操作

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json feishu user search --query "zhangsan"
```

## 5. 文档更新或复杂写操作参数太长

- 处理：退回 `--body-json`、`--values-json` 或 `--markdown-file`

## 6. 需要在异步/无终端环境里展示二维码

- 现象：Agent 无法把 ANSI 终端二维码直接转发给用户
- 处理：改用 `--no-terminal-qr` 关闭终端二维码；若关闭终端二维码的情况下，未显式传入 `--qr-image`，会自动导出到系统临时目录，也可额外指定 `--qr-image [path]`

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu login --no-terminal-qr
```

## 7. 网络或权限问题

- 确认有内网访问权限
- 确认当前域（`feishu` / `lark`）正确
- 确认已完成 `feishu login`

## 8. `sheet read` 提示 `FEISHU_SHEET_EMBEDDED_BITABLE`

- 原因：该 `sheets/...` URL 实际对应的是嵌在电子表格里的 Bitable block，不是普通 worksheet
- 处理：优先直接改用 `bitable record list --url "<原始 sheet 链接>"`；CLI 会自动通过 Sheets `metainfo` OpenAPI 解析真实 `app_token/table_id`，并继承 URL 里的 `view=...`

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json feishu bitable record list --url "https://bytedance.larkoffice.com/sheets/xxxxxxxx?table=tbl_xxx&view=vew_xxx" --page-size 100
```
