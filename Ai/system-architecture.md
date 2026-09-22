# System Architecture

## 1. Architecture Style

Use a modular MERN architecture:

Frontend:
- React
- Vite
- Tailwind CSS
- React Router
- TanStack Query
- Axios
- React Hook Form
- Zod

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT + secure refresh-token strategy
- Zod/Joi validation

Infrastructure:
- Vercel/Cloudflare for frontend
- AWS/Render/Railway/Fly.io for backend
- MongoDB Atlas
- Cloudinary for media
- Razorpay for payments
- Email provider for transactional emails
- WhatsApp deep links initially

## 2. High-Level Flow

Browser
  |
  v
React + Vite SPA
  |
  | HTTPS REST API
  v
Express API
  |
  +--> Auth module
  +--> User module
  +--> Template module
  +--> Invitation module
  +--> Event module
  +--> Media module
  +--> Order module
  +--> Payment module
  +--> RSVP module
  +--> Admin module
  +--> CMS module
  |
  +--> MongoDB
  +--> Cloudinary
  +--> Razorpay
  +--> Email provider

Public invitation flow:

Guest
  |
  v
/invite/:slug
  |
  v
Invitation API
  |
  v
Published invitation
  |
  +--> Events
  +--> Gallery
  +--> Venue
  +--> RSVP
  +--> Theme

## 3. Frontend Structure

src/
  app/
  assets/
  components/
    ui/
    layout/
    forms/
    invitation/
  pages/
    home/
    templates/
    checkout/
    auth/
    dashboard/
    publicInvitation/
    admin/
  features/
    auth/
    templates/
    invitations/
    rsvp/
    orders/
    payments/
  hooks/
  services/
  lib/
  routes/
  types/
  utils/

Use feature-based organization for business logic.

## 4. Backend Structure

server/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    services/
    validators/
    utils/
    jobs/
    integrations/
      cloudinary/
      razorpay/
      email/
    modules/
      auth/
      users/
      templates/
      invitations/
      events/
      rsvp/
      orders/
      payments/
      admin/
    app.js
    server.js

Controllers should stay thin. Business logic belongs in services.

## 5. MongoDB Collections

### User
- _id
- name
- email
- phone
- passwordHash
- role
- status
- createdAt
- updatedAt

### Template
- _id
- name
- slug
- category
- supportedLanguages
- previewImages
- demoUrl
- price
- features
- themeConfig
- status
- createdAt
- updatedAt

### Invitation
- _id
- ownerId
- templateId
- slug
- title
- status
- language
- basicInfo
- hosts
- story
- theme
- publishedAt
- expiresAt
- createdAt
- updatedAt

### Event
- _id
- invitationId
- title
- date
- startTime
- endTime
- venueName
- address
- mapsUrl
- description
- dressCode
- sortOrder

### Media
- _id
- ownerId
- invitationId
- type
- cloudinaryPublicId
- secureUrl
- metadata

### RSVP
- _id
- invitationId
- guestName
- phone
- email
- response
- eventResponses
- guestCount
- mealPreference
- message
- createdAt

### Order
- _id
- userId
- invitationId
- items
- subtotal
- discount
- tax
- total
- currency
- status
- paymentStatus
- createdAt

### Payment
- _id
- orderId
- provider
- providerOrderId
- providerPaymentId
- amount
- status
- signatureVerified
- createdAt

### Coupon
- _id
- code
- type
- value
- maxDiscount
- expiresAt
- usageLimit
- usedCount
- status

## 6. API Design

Base URL:
`/api/v1`

Auth:
- POST /auth/register
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
- GET /auth/me

Templates:
- GET /templates
- GET /templates/:slug
- GET /categories

Invitations:
- GET /invitations
- POST /invitations
- GET /invitations/:id
- PATCH /invitations/:id
- DELETE /invitations/:id
- POST /invitations/:id/publish
- POST /invitations/:id/unpublish

Events:
- POST /invitations/:id/events
- PATCH /events/:eventId
- DELETE /events/:eventId

Media:
- POST /media/signature
- POST /media
- DELETE /media/:id

RSVP:
- POST /public/invitations/:slug/rsvp
- GET /invitations/:id/rsvps
- GET /invitations/:id/rsvps/export

Orders:
- POST /orders
- GET /orders
- GET /orders/:id

Payments:
- POST /payments/create-order
- POST /payments/verify
- POST /payments/webhook

Admin:
- GET /admin/dashboard
- CRUD /admin/templates
- CRUD /admin/categories
- GET /admin/orders
- GET /admin/users

## 7. Authentication

Use:
- Short-lived access token.
- Refresh token rotation.
- Prefer httpOnly secure cookies for refresh tokens.
- Password hashing with bcrypt/argon2.
- Role-based authorization.

Roles:
- customer
- admin
- support (optional)

Never trust role information supplied by the frontend.

## 8. Public Invitation URLs

Use:
`https://yourdomain.com/i/:slug`

Slug requirements:
- Unique
- URL safe
- Non-sequential
- No sensitive information
- Published-only access for public users

## 9. Payment Flow

1. Customer selects product.
2. Backend creates order.
3. Backend creates Razorpay order.
4. Frontend opens checkout.
5. Payment completes.
6. Frontend sends payment identifiers to backend.
7. Backend verifies signature.
8. Webhook independently confirms payment.
9. Order becomes paid.
10. Invitation creation becomes available.

Webhook is the source of truth for final payment state.

## 10. Security

- Helmet.
- CORS allowlist.
- Rate limiting.
- Request size limits.
- Input validation.
- MongoDB query sanitization.
- XSS-safe rendering.
- CSRF protection if cookie-authenticated state-changing requests require it.
- Secure cookies.
- HTTPS.
- Secrets only in environment variables.
- Cloudinary signed uploads.
- Razorpay signature verification.
- Admin route protection.
- Audit logs.
- No sensitive payment data stored.

## 11. Deployment

Recommended:
Frontend -> Vercel
Backend -> AWS ECS/Render/Railway
Database -> MongoDB Atlas
Media -> Cloudinary
Payments -> Razorpay

Use environment-specific configurations:
- development
- staging
- production

## 12. Scalability

Start as a modular monolith.

Add Redis/queues only when required for:
- bulk messaging
- emails
- media processing
- analytics aggregation
- scheduled invitation expiry

Do not introduce microservices in MVP.

## 13. Observability

Track:
- API errors
- payment failures
- invitation publishing failures
- upload failures
- RSVP failures
- authentication failures
- admin actions

Use structured logs and an error monitoring platform.
