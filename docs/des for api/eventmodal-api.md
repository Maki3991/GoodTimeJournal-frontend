# 事件记录与编辑弹窗 (Event Modal) 后端接口需求

本文档定义了 `EventModal.vue` 组件运行所需的后端 API 接口。该弹窗用于创建新事件和编辑现有事件。

## 1. 创建新事件

- **目的**: 将用户在弹窗中输入的新事件信息（标题、日期、描述、投入度、能量值、AEIOU元素）保存到数据库。
- **Triggered By**: 用户在弹窗中填写完信息后，点击确认按钮 ("✓")，并且当前是在“创建新事件”的模式下（例如通过主页的“+”按钮打开）。
- **Method**: `POST`
- **Path**: `/api/events`
- **Request Body**:
    - **Content-Type**: `application/json`
    - **Body (Example)**:
      ```json
      {
        "title": "参加项目讨论会议", // 来自弹窗标题输入框
        "date": "2025-04-10",       // 来自弹窗日期输入框 (YYYY-MM-DD格式)
        "description": "和团队讨论了下一阶段的开发计划...", // 来自文本域
        "engagement": 85,          // 投入度滑块值
        "energy": 70,              // 能量值滑块值
        "aeiou": {
          "activities": "讨论、记录、提问", // A元素输入框
          "environments": "公司会议室B",     // E元素输入框
          "interactions": "张三、李四",       // I元素输入框
          "objects": "笔记本电脑、白板笔", // O元素输入框
          "users": "开发团队"            // U元素输入框
        }
      }
      ```
- **Success Response**:
    - **Status Code**: `201 Created`
    - **Body (Example)**: 返回新创建的事件对象，至少包含其 ID。
      ```json
      {
        "id": "evt_126",
        "title": "参加项目讨论会议",
        "date": "2025-04-10",
        // ... 其他字段 ...
        "createdAt": "2025-04-10T09:00:00Z"
      }
      ```
- **Error Response**:
    - **Status Code**: `400 Bad Request` (例如，必填字段缺失、日期格式无效、投入/能量值超出范围)
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `500 Internal Server Error`

## 2. 获取指定事件的详细信息

- **目的**: 当用户点击一个现有事件以进行编辑时，需要从后端获取该事件的完整数据，填充到弹窗的各个输入框中。
- **Triggered By**: 用户通过主页时间轴、活动历史日历或每日视图中的事件节点打开弹窗进行编辑时，弹窗组件挂载 (mounted) 或接收到事件 ID 属性 (prop) 时调用。
- **Method**: `GET`
- **Path**: `/api/events/{id}` (例如 `/api/events/evt_123`)
- **Path Parameters**:
    - `id` (必需, string): 要获取详情的事件的唯一标识符。
- **Success Response**:
    - **Status Code**: `200 OK`
    - **Body (Example)**: 返回指定 ID 事件的完整信息。
      ```json
      {
        "id": "evt_123",
        "title": "完成项目报告初稿",
        "date": "2025-04-06",
        "description": "详细撰写了关于上季度业绩的报告...",
        "engagement": 90,
        "energy": 60,
        "aeiou": {
          "activities": "撰写、查阅资料",
          "environments": "家庭办公室",
          "interactions": "无",
          "objects": "电脑、参考文件",
          "users": "自己"
        },
        "createdAt": "2025-04-06T15:30:00Z",
        "updatedAt": "2025-04-06T16:00:00Z"
      }
      ```
- **Error Response**:
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `404 Not Found` (如果提供的 ID 不存在)
    - **Status Code**: `500 Internal Server Error`

## 3. 更新现有事件

- **目的**: 将用户在弹窗中修改后的事件信息保存回数据库。
- **Triggered By**: 用户在弹窗中修改了现有事件的信息后，点击确认按钮 ("✓")。
- **Method**: `PUT` (或 `PATCH`)
    - `PUT`: 通常表示完全替换资源，需要发送所有字段。
    - `PATCH`: 通常表示部分更新，只需发送修改过的字段。选择哪种取决于后端实现策略。这里以 `PUT` 为例。
- **Path**: `/api/events/{id}` (例如 `/api/events/evt_123`)
- **Path Parameters**:
    - `id` (必需, string): 要更新的事件的唯一标识符。
- **Request Body**:
    - **Content-Type**: `application/json`
    - **Body (Example - using PUT)**: 发送完整的事件对象（包含修改后的值）。
      ```json
      {
        "title": "完成项目报告初稿 v2", // 修改后的标题
        "date": "2025-04-06",
        "description": "详细撰写了关于上季度业绩的报告，并添加了图表。", // 修改后的描述
        "engagement": 95,          // 修改后的投入度
        "energy": 65,              // 修改后的能量值
        "aeiou": {
          "activities": "撰写、查阅资料、制作图表", // 修改后的 A
          "environments": "家庭办公室",
          "interactions": "无",
          "objects": "电脑、参考文件、Excel", // 修改后的 O
          "users": "自己"
        }
      }
      ```
- **Success Response**:
    - **Status Code**: `200 OK` (或 `204 No Content`)
    - **Body (Example - if 200 OK)**: 可以返回更新后的事件对象。
      ```json
      {
        "id": "evt_123",
        "title": "完成项目报告初稿 v2",
        // ... 更新后的所有字段 ...
        "updatedAt": "2025-04-10T11:00:00Z"
      }
      ```
- **Error Response**:
    - **Status Code**: `400 Bad Request` (字段验证失败)
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `404 Not Found` (ID 不存在)
    - **Status Code**: `500 Internal Server Error`

## 4. (暂时省略) 获取 AEIOU 建议

- **目的**: 根据用户输入的事件描述，调用后端 AI 服务生成 AEIOU 元素的建议，供用户参考。
- **Triggered By**: 可能在用户输入事件描述时（例如，使用 debounce 技术延迟触发）或点击某个“生成建议”按钮时（如果添加该按钮）。
- **Method**: `POST`
- **Path**: `/api/ai/suggest-aeiou` (或者 `/api/events/suggest-aeiou`)
- **Request Body**:
    - **Content-Type**: `application/json`
    - **Body (Example)**:
      ```json
      {
        "description": "和团队在公司会议室B激烈讨论了新功能的设计，使用了白板和便利贴。"
      }
      ```
- **Success Response**:
    - **Status Code**: `200 OK`
    - **Body (Example)**: 返回 AI 生成的建议内容。
      ```json
      {
        "suggestions": {
          "activities": "讨论、设计、记录",
          "environments": "公司会议室B",
          "interactions": "团队成员",
          "objects": "白板、便利贴",
          "users": "自己、团队"
        }
      }
      ```
- **Error Response**:
    - **Status Code**: `400 Bad Request` (描述为空)
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `503 Service Unavailable` (如果后端 AI 服务未配置或不可用)
    - **Status Code**: `500 Internal Server Error` (AI 调用失败等)

---

**总结:**

`EventModal.vue` 核心需要与后端进行 **创建 (Create)**、**读取 (Read - 单个)** 和 **更新 (Update)** 事件的操作。此外，根据描述，可能还需要一个可选的接口来支持 **AI 生成 AEIOU 建议**。