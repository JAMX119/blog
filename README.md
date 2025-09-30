# 前端技术知识库

一个基于Next.js 15和Contentlayer的前端技术博客，涵盖React、Vue、TypeScript、Web3等现代前端技术栈的深度解析与实践指南。

## 🚀 项目概述

这是一个专注于前端技术分享的个人博客，旨在记录和分享前端开发中的核心概念、最佳实践和进阶技巧。博客内容涵盖多个前端技术领域，包括主流框架、构建工具、Web3开发等，适合前端开发者学习和参考。

## 🛠️ 技术栈

- **框架**: [Next.js 15.5.3](https://nextjs.org/) - React框架的全栈解决方案
- **内容管理**: [Contentlayer2](https://contentlayer.dev/) - 现代内容管理工具
- **样式**: [TailwindCSS 4](https://tailwindcss.com/) - 实用优先的CSS框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - JavaScript的超集
- **构建优化**: Turbopack - 高性能构建工具
- **部署**: Vercel (配置了GitHub Actions自动部署)

## ✨ 功能特点

- 📝 支持MDX格式文章编写，集成代码高亮
- 🏷️ 文章标签分类系统，便于内容浏览
- 📅 按发布日期排序展示
- ⏱️ 自动计算文章阅读时间
- 🔍 支持按标签筛选内容
- 🌓 响应式设计，适配多种设备
- 🚀 基于Next.js的服务端渲染(SSR)，提升加载性能

## 📁 目录结构

```
├── app/               # Next.js 应用目录
│   ├── about/         # 关于页面
│   ├── article/       # 文章详情页
│   ├── contact/       # 联系方式页面
│   ├── layout.tsx     # 应用布局
│   └── page.tsx       # 主页
├── components/        # 可复用组件
│   ├── Footer/        # 页脚组件
│   └── Header/        # 页眉组件
├── posts/             # 博客文章目录
│   ├── React/         # React相关文章
│   ├── vue/           # Vue相关文章
│   ├── typescript/    # TypeScript相关文章
│   ├── web3/          # Web3相关文章
│   └── webpack/       # Webpack相关文章
├── public/            # 静态资源文件
├── contentlayer.config.ts  # Contentlayer配置
└── next.config.ts     # Next.js配置
```

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- npm 9+ 或 yarn/pnpm/bun

### 安装与运行

```bash
# 克隆仓库
git clone <仓库地址>

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 启动生产服务器
npm start
```

开发服务器启动后，访问 [http://localhost:3000](http://localhost:3000) 即可查看博客。

## 📝 内容管理

博客文章使用MDX格式编写，存储在 `posts/` 目录下，并按技术分类组织。每篇文章需要包含以下元数据：

```mdx
title: 文章标题
publishedAt: 发布日期 (YYYY-MM-DD)
summary: 文章摘要
tags:
  - 标签1
  - 标签2
---

# 文章内容
...
```

### 新增文章步骤

1. 在 `posts/` 对应技术分类目录下创建 `.mdx` 文件
2. 添加文章元数据和内容
3. 运行 `npm run dev` 查看效果
4. 提交代码并推送到远程仓库，触发自动部署

## 🚢 部署方式

项目已配置GitHub Actions自动部署到Vercel，推送到主分支后将自动构建和部署。

### 手动部署

```bash
npm run deploy
```

## 🔧 开发工具

- ESLint - 代码质量检查
- Prettier - 代码格式化
- TypeScript - 静态类型检查

## 📚 文章分类

博客文章按技术领域分类，主要包括：

- **React**: React核心概念、Hooks、性能优化等
- **Vue**: Vue 2/3 框架特性、组件设计、状态管理等
- **TypeScript**: 类型系统、高级特性、实战技巧等
- **Web3**: 区块链原理、以太坊生态、智能合约交互等
- **Webpack**: 构建配置、性能优化、Loader和Plugin开发等
- **Next.js**: SSG/SSR、API路由、性能优化等

## 🤝 贡献指南

欢迎对本博客提出建议或贡献内容。如有任何问题或想法，请提交Issue或Pull Request。

## 📄 许可协议

MIT License

## 🔗 相关链接

- [Next.js 文档](https://nextjs.org/docs)
- [Contentlayer 文档](https://contentlayer.dev/docs)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
