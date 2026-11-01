// Author: Zunyu Zhou | F09 Remove from cart
import { BASE, cartRows, prepareCart, removeProduct, expectEmptyCart, screenshot } from '../helpers/cart';

// Define fixture and metadata
fixture('cart remove test').page(BASE).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F09' });

// Scenario 1: Normal item removal
test.meta({ scenario: 'TC09-S1' })('TC09-S1 remove item', async t => {
    await prepareCart(t);
    await removeProduct(t);
    await expectEmptyCart(t);
    await screenshot(t, 'TC09-S1-pass');
});

// Scenario 2: Verify remove button disappears after removal
test.meta({ scenario: 'TC09-S2' })('TC09-S2 remove and check total', async t => {
    await prepareCart(t);
    await removeProduct(t);
    await expectEmptyCart(t); 
    // Verify the remove button no longer exists
    await t.expect(cartRows.find('button').withAttribute('onclick', /cart\.remove\(/).exists).notOk();
    await screenshot(t, 'TC09-S2-pass');
});

// Scenario 3: Access empty cart directly
test.meta({ scenario: 'TC09-S3' })('TC09-S3 remove when empty', async t => {
    // Navigate directly to the empty cart page
    await t.navigateTo(`${BASE}index.php?route=checkout/cart`);
    await expectEmptyCart(t);
    // Verify no remove button exists
    await t.expect(cartRows.find('button').withAttribute('onclick', /cart\.remove\(/).exists).notOk();
    await screenshot(t, 'TC09-S3-pass');
});
