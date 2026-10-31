# Candidate defect: incorrect empty-search feedback

Observed run: 2026-10-30T11-18-43-609Z-aimee. Scenario: TC01-S02.

Steps: visit https://opencart.abstracta.us/, search for AimeeNoSuchProduct739281.

Expected: zero products and clear feedback that no products match the search. The automated test currently expects the exact sentence “There is no product that matches the search criteria.”; this literal wording is a test expectation, not a supplied formal website requirement.

Actual: zero products; the Search section says “Your shopping cart is empty!”. The saved failure screenshot confirms the message is in the search results area.

Impact: potentially confusing feedback for users searching the catalogue. Candidate severity: low (content/usability). Status: reproduced in multiple runs, including the final two recorded runs. Do not change the expected result merely to make the test pass.

Evidence: ../reports/2026-10-30T11-18-43-609Z-aimee/results.json and the test-2 error screenshot in that run's screenshots directory.

## Scope decision — 1 November 2026

The project owner explicitly approved testing the search result separately and recording the wording defect independently. The default TC01-S02 now asserts the keyword, zero product cards, no product-detail links, and visible nonempty feedback. It saves the actual wording in the run's `findings.json` when the original expected feedback is missing. This scope change does not resolve the website defect or replace the incorrect wording with an accepted expected result.

The original feedback assertion remains in `scripts/check-search-feedback.js`, run with `BROWSER=chrome:headless npm test -- scripts/check-search-feedback.js`. This content audit continues to fail until the feedback is corrected. Original execution evidence is unchanged.
