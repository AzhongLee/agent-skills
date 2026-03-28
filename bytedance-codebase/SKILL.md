---
name: bytedance-codebase
description: "Operate Codebase: repositories, merge requests, diffs, files, check runs, and CI analysis."
---

# Codebase（bytedcli）

## When to use

- 仓库查询、MR 详情/评论
- Diff 列表/内容、文件查看
- Check Runs 与 CI 失败分析
- 创建分支
- 创建 Merge Request

## 前置条件

- 使用通用调用方式：`references/invocation.md`
- 认证优先级：本地 `codebase_auth.json` JWT > `BYTEDCLI_USER_CODE_JWT` > `AIME_USER_CODE_JWT` > PAT。需要手动配置 PAT 时使用：`NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase auth config-add-pat <pat>`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 仓库
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase get-repository --repo-name "byteapi/bytedcli"

# MR 详情/评论
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase get-merge-request 821 --repo-name "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr comment list 821 -R "byteapi/bytedcli"

# Diff 文件/内容
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr-changes --repo-name "byteapi/bytedcli" --mr-iid 821
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr-diff 821 --repo-name "byteapi/bytedcli" --file "path/to/file.ts"

# 文件内容
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase get-file --repo-name "byteapi/bytedcli" --path "README.md"

# 创建 Branch
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase repo branch create feat/demo -R "byteapi/bytedcli" --from master

# 创建 MR
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr create -R "byteapi/bytedcli" --title "feat: demo"

# Check Runs / CI
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase list-mr-checks 821 --repo-name "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run list -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase analyze-mr-ci 821 --repo-name "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run step-log 2395465271 unit_test_and_coverage --run-seq 126 --step-id 1259002466

# Issue 评论
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase comment-issue --repo-name "byteapi/bytedcli" --issue-number 24 --content "ack"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase delete-issue --repo-name "byteapi/bytedcli" --issue-number 24

# merge_request scope（新增）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase list-repo-merge-requests --repo-name "byteapi/bytedcli" --status open --page-size 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase get-repo-merge-requests-count --repo-name "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase close-merge-request --repo-name "byteapi/bytedcli" --mr-number 821
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase get-merge-request-mergeability --repo-name "byteapi/bytedcli" --mr-number 821

# review scope（新增）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr review 821 -R "byteapi/bytedcli" --approve --body "LGTM"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr reviewer list 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr reviewer update 821 -R "byteapi/bytedcli" --set 123456 --set 234567

# merge_queue scope（新增）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue status -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue list -R "byteapi/bytedcli" -L 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue enqueue 821 -R "byteapi/bytedcli" --merge-method rebase_merge

# check_run scope（新增）
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase get-check-run --repo-name "byteapi/bytedcli" --id c1
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase create-check-run --repo-name "byteapi/bytedcli" --payload-json '{"Name":"ci/test","CommitId":"<sha>"}'
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase update-check-run --repo-name "byteapi/bytedcli" --payload-json '{"Id":"c1","Status":"completed","Conclusion":"success"}'
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase operate-check-run --repo-name "byteapi/bytedcli" --payload-json '{"Id":"c1","OperationId":"retry"}'
```

## Notes

- `--repo-name` 与 `--repo-id` 二选一
- 在 `code.byted.org` 的 Git 仓库目录内，支持仓库选择器的 Codebase 命令可省略 `-R/--repo` 或 `--repo-name`，CLI 会从当前 `origin` 自动推断仓库
- 在 `code.byted.org` 的 Git 仓库目录内，`codebase run list` / `list-check-runs` 未显式传 `--branch` / `--commit` 时会自动使用当前 Git 分支；`codebase mr create` / `create-mr` 未显式传 `--head` / `--source-branch` 时也会自动使用当前 Git 分支
- `codebase mr list` 默认只返回 open；`codebase issue list` 默认只返回未完成态（`backlog/todo/in_progress`），并支持 `--status open|closed|all`
- `codebase mr view` / `codebase mr review` / `codebase mr reviewer list|update` / `codebase mr bypass list|create` / `codebase mr queue entries|enqueue|dequeue` 支持 `<number> | <url> | <branch>`，未传 selector 时会默认回落到当前 Git 分支；`codebase issue view` 支持 `<number> | <url>`
- MR 评论入口统一走 `codebase mr comment ...`；常用 thread 动作使用 `codebase mr comment reply|resolve|unresolve`
- MR 级检查入口使用 `codebase mr checks`；公开的 check run 入口使用 `codebase run list/view/step-log`；只兼容 master 上已有的平铺命令（如 `list-check-runs` / `get-check-run`），不保留 `codebase ci` / `codebase check`
- 缺少必填参数会输出完整帮助
- 需要结构化输出加 `--json`（全局选项，放在子命令之前，如 `NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json codebase get-merge-request ...`）
- 如果运行环境已经注入 `BYTEDCLI_USER_CODE_JWT` 或 `AIME_USER_CODE_JWT`，无需额外执行 `codebase auth config-auth`
- 新增 scope 命令较多，完整列表见 `references/codebase.md` 的"新增命令清单"
- **MR 评论数据结构**：Thread 用 `.Positions`（复数/数组），Comment 用 `.Position`（单数/对象）

## References

- `references/codebase.md`
