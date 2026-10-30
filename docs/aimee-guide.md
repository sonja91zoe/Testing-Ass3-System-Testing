# Aimee catalogue testing guide

Target confirmed by Aimee: https://opencart.abstracta.us/ (teacher-approved change from the original LambdaTest target).

## Install and run

Install Node.js and Google Chrome. Open a terminal in the repository folder:

```sh
npm ci
npm run test:aimee
```

Default: real headless Chrome. For visible Chrome on macOS/Linux:

```sh
BROWSER=chrome npm run test:aimee
```

PowerShell:

```powershell
$env:BROWSER = 'chrome'
npm run test:aimee
```

The existing `npm test` still runs Xuyang Zhao's account cases. Aimee's files are deliberately in `tests/aimee/`, outside that runner's `tests/*.js` glob, to preserve attribution. Do not use the account runner to produce Aimee evidence.

## Ownership and coverage

- TC01 / F01: product search; known keyword, no-match keyword, replacement query.
- TC02 / F02: product sorting; price ascending, price descending, name ascending.
- TC03 / F03: product comparison; one product, two products, removal preserving the remaining product.

All nine tests start with TestCafe's fresh browser state. Comparison additionally asserts an empty comparison list. Sorting checks the four expected products and meaningful distinct price values, not just a potentially empty ordered list. Search and comparison use demo catalogue data; a changed catalogue requires investigation rather than weakening assertions to get a pass.

## Evidence

Every attempt creates `reports/<UTC-timestamp>-aimee/`, containing source snapshots and, when execution completes, original `results.json`, screenshots and `run-info.json`. Startup failures produce `fatal-error.txt`. Failed attempts are retained. The report must use actual results from an identified run; do not infer PASS from the presence of a screenshot.

## 中文使用說明

1. 先讀三份測試程式，理解每個操作與 assertion 的目的。
2. 用自己的電腦執行上述指令；若 macOS 要求權限，先確認提示的應用程式。
3. 打開本次 reports 資料夾，核對九個情境、截圖和錯誤。
4. 將真實結果放進英文報告 §6，記錄自己的環境與版本。
5. 保留原始碼截圖；報告 §1、§2 可使用本次整理的內容，其他組員仍需提供自己的功能資料。
6. 不要改寫同學 T010–T012 的原始證據；整合時以對照表處理與舊 TC04–TC06 編號的差異。

## Assistance and prompts

Implementation and document preparation were AI-assisted in this chat. Relevant requests included preparing Aimee's search/sorting/comparison cases, continuing with JavaScript and TestCafe, and confirming that opencart.abstracta.us was teacher-approved. The assistant generated the initial test/helper/runner code and documentation, and inspected the site's UI. Aimee should review, understand and record any subsequent prompts or edits before submission. Do not describe this as unaided work.

## Latest execution — 30 October 2026

Final recorded run: [2026-10-30T11-18-43-609Z-aimee](../reports/2026-10-30T11-18-43-609Z-aimee/results.json), executed by Aimee in Chrome 156 / macOS Tahoe 26. Nine scenarios completed: eight passed and one failed (88.9% scenario pass rate). TC01-S02 repeatedly displayed “Your shopping cart is empty!” for an empty search result. The expected exact no-match sentence is a test expectation, not a supplied formal website requirement; the misleading cart message is recorded as a candidate usability/content defect.

The preceding run 2026-10-30T11-17-37-232Z-aimee also recorded eight passes and the same failure. Run 2026-10-30T11-16-12-601Z-aimee additionally failed TC03-S01 because navigation remained on Search - Mac; the next two runs passed that scenario. Its intermittent navigation behaviour remains unexplained and is not hidden by the latest result. Earlier assertion-chaining errors were corrected before these runs. Original evidence is retained; results apply to these executions only.

