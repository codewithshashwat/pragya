# Pragya

> A calm, focused digital library for reading, learning, and personalizing books.

Pragya is a web-based reading and knowledge platform where administrators can publish books and users can read them online.

Users can also create a **private personal editable copy** of a book. Changes made to a personal copy are visible only to that user and never affect the original book or another user's copy.

**Pragya does not use collaborative editing.**

---

## Vision

Pragya is designed to make digital reading feel less like using a generic web application and more like using a personal library.

The product focuses on:

* Focused reading
* Comfortable typography
* Clean information architecture
* Personalization
* Minimal distractions
* A calm and premium experience

The long-term goal is to create a place where people can **read, understand, annotate, and make knowledge their own**.

---

## Current Status

Pragya is currently under active development.

The application is being built incrementally in multiple phases.

### Development philosophy

Each phase should:

1. Introduce a clearly defined set of features.
2. Preserve existing functionality.
3. Be tested before moving forward.
4. Keep the codebase maintainable.
5. Avoid implementing future features prematurely.

---

# Technology Stack

| Technology      | Purpose                  |
| --------------- | ------------------------ |
| Next.js         | Full-stack web framework |
| React           | UI                       |
| TypeScript      | Type-safe development    |
| Tailwind CSS    | Styling                  |
| React Compiler  | React optimization       |
| MongoDB Atlas   | Database                 |
| Mongoose        | MongoDB ODM              |
| Auth.js         | Authentication           |
| Zod             | Validation               |
| React Hook Form | Form management          |
| shadcn/ui       | UI primitives            |
| Lucide React    | Icons                    |
| Biome           | Formatting & linting     |
| Vercel          | Deployment               |

---

# Architecture

Pragya uses the Next.js App Router with a `src/` directory and TypeScript.

The project uses the following import alias:

```text
@/*
```

Example:

```typescript
import { Button } from "@/components/ui/button";
```

The application follows a feature-oriented architecture where appropriate.

A typical structure is:

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

Folders are introduced only when required. The project avoids unnecessary abstraction.

---

# Core Content Model

Pragya has two fundamentally different forms of book content.

### Original Book

The original book is uploaded and managed by an administrator.

It is the canonical version.

### Personal Book Copy

When a user edits a book, their changes belong to their own private copy.

Conceptually:

```text
                    Original Book
                         │
              ┌──────────┼──────────┐
              │          │          │
              ▼          ▼          ▼
           User A     User B     User C
           Copy A     Copy B     Copy C
```

Each copy is independent.

If User A changes a paragraph:

```text
Original Book
      │
      ├── User A → changed paragraph
      │
      ├── User B → original paragraph
      │
      └── User C → original paragraph
```

User A's changes must never affect Users B or C.

---

# Design Language

Pragya follows a calm, editorial, premium reading aesthetic.

### Core characteristics

* Minimal
* Academic
* Elegant
* Warm
* Spacious
* Highly readable
* Distraction-free

### Primary UI Font

**Inter**

Used for application UI, navigation, buttons, forms, metadata, and controls.

### Reading Font

**Source Serif 4**

Used primarily for long-form book content.

### Primary Colors

Paper background:

```text
#FAF8F4
```

Primary blue:

```text
#1D4ED8
```

Muted gold accent:

```text
#C69214
```

Primary text:

```text
#111827
```

Secondary text:

```text
#6B7280
```

Border:

```text
#E5E7EB
```

The complete design system is documented in `AGENTS.md`.

---

# Getting Started

## Prerequisites

Make sure you have:

* Node.js
* npm
* MongoDB Atlas account
* Git

Check Node.js:

```bash
node --version
```

Check npm:

```bash
npm --version
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Move into the project:

```bash
cd pragya
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a local environment file:

```text
.env.local
```

Add the required environment variables.

Example:

```env
MONGODB_URI="your-mongodb-connection-string"
AUTH_SECRET="your-auth-secret"
```

Never commit `.env.local` or any file containing secrets.

The exact environment variables may change as development progresses.

---

# Development

Start the development server:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

# Code Quality

Pragya uses **Biome** for formatting and linting.

Before committing changes, run the project's configured Biome checks.

Example:

```bash
npx biome check .
```

TypeScript should remain in strict mode.

Avoid using `any` unless absolutely necessary.

---

# Development Workflow

Pragya is developed phase-by-phase.

Recommended workflow:

```text
Plan
  ↓
Implement
  ↓
Run the application
  ↓
Test the feature
  ↓
Run code-quality checks
  ↓
Review changes
  ↓
Git commit
  ↓
Next phase
```

Do not begin the next phase until the current phase is stable.

---

# Planned Features

The following features are planned for future phases.

### Authentication

* User registration
* Login
* Logout
* Session management
* Protected routes

### Library

* Browse books
* Search
* Categories
* Book details
* Reading progress

### Reading

* Comfortable reader
* Table of contents
* Bookmarks
* Reading preferences
* Dark mode

### Personal Editing

* Create private editable copies
* Rich text editing
* Auto-save
* Reset to original
* Personal changes

### Personal Knowledge

* Notes
* Highlights
* Bookmarks
* Reading history

### Administration

* Admin dashboard
* Upload books
* Edit books
* Delete books
* Manage users
* Analytics

### Future Possibilities

* Version history
* PDF export
* Advanced search
* Offline reading
* Additional reading formats

These features are planned and should not be assumed to be implemented.

---

# Important Rules

### Personal copies are private

A user's edits must never become visible to another user.

### Original books are protected

Editing a personal copy must never mutate the administrator's original book.

### No collaborative editing

Pragya does not use:

* Real-time collaboration
* Shared cursors
* Multi-user document synchronization
* Collaborative document editing

unless explicitly introduced as a future product decision.

### Keep the product focused

Do not add features simply because they are technically possible.

Every feature should improve reading, learning, or personal knowledge management.

---

# Project Documentation

### `AGENTS.md`

Contains the project's detailed:

* Engineering rules
* Architecture guidelines
* Design system
* Typography
* Colors
* Component rules
* UX principles
* Security guidelines
* Development conventions

Developers and AI coding agents should read this before making significant changes.

---

# Contributing

Pragya is currently under active development.

When making changes:

1. Read `AGENTS.md`.
2. Understand the existing architecture.
3. Keep changes focused.
4. Follow the established design system.
5. Run formatting and type checks.
6. Test the affected functionality.
7. Avoid unrelated changes.
8. Commit meaningful changes.

---

# License

License information will be added when the project's licensing decision is finalized.

---

## Pragya

**Read. Reflect. Retain.**
