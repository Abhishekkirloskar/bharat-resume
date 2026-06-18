# Bharat Banavalikar — Netflix-style Portfolio

A single-page résumé site that looks and feels like Netflix: a TUDUM intro,
a "Who's hiring?" profile gate, a rotating photo billboard, and
horizontally-scrolling rows of experience, featured work, skills & education.

Built with **React + Vite + Tailwind CSS**. It's a fully static site, so it
hosts for free on **GitHub Pages**.

---

## 1. What you need first (one-time setup)

1. **Node.js** (v18 or newer) — download the "LTS" version from
   <https://nodejs.org> and install it. To check it worked, open a terminal and run:
   ```bash
   node -v
   npm -v
   ```
   Both should print a version number.

2. **Git** — <https://git-scm.com/downloads>. Check with:
   ```bash
   git -v
   ```

3. A **GitHub account** — <https://github.com> (free).

---

## 2. Get the code onto your computer

Replace the URL below with this repo's URL if different.

```bash
git clone https://github.com/Abhishekkirloskar/bharat-resume.git
cd bharat-resume
npm install
```

`npm install` downloads the project's dependencies (one-time, may take a minute).

---

## 3. Run it locally (preview before deploying)

```bash
npm run dev
```

Open the URL it prints (e.g. <http://localhost:5173/bharat-resume/>) in your
browser. Press `Ctrl + C` in the terminal to stop it.

> Tip: the TUDUM sound only plays after you tap/click "Tap to enter" — that's
> required by browsers (especially on phones) before they allow audio.

---

## 4. Deploy to **your own** GitHub Pages

This makes the site live at `https://<your-username>.github.io/bharat-resume/`.

### Step 4a — Create an empty repo on your GitHub
- Go to <https://github.com/new>
- **Repository name:** `bharat-resume` (use this exact name — see the note in
  Step 6 if you want a different name)
- Visibility: **Public**
- **Do NOT** check "Add a README" / .gitignore / license (keep it empty)
- Click **Create repository**

### Step 4b — Point your local copy at your new repo
In the terminal (inside the `bharat-resume` folder):

```bash
git remote remove origin
git remote add origin https://github.com/<your-username>/bharat-resume.git
git branch -M main
git push -u origin main
```

(Replace `<your-username>` with your actual GitHub username.)

### Step 4c — Publish the site
```bash
npm run deploy
```

This builds the site and pushes the result to a branch called `gh-pages`.
Run this command **again any time you make changes** to update the live site.

### Step 4d — Turn on GitHub Pages (one-time)
- Go to your repo on GitHub → **Settings** → **Pages** (left sidebar)
- Under **Build and deployment → Source**, choose **Deploy from a branch**
- **Branch:** select `gh-pages` and folder `/ (root)`, then **Save**
- Wait ~1 minute, then visit:
  ```
  https://<your-username>.github.io/bharat-resume/
  ```

🎉 That's it — your site is live. Reshare that link anywhere.

---

## 5. Updating the site later

Any time you change something:

```bash
git add -A
git commit -m "describe your change"
git push            # saves your source code
npm run deploy      # rebuilds and publishes the live site
```

Live changes appear in ~30–60 seconds. If you still see the old version,
hard-refresh the page (`Ctrl/Cmd + Shift + R`).

---

## 6. Important: the `base` path

`vite.config.js` contains:

```js
base: '/bharat-resume/'
```

This **must match your repository name**. Because the repo is named
`bharat-resume`, this is already correct.

- If you name your repo something else, change `base` to
  `'/your-repo-name/'` (keep the leading and trailing slashes).
- If you deploy to a **user site** (a repo named exactly
  `<your-username>.github.io`), set `base: '/'` instead.

After changing `base`, run `npm run deploy` again.

---

## 7. Updating the social-share preview (optional)

When someone shares the link on WhatsApp/LinkedIn, the preview image and link
come from the Open Graph tags in `index.html`. They currently point at
`abhishekkirloskar.github.io`. Update those two lines to your own URL:

```html
<meta property="og:image" content="https://<your-username>.github.io/bharat-resume/og-image.jpg" />
<meta property="og:url"   content="https://<your-username>.github.io/bharat-resume/" />
```

---

## 8. Swapping content (optional)

- **Text** (experience, skills, education, contact): edit the `DATA` object near
  the top of `src/App.jsx`.
- **Photos**: the rotating hero images live in `public/photos/`. Replace them
  and update the `PHOTO.hero` list (and `pos` focal points) in `src/App.jsx`.
- **Résumé PDF** (the ⬇ Résumé button): replace
  `public/Bharat-Banavalikar-Resume.pdf` (keep the same filename, or update the
  `RESUME_PDF` path in `src/App.jsx`).

---

## 9. Troubleshooting

| Symptom | Fix |
|---|---|
| Page is **blank** or styles/images missing on the live site | The `base` in `vite.config.js` doesn't match your repo name — see Step 6, then redeploy. |
| **404** right after first deploy | Wait a minute (Pages takes time on the first publish), then hard-refresh. Also confirm Pages source is the `gh-pages` branch (Step 4d). |
| You see an **old version** | Hard-refresh (`Ctrl/Cmd + Shift + R`); GitHub's CDN can lag a bit. |
| `npm run deploy` fails with a permissions error | Make sure `git push` to your repo works first (you may need to sign in to GitHub). |
| **No sound** | Click "Tap to enter" — browsers block audio until you interact, especially on mobile. |

---

Built with React + Vite + Tailwind. Have fun. 🎬
