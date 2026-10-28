# Xuyang Zhao account tests

Standalone TestCafe project for Assignment 3. All documentation and code comments are in English. The assigned tester is Xuyang Zhao; SID and UTS email remain unconfirmed placeholders.

## Scope

Three function cases (T010 registration, T011 login, T012 logout), with three independent scenarios per case. Run against https://opencart.abstracta.us/ using real Chrome. No requests, sessions or account responses are mocked. Browser state is reset for every scenario.

## Run

Install Node.js and Google Chrome, open this directory, run `npm install`, then `npm test`. On this Mac the installed dependencies are available locally. You can also double-click `Run_TestCafe.command`. macOS may request TestCafe Browser Tools screen recording or browser automation access.

The runner executes nine scenarios serially, preserves its source snapshot, and saves timestamped original JSON results and screenshots under `reports/`. Set `BROWSER=chrome:headless` only if a real headless Chrome run is desired; the default is visible Chrome. JavaScript errors are not globally ignored.

## Test data and dependencies

Each run generates a unique address at the reserved example.invalid domain and a random password. Only the synthetic identity Account Test and dummy telephone 900000000 are submitted. The reserved address cannot receive real email; email delivery is outside scope. Newsletter subscription is disabled. One successful registration provisions a reusable account for this run; later login/logout cases create it through the same browser UI if needed. Validation-only registration scenarios use different addresses and must remain on the registration page. Existing accounts and personal credentials are never used. The generated password exists only in process memory; the email is recorded in run-info.json for traceability. The public demo may retain the generated account; no account deletion is attempted.

F11 login depends on a successfully provisioned F10 account. F12 logout depends on authenticated F11 access. Every logout scenario establishes its own signed-in session. Do not interpret prerequisite or website JavaScript errors as successful assertions.

## Evidence

Compilation checks do not prove execution. Read the latest completed `results.json` and `summary.json` for actual outcomes. The report distinguishes this new nine-scenario run from the earlier 27 catalogue/cart scenarios; the older suite has not been rerun by this extension.

Source images under `evidence/source/` are generated from the actual submitted files and are labelled as source, not runtime evidence.

## Verified execution

The corrected run on 27 October 2026 executed all nine scenarios in real Chrome: nine passed, zero failed, zero execution errors and zero skipped. See RESULTS.md and reports/Account_Execution_Summary.html for timestamps, browser metadata and links to original evidence. Both the initial and corrected runs are retained with their own exact source snapshots.
