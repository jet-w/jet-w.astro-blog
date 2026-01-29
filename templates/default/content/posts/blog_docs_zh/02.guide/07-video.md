---
title: 视频嵌入
description: 在文章中嵌入 YouTube、Bilibili 和自定义视频
pubDate: 2025-01-01
author: jet-w
categories:
  - 文档
tags:
  - 视频
  - 多媒体
---

# 视频嵌入

添加视频使你的内容更加生动有趣。

## YouTube

使用组件嵌入 YouTube 视频：

```markdown
<YouTube id="dQw4w9WgXcQ" />
```

或使用完整 URL：

```markdown
<YouTube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

### 选项

```markdown
<YouTube
  id="dQw4w9WgXcQ"
  title="视频标题"
  start={30}
/>
```

| 选项 | 描述 |
|------|------|
| `id` | YouTube 视频 ID |
| `url` | 完整 YouTube URL |
| `title` | 视频标题（用于无障碍） |
| `start` | 开始时间（秒） |

## Bilibili

用于 Bilibili 视频：

```markdown
<Bilibili bvid="BV1xx411c7mD" />
```

或使用 AV 号：

```markdown
<Bilibili aid="123456789" />
```

### 选项

```markdown
<Bilibili
  bvid="BV1xx411c7mD"
  page={1}
  title="视频标题"
/>
```

| 选项 | 描述 |
|------|------|
| `bvid` | Bilibili BV ID |
| `aid` | Bilibili AV 号 |
| `page` | 分P号（用于多P视频） |
| `title` | 视频标题 |

## 自托管视频

用于 `public/` 文件夹中的视频：

```markdown
<Video src="/videos/demo.mp4" />
```

### 选项

```markdown
<Video
  src="/videos/demo.mp4"
  poster="/images/video-cover.jpg"
  autoplay
  muted
  loop
/>
```

| 选项 | 描述 |
|------|------|
| `src` | 视频文件路径 |
| `poster` | 封面图片 URL |
| `autoplay` | 加载时自动播放 |
| `muted` | 默认静音 |
| `loop` | 循环播放 |
| `controls` | 显示控制条（默认：true） |

## HTML5 视频

你也可以使用标准 HTML5：

```html
<video
  src="/videos/demo.mp4"
  controls
  width="100%"
  poster="/images/cover.jpg">
  您的浏览器不支持视频。
</video>
```

### 多源

```html
<video controls width="100%">
  <source src="/videos/demo.webm" type="video/webm">
  <source src="/videos/demo.mp4" type="video/mp4">
  您的浏览器不支持视频。
</video>
```

## 视频格式

| 格式 | 扩展名 | 支持情况 |
|------|--------|----------|
| MP4 (H.264) | `.mp4` | 最佳兼容性 |
| WebM | `.webm` | 良好压缩 |
| Ogg | `.ogv` | 开放格式 |

::: tip 推荐
使用 **MP4 (H.264)** 获得最佳浏览器支持。WebM 是一个不错的备选。
:::

## 响应式视频

视频默认是响应式的。对于自定义宽高比：

```html
<div style="aspect-ratio: 16/9;">
  <Video src="/videos/demo.mp4" style="width: 100%; height: 100%;" />
</div>
```

## 最佳实践

::: info 视频指南
1. **优化文件大小** - 为网络压缩视频
2. **添加封面图片** - 加载前显示预览
3. **提供字幕** - 提高无障碍性
4. **谨慎使用自动播放** - 可能会让人烦躁
5. **使用懒加载** - 按需加载视频
:::

::: warning 文件大小
尽量将视频控制在 10MB 以内。对于较长的视频，考虑托管在 YouTube 或 Vimeo。
:::

## 外部嵌入

对于其他平台，使用它们的嵌入代码：

```html
<iframe
  src="https://player.vimeo.com/video/123456789"
  width="640"
  height="360"
  frameborder="0"
  allowfullscreen>
</iframe>
```

---

下一步：[图标](./04-icons) 添加视觉元素。
