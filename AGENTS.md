<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# PRAGYA — PRODUCT & ENGINEERING CONSTITUTION

## 1. PRODUCT IDENTITY

**Product Name:** Pragya

**Product Type:** Web-based digital library, reading, and personal knowledge platform.

**Core idea:**

Pragya allows administrators to publish books and allows users to read those books online.

A user can create and maintain a **private personal editable copy** of a book.

A user's edits:

* Are visible only to that user.
* Never modify the administrator's original book.
* Never appear in another user's copy.
* Are not collaborative.
* Do not require real-time synchronization.

Pragya is NOT:

* A social network.
* A collaborative document editor.
* A generic LMS.
* A content-heavy dashboard.
* A productivity app full of unnecessary features.

Pragya should feel like a **beautiful personal digital library**.

---

# 2. BRAND PHILOSOPHY

The name "Pragya" represents:

**Knowledge + Understanding + Wisdom**

The product should communicate:

> Quiet intelligence.
> Focused learning.
> Thoughtful reading.

The interface should feel trustworthy, mature, calm, and premium.

It should not feel childish, gamified, overly corporate, or flashy.

### Brand personality

* Intelligent
* Calm
* Curious
* Refined
* Academic
* Warm
* Focused
* Minimal
* Modern
* Timeless

### Emotional goal

When a user opens Pragya, the immediate feeling should be:

> "This is a place where I can sit down and learn."

---

# 3. DESIGN REFERENCES

Use these products only as conceptual references, never as direct copies.

### Notion

Reference for:

* Clean information architecture
* Generous whitespace
* Minimal UI
* Calm interaction design

### Kindle / Apple Books

Reference for:

* Reading comfort
* Typography
* Content-first layouts
* Long reading sessions

### Google Docs

Reference for:

* Familiar editing interactions
* Document-focused workspace
* Clean toolbar behavior

### Linear

Reference for:

* Modern product UI
* Precision
* Spacing
* Subtle interaction feedback

### Apple

Reference for:

* Restraint
* Typography
* Premium simplicity
* Attention to detail

Pragya must combine these principles without visually copying any of them.

---

# 4. DESIGN PRINCIPLES

Every interface decision should follow these principles.

### 4.1 Content First

Books and reading content are the primary visual focus.

UI should support content rather than compete with it.

### 4.2 Whitespace

Use generous whitespace.

Never fill empty space simply because it exists.

### 4.3 Visual Hierarchy

Users should immediately understand:

1. Where they are.
2. What they are reading.
3. What they can do.
4. What action is most important.

### 4.4 Restraint

Avoid decorative UI without functional purpose.

### 4.5 Consistency

The same component should look and behave consistently everywhere.

### 4.6 Accessibility

Readable typography and sufficient contrast always take priority over visual novelty.

---

# 5. COLOR SYSTEM

Pragya uses a warm paper-inspired visual identity.

## Light Theme

### Background

**Paper**

```text
#FAF8F4
```

Primary application background.

Use this instead of pure white for major page backgrounds.

### Surface

**White**

```text
#FFFFFF
```

Use for cards, dialogs, floating surfaces, and elevated content.

### Primary

**Pragya Blue**

```text
#1D4ED8
```

Use for:

* Primary buttons
* Active navigation
* Links
* Focus states
* Important interactive elements

Do not use blue as decoration.

### Primary Hover

```text
#1E40AF
```

### Primary Soft Background

```text
#EFF6FF
```

Use for:

* Selected items
* Informational highlights
* Subtle active states

### Accent

**Muted Gold**

```text
#C69214
```

Use extremely sparingly.

Possible uses:

* Important highlights
* Bookmarks
* Small decorative accents
* Premium status indicators

Gold must NEVER become the dominant UI color.

### Primary Text

```text
#111827
```

Use for:

* Headings
* Main body text
* Important labels

### Secondary Text

```text
#6B7280
```

Use for:

* Metadata
* Supporting descriptions
* Secondary labels

### Muted Text

```text
#9CA3AF
```

Use sparingly for:

* Placeholder text
* Disabled content
* Very low-priority metadata

### Border

```text
#E5E7EB
```

### Subtle Border

```text
#F0EEE9
```

Use where a warmer border fits the paper aesthetic.

### Success

```text
#15803D
```

### Warning

```text
#B45309
```

### Error

```text
#DC2626
```

### Info

```text
#2563EB
```

---

# 6. DARK THEME

Dark mode must be comfortable for long reading sessions.

Do NOT use pure black as the main background.

### Background

```text
#171717
```

### Surface

```text
#1F1F1F
```

### Elevated Surface

```text
#262626
```

### Primary Text

```text
#F5F5F4
```

### Secondary Text

```text
#A8A29E
```

### Border

```text
#2F2F2F
```

### Primary Blue

```text
#60A5FA
```

### Gold

```text
#D4A72C
```

Dark mode should feel like a warm premium reading environment, not a developer IDE.

---

# 7. TYPOGRAPHY

Typography is one of Pragya's most important design elements.

Use two primary font families.

## UI Font

### Inter

Use **Inter** for:

* Navigation
* Buttons
* Forms
* Labels
* Dashboard UI
* Metadata
* Search
* Admin interfaces
* System messages

Preferred weights:

* 400 — Regular
* 500 — Medium
* 600 — Semibold
* 700 — Bold

Avoid using 800/900 unless there is a strong design reason.

---

## Reading Font

### Source Serif 4

Use **Source Serif 4** for:

* Book body content
* Long-form reading
* Chapters
* Quotes
* Literary content where appropriate

Preferred weights:

* 400 — Body
* 500 — Emphasis
* 600 — Subheadings

The reading experience should resemble a carefully typeset book.

---

## Alternative Reading Font

### Literata

Literata may be used if Source Serif 4 does not provide the desired reading experience for a particular content format.

Do not load both reading fonts unnecessarily.

Source Serif 4 is the default.

---

# 8. TYPE SCALE

Use a consistent typographic hierarchy.

### Display

```text
56px
line-height: 1.05
weight: 700
```

Use sparingly.

### H1

```text
40px
line-height: 1.15
weight: 700
```

### H2

```text
32px
line-height: 1.2
weight: 700
```

### H3

```text
24px
line-height: 1.3
weight: 600
```

### H4

```text
20px
line-height: 1.4
weight: 600
```

### Body Large

```text
18px
line-height: 1.7
```

### Body

```text
16px
line-height: 1.6
```

### Small

```text
14px
line-height: 1.5
```

### Caption

```text
12px
line-height: 1.4
```

---

# 9. READING TYPOGRAPHY

Book content must prioritize comfort.

Default reading body:

```text
Font: Source Serif 4
Size: 18px
Line height: 1.8
Weight: 400
```

Recommended reading width:

```text
650px – 760px
```

Do not make paragraphs span the entire browser width.

Long lines reduce reading comfort.

Chapter headings should have generous spacing above and below.

---

# 10. SPACING SYSTEM

Use a consistent 4px base spacing system.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
80px
96px
128px
```

Prefer these values over arbitrary spacing.

### Common usage

Small gap:

```text
8px
```

Component internal spacing:

```text
12px – 16px
```

Card padding:

```text
20px – 24px
```

Section spacing:

```text
48px – 80px
```

Major page sections:

```text
80px – 128px
```

---

# 11. BORDER RADIUS

Pragya should use moderate, refined rounding.

### Small

```text
6px
```

### Inputs

```text
8px
```

### Buttons

```text
8px
```

### Cards

```text
12px
```

### Large surfaces

```text
16px
```

Avoid excessive pill-shaped UI.

Use full pill radius only for:

* Tags
* Status badges
* Small filters
* Compact controls

---

# 12. SHADOW SYSTEM

Shadows must be subtle.

### Small

```text
0 1px 3px rgba(17, 24, 39, 0.06)
```

### Medium

```text
0 4px 12px rgba(17, 24, 39, 0.08)
```

### Large

```text
0 12px 32px rgba(17, 24, 39, 0.10)
```

Never use dramatic glowing shadows.

Avoid excessive elevation.

Most UI should rely on whitespace and borders rather than shadows.

---

# 13. BORDERS

Default border:

```text
1px solid #E5E7EB
```

Use borders to establish hierarchy without making the interface visually heavy.

Avoid thick borders.

---

# 14. BUTTONS

## Primary Button

* Background: `#1D4ED8`
* Text: `#FFFFFF`
* Radius: `8px`
* Font: Inter 500
* Height: approximately `40px`
* Horizontal padding: `16px`

Hover:

```text
#1E40AF
```

## Secondary Button

* Background: `#FFFFFF`
* Text: `#111827`
* Border: `#E5E7EB`
* Radius: `8px`

## Ghost Button

Transparent background.

Use only when the action is secondary.

## Destructive Button

Use `#DC2626` only for genuinely destructive actions.

Do not make destructive actions visually dominant unless necessary.

---

# 15. ICONOGRAPHY

Use:

**Lucide React**

Default characteristics:

* Thin
* Clean
* Geometric
* Consistent

Default icon sizes:

```text
16px — compact UI
18px — standard controls
20px — primary controls
24px — prominent actions
```

Do not mix multiple icon libraries.

Avoid decorative icons that don't communicate meaning.

---

# 16. COMPONENT DESIGN

Use **shadcn/ui** as the foundation for common UI primitives.

Prefer:

* Button
* Input
* Dialog
* Dropdown Menu
* Sheet
* Tabs
* Tooltip
* Select
* Command
* Toast / Sonner
* Card

Customize them to match Pragya's design language.

Do not blindly use default shadcn styling if it conflicts with the Pragya visual system.

---

# 17. CARDS

Cards should feel lightweight.

Use:

* White or surface background
* 1px border
* 12px radius
* 20–24px padding
* Very subtle shadow only when elevation is required

Do not turn every section into a card.

Large areas of the application should remain open and borderless.

---

# 18. NAVIGATION

Navigation should be simple and predictable.

Possible primary navigation:

```text
Library
Continue Reading
Bookmarks
Notes
```

Admin users may additionally see:

```text
Admin
Books
Users
Analytics
```

Do not overload the navigation.

Use clear active states.

Active navigation should use:

* Deep blue
* Soft blue background
* Or a restrained visual indicator

---

# 19. LANDING PAGE

The landing page should communicate Pragya immediately.

It should NOT feel like a generic SaaS landing page.

Avoid:

* Excessive gradients
* Giant decorative illustrations
* Fake statistics
* Excessive animations
* Huge walls of marketing copy

Preferred structure:

```text
Navbar

Hero
    Clear statement
    Short supporting text
    Primary action
    Secondary action

Visual preview of the reading experience

Core philosophy / benefits

Featured books or library preview

Simple footer
```

The page should have substantial whitespace.

---

# 20. LIBRARY

The library is the primary discovery interface.

Books should be visually prominent.

Book cards should include:

* Cover
* Title
* Author
* Optional category
* Reading progress where applicable

Do not overcrowd book cards with metadata.

Book covers should maintain consistent aspect ratios.

---

# 21. BOOK READER

The reader is one of the most important parts of Pragya.

The reader must prioritize the book above the interface.

Preferred structure:

```text
Minimal top navigation

Book title / chapter context

Centered reading column

Reading content

Minimal bottom / side controls
```

The reading column should generally remain within:

```text
650px – 760px
```

Controls should disappear or become visually quiet when not needed.

The reader should feel closer to a digital book than a dashboard.

---

# 22. READER CONTROLS

Possible controls:

* Table of contents
* Search
* Font size
* Reading width
* Theme
* Bookmark
* Notes
* Edit

Controls should not constantly dominate the screen.

Use progressive disclosure where appropriate.

---

# 23. EDITOR

The editor should visually resemble the reader.

The transition between reading and editing should feel natural.

Do NOT create a completely different application-like editor.

Editor characteristics:

* Clean document canvas
* Minimal toolbar
* Comfortable text width
* Source Serif 4 for book content
* Inter for UI
* Clear save state
* Auto-save
* Focus on content

Possible toolbar controls:

```text
Undo
Redo
Bold
Italic
Underline
Heading
Lists
Quote
Link
Image
Table
```

Only include controls actually required by the supported content format.

---

# 24. PERSONAL COPY SYSTEM

The user's editable book is a private copy.

Example:

```text
Original Book
      │
      ├── User A → Private Copy A
      │
      ├── User B → Private Copy B
      │
      └── User C → Private Copy C
```

Never mutate the original book when a user edits their copy.

Never expose another user's copy.

Never implement collaborative editing unless explicitly requested.

---

# 25. AUTO-SAVE

The editor should provide clear but unobtrusive save feedback.

Examples:

```text
Saving...
Saved
Saved just now
```

Do not use disruptive toast notifications for every automatic save.

---

# 26. ANIMATIONS

Animations must be subtle.

Default duration:

```text
150ms – 250ms
```

Use:

```text
ease-out
```

Animations should communicate:

* State changes
* Navigation
* Opening/closing
* Feedback

Do not animate content unnecessarily.

Avoid:

* Bouncing UI
* Excessive parallax
* Large zoom animations
* Constant motion
* Distracting loading animations

Respect `prefers-reduced-motion`.

---

# 27. RESPONSIVE DESIGN

Pragya must work across:

* Desktop
* Laptop
* Tablet
* Mobile

Desktop should not simply be scaled down for mobile.

### Mobile priorities

* Reading comfort
* Large touch targets
* Simple navigation
* Minimal toolbar
* No horizontal scrolling
* Comfortable typography

Important controls may move into a bottom sheet or compact menu on mobile.

---

# 28. ACCESSIBILITY

Follow WCAG principles.

Requirements:

* Semantic HTML
* Keyboard navigation
* Visible focus states
* Accessible labels
* Proper heading hierarchy
* Sufficient color contrast
* Alt text for meaningful images
* No information conveyed by color alone
* Minimum comfortable touch targets

Do not sacrifice accessibility for aesthetics.

---

# 29. RESPONSIVE BREAKPOINTS

Use Tailwind's standard responsive system unless a specific requirement demands otherwise.

Design primarily around:

```text
Mobile
Tablet
Desktop
Large Desktop
```

Avoid designing for dozens of custom breakpoints.

---

# 30. IMAGES & BOOK COVERS

Book covers should feel editorial and premium.

Maintain consistent aspect ratios.

Use appropriate object-fit behavior.

Do not stretch images.

Use optimized image loading.

Avoid unnecessary decorative stock imagery.

---

# 31. EMPTY STATES

Empty states should be calm and useful.

Example:

```text
No books yet.

Your library is waiting for its first book.
```

Avoid exaggerated illustrations or childish graphics.

Always provide a clear next action when appropriate.

---

# 32. LOADING STATES

Prefer skeletons for content-heavy interfaces.

Skeletons should use subtle neutral tones.

Avoid flashy loading animations.

For the reader, preserve layout dimensions to prevent content jumping.

---

# 33. ERROR STATES

Errors should be:

* Clear
* Human-readable
* Specific
* Actionable

Never show:

* Stack traces
* Database errors
* Internal implementation details
* Secrets

Example:

Bad:

```text
MongoServerError: E11000...
```

Good:

```text
Something went wrong while saving your changes.
Please try again.
```

---

# 34. FORMS

Use:

**React Hook Form + Zod**

Forms should:

* Have clear labels
* Show validation near the relevant field
* Preserve user input where possible
* Clearly indicate required fields
* Provide useful error messages
* Disable submission only when appropriate

Never rely exclusively on browser validation.

---

# 35. DATABASE

Database:

**MongoDB Atlas**

ODM:

**Mongoose**

Keep database access isolated from presentation components.

Do not put database queries directly inside reusable UI components.

Use clear schemas and indexes where appropriate.

Design the data model so future migration to a relational database remains possible.

---

# 36. AUTHENTICATION

Authentication:

**Auth.js**

Requirements:

* Secure authentication
* Secure sessions
* Protected routes
* Server-side authorization
* Secure password handling where credentials authentication is used

Never trust role or user identity values supplied by the client.

---

# 37. VALIDATION

Use:

**Zod**

Validate:

* Form input
* API input
* Server actions
* Database-bound data where appropriate

Client-side validation improves UX.

Server-side validation provides security.

Both may be necessary.

---

# 38. TYPESCRIPT

Use TypeScript in strict mode.

Do not use:

```typescript
any
```

unless absolutely unavoidable.

Prefer:

* Explicit interfaces
* Type aliases
* Discriminated unions
* Inferred types where clear

Avoid excessive type complexity.

Types should make the code easier to understand, not harder.

---

# 39. REACT

Use modern React patterns.

React Compiler is enabled.

Do not add `useMemo`, `useCallback`, or `React.memo` automatically just for optimization.

Use them only when there is a concrete reason.

Prefer readable components.

Avoid unnecessary client components.

---

# 40. NEXT.JS

Use the App Router.

Follow the conventions and APIs of the **currently installed Next.js version**.

Before making assumptions about Next.js APIs, consult the local documentation referenced by the generated Next.js agent instructions.

Prefer:

* Server Components
* Server Actions where appropriate
* Route Handlers where appropriate
* Streaming where beneficial
* Proper metadata
* Built-in image optimization

Do not follow outdated Next.js conventions when the installed version provides a newer recommended approach.

---

# 41. PROJECT STRUCTURE

Use the `src/` directory.

Use the configured import alias:

```text
@/*
```

Example:

```typescript
import { Button } from "@/components/ui/button";
```

Prefer feature-oriented organization.

Suggested structure:

```text
src/
├── app/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── common/
│
├── features/
│   ├── auth/
│   ├── books/
│   ├── reader/
│   ├── editor/
│   ├── dashboard/
│   └── admin/
│
├── lib/
├── models/
├── services/
├── hooks/
├── types/
├── utils/
└── constants/
```

Do not create folders until they are actually needed.

Avoid premature abstraction.

---

# 42. CODE QUALITY

Use:

**Biome**

Biome is responsible for formatting and linting.

Code should be:

* Readable
* Consistent
* Small where possible
* Properly typed
* Testable
* Maintainable

Do not fight Biome's formatting rules unless there is a genuine technical reason.

---

# 43. DEPENDENCY RULES

Before adding a dependency:

1. Check whether the functionality already exists.
2. Check whether an existing dependency can solve it.
3. Check whether the dependency is actively maintained.
4. Add it only if it provides meaningful value.

Do not install packages simply because they are popular.

---

# 44. SECURITY

Never commit:

```text
.env
.env.local
API keys
Database credentials
Authentication secrets
Private tokens
```

Never expose server secrets to browser code.

Validate and authorize every protected server operation.

Never trust the client for:

* User ID
* Role
* Permissions
* Ownership

---

# 45. PERFORMANCE

Performance should come from good architecture rather than premature optimization.

Prefer:

* Server Components
* Efficient database queries
* Proper indexes
* Image optimization
* Code splitting
* Lazy loading of genuinely heavy features
* Minimal client JavaScript

Do not optimize code without a reasonable justification.

---

# 46. SEO

Public-facing pages should use proper metadata.

Important pages should have:

* Title
* Description
* Open Graph metadata where appropriate

Book pages should have meaningful metadata when publicly accessible.

---

# 47. DEVELOPMENT PHILOSOPHY

Pragya will be built in phases.

**Never build the entire application in one step.**

Every phase should:

1. Have a clearly defined scope.
2. Modify only the necessary parts of the application.
3. Preserve existing functionality.
4. Be tested before moving forward.
5. Leave the repository in a working state.

Do not implement future features unless explicitly instructed.

---

# 48. CURRENT DEVELOPMENT PHASE

The project is being built incrementally.

At the beginning of every task:

1. Read this `AGENTS.md`.
2. Inspect the existing project.
3. Inspect relevant existing files.
4. Check installed dependency versions.
5. Read relevant local Next.js documentation when required.
6. Understand the current architecture.
7. Implement only the requested phase.
8. Test the implementation.
9. Report what changed.

Do not assume that a feature exists just because it is mentioned in the roadmap.

---

# 49. GIT RULES

Keep commits focused.

Do not modify unrelated files.

Before committing:

* Run Biome checks.
* Run TypeScript checks.
* Run the appropriate build/test checks.
* Verify the application manually where appropriate.

Never commit secrets.

Every completed phase should leave the project in a stable state.

---

# 50. GOLDEN RULE

When uncertain between two implementation or design choices, prefer the option that is:

**Simpler + clearer + more maintainable + more consistent with Pragya's design language.**

Pragya should feel like a product designed by a thoughtful team, not a collection of AI-generated components.

The user experience always takes priority over technical cleverness.
