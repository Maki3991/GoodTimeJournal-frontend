# 活动历史 (Activity History) 页面后端接口需求

本文档定义了 `ActivityHistory.vue` 组件运行所需的后端 API 接口。

## 1. 获取指定月份的事件概览 (用于日历展示)

- **目的**: 获取指定月份的每日事件数量或简要标识，用于在日历格子中显示事件标记点。
- **Method**: `GET`
- **Path**: `/api/events/calendar/monthly`
- **Query Parameters**:
    - `year` (必需, number): 需要查询的年份 (e.g., `2025`)。
    - `month` (必需, number): 需要查询的月份 (1-12)。
- **Success Response**:
    - **Status Code**: `200 OK`
    - **Body (Example)**: 返回一个对象或数组，包含该月份内有事件的日期及其事件数量 (或少量事件ID/标题)。

      *   **方式一：对象映射 (Date -> Info)**
          ```json
          {
            "2025-04-02": { "eventCount": 3, "eventIds": ["evt_115", "evt_116", "evt_117"] }, // 可选：包含少量ID用于弹窗触发
            "2025-04-03": { "eventCount": 5, "eventIds": ["evt_118", "evt_119", "evt_120"] },
            "2025-04-04": { "eventCount": 2, "eventIds": ["evt_121", "evt_122"] }
            // ... 其他有事件的日期
          }
          ```
      *   **方式二：数组列表**
          ```json
          [
            { "date": "2025-04-02", "eventCount": 3, "eventIds": [...] },
            { "date": "2025-04-03", "eventCount": 5, "eventIds": [...] },
            { "date": "2025-04-04", "eventCount": 2, "eventIds": [...] }
            // ...
          ]
          ```
          *(后端可以根据实现方便选择一种)*
- **Error Response**:
    - **Status Code**: `400 Bad Request` (例如年份或月份无效)
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `500 Internal Server Error`

## 2. 搜索历史事件

- **目的**: 根据用户在活动历史页面的搜索框输入的关键词，查找所有匹配的事件记录。
- **Method**: `GET`
- **Path**: `/api/events/search`  *(与主页搜索共用同一接口)*
- **Query Parameters**:
    - `q` (必需, string): 用户输入的搜索关键词。
    - `page` (可选, number, 默认 1): 分页页码。
    - `pageSize` (可选, number, 默认 10): 每页返回数量。
    - `sortBy` (可选, string, e.g., `date_desc`): 排序方式，默认为按日期降序。
    - `filter` (可选, string): 其他可能的过滤条件（暂定）。
- **Success Response**:
    - **Status Code**: `200 OK`
    - **Body (Example)**: 返回匹配的事件列表，格式与主页搜索类似，但前端可能会根据此页面的上下文展示结果。

      ```json
      {
        "results": [
          {
            "id": "evt_123",
            "date": "2025-04-06",
            "title": "关于项目讨论的事件1",
            "snippet": "...搜索关键词高亮显示..."
          },
          {
            "id": "evt_115",
            "date": "2025-04-02",
            "title": "另一个包含关键词的事件",
            "snippet": "..."
          }
          // ... more results
        ],
        "pagination": {
          "currentPage": 1,
          "pageSize": 10,
          "totalResults": 25,
          "totalPages": 3
        }
      }
      ```
- **Error Response**:
    - **Status Code**: `400 Bad Request`
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `500 Internal Server Error`

---

**注意:**

*   **点击事件 (`event-item`)**: 点击日历中的具体事件标记会打开 `EventModal`。`EventModal` 自身将负责调用 `GET /api/events/{id}` 接口来获取该事件的完整详细信息，因此获取事件详情的 API 不直接由 `ActivityHistory.vue` 调用。
*   **点击日期单元格**: 点击日历中的日期单元格会导航到 `EverydayView`。`EverydayView` 页面将负责调用接口获取该特定日期的所有事件列表，例如 `GET /api/events/daily?date=YYYY-MM-DD`。这个 API 也不直接由 `ActivityHistory.vue` 调用。
*   **月份切换**: 当用户切换月份时，前端会再次调用 `/api/events/calendar/monthly` 接口，传入新的 `year` 和 `month` 参数。
