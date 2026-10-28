# Xuyang Zhao account test results

Final run: `2026-10-26T15-58-40-029Z-member-D`

Actual results: 9 passed, 0 failed assertions, 0 execution errors, 0 skipped, out of nine planned scenarios.

Reporter interval (UTC): 2026-10-26T15:58:47.939Z to 2026-10-26T16:00:14.836Z.

Browser reported by TestCafe: Chrome 155.0.0.0 / Golden Gate 27.

| Scenario | Result | Browser evidence |
|---|---|---|
| T010-S1 | PASS | [T010-S1](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T010-S1.png) |
| T010-S2 | PASS | [T010-S2](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T010-S2.png) |
| T010-S3 | PASS | [T010-S3](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T010-S3.png) |
| T011-S1 | PASS | [T011-S1](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T011-S1.png) |
| T011-S2 | PASS | [T011-S2](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T011-S2.png) |
| T011-S3 | PASS | [T011-S3](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T011-S3.png) |
| T012-S1 | PASS | [T012-S1](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T012-S1.png) |
| T012-S2 | PASS | [T012-S2](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T012-S2.png) |
| T012-S3 | PASS | [T012-S3](reports/2026-10-26T15-58-40-029Z-member-D/screenshots/T012-S3.png) |

The first completed account run had three passes and six failed assertions. Registration actually succeeded, but the initial test expected a different success heading; its helper marked the account as provisioned only after that content assertion. Later cases consequently attempted duplicate registration. The final helper checks the observed creation confirmation and authenticated Logout link, and records provisioning after the successful route transition. This correction and the complete rerun are retained with separate source snapshots. The initial results are not added to the final pass rate.

The earlier 27 catalogue/cart scenarios remain a separate run dated 24 October 2026, with 24 passes, two assertion failures and one execution error. They were not rerun by this extension.

The current test files, helper and runner match the final execution source snapshot byte for byte. Invalid-input scenarios count as passes only when the specified rejection and guest state are observed. SID and UTS email for Xuyang Zhao still need to be supplied.
