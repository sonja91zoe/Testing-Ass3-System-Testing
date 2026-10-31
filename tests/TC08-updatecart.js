// Author: Zunyu Zhou | F08 Update cart
import { Selector } from 'testcafe';
import { BASE, cartRows, quantity, prepareCart, updateQuantity, expectCartCount, expectEmptyCart, screenshot } from '../helpers/cart';

fixture('cart update test').page(BASE).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F08' });

test.meta({ scenario: 'TC08-S1' })('TC08-S1 update to 2', async t => {
    await prepareCart(t);
    const unitPrice = Number((await cartRows.find('td').nth(4).innerText).replace(/[^0-9.]/g, ''));
    await t.expect(Number.isFinite(unitPrice) && unitPrice > 0).ok();
    await updateQuantity(t, 2);
    await t.expect(quantity.value).eql('2');
    await expectCartCount(t, 2);
    const lineTotal = Number((await cartRows.find('td').nth(5).innerText).replace(/[^0-9.]/g, ''));
    await t.expect(lineTotal).eql(unitPrice * 2);
    await screenshot(t, 'TC08-S1-pass');
});

test.meta({ scenario: 'TC08-S2' })('TC08-S2 update to 0', async t => {
    await prepareCart(t);
    await updateQuantity(t, 0);
    await expectEmptyCart(t);
    await screenshot(t, 'TC08-S2-warning');
});

test.meta({ scenario: 'TC08-S3' })('TC08-S3 update to huge number', async t => {
    await prepareCart(t);
    await updateQuantity(t, 9999);
    await t.expect(quantity.value).eql('9999')
        .expect(Selector('.alert-danger').innerText).contains('not available in the desired quantity or not in stock');
    await expectCartCount(t, 9999);
    await screenshot(t, 'TC08-S3-warning');
});
