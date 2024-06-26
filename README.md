# TaskCanvas (Trello Clone)

A full stack application with **Next-14 & TypeScript**.

Key Features:
- Auth
- Organizations / Workspaces
- Board creation
- Unsplash API for random beautiful cover images
- Activity log for entire organization
- Board rename and delete
- List creation
- List rename, delete, drag & drop reorder and copy
- Card creation
- Card description, rename, delete, drag & drop reorder and copy
- Card activity log
- Board limit for every organization
- Stripe subscription for each organization to unlock unlimited boards
- Landing page
- MySQL DB -- app.planetscale.com
- Prisma ORM
- [shadcnUI](https://ui.shadcn.com/docs/installation/next) & TailwindCSS
- Includes Next 14 Server actions features.(No api route. But we keep the actions in separate folder)
-

Fonts:
- [cal-sans](https://github.com/calcom/font), Poppins

Icons:
- lucide-react

# Packages:
- ShadeCn(Component library) -- button, skeleton, accordion, separator, sheet, input, label, tooltip, popover, textarea, dialog, avatar
- [Clerk Auth](https://clerk.com/solutions/nextjs-authentication)
- [usehooks-ts](https://usehooks-ts.com/) --- collection of hooks
- [Zustand](https://github.com/pmndrs/zustand) --- state-management
- [Prisma](https://www.prisma.io/docs/getting-started) --- ORM
- [Zod](https://zod.dev/) --- schema validation
- [Sonner](https://emilkowal.ski/ui/building-a-toast-component) --- opinionated toast component
- [unsplash-js](https://www.npmjs.com/package/unsplash-js) --- Javascript wrapper for the Unsplash API. For BG img fallbacks (constants/images.ts)
- [Lodash](https://lodash.com/) --- JavaScript utility library
- [@hello-pangea/dnd](https://www.npmjs.com/package/@hello-pangea/dnd) --- Beautiful and accessible drag and drop for lists
- [TanStack Query](https://tanstack.com/query/v4) --- asynchronous state management (query to fetch card/item data)
- [date-fns](https://github.com/date-fns/date-fns#readme) --- toolset for manipulating JavaScript dates in a browser & Node.js
- [stripe](https://stripe.com/docs/js) ---  Node.js library for the Stripe payment API.


