// Author: Zunyu Zhou | F07 Add to cart
import { Selector } from 'testcafe';
import { BASE, addProduct, openCart, cartRows, quantity, expectCartCount, screenshot } from '../helpers/cart';

// Define fixture and metadata
fixture('cart add test').page(BASE).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F07' });

// Scenario 1: Add one product normally
test.meta({ scenario: 'TC07-S1' })('TC07-S1 add normal item', async t => {
    await expectCartCount(t, 0);
    await addProduct(t, 'MacBook', 1);
    await openCart(t);
    // Verify 1 row exists, MacBook is visible, and quantity is 1
    await t.expect(cartRows.count).eql(1)
        .expect(cartRows.find('a').withExactText('MacBook').visible).ok()
        .expect(quantity.value).eql('1');
    await screenshot(t, 'TC07-S1-pass');
});

// Scenario 2: Add a second different product
test.meta({ scenario: 'TC07-S2' })('TC07-S2 add second item', async t => {
    await expectCartCount(t, 0);
    await addProduct(t, 'MacBook', 1);
    await addProduct(t, 'iPhone', 2);
    await openCart(t);
    await t.expect(cartRows.count).eql(2);
    // Verify both products are visible in the cart
    for (const name of ['MacBook', 'iPhone'])
        await t.expect(cartRows.find('a').withExactText(name).visible).ok();
    await screenshot(t, 'TC07-S2-pass');
});

// Scenario 3: Add product from the detail page
test.meta({ scenario: 'TC07-S3' })('TC07-S3 add from detail page', async t => {
    await expectCartCount(t, 0);
     // Click product name to go to detail page, verify title, then add to cart
    await t.click(Selector('#content .product-layout h4 a').withExactText('MacBook'))
        .expect(Selector('#content h1').innerText).eql('MacBook')
        .click('#button-cart');
    await expectCartCount(t, 1);
    await openCart(t);
     // Verify MacBook is in the cart
    await t.expect(cartRows.count).eql(1)
        .expect(cartRows.find('a').withExactText('MacBook').visible).ok()
        .expect(quantity.value).eql('1');
    await screenshot(t, 'TC07-S3-pass');
});
