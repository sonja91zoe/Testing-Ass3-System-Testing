import { Selector } from 'testcafe';
const site = 'https://opencart.abstracta.us/';
fixture('cart remove test').page(site).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F09' });

test.meta({ scenario: 'TC09-S1' })('TC09-S1 remove item', async t => {
    await t.click(Selector('.product-layout').nth(0).find('button').withText('Add to Cart'));
    await t.wait(1000);
    await t.click(Selector('#cart-total'));
    await t.wait(1000);
    await t.click(Selector('a').withText('View Cart'));
    await t.wait(2000);
    await t.click(Selector('button[data-original-title="Remove"]'));
    await t.wait(1000);
    await t.expect(Selector('#content').innerText).contains('empty');
    await t.takeScreenshot('TC09-S1-pass.png', { path: 'reports/screenshots' });
});

test.meta({ scenario: 'TC09-S2' })('TC09-S2 remove and check total', async t => {
    await t.click(Selector('.product-layout').nth(0).find('button').withText('Add to Cart'));
    await t.wait(1000);
    await t.click(Selector('#cart-total'));
    await t.wait(1000);
    await t.click(Selector('a').withText('View Cart'));
    await t.wait(2000);
    await t.click(Selector('button[data-original-title="Remove"]'));
    await t.wait(1000);
    await t.expect(Selector('#cart-total').innerText).contains('0 item(s)');
    await t.takeScreenshot('TC09-S2-pass.png', { path: 'reports/screenshots' });
});

test.meta({ scenario: 'TC09-S3' })('TC09-S3 remove when empty', async t => {
    await t.navigateTo('https://opencart.abstracta.us/index.php?route=checkout/cart');
    await t.wait(1000);
    await t.expect(Selector('#content').innerText).contains('empty');
    await t.takeScreenshot('TC09-S3-pass.png', { path: 'reports/screenshots' });
});