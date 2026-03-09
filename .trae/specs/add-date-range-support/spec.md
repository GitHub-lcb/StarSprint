# 时间选择支持时间段范围 Spec

## Why
目前用户只能选择从今天开始往回推的一个固定天数。支持时间段选择可以让用户更灵活地发现历史某个特定时间段内的爆发项目。

## What Changes
- **BREAKING**: 将 `SearchParams` 中的 `days` (number) 替换为 `dateRange` (包含开始和结束日期的元组)。
- 更新 `SearchForm` 组件，使用 Ant Design 的 `RangePicker` 替换 `InputNumber`。
- 更新 `github.ts` 服务，根据选择的开始和结束日期构造 GitHub 搜索查询。
- 更新 `App.tsx` 的初始状态管理以支持日期范围。

## Impact
- 受影响的代码: [index.ts](file:///e:/develop-lcb/workspace/StarSprint/src/types/index.ts), [github.ts](file:///e:/develop-lcb/workspace/StarSprint/src/services/github.ts), [SearchForm.tsx](file:///e:/develop-lcb/workspace/StarSprint/src/components/SearchForm.tsx), [App.tsx](file:///e:/develop-lcb/workspace/StarSprint/src/App.tsx)。

## ADDED Requirements
### Requirement: 时间段范围选择
系统应允许用户选择一个特定的开始日期和结束日期。

#### Scenario: 成功查询
- **WHEN** 用户在 `RangePicker` 中选择了 2024-01-01 到 2024-01-07
- **THEN** 系统应发起 `created:2024-01-01..2024-01-07` 的 GitHub API 请求。

## MODIFIED Requirements
### Requirement: 参数传递
`SearchParams` 接口现在必须包含 `startDate` 和 `endDate` (字符串格式)。
