# Sumit Yadav — Portfolio

Personal portfolio: strategy, growth and operations work across Blinkit, Shopdeck, Adani, Accenture and more.

Built with React, TypeScript and Vite. Animation uses GSAP (ScrollTrigger, SplitText, ScrambleText), Lenis smooth scroll and react-three-fiber for the 3D hero.

## Run locally

```bash
npm install
npm run dev      # http://127.0.0.1:5173, hot reload
npm run build    # production build in dist/
npm run preview  # serve the build locally
```

## Where things live

- `src/data.ts`: all copy, numbers, roles, projects and links. Edit content here.
- `src/pages/`: one file per page (Home, Work, Projects, Proof, Skills, Education, Contact).
- `src/fx/`: the animation components (page transition, text reveals, hover effects, scroll effects, 3D hero).
- `public/docs/`: resumes and documents linked from the site.

## Deployment

Hosted on Vercel, connected to this repo. Every push to `main` deploys to production; pushes to other branches get a preview URL.

Vercel settings: Vite preset, build command `npm run build`, output directory `dist`, Node.js 22.x or newer. No environment variables are needed. Pages use hash URLs (`/#/work`), so no rewrite rules are required.
