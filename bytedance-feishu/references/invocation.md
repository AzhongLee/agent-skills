<!-- bytedcli: skip-shared-reference-sync -->

# bytedcli Feishu 调用方式

## 执行

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu --help
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu <group> <command> [options]
```

## JSON 输出

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json feishu <group> <command> [options]
```

注意：`--json` 是全局参数，必须放在 `feishu` 前面，例如：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json feishu user get
```

## 域切换

Feishu/Lark 域通过 `--domain` 或 `BYTEDCLI_FEISHU_DOMAIN` 控制：

| 值 | 说明 |
|----|------|
| `feishu` | 飞书（默认） |
| `lark` | Lark |

示例：

```bash
# 默认使用 feishu
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json feishu user get

# 显式指定 lark
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json feishu user get --domain lark

# 通过环境变量指定默认域
BYTEDCLI_FEISHU_DOMAIN=lark NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json feishu user get
```

## 鉴权

首次使用或 scope 不足时：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu login
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu login --force-oauth
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu login --no-terminal-qr
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest feishu login --qr-image
```

`feishu login` 默认会显示终端二维码。`--no-terminal-qr` 会关闭终端二维码，并在未显式传入 `--qr-image` 时自动生成临时 PNG 路径。`--json feishu login` 也会自动启用这一行为。

`--qr-image` 支持两种形式：

- `--qr-image <path>`：保存到指定 PNG 路径
- `--qr-image`：自动生成系统临时目录下的 PNG 路径，适合异步扫码流程
