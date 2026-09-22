# Design System & UI Specification (Post-Redesign + Invitation Renderer)

## 1. Design Direction

A premium Indian digital invitation platform combining celebration stationery aesthetics with modern editorial product design.

Desired feeling:
- Elegant
- Warm & Festive
- Premium Craftsmanship
- Culturally Relevant
- Modern & Mobile-First

## 2. Color System (Tailwind v4 `@theme`)

- **Primary:** `#8B1E3F` (Deep Royal Rose)
- **Primary Dark:** `#5E142B`
- **Primary Light:** `#A8345A`
- **Accent Gold:** `#C89B3C`
- **Gold Dark:** `#A07D2E`
- **Warm Background:** `#FFF9F2` (Warm Ivory)
- **Background Alt:** `#FBF4EA`
- **Surface:** `#FFFFFF`
- **Text:** `#241F20`
- **Text Secondary:** `#4A4244`
- **Muted:** `#746B6D`
- **Border:** `#E9DFD6`

## 3. Digital Invitation Renderer System

Architecture:
```
Invitation Data → normalizeInvitationData.js → InvitationRenderer → Template Component → 13 Story & Ceremony Sections
```

13 Core Invitation Sections:
1. **Opening Cover Envelope (`OpeningOverlay.jsx`)** - Wax seal, family blessing, couple names, and open animation.
2. **Hero & Couple (`HeroCoupleSection.jsx`)** - Jharokha arch, couple portrayal cards, family host names.
3. **Date Reveal (`DateRevealSection.jsx`)** - Tap-to-reveal date card.
4. **Ceremony Itinerary (`EventsTimelineSection.jsx`)** - Multi-event timeline (Mehendi, Wedding, Reception) with dress codes & directions.
5. **Couple Story (`CoupleStorySection.jsx`)** - Milestone story chapters.
6. **Photo Gallery (`PhotoGallerySection.jsx`)** - Asymmetric grid with full-screen lightbox modal.
7. **Social Hashtag (`SocialSection.jsx`)** - Wedding hashtag & Instagram link.
8. **Pre-Wedding Video (`VideoSection.jsx`)** - Film player with custom play modal.
9. **Live Countdown (`CountdownSection.jsx`)** - Real-time days, hours, mins, secs timer.
10. **Venues (`VenueSection.jsx`)** - Venue list with Google Maps directions.
11. **Guest RSVP (`RSVPSection.jsx`)** - Multi-event form validation with local state fallback.
12. **Guestbook Wishes (`WishesSection.jsx`)** - Blessings submission wall.
13. **Closing (`ClosingSection.jsx`)** - Family thank-you blessings and footer.
