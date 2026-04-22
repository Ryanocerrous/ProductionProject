# ByteBite Web (ProductionProject)

Marketing and support website for ByteBite, built with **Vite + React**.

## Tech Stack

- React 18
- Vite
- Three.js (`@react-three/fiber`, `@react-three/drei`)
- GSAP
- Plain CSS (`src/styles/global.css`)

## Prerequisites

- Node.js `^20.19.0 || >=22.12.0`
- npm

## Local Development

Install dependencies:

```bash
npm install
```

Start dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## App Routing

Routing is handled in [`src/LoginRouter.jsx`](src/LoginRouter.jsx) using `window.location.pathname`.

Supported routes:

- `/` → Main marketing site
- `/login` → Authentication page
- `/support` → Support topic index
- `/support/:slug` → Individual support topic page

Unknown support slugs fall back to the support index page.

## Deployment Notes

Production is configured for Vercel via [`vercel.json`](vercel.json):

- Canonical host redirect to `www.bytebiteb2b.co.uk`
- Rewrites for `/login`, `/support`, and `/support/*` to `/` (so client-side route rendering works)
- Security headers on all routes
- Long-term cache headers for `/assets/*`

A custom static 404 page exists at [`public/404.html`](public/404.html).

## Project Structure

```text
src/
  components/   # Shared UI components (navbar, footer, model viewer, effects)
  sections/     # Homepage content sections
  pages/        # Route-level pages (auth + support)
  content/      # Static content models (support topics, brief)
  styles/       # Global stylesheet
```

## Media Assets

- 3D model: `public/media/bytebite-unit.glb`
- Branding/imagery: `public/media/*`
- Manual visuals: `public/manual/*`

If required artwork is missing, see [`public/media/README.txt`](public/media/README.txt).

## Maintenance Checklist

When updating the site:

1. Update page/component content under `src/`.
2. Run `npm run build` to verify the production bundle compiles.
3. Commit changes with an accurate message.
4. Push to `main` for deployment.
