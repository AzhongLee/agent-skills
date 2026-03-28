# BAM

```bash
# PSM 列表
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam list-recent-psm --cluster default
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam list-starred-psm --cluster default
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam search-psm "codebase.app.openapi" --cluster default

# 方法列表 / 详情
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam list-method --psm "codebase.app.openapi"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam get-method --endpoint-id 2404309 --version 1.0.337
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam get-method --psm "codebase.app.openapi" --method "GetRepository"

# 版本历史
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam versions "codebase.app.openapi" --cluster default

# 创建/更新 IDL 版本（--next-version 自动 patch +1；或 --version 指定版本号）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam update-idl-version --psm "codebase.app.openapi" --branch master --next-version
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bam update-idl-version --psm "codebase.app.openapi" --branch "codex/fix-idl" --version "1.0.338" --commit-id "abc1234" --commit-msg "update idl"
```
