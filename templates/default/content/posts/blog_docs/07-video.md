---
title: 视频嵌入
description: 在文章中嵌入 YouTube、Bilibili 和自托管视频
pubDate: 2025-12-11
author: Astro Blog
categories:
  - 博客教程
tags:
  - 视频
  - MDX
  - 多媒体
---

# 视频嵌入

本博客支持嵌入多种视频平台，包括 YouTube、Bilibili 以及自托管视频文件。

::: warning 文件格式要求
视频嵌入功能需要使用 `.mdx` 格式的文件，以支持组件导入。
:::

## 快速开始

在 MDX 文件中导入组件：

```mdx
---
title: 我的视频文章
---

import YouTube from '@jet-w/astro-blog/components/media/YouTube.astro';
import Bilibili from '@jet-w/astro-blog/components/media/Bilibili.astro';
import Video from '@jet-w/astro-blog/components/media/Video.astro';
import VideoPlayer from '@jet-w/astro-blog/components/media/VideoPlayer.astro';

文章内容...

<YouTube id="dQw4w9WgXcQ" />
```

## YouTube 视频

### 基础用法

使用视频 ID：

```mdx
<YouTube id="dQw4w9WgXcQ" />
```

使用完整 URL：

```mdx
<YouTube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

### 可用参数

| 参数 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| `id` | string | - | YouTube 视频 ID |
| `url` | string | - | YouTube 视频完整 URL |
| `title` | string | "YouTube 视频" | 视频标题（无障碍） |
| `start` | number | 0 | 开始时间（秒） |
| `autoplay` | boolean | false | 是否自动播放 |
| `muted` | boolean | false | 是否静音 |
| `loop` | boolean | false | 是否循环播放 |
| `aspectRatio` | string | "16/9" | 宽高比 |

### 示例

从特定时间开始播放：

```mdx
<YouTube id="dQw4w9WgXcQ" start={60} title="歌曲片段" />
```

::: tip 隐私增强模式
YouTube 组件默认使用 `youtube-nocookie.com` 域名，保护用户隐私。
:::

## Bilibili 视频

### 基础用法

使用 BV 号：

```mdx
<Bilibili bvid="BV1xx411c7mD" />
```

使用 AV 号：

```mdx
<Bilibili aid="170001" />
```

使用完整 URL：

```mdx
<Bilibili url="https://www.bilibili.com/video/BV1xx411c7mD" />
```

### 可用参数

| 参数 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| `bvid` | string | - | BV 号 |
| `aid` | string/number | - | AV 号 |
| `url` | string | - | Bilibili 视频完整 URL |
| `title` | string | "Bilibili 视频" | 视频标题 |
| `page` | number | 1 | 分P（从1开始） |
| `start` | number | 0 | 开始时间（秒） |
| `highQuality` | boolean | true | 是否高清 |
| `autoplay` | boolean | false | 是否自动播放 |
| `muted` | boolean | false | 是否静音 |
| `aspectRatio` | string | "16/9" | 宽高比 |

### 示例

播放第二个分P：

```mdx
<Bilibili bvid="BV1xx411c7mD" page={2} title="教程第二集" />
```

## 自托管视频

### 基础用法

```mdx
<Video src="/videos/demo.mp4" />
```

带封面图片：

```mdx
<Video src="/videos/demo.mp4" poster="/images/video-poster.jpg" />
```

### 可用参数

| 参数 | 类型 | 默认值 | 说明 |
|:---|:---|:---|:---|
| `src` | string | - | 视频源 URL（必填） |
| `type` | string | 自动检测 | 视频类型 |
| `poster` | string | - | 封面图片 |
| `title` | string | "视频" | 视频标题 |
| `autoplay` | boolean | false | 是否自动播放 |
| `muted` | boolean | false | 是否静音 |
| `loop` | boolean | false | 是否循环播放 |
| `controls` | boolean | true | 是否显示控制栏 |
| `preload` | string | "metadata" | 预加载策略 |
| `aspectRatio` | string | "16/9" | 宽高比 |
| `sources` | array | [] | 备用视频源 |

### 多格式支持

提供多个格式以获得更好的兼容性：

```mdx
<Video
  src="/videos/demo.mp4"
  sources={[
    { src: "/videos/demo.webm", type: "video/webm" },
    { src: "/videos/demo.ogg", type: "video/ogg" }
  ]}
/>
```

### 背景视频

创建静音循环播放的背景视频：

```mdx
<Video src="/videos/background.mp4" autoplay muted loop controls={false} />
```

## 统一播放器

`VideoPlayer` 组件可以自动检测视频平台：

```mdx
import VideoPlayer from '@jet-w/astro-blog/components/media/VideoPlayer.astro';

<!-- 自动识别为 YouTube -->
<VideoPlayer src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />

<!-- 自动识别为 Bilibili -->
<VideoPlayer src="https://www.bilibili.com/video/BV1xx411c7mD" />

<!-- 自动识别为自托管视频 -->
<VideoPlayer src="/videos/demo.mp4" />
```

## 自定义宽高比

所有视频组件都支持 `aspectRatio` 参数：

```mdx
<!-- 竖屏视频 (9:16) -->
<YouTube id="shorts_id" aspectRatio="9/16" />

<!-- 电影比例 (21:9) -->
<Video src="/videos/cinematic.mp4" aspectRatio="21/9" />

<!-- 正方形 (1:1) -->
<Bilibili bvid="BV..." aspectRatio="1/1" />
```

## 视频网格布局

使用 `video-grid` 类创建响应式视频网格：

```html
<div class="video-grid">
  <YouTube id="video1" />
  <YouTube id="video2" />
</div>
```

## 最佳实践

::: tip 无障碍访问
为视频设置有意义的 `title` 属性，帮助使用屏幕阅读器的用户理解视频内容。
:::

::: warning 自动播放限制
- 大多数浏览器限制自动播放
- 自动播放通常需要配合静音使用
- 建议谨慎使用自动播放，避免影响用户体验
:::

::: info 自托管视频优化
- 建议将视频压缩到合适大小
- 提供多种格式（MP4 + WebM）以获得最佳兼容性
- 使用 `poster` 设置封面图，提升加载体验
:::

## 下一步

- [LaTeX 数学公式](./08-latex) - 排版数学公式
- [图标系统](./09-icons) - 使用各种图标
