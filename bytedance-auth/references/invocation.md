# bytedcli 通用调用方式

## 执行

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --help
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <command> [options]
```

## BOE / BOEi18n

通过全局参数 `--site` 或环境变量 `BYTEDCLI_CLOUD_SITE` 切换 ByteCloud 站点：

```bash
# BOE
BYTEDCLI_CLOUD_SITE=boe NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <command> [options]
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe <command> [options]

# BOEi18n
BYTEDCLI_CLOUD_SITE=boei18n NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <command> [options]
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boei18n <command> [options]
```

## JSON 输出

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json <command> [options]
```

注意：`--json` 是全局参数，必须放在 `<command>` 前面，例如 `--json auth status`，不能写成 `auth status --json`。

输出结构：

```json
{
  "status": "success|error",
  "data": {"...": "..."},
  "error": "error message",
  "context": {
    "execution_time_ms": 100,
    "timestamp": "2026-01-20T14:15:57.472335"
  }
}
```
