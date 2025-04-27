# 每日视图 (Everyday View) 页面后端接口需求

本文档定义了 `EverydayView.vue` 组件运行所需的后端 API 接口。

## 1. 获取指定日期的所有事件列表

- **目的**: 获取用户在特定日期记录的所有事件的详细信息，用于在该页面展示事件卡片列表。
- **Method**: `GET`
- **Path**: `/api/events/daily`
- **Query Parameters**:
    - `date` (必需, string): 需要查询的日期，格式应为 `YYYY-MM-DD` (例如: `2025-04-05`)。
- **Success Response**:
    - **Status Code**: `200 OK`
    - **Body (Example)**: 返回一个包含当天所有事件对象的数组。每个对象应包含在卡片上展示所需的信息。

      ```json
      [
        {
          "id": "evt_121",
          "title": "事件1标题",
          "description": "这是事件1的简要描述或内容片段...", // 或者完整的描述，取决于设计
          "investment": 70, // 投入度
          "energy": 80,     // 能量值
          "createdAt": "2025-04-05T10:30:00Z" // 可选：创建时间
          // ... 其他可能需要的字段，如 AEIOU 元素概览等
        },
        {
          "id": "evt_122",
          "title": "事件2标题",
          "description": "事件2的描述...",
          "investment": 50,
          "energy": 65,
          "createdAt": "2025-04-05T14:00:00Z"
        }
        // ... 当天的其他事件
      ]
      ```
      *如果当天没有事件，应返回空数组 `[]`。*
- **Error Response**:
    - **Status Code**: `400 Bad Request` (例如日期格式无效)
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `404 Not Found` (如果认为日期无效是 Not Found 而非 Bad Request)
    - **Status Code**: `500 Internal Server Error`

---

**注意:**

*   **数据来源**: `EverydayView.vue` 组件在加载时，需要从路由参数或其他状态管理中获取当前要显示的日期 (`currentDate`)，然后使用这个日期调用上述 `/api/events/daily` 接口来获取事件数据。
*   **点击事件卡片**: 点击事件卡片 (`event-card`) 会打开 `EventModal`。`EventModal` 自身将负责使用事件 `id` 调用 `GET /api/events/{id}` 接口来获取该事件的完整详细信息，包括所有 AEIOU 元素等。因此，获取单个事件完整详情的 API 不直接由 `EverydayView.vue` 调用。
