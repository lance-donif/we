# AGENTS.md

本文件为所有 AI 编辑器（Claude Code / Gemini / Cursor 等）提供项目指引。

## 项目概述

**MONDAY** 是一个微信公众号文章排版编辑器，基于 Vite + Vue 3 构建。核心功能：
- Markdown 编辑 → 微信公众号富文本实时预览
- 2 套杂志模板（对应圆周旅迹参考页 id=10 / id=16）
- 一键复制为微信编辑器可粘贴的富文本 HTML

## 技术栈

- **构建工具**: Vite 8
- **框架**: Vue 3 (Composition API + `<script setup>`)
- **样式**: 纯 CSS（共享杂志语义样式 + 模板私有样式）
- **字体**: DM Sans + Noto Serif SC + Caveat
- **无第三方 UI 库**，纯手工组件

## 常用命令

```bash
npm run dev      # 启动开发服务器（http://localhost:5173）
npm run build    # 生产构建
npm run preview  # 预览生产构建
```

## 项目结构

```
/Users/lance/Desktop/we/
├── index.html                    # 入口 HTML
├── package.json
├── vite.config.js
├── src/
│   ├── main.js                   # Vue 入口
│   ├── App.vue                   # 主布局（双栏网格）
│   ├── assets/styles/
│   │   ├── base.css              # 全局变量、重置、工具类
│   │   └── editor.css            # 编辑区布局与工作台样式
│   ├── components/
│   │   ├── EditorPane.vue        # 左侧编辑区
│   │   ├── PreviewPane.vue       # 右侧预览区
│   │   ├── ToolBar.vue           # 模板选择 + 排版工具栏
│   │   ├── WxRenderer.vue        # 微信文章渲染器
│   │   └── ToastMessage.vue      # Toast 通知
│   └── composables/
│       ├── useMarkdown.js        # Markdown → HTML 解析
│       ├── useClipboard.js       # 富文本复制逻辑
│       └── useTemplates.js       # 模板管理
├── src/templates/
│   ├── index.js                  # 模板注册出口
│   ├── magazineBase.js           # 模板共享复制逻辑
│   ├── magazineShared.css        # 杂志语义共享样式
│   ├── magazineA.js/.css         # 参考页 id=10 模板
│   └── magazineB.js/.css         # 参考页 id=16 模板
├── articles/                     # 公众号文章 Markdown 存储
├── public/placeholders/          # 杂志示例占位图
├── legacy/                       # 旧版静态 HTML/CSS/JS 备份
├── AGENTS.md                     # 本文件
└── CLAUDE.md                     # Claude Code 专用指引（写作规范）
```

## 开发规范

### Vue 组件
- 使用 `<script setup>` 语法
- Composables 放在 `src/composables/`，命名 `useXxx.js`
- 组件 Props 使用 `defineProps()` 显式声明类型
- 事件使用 `defineEmits()` 显式声明

### CSS 样式
- 全局变量定义在 `base.css` 的 `:root`
- 模板样式拆到 `src/templates/`，按“共享语义样式 + 模板私有样式”组织
- 复制到微信时，由模板模块自己的 `copyRichText(clone)` 写入内联样式

### 模板开发
新增模板需要：
1. 在 `src/templates/` 下新增 `xxx.js` 和 `xxx.css`
2. 模板模块必须导出：`id`、`name`、`className`、`cssText`、`sectionPalette`、`copyRichText(clone)`
3. 在 `src/templates/index.js` 中注册模板
4. 需要复用的杂志结构，只放到 `magazineShared.css` 或 `magazineBase.js`

### 文章管理
- 文章存储在 `articles/` 目录，格式：`YYYY-MM-DD-文章关键词.md`
- 写作规范详见 `CLAUDE.md`

## 公众号文章写作指南

本项目同时用于生产公众号文章内容。**每篇文章只讲一个方法，围绕这个方法深入展开。**

### 核心定位

**不是教用户变美，而是让用户知道这样做有希望变美。**

### 写作流程

1. **先读取 `CLAUDE.md`** 获取完整写作风格和心理学原理运用要求
2. **查重**：读取 `articles/` 和 `articles/已发布/` 目录下所有文章标题，确保不重复
3. **选择方法** → **深入挖掘** → **撰写正文**（800-1500字）→ **生成标题**（2-3个备选）

### 标题格式

`你真美 | XXXX内容`

### 已写主题索引

写作前必须查阅 `CLAUDE.md` 底部的已写主题索引，避免重复。

## 排版模板说明

### 杂志 · 探洞（tpl-magazine-a）
- 对齐参考页：[pitravel.cn id=10](https://www.pitravel.cn/web/magazine/detail?id=10)
- 5 色轮换：灰 → 青 → 灰 → 橙 → 绿
- 页码从 `00` 开始

### 杂志 · 苗寨（tpl-magazine-b）
- 对齐参考页：[pitravel.cn id=16](https://www.pitravel.cn/web/magazine/detail?id=16)
- 3 色轮换：绿 → 黄 → 橙
- 页码从 `01` 开始

## Markdown 语义约定

- `## 标题`：开启新章节，并自动生成页码
- `### 副标题`：章节副标题
- `#### 小标题|大标题`：特写双层标题
- 连续图片语法：自动组成 2 列或 3 列杂志图组
- 无序列表：渲染为浅色信息卡
- `> 引用`：渲染为圆角说明卡

---

**更新说明**：项目结构或开发规范变化时，请同步更新本文件。
