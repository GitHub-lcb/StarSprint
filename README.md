# 🚀 StarSprint - GitHub 增长雷达

StarSprint 是一款极简、现代的 GitHub 仓库增长分析工具。它可以帮助开发者和开源爱好者快速锁定在特定时间段内 Stars 增长最快的项目，洞察技术社区的最新趋势。

![StarSprint UI Preview](https://via.placeholder.com/1200x600/020617/06b6d4?text=StarSprint+Modern+UI+Dashboard)

## ✨ 核心特性

- **📈 实时增长分析**：追踪任意日期范围内的 Stars 增长动能。
- **🎯 指挥中心式搜索**：高度集成的搜索工具栏，快速配置探测周期、Stars 门槛和结果深度。
- **💎 专业级 UI/UX**：
  - **深色玻璃拟态**：精致的透明度与毛玻璃滤镜效果。
  - **精美动效**：丝滑的入场动画与交互反馈。
  - **现代化字体**：全局采用 Inter 与 JetBrains Mono 字体系统。
- **🌍 多语言支持**：原生支持中英文界面切换。
- **🛡️ 隐私安全**：GitHub Token 仅存储在浏览器本地，绝不上传。

## 🛠️ 技术栈

- **框架**: [React 19](https://react.dev/)
- **构建工具**: [Vite 8](https://vitejs.dev/)
- **UI 组件库**: [Ant Design 6](https://ant.design/)
- **样式**: [Tailwind CSS 4](https://tailwindcss.com/)
- **图标**: [Lucide React](https://lucide.dev/) & [Ant Design Icons](https://ant.design/components/icon/)
- **国际化**: [i18next](https://www.i18next.com/)
- **日期处理**: [Day.js](https://day.js.org/)

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone https://github.com/your-username/StarSprint.git
cd StarSprint
```

### 2. 安装依赖
```bash
npm install
```

### 3. 启动开发服务器
```bash
npm run dev
```

### 4. 构建生产版本
```bash
npm run build
```

## ⚙️ 配置说明

为了避免 GitHub API 的频率限制 (Rate Limit)，建议在应用界面的 **"API 配置"** 中提供一个 `Personal Access Token`。

1. 访问 [GitHub Settings - Tokens](https://github.com/settings/tokens) 创建一个经典的 Token (无需任何特殊权限)。
2. 在 StarSprint 界面点击右上角的配置图标进行保存。

## 🎨 UI 优化亮点

本项目经历了一系列精细的 UI 优化：
- **浮动导航栏**：采用集成度更高的悬浮式 Header 设计。
- **紧凑型布局**：优化了 Hero 区域与搜索栏的垂直空间占用，提升信息密度。
- **交互细节**：为表格行添加了位移悬停效果，重塑了带发光动效的增长进度条。

## 📄 许可证

本项目采用 [MIT License](LICENSE) 开源。

---

如果你觉得这个项目有帮助，欢迎给一个 ⭐️ **Star**！
