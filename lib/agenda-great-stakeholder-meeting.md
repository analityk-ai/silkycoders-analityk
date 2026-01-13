# Agenda for Great Stakeholder Meeting

## Meeting Structure & Time Allocation

A well-structured stakeholder meeting should follow this framework:

---

## 1. Opening & Objectives (5 min)

**Purpose:** Align everyone and set expectations

- Clear meeting goals and expected outcomes
- Agenda review and time allocation
- Confirm attendee list and note any absences
- Establish ground rules (e.g., decisions vs. discussions, parking lot for tangents)

**Owner:** Meeting facilitator

---

## 2. Project Overview & Context (10 min)

**Purpose:** Ensure shared understanding of the business case

- Business objectives and success criteria
- Timeline and constraints
- Budget overview and resource allocation
- Strategic fit in organization
- Any external dependencies or market factors

**Owner:** Product Owner / Executive Sponsor

**Desired Outcome:** All stakeholders understand the "why" behind the project

---

## 3. User Personas & Requirements (15 min)

**Purpose:** Define who we're building for and what they need

- **User Roles Clearly Defined:**
  - Students (learners)
  - Instructors (content creators)
  - Admins (system managers)
  - Guest users (if applicable)
  
- **User Stories** prioritized by value
  - Use format: "As a [role], I want [action], so that [benefit]"
  - Prioritize: CRITICAL, HIGH, MEDIUM, NICE-TO-HAVE
  
- **Access Control & Permissions Framework**
  - Role-based access control (RBAC)
  - Permission matrix by role
  
- **User Journey Maps** (if time allows)
  - Key touchpoints and pain points

**Owner:** Product Owner / UX Lead

**Desired Outcome:** Consensus on who the users are and their primary needs

---

## 4. Core Features - Prioritized (20 min)

**Purpose:** Separate must-haves from nice-to-haves

### MVP (Minimum Viable Product) - v1.0
- Features absolutely required for launch
- Why each is included
- Resource effort estimate

### Phase 2+ Features
- Clearly labeled features for later releases
- Rationale for deferral

**Structured Breakdown:**
- Content Management (upload, organize, publish)
- Learning Experience (progress tracking, certificates)
- Payment & Monetization (payment processing, pricing model)
- Analytics & Reporting (basic metrics)
- Security & Compliance (baseline requirements)

**For Each Feature:**
- [ ] Clear requirement statement
- [ ] Acceptance criteria
- [ ] Dependency mapping
- [ ] Resource estimate (dev, QA, design hours)
- [ ] Priority level
- [ ] Owner assignment

**Owner:** Product Manager / Tech Lead

**Desired Outcome:** Written commitment to MVP scope with clear Phase 2+ backlog

---

## 5. Technical Architecture Discussion (10 min)

**Purpose:** Validate technical feasibility and make key architecture decisions

- **Technology Stack Rationale:**
  - Backend framework (Node.js, Python, Go, etc.)
  - Frontend framework (React, Vue, etc.)
  - Database strategy (PostgreSQL, MongoDB, Redis, etc.)
  - Cloud provider (AWS, Azure, GCP, etc.)
  - Why each choice?

- **Architecture Pattern:**
  - Monolith vs. Microservices (trade-offs)
  - API-first approach
  - CI/CD pipeline strategy

- **Scalability & Performance Targets:**
  - Concurrent user requirements (with justification)
  - Data volume projections
  - Page load targets
  - Video streaming requirements
  - API response time targets

- **Infrastructure Considerations:**
  - CDN for media delivery
  - Database replication/backup strategy
  - Disaster recovery RTO/RPO
  - Load balancing approach

**Owner:** Tech Lead / Solution Architect

**Desired Outcome:** Architecture decisions documented with rationale and trade-offs noted

---

## 6. Business Model & Monetization (10 min)

**Purpose:** Align on how the platform generates revenue

- **Pricing Strategy:**
  - One-time course purchase
  - Subscription (monthly/annual)
  - Corporate licensing
  - Freemium model
  - Free trial duration and terms

- **Revenue Streams:**
  - Primary revenue source
  - Secondary opportunities
  - Commission structure (for instructors vs. platform)

- **Discount & Promotion Strategy:**
  - Promo code framework
  - Discount tiers
  - Refund policy
  - Refund eligibility rules (e.g., within 30 days, < 80% completion)

- **Payment Processing:**
  - Payment gateway (Stripe, PayPal, etc.)
  - Payment security standards (PCI-DSS)
  - Multi-currency support needs

- **Financial Projections:**
  - Pricing assumptions
  - Projected revenue
  - Customer acquisition cost estimates

**Owner:** Product Owner / Finance / Marketing

**Desired Outcome:** Clear, documented monetization strategy

---

## 7. Compliance & Risk (10 min)

**Purpose:** Identify and mitigate critical risks early

- **Legal & Regulatory:**
  - GDPR compliance requirements
  - Data residency requirements (EU, US, other)
  - Content licensing and copyright verification
  - Terms of service and privacy policy
  - Accessibility compliance (WCAG)

- **Security & Data Protection:**
  - Data encryption at rest and in transit
  - Authentication mechanism
  - Authorization framework
  - Data breach response plan

- **Content Moderation:**
  - Instructor verification process
  - Content review before publishing
  - Inappropriate content flagging mechanism
  - Quality standards definition

- **Known Risks & Mitigations:**
  - What could go wrong?
  - Likelihood and impact assessment
  - Mitigation strategy for high-risk items

- **Compliance Gaps:**
  - What legal expertise is needed?
  - What compliance audits are required?

**Owner:** Legal / Security / Compliance Officer

**Desired Outcome:** Risk register documented; legal follow-ups scheduled

---

## 8. Dependencies & External Integrations (5 min)

**Purpose:** Identify what external services we depend on

- **Third-Party Services:**
  - Email service (SendGrid, AWS SES, etc.)
  - Video hosting (YouTube, Vimeo, self-hosted, Cloudflare, etc.)
  - Analytics (Google Analytics, custom)
  - Payment processing (mentioned above)
  - SMS/Notifications
  
- **Integration Points:**
  - Existing corporate systems (LMS, CRM, etc.)
  - Single Sign-On (SSO) - complexity & timeline
  - Calendar systems
  - Video conferencing (Zoom, Teams, etc.)

- **Build vs. Buy Decisions:**
  - Cost-benefit of building vs. using third-party
  - Vendor lock-in risks

**Owner:** Tech Lead / Procurement

**Desired Outcome:** Integration roadmap with timeline and cost estimates

---

## 9. Open Questions & Parking Lot (5 min)

**Purpose:** Capture unresolved items for follow-up

**Format for Each Question:**
```
Q: [Question statement]
Owner: [Who will investigate]
Due: [Target resolution date]
Impact: [Why does this matter]
```

**Common Questions to Address:**
- Live streaming capability - in or out of scope?
- Discussion forums - MVP or Phase 2?
- Mobile app timeline (iOS/Android)
- White-label / multi-tenant support needed?
- Gamification features (badges, leaderboards)?
- Multi-language support required for v1?
- Content versioning and archival strategy?
- Offline functionality scope?

**Owner:** Product Owner

**Desired Outcome:** Parking lot documented; all questions assigned for follow-up

---

## 10. Decision Log & Next Steps (5 min)

**Purpose:** Crystallize what was decided and commit to actions

### Decisions Made Today
```
| Decision | Option Chosen | Owner | Due Date | Rationale |
|----------|---------------|-------|----------|-----------|
| [Topic]  | [Choice]      | [Name]| [Date]   | [Why]     |
```

### Action Items
```
| Action | Owner | Due Date | Depends On | Status |
|--------|-------|----------|-----------|--------|
| [Task] | [Name]| [Date]   | [Items]   | Open   |
```

### Next Meeting
- Date and time
- Agenda items to prepare
- Pre-work assignments

**Owner:** Meeting facilitator

**Desired Outcome:** 
- All decisions documented
- All action items tracked with owners
- Next meeting scheduled with prep work clear

---

## Pre-Meeting Preparation (by facilitator)

- [ ] Distribute agenda 48 hours prior
- [ ] Request stakeholders to pre-read background materials
- [ ] Assign pre-work (e.g., "Tech team: research video hosting options")
- [ ] Confirm attendance and technical requirements
- [ ] Prepare decision template/template for notes
- [ ] Have parking lot mechanism ready (whiteboard, shared doc, etc.)

---

## Post-Meeting Follow-Up

- [ ] Distribute meeting notes within 24 hours
- [ ] Share decision log and action items
- [ ] Assign due dates to all action items
- [ ] Send calendar invites for follow-up meetings
- [ ] Create issues/tickets for technical decisions needing spike work
- [ ] Schedule follow-ups:
  - Legal review on compliance items
  - Technical architecture deep-dive if needed
  - Market research on pricing strategy
  - Vendor evaluation (payment, video hosting, etc.)

---

## Meeting Tips

✅ **DO:**
- Start and end on time
- Use a facilitator to keep discussion focused
- Document decisions in real-time
- Assign owners immediately (don't leave it ambiguous)
- Separate "decision-making discussions" from "informational sharing"
- Use the parking lot for interesting but off-topic discussions

❌ **DON'T:**
- Mix decisions with maybes - be explicit
- Leave action items unassigned
- Let one person dominate
- Assume people remember what was decided
- Skip the technical feasibility check
- Forget about compliance until after design is done

---

**Version:** 1.0  
**Created:** January 13, 2026  
**Last Updated:** January 13, 2026
