---
title: Create Blog & First Post
description: Use CLI to create a blog project and write your first article
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Getting Started
  - Writing
  - CLI
---

# Create Blog & First Post

This guide will walk you through creating a blog project using the CLI tool and writing your first post.

## Create a Blog Project with CLI

### Quick Start

Use `@jet-w/astro-blog-cli` to quickly create a new blog project:

```bash
npx @jet-w/astro-blog-cli my-blog
```

### Interactive Mode

Run without options to enter interactive mode, which guides you through the configuration:

```bash
npx @jet-w/astro-blog-cli
```

You will be prompted for:
- Project name
- Blog title (English & Chinese)
- Blog description (English & Chinese)
- Author name
- Author email
- Site URL
- Template selection

### Non-Interactive Mode

Use `-y` flag to skip prompts and use defaults or provided options:

```bash
# Quick create with defaults
npx @jet-w/astro-blog-cli my-blog -y

# With custom options
npx @jet-w/astro-blog-cli my-blog -y \
  --title "My Awesome Blog" \
  --title-zh "我的博客" \
  --description "A blog about tech" \
  --description-zh "一个关于技术的博客" \
  --author "John Doe" \
  --email "john@example.com" \
  --site "https://myblog.com"
```

### CLI Command Options

| Option | Description | Default |
|--------|-------------|---------|
| `-t, --template <template>` | Template to use | `default` |
| `--title <title>` | Blog title (English) | `My Astro Blog` |
| `--title-zh <titleZh>` | Blog title (Chinese) | `我的Astro博客` |
| `--description <description>` | Blog description (English) | - |
| `--description-zh <descriptionZh>` | Blog description (Chinese) | - |
| `--author <author>` | Author name | `Author` |
| `--email <email>` | Author email | `email@example.com` |
| `--site <site>` | Site URL | `https://example.com` |
| `--lang <lang>` | CLI language (`en`/`zh`) | Auto-detect |
| `-y, --yes` | Skip prompts, use defaults | - |
| `-f, --force` | Overwrite existing directory | - |

### Start Development Server

After project creation:

```bash
cd my-blog
npm install
npm run dev
```

Your blog will be running at `http://localhost:4321`.

### Project Structure

The created project includes:

```
my-blog/
├── astro.config.mjs        # Astro configuration
├── package.json
├── src/
│   ├── config/
│   │   ├── site.ts         # Main site configuration
│   │   └── locales/        # i18n configurations
│   │       ├── en/         # English locale
│   │       └── zh-CN/      # Chinese locale
│   └── content.config.ts   # Content collections schema
├── content/
│   ├── posts/              # Blog posts (Markdown/MDX)
│   ├── pages/              # Static pages
│   └── slides/             # Presentation slides
└── public/                 # Static assets
```

## Create Your First Post

Now let's write your first blog post!

### Where Posts Live

All blog posts go in the `content/posts/` directory:

```
content/
└── posts/
    ├── my-first-post.md    ← Your posts go here
    ├── another-post.md
    └── tech/               ← Or in subdirectories
        └── tutorial.md
```

### Create a New Post

Create a file called `hello-world.md` in `content/posts/`:

```markdown
---
title: Hello World
description: My first blog post
pubDate: 2025-01-15
author: Your Name
tags:
  - Introduction
categories:
  - Personal
---

# Hello World

Welcome to my blog! This is my first post.

## Why I Started Blogging

I started this blog to:

1. Share what I learn
2. Document my journey
3. Connect with others

> The best time to start was yesterday. The second best time is now.

## What's Next

Stay tuned for more posts about:

- Web development
- My projects
- Lessons learned

Thanks for reading!
```

### View Your Post

Save the file and visit:

```
http://localhost:4321/posts/hello-world
```

Your post should appear with full styling!

## Understanding Frontmatter

The section between `---` markers is called **frontmatter**. It contains metadata about your post:

```yaml
---
title: Hello World          # Required - Post title
description: My first post  # For SEO and previews
pubDate: 2025-01-15        # Publication date
author: Your Name          # Author name
tags:                      # Tags (array)
  - Introduction
categories:                # Categories (array)
  - Personal
draft: false               # true = hidden from listing
star: false                # true = featured post
---
```

::: tip Required vs Optional

Only `title` is required. All other fields are optional but recommended for better organization and SEO.
:::

## Using Subdirectories

Organize related posts in subdirectories:

```
content/posts/
├── tutorials/
│   ├── README.md        ← Shows at /posts/tutorials
│   ├── javascript.md    ← Shows at /posts/tutorials/javascript
│   └── css.md           ← Shows at /posts/tutorials/css
└── projects/
    └── my-app.md        ← Shows at /posts/projects/my-app
```

### Directory README

Each directory can have a `README.md` that serves as the directory's index page:

```markdown
---
title: Tutorials
description: Learn web development step by step
---

# Tutorials

Welcome to my tutorials section!

- [JavaScript Basics](./javascript)
- [CSS Tricks](./css)
```

## URL Path Rules

Your file path determines the URL:

| File Path | URL |
|-----------|-----|
| `posts/hello.md` | `/posts/hello` |
| `posts/tech/intro.md` | `/posts/tech/intro` |
| `posts/tech/README.md` | `/posts/tech` |

::: info Case Insensitive
URLs are automatically lowercased. `Hello-World.md` becomes `/posts/hello-world`.
:::

## Adding Images

Place images in `public/images/` and reference them:

```markdown
![My Photo](/images/photo.jpg)
```

For post-specific images, you can create a folder:

```
public/
└── images/
    └── posts/
        └── hello-world/
            └── cover.jpg
```

Then use:

```markdown
![Cover](/images/posts/hello-world/cover.jpg)
```

## Blog Features Overview

Blogs created with this theme support the following features:

- **Multi-language support (i18n)**: Switch between English and Chinese
- **Markdown & MDX**: Powerful content authoring capabilities
- **Code syntax highlighting**: Built-in syntax highlighting support
- **Mermaid diagrams**: Flowcharts, sequence diagrams, and more
- **LaTeX math equations**: Math formula rendering support
- **Custom containers**: tip, warning, danger, and other callout blocks
- **RSS feed**: Auto-generated RSS feed
- **Tailwind CSS**: Modern styling support
- **Vue.js components**: Use Vue components in MDX

---

Congratulations on creating your blog and publishing your first post! Next, let's understand the [project structure](./04-structure).
