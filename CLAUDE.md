# Project Rules

## Code style

- Never use Unicode dashes (U+2013 `--`, U+2014 `---`) in source code. Always use ASCII hyphen-minus (U+002D `-`).
- All user-facing texts must go through react-i18next (`t()`, `<Trans>`). No hardcoded strings in components.
- Translations live in `src/locales/cs.json`. Write only to the Czech file. When `en.json` exists, do not modify it - English translations will be added separately.

---

## Image sizes & scroll restoration

Pages that use `usePersistentScroll` (`src/hooks/usePersistentScroll.ts`) restore the scroll position on mount. If images on those pages have `loading="lazy"` without a reserved layout box, the container's `scrollHeight` is too small at mount time, the browser clamps the restore target, and lazy-loaded images later push content - scroll lands in the wrong place.

**Rule:** Every image used on a page with `usePersistentScroll` must reserve its layout box before load. Two ways to do it:

1. **Fixed CSS box** (e.g. CV photo with `h-36 w-36`) - the box is fully sized by CSS, no extra work needed.
2. **Intrinsic width/height attributes** - use the `<Img>` wrapper at `src/components/Img.tsx`. It looks up dimensions in `src/generated/imageSizes.ts` (auto-generated) and renders `width`/`height` HTML attributes so the browser can compute `aspect-ratio` and reserve vertical space.

**When adding a new image to `public/images/`:**

- If the page using it relies on `usePersistentScroll` AND the image is rendered via `<Img>`, the size map must include the new file. The map is regenerated automatically on `npm run dev` and `npm run build`, or manually via `npm run generate-image-sizes`.
- During an active dev session, restart `npm run dev` (or run the generate script) after adding the image. The `<Img>` component logs a console warning in DEV if a size lookup misses.
- Remind the user whenever a new file is added under `public/images/` and the consumer page uses `usePersistentScroll`. A missing entry causes the scroll bug to silently come back for that one image.

