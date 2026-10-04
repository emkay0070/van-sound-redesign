# Van Sound Events — Frontend Documentation

> Last updated: October 2026  
> Stack: Next.js 16 (App Router) · Tailwind CSS · Framer Motion · Lenis

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Design System](#2-design-system)
3. [Page Assembly](#3-page-assembly)
4. [Components](#4-components)
5. [Scroll & Animation System](#5-scroll--animation-system)
6. [Lenis Smooth Scroll](#6-lenis-smooth-scroll)
7. [EventReel — Pinned Horizontal Scroll](#7-eventreel--pinned-horizontal-scroll)
8. [Layout Spacing Rules](#8-layout-spacing-rules)
9. [Tuning Reference](#9-tuning-reference)

---

## 1. Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          ← Root fonts, metadata, ThemeProvider + SmoothScroll
│   ├── page.tsx            ← Page assembly — imports all sections in order
│   └── globals.css         ← Design tokens (CSS vars), base resets
├── components/
│   ├── navigation/         Navigation.tsx
│   ├── hero/               Hero.tsx
│   ├── statement/          Statement.tsx
│   ├── immersive/          ImmersiveImage.tsx
│   ├── services/           Services.tsx
│   ├── showcase/           Showcase.tsx
│   ├── event-reel/         EventReel.tsx  ← pinned horizontal scroll
│   ├── about/              About.tsx
│   ├── final-cta/          FinalCta.tsx
│   ├── footer/             Footer.tsx
│   └── ui/
│       ├── SmoothScroll.tsx   ← Lenis provider
│       ├── ThemeProvider.tsx  ← next-themes (forced dark)
│       └── WhatsAppButton.tsx ← floating CTA
├── tailwind.config.js
└── tsconfig.json
```

---

## 2. Design System

### Colour Tokens (`globals.css` → `:root`)

| Token | Value | Used for |
|---|---|---|
| `--brand-primary` | `#F97316` (amber/orange) | Accents, CTAs, gradients |
| `--background` | `#080808` | Page background |
| `--foreground` | `#F5F0EB` | Body text |
| `--foreground/N` | opacity variants | Subtext, borders, labels |

### Typography

| Variable | Font | Purpose |
|---|---|---|
| `--font-display` | **Bebas Neue** | Hero headings, section titles |
| `--font-sans` | **Inter** | Body copy, paragraphs |
| `--font-label` | **Space Grotesk** | Labels, tags, UI metadata |

Fonts are loaded via `next/font/google` in `layout.tsx` and exposed as CSS variables consumed by Tailwind's `fontFamily` config.

### Tailwind Utilities

```css
.text-gradient-orange   /* amber diagonal gradient on text */
.font-display           /* maps to --font-display */
.font-sans              /* maps to --font-sans */
.font-label             /* maps to --font-label */
.text-brand-primary     /* var(--brand-primary) */
.bg-brand-primary       /* var(--brand-primary) */
```

---

## 3. Page Assembly

**`app/page.tsx`** renders sections in this exact order:

```
Navigation       ← transparent over hero, sticky on scroll
Hero             ← full-bleed cinematic, ONLY section that is truly edge-to-edge
Statement        ← "SOUND ISN'T JUST HEARD. IT'S FELT."
ImmersiveImage   ← constrained full-height photo with parallax
Services         ← interactive desktop hover / mobile accordion
Showcase         ← stacked "Selected Moments" film strip
EventReel        ← pinned horizontal scroll gallery
About            ← "The People Behind the Moment"
FinalCta         ← dramatic WhatsApp CTA
Footer           ← brand, nav, contact
WhatsAppButton   ← floating persistent CTA
```

---

## 4. Components

### Hero
- Full viewport height, full bleed (no layout container — intentional)
- Parallax scale on background image driven by `useScroll`
- Typography: asymmetric `VAN` / `SOUND` stacked display at `clamp(5rem, 16vw, 18rem)`
- Entrance animations mount-gated (`useEffect` sets `mounted = true`) to prevent SSR flash

### Statement
- Editorial breathing room — large display type with slow parallax `y` drift
- `SOUND ISN'T JUST HEARD.` / `IT'S FELT.` / supporting paragraph

### ImmersiveImage
- Constrained to layout container with `rounded-2xl`
- Parallax image that moves at 8% of scroll speed
- Text overlay sitting inside the image at bottom-left

### Services
- Desktop: interactive sidebar — hover a service name to reveal its image + description on the right
- Mobile: accordion-style expand/collapse
- Scroll-triggered in/out on each service row

### Showcase
- "Selected Moments" — stacked card grid (1 full-width + 2-col row + 1 full-width)
- Each `MomentCard` has a clip-path reveal on scroll and image scale parallax
- All cards have `rounded-2xl` and respect layout horizontal padding

### EventReel
See [Section 7](#7-eventreel--pinned-horizontal-scroll) for full detail.

### About
- Two-column layout: parallax image (left) + typography (right)
- "THE PEOPLE BEHIND THE MOMENT."
- Rule: do not make this about equipment — focus on the human team

### FinalCta
- Dark panel with very low-opacity background image
- Constrained to layout container with `rounded-2xl`
- Dual CTA: WhatsApp (primary, green) + Email enquiry (secondary, ghost)

### Footer
- 4-column grid: Brand / Navigate / Services / Contact
- WhatsApp ghost button in the Contact column
- Bottom bar: copyright + Privacy / Terms links

---

## 5. Scroll & Animation System

### Standard Pattern

Every animated element uses `whileInView` from Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: false, amount: 0.2 }}
  transition={{ duration: 1.1, delay: 0.15, ease }}
>
```

### Key Settings

| Prop | Value | Why |
|---|---|---|
| `once` | `false` | Elements animate **in AND out** as you scroll — not fire-once |
| `amount` | `0.2` | Triggers when 20% of the element enters the viewport |
| `ease` | `[0.16, 1, 0.3, 1]` | Expo ease-out — fast start, glides to stop |

> **Tuning tip:** Increase `amount` to `0.4` if you want animations to trigger later (element more visible before firing). Decrease to `0.05` for very early triggers.

### Typed Ease Arrays

Framer Motion v12 requires cubic bezier ease arrays to be typed as a 4-tuple:

```ts
// ✅ Correct
const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

// ❌ Will cause a TypeScript error
const ease = [0.16, 1, 0.3, 1]; // inferred as number[]
```

Define `ease` once at the top of each component and reuse it.

---

## 6. Lenis Smooth Scroll

### Setup

Lenis is initialised in `components/ui/SmoothScroll.tsx` and mounted in `app/layout.tsx`:

```
ThemeProvider
  └── SmoothScroll       ← Lenis lives here
        └── {children}   ← entire app
```

### Configuration

```ts
new Lenis({
  duration: 1.2,                                  // scroll animation length in seconds
  easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),  // expo ease-out
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 1.5,
  infinite: false,
})
```

### Important Notes

- **Uses `window` as the scroll container** — this means Framer Motion's `useScroll`, native `IntersectionObserver`, and `<a href="#section">` anchor links all work with zero extra config.
- **RAF-driven** — a `requestAnimationFrame` loop calls `lenis.raf(time)` each frame. No GSAP required.
- **`prefers-reduced-motion` respected** — if the OS has reduced motion enabled, Lenis never initialises and the browser uses its native scroll behaviour.
- **Debug access** — Lenis instance is available at `window.__lenis` in the browser console. Useful for programmatic scrolling:

```js
// Scroll to a specific element
window.__lenis.scrollTo('#services', { duration: 1.5 })

// Scroll to top
window.__lenis.scrollTo(0)
```

---

## 7. EventReel — Pinned Horizontal Scroll

### How it works

```
┌───────────────────────────────────────────────┐
│  <section>  height = 6 × 100vh               │  ← vertical scroll room
│  ┌─────────────────────────────────────────┐  │
│  │  sticky top-0  h-screen                │  │  ← this PINS to screen
│  │                                         │  │
│  │  [Event Reel ─────] [Scroll to explore] │  │  ← header (label fades out)
│  │  [▓card 1▓] [▓card 2▓] [▓card 3▓] →   │  │  ← strip slides LEFT
│  │  [▓▓▓▓▓░░░░░░░░ progress bar ░░░░░]    │  │  ← tracks progress
│  └─────────────────────────────────────────┘  │
└───────────────────────────────────────────────┘
```

### Implementation

```tsx
// 1. Outer section is (cards + 1) × 100vh tall
<section style={{ height: `${(reelItems.length + 1) * 100}vh` }}>

  // 2. Inner panel sticks to top of viewport
  <div className="sticky top-0 h-screen overflow-hidden">

    // 3. Card strip translates horizontally
    <motion.div style={{ x }}>
      {cards}
    </motion.div>

  </div>
</section>
```

### Transforms

```ts
// Vertical scroll 0→1 maps to horizontal slide
const x = useTransform(scrollYProgress, [0, 1], [0, xDistance]);

// "Scroll to explore" label fades out early
const labelOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.35]);

// Progress bar fills as you travel through cards
const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
```

### Pacing

The total scroll room is `(reelItems.length + 1) * 100vh`:

| Cards | Height | Pacing |
|---|---|---|
| 5 (current) | `600vh` | Comfortable, ~1 screen per card |
| 3 | `400vh` | Faster |
| 8 | `900vh` | Slower, more cinematic |

To adjust: change `reelItems.length + 1` to any multiplier in `EventReel.tsx` line `style={{ height: ... }}`.

### Dynamic Width Measurement

The slide distance is calculated on mount and on every resize:

```ts
useEffect(() => {
  const measure = () => {
    const overscroll = stripRef.current.scrollWidth - window.innerWidth;
    setXDistance(-overscroll);
  };
  measure();
  window.addEventListener('resize', measure);
  return () => window.removeEventListener('resize', measure);
}, []);
```

---

## 8. Layout Spacing Rules

### The Golden Rule

> **Only the Hero is truly full-bleed.** Every other section that contains an image or panel must be wrapped in the layout container.

### Standard Container

```tsx
<div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
  {/* content */}
</div>
```

### Horizontal Padding Reference

| Breakpoint | Class | Value |
|---|---|---|
| Mobile (`< md`) | `px-6` | 24px |
| Tablet (`md`) | `px-10` | 40px |
| Desktop (`lg+`) | `px-16` | 64px |
| Ultra-wide (> 1600px) | auto-centred | `(100vw - 1600px) / 2` |

### Constrained Image Sections

For sections with large images (ImmersiveImage, Showcase, FinalCta):

```tsx
<div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16">
  <div className="relative h-[65vh] overflow-hidden rounded-2xl">
    {/* image + overlay content */}
  </div>
</div>
```

The `rounded-2xl` on the inner container is intentional — it signals that the image is contained, not full-bleed.

---

## 9. Tuning Reference

| What to change | Where | How |
|---|---|---|
| Scroll animation trigger point | Any component | `viewport={{ amount: 0.X }}` |
| Scroll animation direction | Any component | `initial={{ y: 40 }}` → `initial={{ x: -40 }}` etc |
| Lenis scroll speed | `SmoothScroll.tsx` | `duration: 1.2` — increase for slower, decrease for faster |
| Lenis easing | `SmoothScroll.tsx` | Replace the `easing` function |
| EventReel pacing | `EventReel.tsx` | `(reelItems.length + 1) * 100`vh multiplier |
| Card sizes in EventReel | `EventReel.tsx` | `w-[75vw] md:w-[42vw] lg:w-[30vw]` |
| Brand colour | `globals.css` | `--brand-primary` in `:root` |
| Section order | `app/page.tsx` | Reorder component imports |
| Force dark mode off | `ThemeProvider.tsx` | Remove `forcedTheme="dark"` |
