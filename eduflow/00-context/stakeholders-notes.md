# Stakeholder Meeting Notes - EduFlow Platform

**Date:** January 10, 2026  
**Duration:** 45 minutes  
**Attendees:** Sarah (Product Owner), Mike (Head of Learning), Jennifer (Marketing), Tom (IT), Alex (Operations)

---

## User Roles & Access

- Students need to login and see their courses, obviously
- Instructors should upload content - videos, pdfs, maybe ppts too?
- Admin panel for managing everything - users, courses, payments probably
- Guest access might be needed for browsing catalog but not sure if that's v1 or later
- Sarah mentioned corporate clients want SSO but Tom said that's complicated and expensive
- Role-based permissions - definitely need this, can't have students deleting courses lol

## Content Management

- Instructors must upload video lectures - Mike says avg 15-20 mins per vid
- Support for PDF documents, presentations
- Quiz functionality is CRITICAL per Sarah
- Maybe interactive coding exercises? Mike wants this but seems like a lot of work
- Content versioning would be nice - instructors keep updating stuff
- The system should automatically transcode videos to different resolutions
- Jennifer thinks we need content preview before publishing
- Draft/Published status for courses

## Course Structure

- Courses have modules, modules have lessons
- Each lesson can have multiple content types
- Progress tracking - students need to see % complete
- Certificates upon completion (Jennifer says this is huge for marketing)
- Prerequisites between courses - like "complete Course A before taking Course B"
- Mike mentioned nanodegrees or learning paths but that sounds like Phase 2 stuff
- Course categories and tagging for searchability

## Payment & Monetization

- One-time purchase per course - straightforward
- Monthly subscriptions for access to everything (Netflix model)
- Corporate licensing - bulk purchases with discounts
- Promo codes & discounts - Jennifer REALLY wants this
- Payment gateway integration - Stripe probably? Tom mentioned PayPal too
- Free trial period - 7 days? 14 days? not decided
- Refund policy - 30 days but need to track course progress, can't refund if they've completed 80%

## Technical Stuff

- Mobile app needed - iOS and Android both
- Web app should work on all browsers obviously
- API-first architecture Tom insists
- Video streaming needs to be smooth, no buffering - Mike's top concern
- Database should handle at least 50k concurrent users (where did this number come from?)
- Cloud hosting, scalable infrastructure
- CDN for video delivery - absolutely required
- Backup and disaster recovery - Tom says standard RTO/RPO stuff

## User Experience

- Dashboard showing enrolled courses, progress, recommendations
- Search functionality with filters (category, price, rating, duration)
- Course ratings and reviews - students can rate after completing at least 40% or maybe 50%
- Discussion forums per course - Mike wants this, others think it's resource intensive
- Notifications - email and in-app both
- Bookmark/favorite lessons to return later
- Continue watching from where you left off
- Speed controls for video playback (0.5x to 2x)

## Analytics & Reporting

- Student progress reports
- Course completion rates
- Most popular courses
- Revenue analytics for admin
- Instructor dashboard showing their course performance
- Drop-off analysis - where students quit courses
- Time spent on platform metrics
- Sarah thinks we need ML recommendations but Alex says that's overkill for v1

## Compliance & Security

- GDPR compliance - obvious since we're serving EU
- Data encryption at rest and in transit
- Secure payment processing - PCI DSS
- Content DRM maybe? Mike worried about piracy but not sure if needed
- Terms of service, privacy policy integration
- Cookie consent management
- User data export functionality

## Integration Requirements

- Email service - probably SendGrid or AWS SES
- Video hosting - should we use YouTube private? Or Vimeo? Or host ourselves?
- Analytics - Google Analytics def
- CRM integration would be good for corporate clients
- Calendar integration for live sessions (wait, are we doing live sessions?)
- Zoom integration for webinars - Jennifer mentioned this but wasn't in original scope

## Performance Requirements

- Page load under 2 seconds
- Video start time under 3 secs
- Support 10k concurrent video streams
- 99.9% uptime SLA
- Mobile app should work offline with downloaded content
- API response times under 200ms for most endpoints

## Content Moderation

- Review submitted courses before going live
- Flag inappropriate reviews/comments
- Instructor verification process
- Content quality standards - but what are they exactly?
- Copyright verification - how do we check this?

## Open Questions

- What about live streaming classes?
- Integration with existing LMS systems
- White-label options for corporate clients
- Gamification features - badges, leaderboards?
- Social features - follow instructors, share achievements?
- Multi-language support beyond English
- Accessibility compliance (WCAG)

## Random Notes

- Jennifer wants launch by Q2 2026 - is that realistic?
- Mike mentioned competitor "LearnHub" has great UX, should check it out
- Budget wasn't discussed but Sarah seemed concerned about costs
- Tom says dev team is only 4 people right now
- Need to schedule follow-up with legal about licensing
- Alex suggested phased rollout starting with beta users
- Marketing wants landing page 2 months before launch
- Someone said something about blockchain certificates??? (ignored this)

## Technical Decisions (sort of)

- Backend: probably Node.js or Python, Tom will decide
- Frontend: React definitely, maybe Next.js
- Database: PostgreSQL for relational, Redis for caching, maybe MongoDB for something?
- Cloud: AWS or Azure - depends on corporate preference
- CI/CD pipeline needed obviously
- Microservices vs monolith - Tom leaning toward monolith first then break apart later

## Concerns Raised

- Video storage costs could be huge with lots of content
- Customer support - who handles student questions?
- Content quality control process undefined
- Instructor onboarding flow needs work
- Testing strategy not discussed
- Documentation requirements?
- Migration plan if we have existing users (do we?)

---

*Notes taken by Alex - might have missed some stuff in the middle when connection dropped*


---
# Next Steps:
- 13-01. Lista pytań do uszczegółowienia wymaga.md