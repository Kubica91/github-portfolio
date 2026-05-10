# Skills

## 1. Code style rules

- Never use Unicode dashes (U+2013 `–`, U+2014 `—`) in source code. Always use ASCII hyphen-minus (U+002D `-`).
- All user-facing texts must go through react-i18next (`t()`, `<Trans>`). No hardcoded strings in components.
- Translations live in `src/locales/cs.json`. Write only to the Czech file. When `en.json` exists, do not modify it - English translations will be added separately.

---

## 2. stop-slop

Source: https://github.com/hardikpandya/stop-slop

Eliminates predictable AI prose patterns. Apply to all written output — descriptions, copy, README text, comments.

**Banned phrases:** Throat-clearing openers ("Certainly!", "Great question!", "Of course!"), emphasis crutches ("it's important to note", "it's worth mentioning"), business jargon ("leverage", "utilize", "streamline"), unnecessary adverbs ("simply", "just", "basically", "actually"), vague filler ("in today's world", "in the digital age"), meta-commentary ("In conclusion", "To summarize").

**Structural clichés to avoid:** Binary contrasts ("not just X, but Y"), negative listings ("not X, not Y, but Z"), dramatic fragments for effect, rhetorical question setups, passive voice constructions, false agency ("The data shows us that").

**Sentence-level rules:**

- Active voice mandatory
- No Wh- starters ("What this means is...", "What we found was...")
- No em dashes for dramatic effect
- No hyperbolic language ("revolutionary", "game-changing", "unprecedented")
- No staccato fragmentation for false drama

**Scoring rubric (each 1–10, min 35/50 to pass):** Directness · Rhythm · Trust · Authenticity · Density

---

## 3. ui-ux-pro-max-skill

Source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill

Design intelligence for building professional UI/UX. Activate when creating or refining UI components, layouts, color systems, or typography.

**Design system generator — output includes:**

- UI style recommendation (from 67 styles: glassmorphism, brutalism, neumorphism, etc.)
- Color palette (from 161 palettes aligned to product category)
- Font pairing (from 57 curated Google Fonts pairings)
- Industry-specific reasoning (161 rules)
- UX guidelines and anti-patterns to avoid (99 guidelines)
- Pre-delivery validation checklist

**Supported stacks:** React, Next.js, Vue, Nuxt, SwiftUI, Flutter, Laravel, plain HTML/Tailwind, and 7 more.

**Workflow:** Analyze project requirements → generate complete design system → smart recommendations based on product type → code implementation → pre-delivery validation.

**Anti-patterns database:** Actively flag and avoid the 99 documented UX anti-patterns during implementation.

---

## 4. Image sizes & scroll restoration

Pages that use `usePersistentScroll` ([src/hooks/usePersistentScroll.ts](src/hooks/usePersistentScroll.ts)) restore the scroll position on mount. If images on those pages have `loading="lazy"` without a reserved layout box, the container's `scrollHeight` is too small at mount time, the browser clamps the restore target, and lazy-loaded images later push content -> scroll lands in the wrong place.

**Rule:** Every image used on a page with `usePersistentScroll` must reserve its layout box before load. Two ways to do it:

1. **Fixed CSS box** (e.g. CV photo with `h-36 w-36`) - the box is fully sized by CSS, no extra work needed.
2. **Intrinsic width/height attributes** - use the `<Img>` wrapper at [src/components/Img.tsx](src/components/Img.tsx). It looks up dimensions in [src/generated/imageSizes.ts](src/generated/imageSizes.ts) (auto-generated) and renders `width`/`height` HTML attributes so the browser can compute `aspect-ratio` and reserve vertical space.

**When adding a new image to `public/images/`:**

- If the page using it relies on `usePersistentScroll` AND the image is rendered via `<Img>`, the size map must include the new file. The map is regenerated automatically on `npm run dev` and `npm run build` (see `package.json` scripts), or manually via `npm run generate-image-sizes`.
- During an active dev session, restart `npm run dev` (or run the generate script) after adding the image. The `<Img>` component logs a console warning in DEV if a size lookup misses.
- **Remind the user** of this whenever you (Claude) add a new file under `public/images/` and the consumer page uses `usePersistentScroll`. Don't silently skip it - a missing entry causes the scroll bug to silently come back for that one image.

