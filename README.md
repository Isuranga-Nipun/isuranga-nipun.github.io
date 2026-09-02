# Isuranga Nipun Kumara — Personal Portfolio

A static, responsive personal portfolio site. No build step, no backend, no
paid services — plain HTML5, CSS3 and vanilla JavaScript, ready to publish
straight to GitHub Pages.

## Structure

```
.
├── index.html            # all page content
├── css/
│   └── style.css         # design tokens + component styles
├── js/
│   └── script.js         # nav, scroll-spy, gallery filter, image fallback
├── images/                # your photos go here — see images/README.md
│   └── README.md          # exact filenames the site expects
└── assets/
    └── Isuranga_Nipun_Kumara_CV.docx   # served by the "Download CV" button
```

## Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `portfolio` or `isuranga-nipun.github.io`
   if you want it at the root of your GitHub username domain).
2. Push this folder's contents to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Set **Branch** to `main` and folder to `/ (root)`, then **Save**.
6. GitHub will publish the site at:
   - `https://<your-username>.github.io/<your-repo>/`, or
   - `https://<your-username>.github.io/` if the repo is named `<your-username>.github.io`.

No further configuration is needed — every asset path in `index.html` is
relative, so it works whether the site sits at the domain root or in a
sub-path.

## Before you publish

- Add your photos to `/images/` using the exact filenames listed in
  `images/README.md`. Until then, each spot shows a small placeholder so
  nothing looks broken.
- The **Download CV** button serves `assets/Isuranga_Nipun_Kumara_CV.docx`.
  Replace that file any time you update your CV — keep the filename, or
  update the two `href="assets/…"` references in `index.html`.
- Update the `og:image` meta tag in `index.html` once your hero photo is in
  place, if you want a specific social-share preview image.

## Editing content

Everything text-based lives directly in `index.html`, organized into clearly
commented `<section>` blocks (`Home`, `About`, `Experience`, `Education`,
`Research`, `Skills`, `Projects`, `Achievements`, `Gallery`, `Contact`) — no
templating engine, so it's a plain find-and-edit.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS Grid,
`clip-path`, `IntersectionObserver` and `prefers-reduced-motion` — all widely
supported.
