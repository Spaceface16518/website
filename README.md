# Amrit Rathie — Astro design previews

Static Astro site targeting Vercel. Node 22; `npm ci`, `npm run check`, `npm run build`, `npm run dev`.

`vercel.json` explicitly selects Astro, npm ci, npm run build, and dist. The old Hugo config, theme, blog, and now.json are removed. No server adapter is necessary for static output. Keep previews on codex/preview-* branches; do not merge to master until a design is selected.

Editable biographical content lives in src/data/profile.ts. See docs/CONTENT_SOURCES.md for provenance and uncertainties.

References: https://docs.astro.build/en/guides/deploy/vercel/ and https://vercel.com/docs/project-configuration/vercel-json .
