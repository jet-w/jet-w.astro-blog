---
title: Installation
description: Set up your development environment and install Astro Blog
pubDate: 2025-01-01
author: jet-w
categories:
  - Documentation
tags:
  - Getting Started
  - Installation
---

# Installation

This guide will help you set up Astro Blog on your computer.

## Prerequisites

Before you begin, ensure you have:

### Node.js

Node.js 18.x or higher is required.

```bash
# Check your Node.js version
node --version
# Should output: v18.x.x or higher
```

::: tip Installing Node.js
If you don't have Node.js, download it from [nodejs.org](https://nodejs.org).
Choose the **LTS** version for the best stability.
:::

### Package Manager

npm comes with Node.js. You can also use pnpm or yarn:

```bash
# Check npm version
npm --version

# Or use pnpm (recommended for faster installs)
npm install -g pnpm
pnpm --version
```

## Install Dependencies

Navigate to your blog project folder and install dependencies:

```bash
# Using npm
npm install

# Or using pnpm
pnpm install
```

This will install all required packages defined in `package.json`.

## Start Development Server

Start the local development server:

```bash
# Using npm
npm run dev

# Or using pnpm
pnpm dev
```

You should see output like:

```
🚀 astro  v5.x.x ready in 1234ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

::: tip Hot Reload
The development server supports hot reload. When you save a file, the browser automatically refreshes to show your changes.
:::

## Open in Browser

Visit `http://localhost:4321` in your browser. You should see your blog's homepage!

## Verify Installation

Check that everything works:

1. **Homepage loads** - You see the blog homepage
2. **Posts list** - Navigate to `/posts` to see articles
3. **Dark mode** - Toggle the theme switch in the header
4. **Search** - Try the search function

## Common Issues

### Port Already in Use

If port 4321 is busy, Astro will use another port. Check the terminal output for the actual URL.

Or specify a different port:

```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing

Try clearing the cache:

```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Node.js Version Too Old

Update Node.js to version 18 or higher. Consider using [nvm](https://github.com/nvm-sh/nvm) to manage Node versions:

```bash
# Install nvm, then:
nvm install 20
nvm use 20
```

---

Development server running? Great! Let's [create your first post](./03-create-post).
