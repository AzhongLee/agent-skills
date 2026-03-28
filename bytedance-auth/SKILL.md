---
name: bytedance-auth
description: "Operate bytedcli SSO authentication. Use when user asks to login/logout, check auth status, or fetch user info for ByteDance internal APIs."
---

# bytedcli 认证/SSO

## When to use

- 登录/登出
- 查看登录状态或用户信息
- 获取 SSO/Bytecloud token

## 前置条件

- 使用通用调用方式：`references/invocation.md`

> 示例省略 invocation 前缀。

## Quick start

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login --no-terminal-qr
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login --qr-image
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json auth login
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth status
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth userinfo
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth logout
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth get-sso-token
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth get-bytecloud-jwt-token
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth get-codebase-jwt-token
```

## Notes

- 未登录会提示 `Not authenticated`
- 需要结构化输出加 `--json`（全局选项，放在子命令之前，如 `NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json auth status`）
- `auth login` 默认会显示终端二维码
- `auth login --no-terminal-qr` 会关闭终端二维码，并在未显式传入 `--qr-image` 时自动生成临时 PNG 路径
- `auth login --qr-image [path]` 可额外把二维码保存为 PNG；省略 path 时会自动写入系统临时目录，适合异步扫码登录流程
- `--json auth login` 会自动关闭终端二维码，并默认生成临时二维码图片，便于 agent/脚本消费 `qr_image_ready`
- **认证隔离按 SSO 环境生效（不是按 site 全隔离）**：`i18n-tt` 使用 TikTok SSO（`sso.tiktok-intl.com`），与 `prod` / `i18n-bd` / `boei18n`（ByteDance SSO，`sso.bytedance.com`）登录态隔离；`boe`（`test-sso.bytedance.net`）也独立
- `prod`、`i18n-bd`、`boei18n` 通常共享 ByteDance SSO 登录态；`i18n-tt` 需要单独登录
- 若本地 SSO / JWT override 不可用，`auth get-bytecloud-jwt-token` 会按 `BYTEDCLI_USER_CLOUD_JWT -> AIME_USER_CLOUD_JWT` 自动回退读取环境变量
- 操作目标站点前，先检查该站点认证状态；若 i18n-tt 未认证则先登录：

```bash
# 检查 i18n-tt 站点认证状态
BYTEDCLI_CLOUD_SITE=i18n-tt NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth status

# 登录 i18n-tt 站点
BYTEDCLI_CLOUD_SITE=i18n-tt NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login

# 例如检查 i18n-bd 站点（通常可复用 prod 登录态）
BYTEDCLI_CLOUD_SITE=i18n-bd NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth status
```

## References

- `references/auth.md`
