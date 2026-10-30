const createTestCafe = require('testcafe');
const fs = require('fs');
const path = require('path');

// Run from the project directory even when called with an absolute script path.
process.chdir(path.resolve(__dirname, '..'));
process.env.ACCOUNT_RUN_ID = `${Date.now()}-${require('crypto').randomBytes(4).toString('hex')}`;
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const out = path.resolve('reports', `${stamp}-all`);
fs.mkdirSync(out, { recursive: true });
// Retain the exact source associated with each run for audit and failure diagnosis.
for (const folder of ['tests', 'helpers', 'scripts'])
    fs.cpSync(folder, path.join(out, 'source-snapshot', folder), { recursive: true });
for (const file of ['package.json', 'pnpm-lock.yaml', 'test-plan.json', 'README.md'])
    fs.copyFileSync(file, path.join(out, 'source-snapshot', file));
(async () => {
    let cafe;
    try {
        cafe = await createTestCafe('127.0.0.1');
        const runner = cafe.createRunner()
            .src('tests/**/*.js')
            .browsers(process.env.BROWSER || 'chrome')
            .reporter([{ name: 'spec' }, { name: 'json', output: path.join(out, 'results.json') }])
            .screenshots({ path: path.join(out, 'screenshots'), takeOnFails: true, fullPage: true });
        // Serial scenarios avoid contention on the shared public demo; browser state is reset per test.
        const failures = await runner.run({
            selectorTimeout: 15000, assertionTimeout: 15000, pageLoadTimeout: 45000,
            pageRequestTimeout: 45000, ajaxRequestTimeout: 45000,
            browserInitTimeout: 90000, quarantineMode: false,
            stopOnFirstFail: false, skipJsErrors: false
        });
        fs.writeFileSync(path.join(out, 'run-info.json'), JSON.stringify({
            started: stamp, finished: new Date().toISOString(), member: 'all', failures,
            baseUrl: process.env.BASE_URL || 'https://opencart.abstracta.us/',
            node: process.version, platform: process.platform, architecture: process.arch,
            testcafe: require('testcafe/package.json').version,
            browser: process.env.BROWSER || 'chrome', mode: 'real browser; no request mocks', attribution: 'See fixture metadata in results.json',
            generatedEmail: `a3.xuyang.${process.env.ACCOUNT_RUN_ID}@example.invalid`
        }, null, 2));
        console.log(`Evidence directory: ${out}`);
        process.exitCode = failures ? 1 : 0;
    } catch (err) {
        fs.writeFileSync(path.join(out, 'fatal-error.txt'), err.stack || String(err));
        console.error(err);
        process.exitCode = 2;
    } finally {
        if (cafe) await cafe.close();
    }
})();
