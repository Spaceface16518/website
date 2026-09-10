# Editorial preview validation

Validated September 10, 2026.

- `npm run check`: 0 errors, 0 warnings, 0 hints.
- `npm run build`: success; static homepage and 404 generated in `dist`.
- Source audit: no `/resume.pdf` links or unpublished resume attachments. LinkedIn is offered as the professional-profile destination in the footer.
- External HTTP checks: GitHub profile, CloudCare repository, locking repository, public resume repository, and Nebula Degree Planner each returned HTTP 200. LinkedIn returned HTTP 999 (automated-access restriction); destination remains the supplied profile URL, and accessibility cannot be confirmed by curl.
- All local navigation targets (`main`, `work`, `about`, `contact`) exist. Favicon is a local asset.
- Parent verified GitHub deployment environment **Preview**, commit `84f59c8`, Vercel status **success**: https://amritrathie-i4yz1yh4p-spaceface16518s-projects.vercel.app
- Browser visual and interaction QA is pending; this document does not claim it has been completed.
