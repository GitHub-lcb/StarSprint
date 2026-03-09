# StarSprint 实施计划

本项目将构建一个名为 **StarSprint** 的轻量级 GitHub 增长雷达工具。它将基于 **React** 和 **Ant Design** 构建，通过 GitHub REST API 实时计算并展示增长速度最快的新兴开源项目。

## 1. 技术栈确认
- **框架**: Vite + React
- **UI 组件库**: Ant Design (AntD)
- **API 通信**: Axios
- **样式**: Tailwind CSS (辅助布局)

## 2. 核心功能实现步骤

### 阶段 1: 基础架构搭建
- 初始化 Vite + React (TypeScript) 项目。
- 安装必要的依赖：`antd`, `axios`, `lucide-react` (图标)。
- 配置 Tailwind CSS。

### 阶段 2: GitHub API 集成
- 实现核心搜索逻辑：
  - 构造搜索查询字符串（例如：`created:>=YYYY-MM-DD stars:>=N`）。
  - 调用 GitHub `search/repositories` 接口。
- 实现 GitHub Token 支持：
  - 在设置界面中保存 Token 到 `localStorage`。
  - 在 Axios 请求头中添加 `Authorization: token YOUR_TOKEN`。

### 阶段 3: 增长率计算逻辑
- 定义增长速度公式：`GrowthRate = TotalStars / max(1, DaysSinceCreated)`。
- 对 API 返回的结果进行二次处理：
  - 计算每个仓库的年龄（天）。
  - 应用公式计算增长率。
  - 按增长率降序排序。

### 阶段 4: UI 界面开发
- **Header**: 应用名称和 GitHub 链接。
- **Search Panel**: 
  - 输入框：统计天数 (默认为 7)。
  - 输入框：最小 Stars (默认为 100)。
  - 输入框：结果数量 (默认为 30)。
  - 设置按钮：输入并保存 GitHub Token。
- **Result Table**:
  - 列：排名、仓库名称 (带链接)、Stars、增长率、创建日期、描述。
  - 加载状态：AntD 的 Skeleton 或 Spin。

### 阶段 5: 测试与验证
- 验证 API 限流情况下的友好提示。
- 测试不同参数组合下的结果准确性。
- 确保响应式布局，在不同屏幕尺寸下表现良好。

## 3. 待办事项清单 (Todo List)
1. [ ] 初始化 Vite + React 项目
2. [ ] 安装 antd, axios 等依赖
3. [ ] 编写 GitHub API 封装模块
4. [ ] 实现计算逻辑和排序
5. [ ] 开发 UI 界面和表格组件
6. [ ] 添加 Token 设置和本地存储功能
7. [ ] 最终测试和性能优化
