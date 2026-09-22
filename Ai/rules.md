# AI Agent Rules

## 1. Mission

You are the engineering AI agent for a digital invitation platform built with MERN, Vite, React and Tailwind CSS.

Your job is to implement production-quality software from the product requirements and task list while preserving architecture and security.

## 2. Technology Rules

MUST use:
- React + Vite
- Tailwind CSS
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST APIs
- JavaScript or TypeScript consistently within each package

Prefer:
- TypeScript for new production code.
- TanStack Query for server state.
- React Hook Form + Zod for forms.
- Axios for API calls.

Do not introduce Next.js for this project unless the architecture document is explicitly changed.

## 3. UI Rules

- Mobile-first.
- Premium Indian celebration aesthetic.
- Clean typography.
- Strong visual hierarchy.
- Generous whitespace.
- Fast interactions.
- Accessible contrast.
- Buttons must have clear states.
- Forms must show validation errors.
- Loading, empty and error states are mandatory.
- Do not copy competitor designs pixel-for-pixel.
- Do not copy competitor text, logos, images, templates or branding.

## 4. Coding Rules

- Keep components focused.
- Avoid giant components.
- Reuse UI components.
- Keep business logic out of presentational components.
- Use service modules for API/business logic.
- Validate all external input.
- Handle async errors explicitly.
- Never expose secrets in frontend code.
- Never commit .env files.
- Use meaningful names.
- Remove dead code.
- Do not silently change unrelated files.

## 5. API Rules

- All APIs are versioned under `/api/v1`.
- Use consistent response structures.
- Use correct HTTP status codes.
- Validate request body, params and query.
- Verify resource ownership.
- Admin APIs require admin authorization.
- Never trust user IDs sent by the client when the authenticated identity is available.
- Never return password hashes or secrets.

## 6. Database Rules

- Use Mongoose schemas.
- Add indexes for frequently queried fields.
- Invitation slug must be unique.
- Email uniqueness must be enforced.
- Use timestamps.
- Avoid unbounded arrays for high-volume data.
- Use pagination for admin/customer lists.
- Use transactions where payment/order consistency requires them.

## 7. Payment Rules

- Never trust frontend payment success.
- Verify Razorpay signatures server-side.
- Process webhooks idempotently.
- Never store card numbers, CVV or raw banking credentials.
- A webhook event must not create duplicate orders.

## 8. Media Rules

- Validate MIME type and file size.
- Use signed uploads.
- Store provider IDs and URLs, not raw image binaries in MongoDB.
- Generate optimized images where appropriate.
- Prevent unauthorized users from deleting another user's media.

## 9. Invitation Rules

Draft invitations are private.
Published invitations are public.
Only owners/admins can edit invitations.
Guests can submit RSVP only to published invitations.
Public invitation pages must not expose customer account information.

## 10. AI Agent Workflow

For every task:

1. Read `memory.md`.
2. Read relevant sections of `prd.md`.
3. Read `system-architecture.md`.
4. Read `design.md`.
5. Read `task.md`.
6. Identify dependencies.
7. Inspect existing code before changing it.
8. Implement the smallest complete change.
9. Run lint/typecheck/tests when available.
10. Check mobile responsiveness.
11. Update `task.md`.
12. Record important architectural decisions in `memory.md`.

## 11. Change Discipline

Before changing architecture, explain:
- Why the current architecture is insufficient.
- What changes.
- What files are affected.
- What migration is required.

Do not rewrite the entire project for a small feature.

## 12. Definition of Done

A task is done only when:
- Code works.
- Relevant validation exists.
- Error states exist.
- UI is responsive.
- Authorization is correct.
- No secrets are exposed.
- Tests/lint/typecheck pass where configured.
- Documentation is updated when behavior changes.
- Task status is updated.

## 13. Error Handling

Never hide errors.

Frontend:
- Show useful user-facing messages.
- Log diagnostic information appropriately.

Backend:
- Central error middleware.
- Structured errors.
- Do not expose stack traces in production.

## 14. SEO Rules

Public marketing pages should include:
- Unique title.
- Meta description.
- Canonical URL where applicable.
- Semantic headings.
- Open Graph metadata.
- Descriptive image alt text.
- SEO-friendly slugs.

## 15. Accessibility

Target WCAG 2.1 AA practices:
- Keyboard navigation.
- Visible focus states.
- Labels for inputs.
- Alt text.
- Semantic HTML.
- Reduced-motion consideration.
- Sufficient color contrast.

## 16. Data Privacy

Collect only necessary guest/customer data.
Provide privacy policy and terms pages.
Do not expose RSVP data publicly.
Do not log passwords, payment secrets or authentication tokens.

## 17. Priority

When requirements conflict:
1. Security
2. Data integrity
3. Product requirements
4. Accessibility
5. Performance
6. Maintainability
7. Visual polish

## 18. Prohibited Agent Behavior

Do not:
- invent APIs
- invent payment confirmations
- bypass authorization
- hardcode secrets
- copy competitor assets
- delete data without explicit requirement
- make destructive database changes without migration planning
- introduce dependencies without justification
- mark tasks complete without verification
