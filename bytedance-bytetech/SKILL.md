---
name: bytedance-bytetech
description: "Operate ByteTech via bytedcli: Feishu QR login, login status, article search/rank/feed, and fetch ByteTech articles or linked Lark docs. Use when tasks mention ByteTech, 技术文章检索, 热门文章, 月榜/日榜, or want to read a ByteTech article / Lark wiki/docx/doc through bytedcli."
---

# bytedcli ByteTech

## When to use

- ByteTech 登录、登出、检查登录态
- 搜索站内文章、应用、问答、回答、视频、活动
- 查看文章日榜 / 月榜、热门、最新
- 抓取 ByteTech 文章正文，或读取文章挂载的飞书 `wiki/docx/doc` 内容

## 前置条件

- 使用通用调用方式：`references/invocation.md`
- 首次使用先登录：`bytetech login`
- 如果飞书网页态过期或抓取飞书文档失败，重新执行 `bytetech login --force`

> 示例省略 invocation 前缀。

## Quick start

```bash
# 登录 / 状态
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech login
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech status

# 榜单与信息流
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech rank
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech rank --period month
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech hot
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech latest

# 搜索
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech search "MCP"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech search "MCP" --section articles --cursor 20

# 抓取文章 / 飞书文档
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "7612739301717377050"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytetech.info/articles/7612739301717377050"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytedance.larkoffice.com/docx/H4ondm4QYol4PHxrc7ScEVH3nqc"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytedance.larkoffice.com/wiki/ZAQAwppYQit9RfkvOBdcQrSmner"
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech fetch-url "https://bytedance.larkoffice.com/docx/H4ondm4QYol4PHxrc7ScEVH3nqc" --no-download-images

# 登出
NPM_CONFIG_REGISTRY=http://bnpm.byted.org npx -y @bytedance-dev/bytedcli@latest bytetech logout
```

## Notes

- `bytetech search` 默认搜索综合板块，可用 `--section articles|apps|questions|answers|videos|activities` 切换
- `bytetech rank` 默认查询日榜，可用 `--period month` 查月榜
- `bytetech hot` / `bytetech latest` 支持 `--cursor` 继续翻页
- `bytetech fetch-url` 支持三种输入：文章 ID、ByteTech 文章链接、飞书 `wiki/docx/doc` 链接
- `bytetech fetch-url` 默认会下载飞书文档图片到本地临时目录；加 `--no-download-images` 可跳过
- 需要机器可读输出时加 `--json`，并把它放在子命令前，例如 `--json bytetech search "MCP"`

## References

- `references/bytetech.md`
- `references/troubleshooting.md`
