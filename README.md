# 32571 Enterprise Software Testing - Assignment 3


## Group Members

- Aimee Tai-Yun Shih
- Xuyang Zhao
- Zunyu Zhou

## Current Status

- [x] Shared repository and TestCafe environment prepared.
- [x] Xuyang Zhao account test files and evidence uploaded.
- [x] Aimee search, sorting and comparison tests implemented (three cases, nine scenarios).
- [x] Aimee execution evidence recorded: **8 passed, 1 failed** in the final recorded run.
- [x] Zunyu Zhou cart tests implemented (three cases, nine scenarios).
- [x] Zunyu Zhou execution evidence recorded: **9 passed** in the final recorded run.
- [ ] Review the empty-search feedback finding and intermittent comparison navigation observation.
- [ ] Confirm the third member's deliverables and integrate the full group report.

## Testing Scope
Run against https://opencart.abstracta.us/ using real Chrome

Xuyang Zhao: T010 registration, T011 login, T012 logout

Aimee Tai-Yun Shih: TC01 product search, TC02 product sorting, TC03 product comparison. Each case includes three scenarios.

Zunyu Zhou: TC07 add to cart, TC08 update cart, TC09 remove cart. Each case includes three scenarios.

## Run

Install Node.js and Google Chrome, open this directory, run `npm install`, then `npm test`.

You can also double-click `Run_TestCafe.command`. macOS may request TestCafe Browser Tools screen recording or browser automation access.

## Run all tests

After installing dependencies, run:

```sh
npm test
```

If Node.js is available without npm and dependencies are already installed:

```sh
node scripts/run.cjs
```

The shared runner opens Chrome and runs every test under `tests/`, including subfolders. Currently there are nine cases and twenty-seven scenarios from Aimee, Xuyang and Zunyu. Set `BROWSER=chrome:headless` for headless execution. Results, screenshots and source snapshots are saved under `reports/<timestamp>-all/`; fixture metadata identifies each tester.

To rerun selected files, pass paths or quoted globs after `--`:

```sh
BROWSER=chrome:headless npm test -- 'tests/TC0[789]-*.js'
```

The selected paths are recorded in `run-info.json`; check them before treating a report as a full-suite result. Cart tests use action attributes to locate buttons, wait for cart state changes and assert quantities, line totals, empty-cart state and stock warnings. The runner closes the browser before explicitly returning exit code 0 (passed), 1 (failed tests) or 2 (runner error), including on Node 26.

## Functional scope and known findings — 1 November 2026

The project owner approved separating search functionality from feedback wording. The default 27 scenarios check the searched keyword, zero products, absence of product-detail links and a visible nonempty feedback state. TC01-S02 records incorrect feedback in each run's `findings.json`; a functional PASS does not mean the website's wording defect is fixed.

The original wording expectation is retained as a separate content audit:

```sh
BROWSER=chrome:headless npm test -- scripts/check-search-feedback.js
```

That audit fails while the external store still says “Your shopping cart is empty!” for a no-match search. See [the finding](docs/aimee-empty-search-finding.md) and [the diagnosis](docs/test-diagnosis-2026-11-01.md).

The runner excludes only `pagespeed is not defined` ReferenceErrors from `HTMLImageElement.onload` on the exact HTTPS origin `opencart.abstracta.us`. Other messages, call sites and origins still fail. This is a functional-test compatibility exception for the demo's optional image beacon, not a repair to the remote server. There are no response mocks or injected replacement globals. A request-header-only workaround was tested and did not reliably prevent the error under browser automation.

Validate the exception boundaries with `node --test scripts/js-error-policy.test.cjs`. Browser controls are also available:

```sh
BROWSER=chrome:headless npm test -- scripts/check-js-error-policy.js
```

The controls deliberately trigger two page errors: the known PageSpeed case must pass, and an unrelated `cart is not defined` error must fail. Therefore that control run should have one pass, one failure and exit code 1. It is separate from the functional suite.

Final functional run on 1 November 2026 (Sydney): **27 passed, 0 failed, 0 skipped**, in 3m 02s, exit code 0. Evidence: [results.json](reports/2026-10-31T13-18-53-370Z-all/results.json), [findings.json](reports/2026-10-31T13-18-53-370Z-all/findings.json), and [run-info.json](reports/2026-10-31T13-18-53-370Z-all/run-info.json). The wording defect is still recorded in `findings.json`.

The separate [control/audit run](reports/2026-10-31T13-16-15-824Z-all/results.json) confirmed all three search scenarios passed, the known PageSpeed control passed, the unrelated-error control failed, and the wording audit failed with the actual cart message. Its two intentional failures are the expected result of that validation. The three policy unit tests also passed. Historical runs remain unchanged.

## Historical local validation — 31 October 2026

Full-suite command: `BROWSER=chrome:headless npm test`. Run `2026-10-31T12-14-57-031Z-all` completed **26 passed, 1 failed, 0 skipped** in Chrome 156 / Node 26.12.1. The original reproduction run `2026-10-31T11-32-19-201Z-all` had 19 passed and 8 failed. All nine cart scenarios and all three comparison scenarios passed in the final run.

Cart repairs replace case-sensitive button-text selectors with action selectors, use named products and the persistent header cart link, replace fixed sleeps with state checks, and add quantity, line-total, removal and stock-warning assertions. Comparison and cart navigation wait for page animations to finish. The runner now accepts selected test paths and returns a nonzero exit code for failures on Node 26.

TC01-S02 remains failed: the external store displays “Your shopping cart is empty!” in the no-match search results. The repository contains system tests, not the store's server source, so this requires a website-side correction. Its assertion is retained; see the [empty-search finding](docs/aimee-empty-search-finding.md). An earlier intermediate run also encountered `ReferenceError: pagespeed is not defined`; this did not recur in the final run. JavaScript errors remain enabled as failures (`skipJsErrors: false`), with no quarantine or request mocks.

Local evidence: [results.json](reports/2026-10-31T12-14-57-031Z-all/results.json), [run-info.json](reports/2026-10-31T12-14-57-031Z-all/run-info.json), screenshots and source snapshots in the same run directory. `reports/` is ignored by Git; keep these files with the submitted execution evidence.

## Aimee results and documentation

The final recorded run on 30 October 2026 completed all nine scenarios: **8 passed, 1 failed (88.9%)**. TC01-S02 found that an empty search displays a shopping-cart message. The previous run produced the same result. An earlier comparison-navigation failure is retained in the report discussion. These are Aimee's results, not an overall group completion claim.

- [Execution results](https://github.com/sonja91zoe/Testing-Ass3-System-Testing/tree/92e9dcb/reports/2026-10-30T11-18-43-609Z-aimee/results.json)
- [Screenshots](https://github.com/sonja91zoe/Testing-Ass3-System-Testing/tree/92e9dcb/reports/2026-10-30T11-18-43-609Z-aimee/screenshots)
- [Empty-search finding](docs/aimee-empty-search-finding.md)
- [English report contribution](docs/aimee-report-contribution.md)
- [Execution guide with Chinese notes](docs/aimee-guide.md)

## Collaboration

Use `main` for the stable shared version and individual feature branches for ongoing work. Retain each member's authorship and original execution evidence. The English contribution is a draft for integration, not the complete group report. AI assistance is documented in the guide.
