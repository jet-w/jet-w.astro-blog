---
title: Create Your First Post
description: Write and publish your first blog article
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Getting Started
  - Writing
---

# Create Your First Post

Let's write your first blog post! This is where the fun begins.

## Where Posts Live

All blog posts go in the `content/posts/` directory:

```
content/
└── posts/
    ├── my-first-post.md    ← Your posts go here
    ├── another-post.md
    └── tech/               ← Or in subdirectories
        └── tutorial.md
```

## Create a New Post

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

## View Your Post

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

---

Congratulations on your first post! Next, let's understand the [project structure](./04-structure).
