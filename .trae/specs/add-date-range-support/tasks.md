# Tasks
- [x] Task 1: 更新 `SearchParams` 类型定义以支持日期范围。
  - [x] 修改 `src/types/index.ts` 中的 `SearchParams` 接口，将 `days` 替换为 `startDate` 和 `endDate`。
- [x] Task 2: 更新 `github.ts` 服务以根据日期范围构建查询。
  - [x] 修改 `src/services/github.ts` 的 `fetchFastGrowingRepos` 函数。
  - [x] 修改查询逻辑为 `created:${startDate}..${endDate}`。
- [x] Task 3: 更新 `SearchForm.tsx` 组件以使用 `RangePicker`。
  - [x] 导入 `DatePicker` (包含 `RangePicker`)。
  - [x] 替换 `days` 的 `InputNumber` 为 `RangePicker`。
  - [x] 处理表单提交逻辑，将日期对象转换为 `YYYY-MM-DD` 格式的字符串。
- [x] Task 4: 更新 `App.tsx` 以支持新参数。
  - [x] 修改默认搜索参数 `searchParams`。
  - [x] 确保 `handleSearch` 正确处理新的 `SearchParams`。
- [x] Task 5: 验证日期范围查询在 GitHub API 中的表现。
  - [x] 运行开发服务器并执行不同日期范围的查询。

# Task Dependencies
- [Task 2] 取决于 [Task 1]
- [Task 3] 取决于 [Task 2]
- [Task 4] 取决于 [Task 3]
