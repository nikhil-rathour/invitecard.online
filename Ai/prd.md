# Product Requirements Document (PRD)
## Digital Invitation Platform — MERN + Vite + React + Tailwind CSS

**Document status:** MVP specification  
**Target market:** India  
**Product type:** Digital invitation marketplace + invitation builder + customer dashboard + admin panel

## 1. Product Vision

Build a premium Indian digital invitation platform where customers can discover invitation templates, preview them, purchase an invitation, enter their event details, personalize the invitation, publish a unique invitation URL, and share it through WhatsApp.

The product should support wedding and non-wedding celebrations and should be designed for mobile-first Indian users.

The reference products demonstrate two important models:
- A catalogue/order model: customers browse designs and place an order through WhatsApp.
- A self-service model: customers select a template, pay, create an account, fill event details, preview, publish and track RSVPs.

Our MVP should support the self-service workflow while keeping an assisted WhatsApp-order option.

## 2. Reference Product Research

Reference websites reviewed:
- https://invitationpatrika.com/
- https://nimantran.online/
- https://www.aamantran.online/

Observed capabilities include categories for weddings, engagement, baby shower and ceremonies; multiple Indian languages; digital/video/PDF invitations; template previews; WhatsApp ordering/sharing; RSVP; maps; photo galleries; music; countdowns and customer dashboards.

These observations are used as product inspiration only. Do not copy their branding, source code, text, illustrations, templates, or proprietary assets.

## 3. Target Users

### Customer
A person/family creating an invitation for a wedding, engagement, birthday, baby shower, pooja, housewarming or other celebration.

### Guest
A recipient opening the invitation URL, viewing event details and optionally submitting RSVP.

### Admin
Business owner/team member who manages templates, products, orders, customers, invitations, payments, coupons and support.

## 4. MVP Goals

1. Browse invitation templates.
2. Filter by event, language and style.
3. Open a live template demo.
4. Purchase an invitation.
5. Register/login after checkout or before personalization.
6. Create invitation details.
7. Add multiple events/ceremonies.
8. Add venue and Google Maps link.
9. Upload photos.
10. Add optional background music.
11. Preview invitation before publishing.
12. Generate a unique public URL.
13. Share through WhatsApp.
14. Collect RSVP responses.
15. View RSVP data in dashboard.
16. Provide admin management.

## 5. Core Pages

### Public website
- Home
- Templates
- Template details
- Category pages
- Pricing
- How it works
- FAQ
- About
- Contact
- Blog/SEO pages
- Login
- Register
- Checkout
- Payment result

### Customer dashboard
- Overview
- My invitations
- Create invitation
- Invitation editor/builder
- Preview
- Publish
- RSVP dashboard
- Guest list
- Media
- Account/settings
- Orders/payments
- Support

### Public invitation
- Cover
- Couple/person names
- Event timeline
- Event details
- Venue/map
- Gallery
- Story/about
- Countdown
- Music
- RSVP
- Contact
- Share

### Admin
- Dashboard
- Customers
- Invitations
- Templates
- Template categories
- Orders
- Payments
- Coupons
- RSVP/guest data
- Media
- Support tickets
- CMS content
- Analytics
- Settings

## 6. Event Types

Initial:
- Wedding
- Engagement
- Reception
- Haldi
- Mehendi
- Sangeet
- Baby shower / Godh Bharai / Simant
- Birthday
- Anniversary
- Housewarming / Griha Pravesh
- Pooja
- Mundan
- Naming ceremony
- Upanayan / Yagnopavit
- Other

## 7. Languages

MVP:
- English
- Hindi
- Gujarati

Architecture must allow adding Marathi and other languages later.

## 8. Invitation Builder

Builder sections:
1. Basic information
2. Hosts/family names
3. Couple/person details
4. Events
5. Venues
6. Photos
7. Music
8. Story/message
9. RSVP
10. Theme/template settings
11. Preview
12. Publish

Autosave changes.

Users should be able to edit an invitation after publishing.

## 9. RSVP

Guest fields:
- Name
- Phone/email (optional based on configuration)
- Attendance: Yes / No / Maybe
- Event selection
- Number of guests
- Meal preference (optional)
- Message

Customer dashboard:
- Total invited
- Attending
- Declined
- Pending
- Event-wise headcount
- CSV export

## 10. Commerce

Product types:
- Digital invitation
- Premium invitation
- Custom invitation
- Video invitation
- PDF invitation
- Add-on services

MVP checkout:
- Product
- Price
- Coupon
- Customer details
- Payment
- Order confirmation

Recommended payment gateway: Razorpay.

Do not store raw card information.

## 11. WhatsApp

MVP:
- Share invitation link using WhatsApp deep link.
- Pre-filled message.
- Copy invitation link.

Future:
- Guest-specific links.
- Bulk WhatsApp delivery using an approved WhatsApp Business API provider.
- Delivery/open tracking where supported.

## 12. Media

Use Cloudinary or equivalent object/media storage.

Requirements:
- Image compression
- Responsive images
- Upload limits
- File type validation
- Secure upload signatures
- Delete unused media
- CDN delivery

## 13. Non-Functional Requirements

- Mobile-first.
- Fast initial load.
- SEO-friendly public pages.
- Accessible UI.
- Secure authentication.
- Server-side authorization.
- Input validation.
- Rate limiting.
- Secure file uploads.
- Error logging.
- Audit logs for admin actions.
- Responsive from 320px to large desktop screens.

## 14. Success Metrics

- Template view -> demo conversion
- Demo -> checkout conversion
- Checkout -> payment success
- Payment -> invitation published
- Invitation -> WhatsApp share
- Invitation -> RSVP conversion
- Repeat customer rate
- Support tickets per order
- Average invitation creation time

## 15. MVP Exclusions

Do not build initially:
- Native mobile applications
- Full wedding vendor marketplace
- AI invitation generation
- Automated WhatsApp bulk messaging
- Complex drag-and-drop template designer
- Multi-currency payments
- Advanced wedding planning suite

## 16. Acceptance Criteria

The MVP is complete when a test customer can:
1. Visit the website.
2. Find a template.
3. View its demo.
4. Purchase it successfully.
5. Create/login to an account.
6. Enter event details.
7. Add at least two events.
8. Add a venue.
9. Add photos.
10. Preview.
11. Publish.
12. Open the public invitation on mobile.
13. Share it through WhatsApp.
14. Submit an RSVP as a guest.
15. See that RSVP in the customer dashboard.
16. Export RSVP data.

## 17. Product Principles

- Premium visual quality.
- Indian cultural relevance without limiting modern styles.
- Mobile-first.
- Simple enough for non-technical customers.
- Fast path from template discovery to sharing.
- Secure customer and guest data.
