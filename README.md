# Portfolio Template

A personal portfolio for Paul John Rosellosa, focused on healthcare operations and practical workflow automation. It has a fixed profile rail, an animated contour background, a bento home screen, a 3D template-page carousel, and a separate app-style layout for phones. Work examples use qualitative descriptions; showcase concepts and page templates are labeled as prototypes or previews.

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

## Make it yours

Update the content in the owning data file or view component. Keep prototype concepts clearly labeled, and only add project results, credentials, testimonials, and public contact details that you can verify.

| What | Where |
|---|---|
| Name, handle, photo, email, socials, Home headline, phone stats and their icons | `src/data/profile.ts` (start here) |
| Phone headline size (holds your headline on one line) | `--headline-em` in `src/styles/mobile-pass.css` - the comment there shows how to measure it |
| Your photo | `public/avatar.svg` (or point `avatarSrc` at a `.webp`/`.png`) |
| Project examples and prototype labels | `src/components/ProjectsGrid.tsx` |
| Page headlines and copy | `ServicesGrid`, `ShowcaseGrid`, `TestimonialsGrid`, `AboutGrid`, `ContactGrid` in `src/components/` |
| Funnel pages and websites (the 3D carousel) | `src/data/funnels.ts` + HTML files in `public/funnels/` and `public/samples/` |
| App projects (currently none published) | `src/data/projects.ts` |
| Tools and developing capabilities | `src/data/ai-stack.ts`, `src/components/ToolsMarquee.tsx` |
| FAQs | `src/data/faqs.ts` |
| Tools marquee | `src/components/ToolsMarquee.tsx` (logos in `public/icons/`) |
| Selected work results (no testimonials published) | `src/components/TestimonialsGrid.tsx` |
| Contact form | `src/lib/contact.ts` (configure a real profile email for the mail-app handoff or set `VITE_CONTACT_ENDPOINT` for a real backend) |
| SEO, share image, favicon | `index.html`, `public/favicon.svg` |
| Colors | `src/styles/tokens.css` |
| Privacy / Terms | `src/components/Privacy.tsx`, `src/components/ToS.tsx` |

### Adding your own funnels and websites

1. Put the page's HTML in `public/funnels/` (single pages, shown 16:9) or `public/samples/` (full websites, shown 3:4).
2. Add an entry to `src/data/funnels.ts`.
3. Run `node scripts/make-thumbs.mjs` to render the thumbnails. It uses the Playwright install that comes with the dev dependencies (run `npx playwright install chromium` once if needed).

To regenerate the placeholder pages: `node scripts/make-placeholder-sites.mjs`.

## Notes

- The background shader measures the visitor's frame rate and steps down on slow machines (`src/lib/perf.ts`). Keep any large `backdrop-filter` blur off the layers above it, because blur over an animated canvas is the most expensive thing on the page.
- From 1100px down, the site switches to the phone layout. `src/styles/mobile-app.css` owns its components (`TabBar`, `QuickMenu`, `HomeMobile`); `src/styles/mobile-pass.css` holds the motion (the tab pill, the bar hiding on scroll, page arrival, tile depth) and the native-feel fixes. Everything respects `prefers-reduced-motion` and the site's own Reduce motion switch.
- Anything new you add above the fold on Home must join the intro hold-back list in `src/styles/boot.css`. Otherwise it shows through the intro animation.

## Credits

- Contour background technique inspired by the landonorris.com site by OFF+BRAND. The simplex noise is Ashima Arts / Ian McEwan (MIT).
- Icons: [Phosphor](https://phosphoricons.com) (MIT). Tool logos in `public/icons/` are trademarks of their owners and are included as examples only.
- Font: Poppins (SIL Open Font License).

## License

[PolyForm Noncommercial 1.0.0](LICENSE), plus one extra permission: you can use it for **your own** portfolio, even if that portfolio promotes your paid services.

What it does not allow without a commercial license: selling or reselling this template, or building portfolio sites for other people for payment. For a commercial license, email brewedops@gmail.com.

Versions up to tag `v1.0.0-mit` (commit d3c05da) were MIT and stay MIT. Everything after that is under the license above.
