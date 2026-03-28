# Goofy Deploy

## Sites

```bash
# List supported sites
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-sites
```

Supported sites:
- `cn` - Production (cloud.bytedance.net)
- `boe` - Test environment (cloud-boe.bytedance.net)

## Quick Preview

```bash
# Deploy current directory or build output to a quick preview
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy preview deploy . --alias <alias>

# Update an existing alias
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy preview deploy dist --alias <alias> --override

# List previews
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy preview list --page-num 1 --page-size 20

# Remove a preview
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy preview remove --preview-id <preview_id>

# Open preview dashboard
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy preview dashboard
```

Preview uses a single shared environment and does not require `--site`.

## Teams

```bash
# Get team details
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy get-team --team-id <team_id> --site cn
```

## Projects

```bash
# List projects in a team
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-projects --team-id <team_id> --site cn --page-num 1 --page-size 20

# Get project details
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy get-project --app-id <app_id> --site cn
```

## Regions & Channels

```bash
# List deployment regions for a project
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-regions --app-id <app_id> --site cn

# Create a deployment channel (requires region-id)
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy create-channel \
  --region-id <region_id> \
  --name <channel_name> \
  --env-name <env_name> \
  --site cn

# List deployment channels for a project
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-channels --app-id <app_id> --site cn
```

## Deployments

```bash
# List deployment history for a project
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-deployments --app-id <app_id> --site cn --page-num 1 --page-size 20

# Get deployment details
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy get-deployment --deploy-id <deploy_id> --site cn
```

## Triggering Deployments

### Deploy New Version (from git branch + commit)

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy deploy-new \
  --channel-id <channel_id> \
  --git-branch <branch_name> \
  --commit-hash <commit_hash> \
  --site cn
```

### Deploy Existing Version (rollback)

```bash
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy deploy-version \
  --channel-id <channel_id> \
  --scm-version <version> \
  --site cn
```

## Example Workflow

```bash
# 1. List regions
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-regions --app-id 131716 --site cn
# Output shows region IDs like 224335

# 2. (Optional) create channel
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy create-channel \
  --region-id 224335 \
  --name wjb-test2 \
  --env-name ppe_wjb_test2 \
  --site cn

# 3. Get project channels
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-channels --app-id 131716 --site cn
# Output shows channel IDs like 3520795

# 4. Check recent deployments
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy list-deployments --app-id 131716 --site cn
# Output shows versions like 1.0.0.47

# 5a. Deploy new version
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy deploy-new \
  --channel-id 3520795 \
  --git-branch main \
  --commit-hash ff951a2f391eeecb0f9ac4bb4e30a6ff256a7909 \
  --site cn

# 5b. Or rollback to existing version
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest goofy deploy deploy-version \
  --channel-id 3520795 \
  --scm-version 1.0.0.47 \
  --site cn
```

## Aliases

- 主入口：`goofy deploy *` / `goofy preview *`
- 可用别名：`gd` = `goofy-deploy`
