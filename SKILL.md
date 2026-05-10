# Skills

## 1. Code style rules

- Never use Unicode dashes (U+2013 `–`, U+2014 `—`) in source code. Always use ASCII hyphen-minus (U+002D `-`).

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

