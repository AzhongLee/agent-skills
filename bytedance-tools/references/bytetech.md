# ByteTech

```bash
# 登录 / 登录态
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech login
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech login --no-terminal-qr
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech status

# 榜单 / 信息流
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech rank
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech rank --period month
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech hot
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech latest

# 搜索
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech search "MCP"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech search "MCP" --section articles --cursor 20
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest --json bytetech search "MCP"

# 抓取文章正文 / 飞书文档
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "7612739301717377050"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytetech.info/articles/7612739301717377050"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytedance.larkoffice.com/docx/H4ondm4QYol4PHxrc7ScEVH3nqc"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytedance.larkoffice.com/wiki/ZAQAwppYQit9RfkvOBdcQrSmner"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytedance.larkoffice.com/docx/H4ondm4QYol4PHxrc7ScEVH3nqc" --no-download-images

# 登出
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech logout
```
