// Dedicated Aimee execution: never relabel or rerun another member's account suite.
const createTestCafe = require('testcafe');
const fs = require('fs');
const path = require('path');
process.chdir(path.resolve(__dirname, '..'));
const started = new Date().toISOString();
const out = path.resolve('reports', `${started.replace(/[:.]/g, '-')}-aimee`);
fs.mkdirSync(out, { recursive: true });
for (const file of ['tests/aimee/TC01-search.js','tests/aimee/TC02-sorting.js','tests/aimee/TC03-comparison.js','helpers/catalogue-aimee.js','scripts/run-aimee.cjs','package.json']) {
    const dest = path.join(out, 'source-snapshot', file);
    fs.mkdirSync(path.dirname(dest), { recursive: true }); fs.copyFileSync(file, dest);
}
const browser = process.env.BROWSER || 'chrome:headless';
(async () => {
    let cafe;
    try {
        cafe = await createTestCafe('127.0.0.1');
        const failures = await cafe.createRunner().src('tests/aimee/*.js').browsers(browser)
            .reporter([{ name: 'spec' }, { name: 'json', output: path.join(out,'results.json') }])
            .screenshots({ path: path.join(out,'screenshots'), takeOnFails: true, fullPage: true })
            .run({ selectorTimeout: 15000, assertionTimeout: 15000, pageLoadTimeout: 45000,
                pageRequestTimeout: 45000, ajaxRequestTimeout: 45000, browserInitTimeout: 90000,
                quarantineMode: false, skipJsErrors: false, stopOnFirstFail: false });
        fs.writeFileSync(path.join(out,'run-info.json'), JSON.stringify({ started, finished:new Date().toISOString(), tester:'Aimee Tai-Yun Shih', member:'Aimee', baseUrl:'https://opencart.abstracta.us/', node:process.version, platform:process.platform, architecture:process.arch, testcafe:require('testcafe/package.json').version, browser, failures, plannedScenarios:9 },null,2));
        process.exitCode = failures ? 1 : 0;
    } catch(e) { fs.writeFileSync(path.join(out,'fatal-error.txt'),e.stack || String(e)); console.error(e); process.exitCode=2; }
    finally { console.log(`Evidence: ${out}`); if(cafe) await cafe.close(); }
})();
