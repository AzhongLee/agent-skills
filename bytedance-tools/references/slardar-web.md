# Slardar Web

```bash
# Query Slardar Web Assistant
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest slardar-web query-assistant "查询bid为slardar_test，最近1天的JS错误数，按照错误信息分组"

# Call raw alarm rule-list
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest slardar-web alarm-rule-list --origin <slardar-origin> --bid <bid> --site-type web

# Call raw alarm history
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest slardar-web alarm-history --origin <slardar-origin> --bid <bid> --site-type web --rule-id <rule-id> --start-time <start-time> --end-time <end-time> --env <env>

# Analyze a Slardar alarm URL
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest slardar-web analyze-alarm-url "<slardar-alarm-url>"

# Analyze a Slardar alarm URL and return structured JSON for agent composition
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json slardar-web analyze-alarm-url "<slardar-alarm-url>"
```
