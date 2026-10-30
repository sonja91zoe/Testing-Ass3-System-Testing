// Author: Aimee Tai-Yun Shih | F03 Product comparison | TC03
import { Selector } from 'testcafe';
import { searchUrl, addCompare, openCompare, expectCompared, screenshot } from '../helpers/catalogue-aimee';
fixture('Aimee TC03 Product comparison').page(searchUrl)
    .meta({ tester: 'Aimee Tai-Yun Shih', member: 'Aimee', function: 'F03' })
    .beforeEach(async t => { await t.expect(Selector('#compare-total').innerText).contains('(0)'); });
test.meta({ scenario: 'TC03-S01' })('TC03-S01 Compare one selected product', async t => {
    await addCompare(t, 'iMac', 1);
    await openCompare(t);
    await expectCompared(t, ['iMac']);
    await t.expect(Selector('#content table').innerText).contains('Product 14');
    await t.expect(Selector('#content table').innerText).contains('Apple');
    await screenshot(t, 'TC03-S01');
});
test.meta({ scenario: 'TC03-S02' })('TC03-S02 Compare two different products', async t => {
    await addCompare(t, 'iMac', 1);
    await addCompare(t, 'MacBook', 2);
    await openCompare(t);
    await expectCompared(t, ['iMac', 'MacBook']);
    await screenshot(t, 'TC03-S02');
});
test.meta({ scenario: 'TC03-S03' })('TC03-S03 Remove iMac and retain MacBook', async t => {
    await addCompare(t, 'iMac', 1);
    await addCompare(t, 'MacBook', 2);
    await openCompare(t);
    await expectCompared(t, ['iMac', 'MacBook']);
    await t.click(Selector('#content a').withAttribute('href', /[?&]remove=41(?:&|$)/));
    await expectCompared(t, ['MacBook']);
    await t.expect(Selector('#content a').withAttribute('href', /[?&]remove=41(?:&|$)/).exists).notOk();
    await screenshot(t, 'TC03-S03');
});
