import { Selector } from 'testcafe';
const site = 'https://opencart.abstracta.us/';
fixture('cart add test').page(site).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F07' });

test.meta({ scenario: 'TC07-S1' })('TC07-S1 add normal item', async t => {
    const btn = Selector('.product-layout').nth(0).find('button').withText('Add to Cart');
    await t.click(btn);
    const box = Selector('#cart-total');
    await t.expect(box.innerText).contains('1 item(s)');
    await t.takeScreenshot('TC07-S1-pass.png', { path: 'reports/screenshots' });
});

test.meta({ scenario: 'TC07-S2' })('TC07-S2 add second item', async t => {
    const btn1 = Selector('.product-layout').nth(0).find('button').withText('Add to Cart');
    await t.click(btn1);
    const btn2 = Selector('.product-layout').nth(1).find('button').withText('Add to Cart');
    await t.click(btn2);
    const box = Selector('#cart-total');
    await t.expect(box.innerText).contains('2 item(s)');
    await t.takeScreenshot('TC07-S2-pass.png', { path: 'reports/screenshots' });
});

test.meta({ scenario: 'TC07-S3' })('TC07-S3 add from detail page', async t => {
    await t.click(Selector('.product-layout').nth(0).find('h4 a'));
    await t.click(Selector('#button-cart'));
    const box = Selector('#cart-total');
    await t.expect(box.innerText).contains('1 item(s)');
    await t.takeScreenshot('TC07-S3-pass.png', { path: 'reports/screenshots' });
});