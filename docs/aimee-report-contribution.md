# Assignment 3 — Aimee report contribution

Draft for integration into the official report. This is not the complete group report.

## 1. Overview

The system under test is the OpenCart demonstration shop at https://opencart.abstracta.us/. It provides customer-facing online shopping functions, including browsing and searching the product catalogue, sorting search results, comparing products, managing customer accounts and using a shopping cart. Aimee confirmed that the lecturer approved this target on 30 October 2026.

This contribution covers product search, sorting and comparison as a guest customer. Account and cart testing belong to the other members' contributions. Payment processing and complete website coverage are outside this contribution's scope.

## 2. System Functions — Aimee scope

| ID | Function | Description | Location and prerequisites |
|---|---|---|---|
| F01 | Product search | Find catalogue products using a keyword; display no-match feedback and allow a replacement query. | Header search box; known catalogue data; guest access. |
| F02 | Product sorting | Reorder search results by price or name without changing the product set. | Search results for Mac; Sort By selector; four products with different prices. |
| F03 | Product comparison | Add products to a comparison table and remove a product while retaining another. | Compare buttons, Product Compare link and comparison table; empty comparison state at scenario start. |

The group should add the other members' verified function descriptions before submission.

## 6. Individual Test Cases — Aimee Tai-Yun Shih

Implementation: JavaScript with TestCafe 3.7.6. Each scenario starts with TestCafe's isolated browser state. The test data reflect the catalogue inspected during preparation and must be checked again if the demo site changes.

| Scenario | Input and steps | Expected result | Actual result |
|---|---|---|---|
| TC01-S01 | Search MacBook; open the exact MacBook result. | Three matching MacBook products; detail page shows MacBook, product ID 43. | PASS (final recorded run) |
| TC01-S02 | Search AimeeNoSuchProduct739281. | No product cards; no-match message appears. | FAIL — unexpected empty-search message |
| TC01-S03 | Search MacBook, then replace the query with iPhone. | Only iPhone is returned; search field contains iPhone. | PASS (final recorded run) |
| TC02-S01 | Search Mac; select Price (Low > High). | Same four products; finite distinct prices in ascending order; selected option and URL match. | PASS (final recorded run) |
| TC02-S02 | Search Mac; select Price (High > Low). | Same four products; prices in descending order; selected option and URL match. | PASS (final recorded run) |
| TC02-S03 | Search Mac; select Name (A - Z). | iMac, MacBook, MacBook Air, MacBook Pro in that order; no missing or duplicated products. | PASS (final recorded run) |
| TC03-S01 | Add iMac to comparison; open the comparison page. | One product, iMac; model Product 14 and brand Apple; comparison fields visible. | PASS (final recorded run) |
| TC03-S02 | Add iMac and MacBook; open the comparison page. | Both products appear with Price, Model and Brands fields. | PASS (final recorded run) |
| TC03-S03 | Add both products; remove iMac from the comparison page. | Only MacBook remains; the iMac removal link disappears. | PASS (final recorded run) |

## Latest execution — 30 October 2026

Final recorded run: [2026-10-30T11-18-43-609Z-aimee](../reports/2026-10-30T11-18-43-609Z-aimee/results.json), executed by Aimee in Chrome 156 / macOS Tahoe 26. Nine scenarios completed: eight passed and one failed (88.9% scenario pass rate). TC01-S02 repeatedly displayed “Your shopping cart is empty!” for an empty search result. The expected exact no-match sentence is a test expectation, not a supplied formal website requirement; the misleading cart message is recorded as a candidate usability/content defect.

The preceding run 2026-10-30T11-17-37-232Z-aimee also recorded eight passes and the same failure. Run 2026-10-30T11-16-12-601Z-aimee additionally failed TC03-S01 because navigation remained on Search - Mac; the next two runs passed that scenario. Its intermittent navigation behaviour remains unexplained and is not hidden by the latest result. Earlier assertion-chaining errors were corrected before these runs. Original evidence is retained; results apply to these executions only.

### Reproduction and assistance

Follow docs/aimee-guide.md and run npm run test:aimee. Record the actual browser, operating system and Node.js versions used for the final run. AI assisted with initial code and this draft; Aimee must review and understand the implementation and retain the prompts required by the assignment.

### Integration remaining

Other members must supply their own sections and evidence. Preserve Xuyang Zhao's existing T010–T012 account identifiers, mapping them explicitly to the earlier TC04–TC06 allocation where necessary. The group must reconcile the final member list, schedule, environment description and reflections. Existing account results do not establish that the cart contribution or the overall assignment is complete.
