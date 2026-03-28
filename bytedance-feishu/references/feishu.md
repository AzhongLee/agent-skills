# Feishu 能力与工作流

这个 skill 面向协作工作流，不只是“会调某个命令”。下面是推荐的能力映射。

## 1. 文档协作

适用场景：

- 读取需求文档、会议纪要、周报
- 生成新文档
- 在现有文档中追加或替换章节

推荐流程：

1. `feishu docs fetch-doc` 读取文档正文
2. 分析用户意图，提取需要执行的动作
3. 需要新建时用 `feishu docs create-doc`
4. 需要局部修改时优先 `feishu docs update-doc`
5. 需要协作反馈时用 `feishu drive doc-comments create`

## 2. 约会议

适用场景：

- “帮我约一个会”
- “查一下我和某人的空闲时间”
- “把某某加入会议”

推荐流程：

1. `feishu user search` 解析参与人的 `open_id`
2. `feishu calendar calendar list` 选择主日历
3. 如需先查忙闲，使用 `feishu calendar freebusy ...`
4. `feishu calendar event create` 创建会议
5. `feishu calendar attendee create` 添加参会人
6. 回传明确的绝对时间，而不是只写“今天下午”

## 3. 创建待办

适用场景：

- “给我建个待办”
- “和某某一起跟进这个事项”
- “给任务补评论/子任务”

推荐流程：

1. `feishu user search` 解析人员
2. `feishu task task create` 创建主任务
3. 需要拆分工作时用 `feishu task subtask create`
4. 需要补充说明时用 `feishu task comment create`

## 4. 搜索与导航

适用场景：

- 找某个文档、Wiki、群聊或用户

推荐命令：

- 用户：`feishu user search`
- 文档 / Wiki：`feishu search doc-wiki`
- 群聊：`feishu chat search`
- Wiki 空间 / 节点：`feishu wiki space ...`、`feishu wiki node ...`

## 5. 消息与聊天

适用场景：

- 给人发消息
- 回复消息
- 查群、查消息历史、拉取消息资源

推荐流程：

1. 先通过 `user search` 或 `chat search` 拿到目标 ID
2. 确认应用本身已开通 `im:message:send_as_bot`；发送接口使用应用身份和 `tenant_access_token`，不是用户 OAuth token
3. `feishu im message send` 或 `reply`
4. 需要定位上下文时再用 `messages` / `resource`

## 6. 表格与多维表格

适用场景：

- 更新电子表格
- 导出表格
- 写 Bitable 记录

推荐命令：

- 电子表格：`feishu sheet read/write/append/find/create/export`
- 多维表格：`feishu bitable app/table/record/field/view`

实践建议：

- 简单二维数据优先 `--values-json`
- 复杂多维表格结构优先 `--body-json`
- 用户给的是 `sheets/...?...table=...&view=...` 时，优先直接用 `feishu bitable record list --url "<sheet链接>"`，CLI 会自动解析真实 `app_token/table_id` 并复用当前视图
- 修改前先读取当前结构，避免误写字段

## 7. IM 富媒体上传

发送图片/文件/视频前需先上传获取 key：

- 图片：`im image upload` → `image_key` → `im message send --msg-type image`
- 文件：`im file upload` → `file_key` → `im message send --msg-type file`
- 视频：`im file upload` + 可选 `im image upload`（封面）→ `im message send --msg-type media`
