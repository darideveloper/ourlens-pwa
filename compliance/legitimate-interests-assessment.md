# Legitimate Interests Assessment (LIA)

**Organisation:** Corvidae Jones Ltd, trading as OurLives
**Product:** OurLens
**Version:** 1.0
**Date:** 20 October 2026
**Related document:** DPIA — OurLens, version 0.3
**Status:** Draft for review by the external data protection adviser

---

## 1. Purpose of this assessment

This assessment covers the processing for which OurLens relies on Article 6(1)(f) UK GDPR (legitimate interests), as recorded in the DPIA:

- administering invitation codes, scan allowances and licence usage;
- preventing abuse, controlling cost and protecting the service;
- diagnosing faults and maintaining availability.

The scan itself and the special category data in images rely on consent, not on legitimate interests. They are outside this assessment.

## 2. Processing assessed

| Element | Detail |
|---|---|
| Data | Invitation code, project, organisation, usage counters, IP address, request metadata, timestamps, error records |
| Data subjects | Code holders; in workplace use, employees or contractors using a distributed code |
| Purpose | Licence administration, abuse prevention, cost control, fault diagnosis and service availability |
| Recipients | Hosting provider in the EU; AI suppliers only where the request itself requires it (no additional use) |
| Retention | Licence records for the life of the licence; host and proxy logs targeted at 30 days, to be configured; error records no longer than necessary |

Images and findings are not processed for these purposes.

## 3. Legitimate interests

**Interest 1 — Operating a licensed service.** OurLens is distributed through invitation codes that carry a scan allowance. Without checking and updating that allowance, the service cannot be provided or billed correctly.

**Interest 2 — Protecting the service and its users.** Public endpoints attract automated abuse, credential stuffing and cost attacks. Rate limiting, usage limits and request validation protect availability and keep costs proportionate.

**Interest 3 — Maintaining a working service.** Error records and technical logs are necessary to detect failures, investigate faults and restore service.

Each interest is real, current and specific. None is speculative.

## 4. Necessity

The processing is limited to what is needed:

- The licence database holds a code, a project, an organisation and two counters. It holds no images, findings or user identity.
- Rate limiting and payload limits operate on request metadata, not on image content.
- Error records contain the service name, an execution reference, an error message and a stack trace. They do not include images or findings.
- Logs are to be retained for 30 days, with request bodies excluded; this is a target to be configured.

Less intrusive alternatives were considered:

| Alternative | Why it is not used |
|---|---|
| No licence tracking | The service could not enforce allowances or prevent unlimited use |
| Per-user accounts | Would collect more personal data (identity, credentials) than the current model |
| Trust-based limits | No protection against automated abuse or accidental overuse |
| No error logging | Faults could not be diagnosed or fixed; availability would suffer |

## 5. Balancing test

**Nature of the data.** Low to medium sensitivity. Codes are campaign-wide, not secrets. Technical data is standard operational metadata. No special category data is processed for these purposes.

**Reasonable expectations.** Users expect a licensed service to check that a code is valid and has scans remaining, and to protect the service from abuse. The privacy notice explains this.

**Impact on individuals.** Minimal. The processing does not profile, make decisions about individuals, or affect access to a service beyond enforcing the allowance the code already carries. A person is not singled out; the code is the unit.

**Safeguards.**

- Data minimisation: no names, emails or accounts.
- Least-privilege database access and parameterised queries.
- Rate and payload limits.
- Target 30-day log retention, no request bodies, to be configured and evidenced.
- No sale, advertising or model training.
- Transparency through the dedicated OurLens notice.
- Rights route through `info@ourlivesapp.com`.

**Imbalance check.** Corvidae Jones Ltd does not have a position of power over the data subject. The individual chooses whether to use the service. The processing does not override their interests, rights or freedoms.

## 6. Conclusion

The legitimate interests are not overridden by the rights and freedoms of individuals. The processing is necessary, proportionate and accompanied by appropriate safeguards.

**Outcome:** legitimate interests may be relied on for licence administration, abuse prevention, cost control and diagnostics, subject to the safeguards above being implemented and evidenced.

## 7. Review

Review on any material change to the licence model, logging, retention or suppliers, and at least annually.

## 8. Sign-off

| Role | Name / title | Date |
|---|---|---|
| Prepared by | Director, Corvidae Jones Ltd | |
| Reviewed by | External data protection adviser | |
| Approved by | Director, Corvidae Jones Ltd | |

This LIA supplements, and does not replace, the DPIA for OurLens.
