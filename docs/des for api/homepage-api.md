# 主页 (Homepage) 后端接口需求

本文档定义了 `HomePage.vue` 组件运行所需的后端 API 接口。

## 1. 获取近期事件概览 (用于时间线展示)

- **目的**: 获取最近记录的事件，按日期分组，用于在主页时间线上展示。
- **Method**: `GET`
- **Path**: `/api/events/timeline`
- **Query Parameters**:
    - `limit` (可选, number): 限制返回的天数或事件数量 (具体由后端决定，建议按天数限制，例如 `limit=7` 返回最近 7 天的数据)。如果不传，后端可以提供一个默认值。
    - `page` / `cursor` (可选, number/string): 用于支持"加载更多"或分页，获取更早的事件。
- **Success Response**:
    - **Status Code**: `200 OK`
    - **Body (Example)**: 返回一个按日期降序排列的数组，每个元素包含日期和当天的事件列表。

      ```json
      [
        {
          "date": "2025-04-06",
          "events": [
            { "id": "evt_123", "title": "事件1标题" },
            { "id": "evt_124", "title": "事件2标题" },
            { "id": "evt_125", "title": "事件3标题" }
          ]
        },
        {
          "date": "2025-04-05",
          "events": [
            { "id": "evt_121", "title": "事件1标题" },
            { "id": "evt_122", "title": "事件2标题" }
          ]
        },
        {
          "date": "2025-04-04",
          "events": [
             { "id": "evt_118", "title": "事件1标题" },
             { "id": "evt_119", "title": "事件2标题" },
             { "id": "evt_120", "title": "事件3标题" }
          ]
        }
        // ... more dates
      ]
      ```
- **Error Response**:
    - **Status Code**: `401 Unauthorized` (如果需要认证)
    - **Status Code**: `500 Internal Server Error`

## 2. 搜索事件

- **目的**: 根据用户在搜索框输入的关键词，查找匹配的事件记录。
- **Method**: `GET`
- **Path**: `/api/events/search`
- **Query Parameters**:
    - `q` (必需, string): 用户输入的搜索关键词。
    - `page` (可选, number, 默认 1): 分页页码。
    - `pageSize` (可选, number, 默认 10): 每页返回数量。
- **Success Response**:
    - **Status Code**: `200 OK`
    - **Body (Example)**: 返回匹配的事件列表，包含足够的信息供用户识别。

      ```json
      {
        "results": [
          {
            "id": "evt_123",
            "date": "2025-04-06",
            "title": "关于项目讨论的事件1", // 事件标题或简述
            "snippet": "...搜索关键词高亮显示..." // 可选：包含关键词的片段
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
    - **Status Code**: `400 Bad Request` (例如 `q` 参数缺失)
    - **Status Code**: `401 Unauthorized`
    - **Status Code**: `500 Internal Server Error`
