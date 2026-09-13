# notvenu.dev

Personal portfolio. Next.js 15 (App Router), TypeScript, Tailwind v4,
react-three-fiber, Motion, Lenis.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Editing content

All copy and data live in `data/`, so nothing below needs a component change:

| File               | What it holds                                            |
| ------------------ | -------------------------------------------------------- |
| `data/site.ts`     | Name, contact details, socials, education, LeetCode count |
| `data/projects.ts` | The project list, stack chips, links, screenshots         |
| `data/stack.ts`    | Skill groups, plus the nodes and edges of the hero graph  |
| `data/reading.ts`  | The bookshelf. Placeholder titles, swap for real ones     |
| `data/services.ts` | Freelance offer and the "how I work" points               |

Project screenshots go in `public/shots/` and are referenced by the `shot`
field in `data/projects.ts`.

## Notes

- The page is dark only, on purpose. Tokens live in `app/globals.css`.
- The hero graph is `next/dynamic`, so three.js never blocks first paint.
- Everything animated degrades under `prefers-reduced-motion`: Lenis is
  skipped, reveals render instantly, and the graph renders as a static frame.
