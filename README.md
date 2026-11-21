# Sumit Yadav — Portfolio

Personal portfolio: strategy, growth and operations work across Blinkit, Shopdeck, Adani, Accenture and more.

Built with React, TypeScript and Vite. The home page is designed for recruiters on phones: the key facts fit on the first screen, five cases rotate (or swipe) every 5 seconds, and a CV / Call / WhatsApp / Email bar stays at the bottom of the screen. Pages change instantly, with no intro or transition animation.

GSAP and Lenis (smooth scrolling, mouse and trackpad only) drive the effects on the inner pages, and react-three-fiber draws the dot grid on the Proof page.

## Run locally

Needs Node.js 22 or newer (`nvm use` reads `.nvmrc`).

```bash
npm install
npm run dev      # http://127.0.0.1:5173, hot reload
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Where things live

- `src/data.ts`: all copy, numbers, roles, projects and links. Edit content here.
  - `HERO_STATS`: the four numbers on the home page's first screen.
  - `FEATURED_CASES`: which five projects appear in the home carousel, in order. Each needs `points` for its "What I did" list.
- `src/components/Chrome.tsx`: header and menu, the bottom contact bar and the footer.
- `src/components/CaseCarousel.tsx`: the home carousel and the case view. An open case lives in the URL (`/#/?case=blinkit`), so the phone's Back button closes it and a single case can be shared.
- `src/pages/`: one file per page (Home, Story, Work, Projects, Proof, Skills, Education, Contact, and the four activity chapters).
- `src/fx/`: effects used on the inner pages (text reveals, hover effects, scroll effects, the Proof dot grid). `PageTransition.tsx` now only handles scroll and focus when the page changes.
- `public/docs/`: resumes and documents linked from the site.

## Deployment

Hosted on Vercel, connected to this repo. Every push to `main` deploys to production; pushes to other branches get a preview URL.

Vercel settings: Vite preset, build command `npm run build`, output directory `dist`, Node.js 22.x or newer. No environment variables are needed. Pages use hash URLs (`/#/work`), so no rewrite rules are required.
