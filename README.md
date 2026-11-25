# Portfolio Template

A personal portfolio for Paul John Rosellosa, focused on healthcare operations and AI automation. It has a fixed profile rail, an animated contour background, a bento home screen, project detail dialogs with a 3D website-template carousel, and a separate app-style layout for phones. Project content distinguishes a case study, internal workflow examples with estimated (not measured) time savings, and prototype concepts.

Stack: Vite 6, React 19, TypeScript, plain CSS custom properties, Three.js, GSAP, Lenis, React Router 7, Phosphor icons, Poppins.

## What it looks like

Straight from this repo, placeholders and all.

**Desktop** - the profile rail, the contour background and the bento home.

![Desktop: profile rail on the left, headline, tools marquee and a bento grid of project, about, credential, services and testimonial cards](docs/screenshots/desktop.png)

**Phone** - an app-style layout: a floating tab bar, a glance widget for your stats, app-icon tools and swipeable shelf cards. Light and dark.

<p>
  <img src="docs/screenshots/mobile-light.png" alt="Phone, light theme: profile header, one-line headline, stats widget, tools row and explore cards above a floating tab bar" width="300">
  &nbsp;&nbsp;
  <img src="docs/screenshots/mobile-dark.png" alt="Phone, dark theme: the same Home screen on a navy background" width="300">
</p>

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run lint       # ESLint with the TypeScript parser and the React hooks rules
```

The contact API is a Vercel serverless function in `api/contact.ts`. Use `vercel dev` to run the Vercel function locally; `npm run dev` starts only the Vite frontend.

## Architecture

This is a static React single-page app, not a CMS-backed site. Page content is maintained in TypeScript data files and components, and files under `public/` are served from the site root. There is no application database.

```text
index.html
  └─ src/main.tsx — React Router, global styles, saved preferences
      └─ src/App.tsx — shared shell, navigation, accessibility and performance
          └─ route view — page component + its content/data
              └─ public/ — images, icons and standalone HTML previews

Contact form → /api/contact → Make webhook (server-side environment variable)
```

Routes are declared in `src/main.tsx`: Home (`/`), Projects, Services, Showcase, About, Vlogs, Contact, and standalone Privacy, Terms and Thank You pages. The shared shell in `src/App.tsx` supplies the profile rail on wider screens and phone navigation below 1100px. The animated Three.js background is deferred and omitted on touch or reduced-motion devices; frame-health checks can disable costly effects on slower devices.

Styles are plain CSS. `src/styles/tokens.css` holds shared palette, type and layout tokens. Styles are imported in a deliberate order in `src/main.tsx`; later sheets override earlier ones, so preserve that order when changing the cascade. Desktop shell scrolling and Lenis/GSAP behavior are managed by `src/hooks/useLenis.ts`; phone layouts use native scrolling.

The browser posts contact submissions to `/api/contact`. The serverless handler validates the request and forwards it to `MAKE_WEBHOOK_URL`; the webhook URL must only be configured as a server-side environment variable. No contact submissions are stored by this frontend.

## Make it yours

Update the content in the owning data file or route component. Most content changes require a rebuild and deployment; there is no admin interface. Keep prototype concepts clearly labeled, and only publish project results, credentials, testimonials and contact details that you can verify.

| What | Where |
|---|---|
| Name, role, photo paths, email, location, social URLs, Home headline/body, phone stats | `src/data/profile.ts` |
| Home calls to action and content layout | `src/components/Home.tsx` |
| Home desktop cards and summaries | `src/components/HomeBento.tsx` |
| Home phone profile, stats and explore tiles | `src/components/HomeMobile.tsx` |
| Current Projects page cards, statuses and detail-dialog copy | `src/components/ProjectsGrid.tsx` |
| Service descriptions, method stages and workflow caption | `src/components/ServicesGrid.tsx` |
| Showcase prototype concepts | `src/components/ShowcaseGrid.tsx` |
| About biography, experience and capabilities | `src/components/AboutGrid.tsx` |
| Technology categories and descriptions | `src/data/ai-stack.ts` |
| Home tools marquee items and optional icon paths | `src/components/ToolsMarquee.tsx`; icon files are under `public/icons/` |
| FAQs | `src/data/faqs.ts` |
| Vlog titles, descriptions and YouTube video IDs | `src/data/vlogs.ts` |
| Website/funnel preview definitions | `src/data/funnels.ts` |
| Profile photo | `public/avatar.svg`; if you change its URL, update both `avatarSrc`/`portraitSrc` in `src/data/profile.ts` and the desktop preload in `index.html` |
| Tool/brand icons | `public/icons/`; components must reference the chosen asset URL |
| SEO title, description, share metadata, theme-color and favicon link | `index.html`; favicon file is `public/favicon.svg` |
| Colors, typography and shared layout tokens | `src/styles/tokens.css` |
| Contact form validation/client request | `src/lib/contact.ts`; form UI and direct contact links are in `src/components/ContactGrid.tsx` |
| Contact delivery | `api/contact.ts`; set `MAKE_WEBHOOK_URL` in `.env.local` for local Vercel development and in Vercel Project Environment Variables before deploying |
| Privacy / Terms | `src/components/Privacy.tsx`, `src/components/ToS.tsx` |

The active `/projects` route uses `ProjectsGrid.tsx`. Older project components and data models also remain in the repository; for example, `src/data/projects.ts` currently exports empty app lists. Check whether a component is imported by a current route before editing it.

### Adding your own funnels and websites

1. Put the page's HTML in `public/funnels/` (single pages, shown 16:9) or `public/samples/` (full websites, shown 3:4).
2. Add an entry to `src/data/funnels.ts`.
3. Run `node scripts/make-thumbs.mjs` to render the thumbnails. It uses the Playwright install that comes with the dev dependencies (run `npx playwright install chromium` once if needed).

The current Projects template preview is populated from `websiteFunnel` in `src/data/funnels.ts` and uses website files in `public/samples/`. Funnel entries are also defined there, but are not currently the template list shown by that route.

`node scripts/make-placeholder-sites.mjs` regenerates the generic funnel and website HTML. `node scripts/make-thumbs.mjs` renders thumbnails and also rewrites the generic images in `public/placeholders/`; do not run these scripts over customized files unless you intend to regenerate them.
The thumbnail script also writes smaller copies under `public/home/`; those generated copies are not currently referenced by the routed Home view.

## Notes

- The background shader measures the visitor's frame rate and steps down on slow machines (`src/lib/perf.ts`). Keep any large `backdrop-filter` blur off the layers above it, because blur over an animated canvas is the most expensive thing on the page.
- At widths below 1100px, the site switches to its phone layout. `src/styles/mobile-app.css` owns phone components (`TabBar`, `QuickMenu`, `HomeMobile`); `src/styles/mobile-pass.css` holds phone motion and native-feel adjustments. The site respects `prefers-reduced-motion` and its own Reduce motion switch.
- Anything new you add above the fold on Home must join the intro hold-back list in `src/styles/boot.css`. Otherwise it shows through the intro animation.
- Before publishing, check the changed page at desktop and phone widths, in light and dark themes. Run `npm run build` and `npm run lint`; this project currently has no test script.

## Credits

- Contour background technique inspired by the landonorris.com site by OFF+BRAND. The simplex noise is Ashima Arts / Ian McEwan (MIT).
- Icons: [Phosphor](https://phosphoricons.com) (MIT). Tool logos in `public/icons/` are trademarks of their owners and are included as examples only.
- Font: Poppins (SIL Open Font License).

## License

[PolyForm Noncommercial 1.0.0](LICENSE), plus one extra permission: you can use it for **your own** portfolio, even if that portfolio promotes your paid services.

What it does not allow without a commercial license: selling or reselling this template, or building portfolio sites for other people for payment. For a commercial license, email brewedops@gmail.com.

Versions up to tag `v1.0.0-mit` (commit d3c05da) were MIT and stay MIT. Everything after that is under the license above.
