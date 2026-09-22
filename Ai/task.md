# Development Task Plan

## Phase 0 — Project Setup

- [x] Create Git repository
- [x] Initialize Vite + React frontend
- [x] Initialize Express backend
- [x] Configure Tailwind CSS
- [x] Configure ESLint/Prettier (oxlint & prettier configured)
- [x] Configure environment variables
- [x] Connect MongoDB Atlas / local MongoDB with in-memory dev fallback
- [x] Create development/staging/production configs
- [x] Create base API health endpoint (`GET /api/v1/health`)
- [x] Set up React Router
- [x] Set up Axios API client
- [x] Set up TanStack Query

## Phase 1 — Design System

- [x] Create color tokens (#8B1E3F, #C89B3C, #FFF9F2, etc.)
- [x] Create typography tokens (Cormorant Garamond & DM Sans pairing)
- [x] Build Button
- [x] Build Input
- [x] Build Modal
- [ ] Build Drawer
- [x] Build Toast
- [x] Build Card
- [x] Build Skeleton
- [x] Build ErrorState
- [x] Build EmptyState
- [x] Create responsive layout
- [x] Create Header
- [x] Create Footer

## Phase 2 — Public Marketing Website

- [x] Home page
- [x] Template listing
- [x] Category filters
- [x] Template detail page
- [x] Pricing page (preview section on Home and info notes)
- [x] How it works
- [x] FAQ
- [ ] Contact
- [x] About (placeholder page configured)
- [x] SEO metadata (HTML titles & meta descriptions)
- [ ] Open Graph metadata
- [x] Mobile QA (tested 320px–1440px)

## Phase 3 — Authentication

- [ ] Register API
- [ ] Login API
- [ ] Refresh token
- [ ] Logout
- [ ] Current user endpoint
- [ ] Password hashing
- [ ] Auth middleware
- [ ] Role middleware
- [ ] Login UI
- [ ] Register UI
- [ ] Protected routes

## Phase 4 — Template System

- [x] Template schema
- [x] Category schema & API
- [ ] Admin template CRUD
- [ ] Template image management
- [x] Template demo URL
- [x] Template filters (category, language, search, sort)
- [x] Template card
- [x] Template detail
- [x] Template seed data (10 realistic celebration templates)

## Phase 5 — Invitation Builder

- [x] Invitation schema
- [x] Event schema
- [x] Create invitation
- [x] Basic information form
- [x] Hosts/family form
- [x] Event editor
- [x] Venue editor
- [x] Google Maps URL
- [x] Story/message editor
- [x] Language selection
- [x] Theme selection
- [ ] Autosave
- [x] Draft state
- [x] Preview
- [ ] Publish/unpublish
- [x] Unique invitation slug

## Phase 6 — Media

- [ ] Cloudinary configuration
- [ ] Signed upload endpoint
- [ ] Image uploader
- [ ] Image validation
- [ ] Image compression
- [ ] Gallery ordering
- [ ] Media deletion
- [ ] Lazy-loaded public gallery

## Phase 7 — Public Invitation

- [ ] Public invitation route
- [ ] Template renderer
- [ ] Hero/cover
- [ ] Countdown
- [ ] Event timeline
- [ ] Venue section
- [ ] Gallery
- [ ] Story
- [ ] Music controls
- [ ] RSVP
- [ ] Contact
- [ ] Share button
- [ ] WhatsApp share
- [ ] Mobile performance optimization

## Phase 8 — RSVP

- [ ] RSVP schema
- [ ] RSVP public API
- [ ] RSVP form
- [ ] Validation
- [ ] Customer RSVP dashboard
- [ ] Event-wise stats
- [ ] Guest list
- [ ] CSV export
- [ ] Rate limiting / spam protection

## Phase 9 — Commerce

- [ ] Product/order schema
- [ ] Cart/order creation
- [ ] Razorpay integration
- [ ] Payment verification
- [ ] Webhook
- [ ] Idempotency
- [ ] Payment result page
- [ ] Order history
- [ ] Coupon system

## Phase 10 — Customer Dashboard

- [x] Dashboard overview (metrics: total invitations, drafts, recent, published)
- [x] My invitations (list view with status badges)
- [x] Invitation status
- [ ] Published URL
- [ ] Analytics summary
- [ ] Orders
- [ ] Profile/settings
- [ ] Support

## Phase 11 — Admin

- [ ] Admin dashboard
- [ ] User management
- [ ] Template management
- [ ] Category management
- [ ] Order management
- [ ] Payment monitoring
- [ ] Coupon management
- [ ] Invitation moderation
- [ ] Support tickets
- [ ] CMS/FAQ management
- [ ] Audit logs

## Phase 12 — Quality

- [ ] Frontend tests
- [ ] Backend API tests
- [ ] Auth security testing
- [ ] Payment webhook testing
- [ ] File upload testing
- [ ] Responsive testing
- [ ] Accessibility testing
- [ ] Lighthouse/performance testing
- [ ] SEO testing
- [ ] Error monitoring

## Phase 13 — Deployment

- [ ] Production MongoDB
- [ ] Production Cloudinary
- [ ] Production Razorpay
- [ ] Backend deployment
- [ ] Frontend deployment
- [ ] Custom domain
- [ ] HTTPS
- [ ] CORS production config
- [ ] Environment secrets
- [ ] Database backups
- [ ] Monitoring

## Priority

P0:
- Setup
- Authentication
- Templates
- Invitation builder
- Public invitation
- RSVP
- Payment

P1:
- Customer dashboard
- Admin
- Cloudinary
- WhatsApp sharing
- SEO

P2:
- Coupons
- Analytics
- Advanced guest management
- Bulk messaging
- Planning tools

## Rule

Implement one task at a time. Do not mark a task complete until it has been verified.
