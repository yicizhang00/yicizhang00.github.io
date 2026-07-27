# AGENTS.md

## Commands

```bash
npm run server   # hexo server — local dev on http://localhost:4000
npm run build    # hexo generate — output to public/
npm run clean    # hexo clean — wipe cache and public/
```

To create a new post: `npx hexo new "Post Title"` (uses `scaffolds/post.md` frontmatter template).

## Architecture

- **Hexo 7.3** static site, Node 20+, npm.
- **Branch model**: write on `source`, CI (`.github/workflows/deploy.yml`) builds and force-pushes `public/` to `main` for GitHub Pages. Never push content directly to `main`.
- **Active theme is AnZhiYu** (`themes/anzhiyu/`), configured via `_config.anzhiyu.yml`. Despite `_config.yml` saying `theme: fluid`, the AnZhiYu config overrides it. The AnZhiYu theme is a **local copy** (not a submodule). Only `themes/fluid/` is a git submodule.
- **Theme templates**: Pug (`layout/`), Stylus (`source/css/`), EJS (fallback).
- **Markdown renderer**: `hexo-renderer-marked` (marked-based).

## Content conventions

- All posts in `source/_posts/`, organized by topic subdirectories (e.g. `分布式/`, `存储系统/`, `编程语言/`).
- Language: zh-CN (Simplified Chinese).
- Frontmatter fields: `title`, `date`, `tags`, `categories`, `description`, `keywords`, `cover`, `top_img`, `toc`, `mathjax`/`katex`, `mermaid`, `copyright`, `comments`, `sticky`, `aside`, `ai`.
- Custom CSS injected via `<link>` in theme config at `source/css/custom.css`.
- Custom pages: `source/about/index.md`, `source/categories/index.md`, `source/tags/index.md`.

## No toolchain

No ESLint, Prettier, TypeScript, tests, pre-commit hooks, or Docker config. This is a content-only repo — no code quality gates.
