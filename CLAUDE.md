# Project Rules

## Code style

- Never use Unicode dashes (U+2013 `--`, U+2014 `---`) in source code. Always use ASCII hyphen-minus (U+002D `-`).
- All user-facing texts must go through react-i18next (`t()`, `<Trans>`). No hardcoded strings in components.
- Translations live in `src/locales/cs.json`. Write only to the Czech file. When `en.json` exists, do not modify it - English translations will be added separately.

---

## Writing style (stop-slop)

Apply to all written output - descriptions, copy, README text, comments.

Eliminate predictable AI writing patterns from prose.

### Core Rules

1. **Cut filler phrases.** Remove throat-clearing openers, emphasis crutches, and all adverbs.

2. **Break formulaic structures.** Avoid binary contrasts, negative listings, dramatic fragmentation, rhetorical setups, false agency.

3. **Use active voice.** Every sentence needs a human subject doing something. No passive constructions. No inanimate objects performing human actions ("the complaint becomes a fix").

4. **Be specific.** No vague declaratives ("The reasons are structural"). Name the specific thing. No lazy extremes ("every," "always," "never") doing vague work.

5. **Put the reader in the room.** No narrator-from-a-distance voice. "You" beats "People." Specifics beat abstractions.

6. **Vary rhythm.** Mix sentence lengths. Two items beat three. End paragraphs differently. No em dashes.

7. **Trust readers.** State facts directly. Skip softening, justification, hand-holding.

8. **Cut quotables.** If it sounds like a pull-quote, rewrite it.

### Quick Checks

Before delivering prose:

- Any adverbs? Kill them.
- Any passive voice? Find the actor, make them the subject.
- Inanimate thing doing a human verb ("the decision emerges")? Name the person.
- Sentence starts with a Wh- word? Restructure it.
- Any "here's what/this/that" throat-clearing? Cut to the point.
- Any "not X, it's Y" contrasts? State Y directly.
- Three consecutive sentences match length? Break one.
- Paragraph ends with punchy one-liner? Vary it.
- Em-dash anywhere? Remove it.
- Vague declarative ("The implications are significant")? Name the specific implication.
- Narrator-from-a-distance ("Nobody designed this")? Put the reader in the scene.
- Meta-joiners ("The rest of this essay...")? Delete. Let the essay move.

### Scoring

Rate 1-10 on each dimension:

| Dimension | Question |
|-----------|----------|
| Directness | Statements or announcements? |
| Rhythm | Varied or metronomic? |
| Trust | Respects reader intelligence? |
| Authenticity | Sounds human? |
| Density | Anything cuttable? |

Below 35/50: revise.

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

