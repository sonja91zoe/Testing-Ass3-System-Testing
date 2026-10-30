import { Selector } from 'testcafe';
const site = 'https://opencart.abstracta.us/';
fixture('cart update test').page(site).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F08' });

test.meta({ scenario: 'TC08-S1' })('TC08-S1 update to 2', async t => {
    await t.click(Selector('.product-layout').nth(0).find('button').withText('Add to Cart'));
    await t.wait(1000);
    await t.click(Selector('#cart-total'));
    await t.wait(1000);
    await t.click(Selector('a').withText('View Cart'));
    await t.wait(2000);
    const input = Selector('input[name^="quantity"]').nth(0);
    await t.click(input).pressKey('ctrl+a').pressKey('delete').typeText(input, '2');
    await t.click(Selector('button[data-original-title="Update"]'));
    await t.wait(1000);
    await t.takeScreenshot('TC08-S1-pass.png', { path: 'reports/screenshots' });
});

test.meta({ scenario: 'TC08-S2' })('TC08-S2 update to 0', async t => {
    await t.click(Selector('.product-layout').nth(0).find('button').withText('Add to Cart'));
    await t.wait(1000);
    await t.click(Selector('#cart-total'));
    await t.wait(1000);
    await t.click(Selector('a').withText('View Cart'));
    await t.wait(2000);
    const input = Selector('input[name^="quantity"]').nth(0);
    await t.click(input).pressKey('ctrl+a').pressKey('delete').typeText(input, '0');
    await t.click(Selector('button[data-original-title="Update"]'));
    await t.takeScreenshot('TC08-S2-warning.png', { path: 'reports/screenshots' });
});

test.meta({ scenario: 'TC08-S3' })('TC08-S3 update to huge number', async t => {
    await t.click(Selector('.product-layout').nth(0).find('button').withText('Add to Cart'));
    await t.wait(1000);
    await t.click(Selector('#cart-total'));
    await t.wait(1000);
    await t.click(Selector('a').withText('View Cart'));
    await t.wait(2000);
    const input = Selector('input[name^="quantity"]').nth(0);
    await t.click(input).pressKey('ctrl+a').pressKey('delete').typeText(input, '9999');
    await t.click(Selector('button[data-original-title="Update"]'));
    await t.takeScreenshot('TC08-S3-warning.png', { path: 'reports/screenshots' });
});