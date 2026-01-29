---
title: Video Embedding
description: Embed YouTube, Bilibili, and custom videos in your posts
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Video
  - Multimedia
---

# Video Embedding

Add videos to make your content more engaging and informative.

## YouTube

Embed YouTube videos using the component:

```markdown
<YouTube id="dQw4w9WgXcQ" />
```

Or with a full URL:

```markdown
<YouTube url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
```

### Options

```markdown
<YouTube
  id="dQw4w9WgXcQ"
  title="Video Title"
  start={30}
/>
```

| Option | Description |
|--------|-------------|
| `id` | YouTube video ID |
| `url` | Full YouTube URL |
| `title` | Video title for accessibility |
| `start` | Start time in seconds |

## Bilibili

For Bilibili videos:

```markdown
<Bilibili bvid="BV1xx411c7mD" />
```

Or with AV number:

```markdown
<Bilibili aid="123456789" />
```

### Options

```markdown
<Bilibili
  bvid="BV1xx411c7mD"
  page={1}
  title="Video Title"
/>
```

| Option | Description |
|--------|-------------|
| `bvid` | Bilibili BV ID |
| `aid` | Bilibili AV number |
| `page` | Part number (for multi-part videos) |
| `title` | Video title |

## Self-Hosted Videos

For videos in your `public/` folder:

```markdown
<Video src="/videos/demo.mp4" />
```

### Options

```markdown
<Video
  src="/videos/demo.mp4"
  poster="/images/video-cover.jpg"
  autoplay
  muted
  loop
/>
```

| Option | Description |
|--------|-------------|
| `src` | Video file path |
| `poster` | Cover image URL |
| `autoplay` | Auto-play on load |
| `muted` | Muted by default |
| `loop` | Loop playback |
| `controls` | Show controls (default: true) |

## HTML5 Video

You can also use standard HTML5:

```html
<video
  src="/videos/demo.mp4"
  controls
  width="100%"
  poster="/images/cover.jpg">
  Your browser doesn't support video.
</video>
```

### Multiple Sources

```html
<video controls width="100%">
  <source src="/videos/demo.webm" type="video/webm">
  <source src="/videos/demo.mp4" type="video/mp4">
  Your browser doesn't support video.
</video>
```

## Video Formats

| Format | Extension | Support |
|--------|-----------|---------|
| MP4 (H.264) | `.mp4` | Best compatibility |
| WebM | `.webm` | Good compression |
| Ogg | `.ogv` | Open format |

::: tip Recommendation
Use **MP4 (H.264)** for best browser support. WebM is a good secondary option.
:::

## Responsive Videos

Videos are responsive by default. For custom aspect ratios:

```html
<div style="aspect-ratio: 16/9;">
  <Video src="/videos/demo.mp4" style="width: 100%; height: 100%;" />
</div>
```

## Best Practices

::: info Video Guidelines
1. **Optimize file size** - Compress videos for web
2. **Add poster images** - Show a preview before loading
3. **Provide captions** - Improve accessibility
4. **Consider autoplay carefully** - Can be annoying
5. **Use lazy loading** - Don't load videos until needed
:::

::: warning File Size
Keep videos under 10MB when possible. For longer videos, consider hosting on YouTube or Vimeo.
:::

## External Embedding

For other platforms, use their embed codes:

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

Next: [Icons](./04-icons) to add visual elements.
