# Project Memory

## Product

This project is a digital invitation platform for the Indian market.

Customers can:
- Browse templates.
- Preview invitations.
- Personalize invitation details.
- Add multiple events (Haldi, Mehendi, Wedding, Reception).
- Add venues and maps.
- Save drafts & share invitations.
- View interactive standalone digital invitations with RSVP & Guestbook.

## Technology

Frontend:
- React 19 + Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite` plugin & `@theme` tokens)
- React Router
- TanStack Query
- Axios
- Motion (`motion/react`) for scroll reveals & envelope animation
- Phosphor Icons (`@phosphor-icons/react`)
- React Hook Form + Zod

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API

## Decisions Log

### Master Frontend Redesign (Completed)
- **Design Read & Taste Skill Compliance**: Configured dials (`DESIGN_VARIANCE: 7`, `MOTION_INTENSITY: 5`, `VISUAL_DENSITY: 3`). Applied Cormorant Garamond + DM Sans typographic pairing.
- **Anti-Slop Clean Up**: Removed raw emojis from UI, replacing them with Phosphor icons and SVG flourishes.
- **Commerce Scope Alignment**: Removed pricing cards and commerce checkout UI per explicit prompt instructions (payments not implemented in this phase).
- **Responsive Navigation**: Added animated mobile drawer (`MobileMenu.jsx`) with focus trap and overlay.
- **Side-by-Side Builder**: Updated `CreateInvitationPage.jsx` with real-time side-by-side editing on desktop and a mobile preview toggle.

### Digital Invitation Renderer System (Completed)
- **Data-Driven Renderer Architecture**: Built `normalizeInvitationData.js` -> `InvitationRenderer.jsx` -> `RoyalTemplate.jsx` -> 13 reusable invitation section components.
- **Immersive 13-Section Flow**: Opening envelope overlay with wax seal, Jharokha hero, date reveal card, multi-event ceremony timeline, couple story, photo gallery with lightbox, Instagram hashtag, video film modal, live countdown, Google Maps venue directions, multi-event RSVP form, guestbook wishes wall, and family closing footer.
- **Services & Routes**: Created `rsvpService.js` and `wishesService.js` with client-side fallback, and registered `/i/:slug` and `/demo/:slug` routes.
- **QA Verification**: `oxlint` 0 errors, `npm run build` production build verified clean.
