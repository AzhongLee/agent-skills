# 常见问题与处理

## 1. Missing command

- 原因：未指定子命令
- 处理：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <group> --help`

## 2. Missing argument

- 原因：缺少必需位置参数
- 处理：使用 `--help` 查看参数

## 3. Not authenticated

- 原因：未登录或 Token 过期
- 处理：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login`

## 4. 网络/权限问题

- 确认内网访问权限
- 确认已登录且 Token 有效
