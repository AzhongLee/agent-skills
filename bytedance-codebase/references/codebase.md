# Codebase (bytedcli)

```bash
# 在 code.byted.org 的 Git 仓库目录内，支持仓库选择器的命令可省略 -R/--repo 或 --repo-name

# Auth
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase auth config-add-pat <pat>
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase auth config-auth --jwt-token <token>

# Repo
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase repo view "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase repo list --query "bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase repo branch create feat/demo -R "byteapi/bytedcli" --from master
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase repo file "README.md" -R "byteapi/bytedcli"

# Issue
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase issue list -R "byteapi/bytedcli" # 默认只看 open
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase issue list -R "byteapi/bytedcli" --status todo --limit 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase issue view "https://code.byted.org/byteapi/bytedcli/issues/52"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase issue comment 24 -R "byteapi/bytedcli" --body "ack"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase issue delete 24 -R "byteapi/bytedcli"

# MR 基础查询
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr view 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr view
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr view "https://code.byted.org/byteapi/bytedcli/merge_requests/821"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr comment list 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr files 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr diff 821 -R "byteapi/bytedcli" --file "path/to/file.ts"

# CI / Check Runs
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr checks 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run list -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr checks --commit <sha> -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run step-log 2395465271 unit_test_and_coverage --run-seq 126 --step-id 1259002466

# Comment
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr comment draft 821 -R "byteapi/bytedcli" --body "draft comment"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr comment publish 821 -R "byteapi/bytedcli" --body "LGTM"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr comment reply 821 -R "byteapi/bytedcli" --thread-id <thread_id> --body "fixed"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr comment resolve -R "byteapi/bytedcli" --id <thread_id>

# 创建 / 更新 PR
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr create -R "byteapi/bytedcli" \
  --title "feat: demo"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr edit 821 -R "byteapi/bytedcli" --body "first line\nsecond line"

# PR 列表 / 生命周期
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr list -R "byteapi/bytedcli" # 默认只看 open
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr list -R "byteapi/bytedcli" --state open -H feature/foo -B master -L 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr count -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr close 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr reopen 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr merge 821 -R "byteapi/bytedcli" --merge-method rebase_merge

# PR Review / Queue
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr review 821 -R "byteapi/bytedcli" --approve --body "LGTM"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr review --comment --body-file ./review.txt
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr reviewer list 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr reviewer update 821 -R "byteapi/bytedcli" --add 123456 --add 234567
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr bypass list 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr bypass create 821 -R "byteapi/bytedcli" --inputs-json '[{"kind":"check_run","target":"check_name"}]'
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue status -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue list -R "byteapi/bytedcli" -L 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue entries 821 -R "byteapi/bytedcli"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue enqueue 821 -R "byteapi/bytedcli" --merge-method rebase_merge
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase mr queue dequeue 821 -R "byteapi/bytedcli"

# Check Run 读写
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run view -R "byteapi/bytedcli" --id c1
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run create -R "byteapi/bytedcli" --payload-json '{"Name":"ci/test","CommitId":"<sha>"}'
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run edit -R "byteapi/bytedcli" --payload-json '{"Id":"c1","Status":"completed","Conclusion":"success"}'
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest codebase run operate -R "byteapi/bytedcli" --payload-json '{"Id":"c1","OperationId":"retry"}'
```

## 迁移说明

- 公开命令树已切换为 `codebase auth|repo|mr|issue|run` 的资源分组形式；MR 评论统一走 `codebase mr comment`，reviewer/bypass/queue 相关操作分别走 `codebase mr reviewer|bypass|queue`，master 上已有的平铺命令仍保留为兼容入口。
- 主仓库选择器统一推荐 `-R, --repo`；PR / issue 编号默认使用位置参数；正文统一用 `--body`，PR 创建改用 `--head/--base`。
- 旧的扁平命令如 `get-merge-request`、`create-mr`、`create-branch`、`list-check-runs` 仍保留为隐藏兼容别名，建议新流程切到新命令树。
