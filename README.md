# Bharat Banavalikar — Netflix-style Portfolio

A single-page résumé site for Bharat Banavalikar, built to look and feel like
Netflix: a TUDUM intro, profile gate, a rotating photo billboard, and
horizontally-scrolling rows of experience / featured work / skills.

Built with **React + Vite + Tailwind CSS**.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (e.g. http://localhost:5173/bharat-resume/).

## Deploy to GitHub Pages

This project deploys to GitHub Pages via the `gh-pages` package.

```bash
npm run deploy
```

That builds the site and pushes it to the `gh-pages` branch. Then, in the
repo's **Settings → Pages**, make sure the source is set to the `gh-pages`
branch. The site will be live at:

```
https://<your-github-username>.github.io/<repo-name>/
```

### Important: the `base` path

`vite.config.js` sets:

```js
base: '/bharat-resume/'
```

This **must match your repository name**. If you fork/clone this into a repo
with a different name, change `base` to `/<your-repo-name>/` (keep the leading
and trailing slashes), otherwise the CSS/JS/images won't load on Pages.

If you deploy to a user/organization site (`<username>.github.io`), set
`base: '/'` instead.

## Photos

Hero billboard photos live in `public/photos/` and rotate automatically.
Swap them out there and update the `PHOTO.hero` array in `src/App.jsx`.
