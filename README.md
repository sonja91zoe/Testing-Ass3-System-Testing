# 32571 Enterprise Software Testing - Assignment 3


## Group Members

- Aimee Tai-Yun Shih
- Xuyang Zhao
- Member 3

## Current Status

- [x] Shared repository and TestCafe environment prepared.
- [x] Xuyang Zhao account test files and evidence uploaded.
- [x] Aimee search, sorting and comparison tests implemented (three cases, nine scenarios).
- [x] Aimee execution evidence recorded: **8 passed, 1 failed** in the final recorded run.
- [ ] Review the empty-search feedback finding and intermittent comparison navigation observation.
- [ ] Confirm the third member's deliverables and integrate the full group report.

## Testing Scope
Run against https://opencart.abstracta.us/ using real Chrome

Xuyang Zhao: T010 registration, T011 login, T012 logout

Aimee Tai-Yun Shih: TC01 product search, TC02 product sorting, TC03 product comparison. Each case includes three scenarios.


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

The shared runner opens Chrome and runs every test under `tests/`, including subfolders. Currently there are six cases and eighteen scenarios from Aimee and Xuyang. Set `BROWSER=chrome:headless` for headless execution. Results, screenshots and source snapshots are saved under `reports/<timestamp>-all/`; fixture metadata identifies each tester.

## Aimee results and documentation

The final recorded run on 30 October 2026 completed all nine scenarios: **8 passed, 1 failed (88.9%)**. TC01-S02 found that an empty search displays a shopping-cart message. The previous run produced the same result. An earlier comparison-navigation failure is retained in the report discussion. These are Aimee's results, not an overall group completion claim.

- [Execution results](https://github.com/sonja91zoe/Testing-Ass3-System-Testing/tree/92e9dcb/reports/2026-10-30T11-18-43-609Z-aimee/results.json)
- [Screenshots](https://github.com/sonja91zoe/Testing-Ass3-System-Testing/tree/92e9dcb/reports/2026-10-30T11-18-43-609Z-aimee/screenshots)
- [Empty-search finding](docs/aimee-empty-search-finding.md)
- [English report contribution](docs/aimee-report-contribution.md)
- [Execution guide with Chinese notes](docs/aimee-guide.md)

## Collaboration

Use `main` for the stable shared version and individual feature branches for ongoing work. Retain each member's authorship and original execution evidence. The English contribution is a draft for integration, not the complete group report. AI assistance is documented in the guide.
