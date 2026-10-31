import fs from 'fs';
import path from 'path';

export const expectedEmptyFeedback = 'There is no product that matches the search criteria.';

export function recordSearchFeedback(actual, keyword) {
    if (actual.includes(expectedEmptyFeedback)) return;

    const finding = {
        id: 'SEARCH-EMPTY-FEEDBACK', scenario: 'TC01-S02',
        category: 'content/usability', keyword,
        expected: expectedEmptyFeedback, actual,
        note: 'Functional search assertions passed; feedback wording is checked separately.',
        observedAt: new Date().toISOString()
    };
    if (!process.env.TEST_REPORT_DIR) {
        console.warn(JSON.stringify(finding));
        return;
    }
    const file = path.join(process.env.TEST_REPORT_DIR, 'findings.json');
    const findings = JSON.parse(fs.readFileSync(file, 'utf8'));
    findings.push(finding);
    fs.writeFileSync(file, JSON.stringify(findings, null, 2));
}
