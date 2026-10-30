const fs = require('fs');
const path = require('path');
const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/summary.cjs reports/RUN/results.json');
const report = JSON.parse(fs.readFileSync(input, 'utf8'));
const scenarios = report.fixtures.flatMap(f => f.tests.map(t => {
    const errors = t.errs || [];
    const text = errors.join('\n');
    // Distinguish failed output assertions from script/element execution errors.
    const status = t.skipped ? 'skipped' : !errors.length ? 'passed' :
        /A JavaScript error occurred|Cannot obtain information|disconnected|failed to load/i.test(text) ? 'error' : 'failed';
    const errorShot = text.match(/Screenshot: ([^\n]+)/);
    const successShot = path.join(path.dirname(input), 'screenshots', t.name.split(' ')[0] + '.png');
    return {
        fixture: f.name, tester: f.meta?.tester || null, member: f.meta?.member || null, scenario: t.name.split(' ')[0], name: t.name, status,
        errors, screenshot: fs.existsSync(successShot) ? successShot : errorShot ? errorShot[1].trim() : null,
        durationMs: t.durationMs
    };
}));
const out = path.join(path.dirname(input), 'summary.json');
const statusCount = status => scenarios.filter(s => s.status === status).length;
fs.writeFileSync(out, JSON.stringify({
    planned: report.total,
    executed: scenarios.filter(s => s.status !== 'skipped').length,
    passed: statusCount('passed'), failed: statusCount('failed'), errors: statusCount('error'),
    skipped: statusCount('skipped'), reporterNonPass: scenarios.filter(s => ['failed', 'error'].includes(s.status)).length,
    startTime: report.startTime, endTime: report.endTime, scenarios
}, null, 2));
console.log(out);
