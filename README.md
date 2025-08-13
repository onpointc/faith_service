# Faith & Service Student Engagement Platform — Starter Monorepo

Clean, modern starter for your platform with web, mobile, and API. Uses TypeScript across the stack.

## Stack
- **Web**: Next.js 14 + App Router + Tailwind
- **Mobile**: Expo (React Native)
- **API**: Fastify + tRPC HTTP bridge (typed), ready for NestJS if you prefer later
- **DB**: PostgreSQL + Prisma
- **Auth**: Supabase Auth (email, SSO) — can swap to Firebase/Auth0
- **Storage**: Supabase Storage (proof photos), or S3
- **AI**: OpenAI endpoints (sentiment & summaries) — wired via server actions
- **Notifications**: Expo Push + email via Resend

> This is a **starter**: opinionated wiring, schemas, endpoints, and sample screens based on your spec.


## Next Implementation Steps (wired)
- [x] API routes for Activities, Registrations, Submissions, Teacher Replies, Approvals
- [x] Web pages for Activities & Submissions review
- [ ] Auth integration (Supabase)
- [ ] Student mobile data wiring
- [ ] PDF generator endpoint
- [ ] News CRUD + feed
- [ ] Achievement levels settings UI


## Auth Setup (Supabase)
1. Create a Supabase project and get:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Web)
   - `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY` (Mobile)
   - `SUPABASE_JWT_JWKS` = `https://<project>.supabase.co/auth/v1/keys` (API JWT validation)
2. Add envs to `.env` and platform-specific envs.
3. Start API & Web as usual. Mutating endpoints require a `Bearer` token from Supabase.
4. Mobile: run with `npx expo start` and sign in/sign up on device.


## News / Blog
- API routes:
  - `GET /news?schoolId=...` — published-only
  - `GET /news/all?schoolId=...` — includes drafts
  - `POST /news` — create (auth required)
  - `PATCH /news/:id` — update fields / publish toggle (auth required)
  - `DELETE /news/:id` — delete (auth required)
- Web:
  - `/news` — teacher/admin manage posts
  - `/feed` — student-facing news grid
- Mobile:
  - Simple feed embedded on Dashboard
