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
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth status
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth userinfo
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth logout
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth get-sso-token
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth get-bytecloud-jwt-token
```

## Notes

- 未登录会提示 `Not authenticated`
- 需要结构化输出加 `--json`

## References

- `references/auth.md`
