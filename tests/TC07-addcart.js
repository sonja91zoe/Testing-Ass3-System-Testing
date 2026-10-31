// Author: Zunyu Zhou | F07 Add to cart
import { Selector } from 'testcafe';
import { BASE, addProduct, openCart, cartRows, quantity, expectCartCount, screenshot } from '../helpers/cart';

fixture('cart add test').page(BASE).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F07' });

test.meta({ scenario: 'TC07-S1' })('TC07-S1 add normal item', async t => {
    await expectCartCount(t, 0);
    await addProduct(t, 'MacBook', 1);
    await openCart(t);
    await t.expect(cartRows.count).eql(1)
        .expect(cartRows.find('a').withExactText('MacBook').visible).ok()
        .expect(quantity.value).eql('1');
    await screenshot(t, 'TC07-S1-pass');
});

test.meta({ scenario: 'TC07-S2' })('TC07-S2 add second item', async t => {
    await expectCartCount(t, 0);
    await addProduct(t, 'MacBook', 1);
    await addProduct(t, 'iPhone', 2);
    await openCart(t);
    await t.expect(cartRows.count).eql(2);
    for (const name of ['MacBook', 'iPhone'])
        await t.expect(cartRows.find('a').withExactText(name).visible).ok();
    await screenshot(t, 'TC07-S2-pass');
});

test.meta({ scenario: 'TC07-S3' })('TC07-S3 add from detail page', async t => {
    await expectCartCount(t, 0);
    await t.click(Selector('#content .product-layout h4 a').withExactText('MacBook'))
        .expect(Selector('#content h1').innerText).eql('MacBook')
        .click('#button-cart');
    await expectCartCount(t, 1);
    await openCart(t);
    await t.expect(cartRows.count).eql(1)
        .expect(cartRows.find('a').withExactText('MacBook').visible).ok()
        .expect(quantity.value).eql('1');
    await screenshot(t, 'TC07-S3-pass');
});
