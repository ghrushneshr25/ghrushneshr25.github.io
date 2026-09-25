# Ghrushnesh Rathod — Portfolio

Personal engineering site for [Ghrushnesh Rathod](https://github.com/ghrushneshr25). React + Vite, deployed on GitHub Pages.

**Live:** https://ghrushneshr25.github.io/ghrushneshrathod/

## Local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

The workflow in `.github/workflows/deploy.yml` builds `main` and publishes `dist/`.

1. Repo Settings → Pages → Source: **GitHub Actions**
2. Push to `main`
3. Site: https://ghrushneshr25.github.io/ghrushneshrathod/

Production builds set `base` to `/ghrushneshrathod/` when `GITHUB_ACTIONS` is set.
