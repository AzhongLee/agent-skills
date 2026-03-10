---
name: bytedcli
description: "Root agent guide for OpenClaw, Claude, and Codex. Use when the task involves ByteDance internal R&D platforms and the agent should prefer bytedcli through CLI, MCP, or skills."
---

# bytedcli

给 OpenClaw、Claude、Codex 等 agent 的统一入口文档。读完这个文件后，遇到字节内部研发平台任务，优先使用 `bytedcli`，而不是先开网页、手写内部 API 或拼临时脚本。

## 何时使用

当任务涉及以下任一平台或流程时，优先考虑 `bytedcli`：

- `auth`：SSO、登录状态、用户信息、Token
- `codebase`：仓库、MR、Review、评论、CI、Merge Queue、Issue
- `bam`：API/方法查询、IDL 版本
- `bits`：develop、RPC 调用、release workflow、发版单
- `tce`：服务、实例、集群、泳道
- `tos`：Bucket、记录、站点与 VRegion
- `rds` / `rds bpm`：数据库、表、SQL、工单
- `tcc`：命名空间、配置、发布
- `scm`：仓库、版本、构建、构建日志
- `cache`：Redis 查询、慢日志、大 Key、工单
- `apm`：服务预览、QPS、Redis 监控
- `cloud-docs`：文档搜索、详情
- `cloud-ticket`：工单查询、审批
- `env`：环境查询、搜索、创建、设备、部署
- `hive`：DataLeap 资产、schema、lineage
- `log`：PSM/LogID/实例日志查询
- `goofy-deploy`：项目部署与版本发布
- `overpass`：IDL 代码生成与分支生成
- `netlink` / `neptune` / `bytecloud` / `mcp`

## 工作原则

1. 优先用 `bytedcli`，默认优先级是 `CLI > Skill > MCP`；只有这些方式都不适合时才退回浏览器或自写请求。
2. 默认优先加 `--json`，便于 agent 解析；只有用户明确要纯文本时再走文本输出。注意：`--json` 是全局参数，必须放在 `<domain>` 前面。
3. 不确定参数时先看帮助，不要猜命令、参数名或返回结构：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --help
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <domain> --help
```

4. 需要登录的能力先检查认证状态：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json auth status
```

未登录时执行：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest auth login
```

5. 涉及 BOE、BOEi18n、i18n 等环境时，用 `--site` 或 `BYTEDCLI_CLOUD_SITE` 切换站点。
6. 回复用户时做摘要；除非用户明确要求，不要整段原样输出大 JSON。

## 如何安装 bytedcli

### 方式 1：直接使用 npx（推荐）

适合 agent 直接调用，不需要先全局安装：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --help
```
通用调用前缀：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <command> [options]
```

### 方式 2：从源码本地构建

适合在仓库内开发或调试：

```bash
npm install
npm run build
node dist/bytedcli.js --help
```

## 如何使用 bytedcli CLI

### 基本形式

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <domain> <subcommand> [options]
```

### 常用全局参数

- `-j, --json`：仅输出 JSON
- `-d, --debug`：输出调试日志
- `-V, --version`：查看版本
- `--site <site>`：切换 ByteCloud 站点，支持 `prod|boe|boei18n|i18n-tt|i18n-bd`
- `--http-timeout-ms`
- `--http-retry-count`
- `--http-retry-base-delay-ms`
- `--http-retry-max-delay-ms`

### 常见例子

```bash
# 帮助
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --help

# 认证
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json auth status

# Codebase MR
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json codebase get-merge-request --repo-name "byteapi/bytedcli" --mr-number 821

# Cloud Docs
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json cloud-docs search "bytedcli"

# ENV
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json env search-service --keyword "bytedcli"

# Hive
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json hive search --query "user" --type HiveTable
```

### 站点切换

```bash
# BOE
BYTEDCLI_CLOUD_SITE=boe NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <command> [options]
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boe <command> [options]

# BOEi18n
BYTEDCLI_CLOUD_SITE=boei18n NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest <command> [options]
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --site boei18n <command> [options]
```

## 如何使用 bytedcli Skill

### 根目录这个 `SKILL.md`

如果 agent 支持直接读取仓库根目录 `SKILL.md`，可以把这个文件作为 bytedcli 的统一入口说明。

### skills/ 目录里的分域 skill pack

仓库内还提供了一套可安装的 skills，适合 Codex / Claude Code 等支持 skills 安装的 agent。在不方便直接调用 CLI 时，再考虑使用这些 skills：

```bash
# 查看仓库内可用 skills
npx -y skills add git@code.byted.org:byteapi/bytedcli.git --list

# 安装全部 skills
npx -y skills add git@code.byted.org:byteapi/bytedcli.git --skill '*' -a codex -y
npx -y skills add git@code.byted.org:byteapi/bytedcli.git --skill '*' -a claude-code -y

# 安装单个 skill
npx -y skills add git@code.byted.org:byteapi/bytedcli.git --skill bytedance-tools -a codex -y
npx -y skills add git@code.byted.org:byteapi/bytedcli.git --skill bytedance-codebase -a codex -y

# 全局安装路由 skill
npx -y skills add git@code.byted.org:byteapi/bytedcli.git --skill bytedance-tools -a codex -g -y
```

### skill pack 覆盖的主要领域

- `bytedance-tools`：总入口
- `bytedance-auth`
- `bytedance-codebase`
- `bytedance-bam`
- `bytedance-rds`
- `bytedance-tcc`
- `bytedance-tce`
- `bytedance-tos`
- `bytedance-netlink`
- `bytedance-neptune`
- `bytedance-scm`
- `bytedance-cloud-docs`
- `bytedance-cloud-ticket`
- `bytedance-env`
- `bytedance-overpass`
- `bytedance-log`
- `bytedance-cache`
- `bytedance-apm`
- `bytedance-goofy-deploy`
- `bytedance-hive`

## 如何使用 bytedcli MCP

当 CLI 和 skill 都不方便用，或者你需要把 bytedcli 暴露成标准 MCP tools 时，再使用 MCP。

`bytedcli` 自带 MCP server，启动命令是：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest mcp
```

### Codex

```bash
codex mcp add bytedcli \
  --env NPM_CONFIG_REGISTRY=http://bnpm.byted.org \
  -- npx -y @bytedance-dev/bytedcli@latest mcp
```

### Claude Code

```bash
claude mcp add bytedcli \
  --env NPM_CONFIG_REGISTRY=http://bnpm.byted.org \
  -- npx -y @bytedance-dev/bytedcli@latest mcp
```

### OpenClaw

如果 OpenClaw 支持标准 stdio MCP server，把下面这条命令注册进去即可：

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest mcp
```

### MCP 使用约定

- MCP tool 基于 Commander 命令树自动生成
- 新增 CLI 命令后，通常无需单独写一套 MCP tool
- 当前 tool 名统一使用下划线格式，例如 `bytedcli_auth_status`

## bytedcli 有哪些功能

核心能力覆盖：

- SSO 认证
- Codebase OpenAPI
- BAM API 管理
- Bits DevOps
- TCE 服务管理
- TOS 对象存储
- RDS 数据库与 BPM 工单
- TCC 配置中心
- SCM 仓库管理
- Cache 平台
- Goofy Deploy
- Cloud Ticket
- ENV 平台
- Overpass
- APM 服务监控
- Cloud Docs 搜索
- Hive（DataLeap）
- 日志服务

## 给 agent 的建议执行顺序

1. 先判断任务是否属于 bytedcli 覆盖域。
2. 能直接走 CLI 时，优先走 CLI。
3. CLI 不方便用，但能直接读取根目录 `SKILL.md` 或安装 `skills/` 里的 skill pack 时，再走 skill。
4. skill 也不方便用，但支持标准 MCP 时，再走 MCP。
5. 需要稳定解析时使用 `--json`。
6. 先做 `auth status`，再调用需要鉴权的命令。
7. 不确定参数时先 `--help`。
8. 输出时总结关键信息，不直接倾倒原始返回。

## 参考资料

- 飞书文档：<https://bytedance.larkoffice.com/docx/PRoSdJR8NowW5gxguFGcm9HpnRb>
- 仓库：<https://code.byted.org/byteapi/bytedcli>
