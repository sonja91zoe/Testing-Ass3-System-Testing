// Author: Zunyu Zhou | F08 Update cart
import { Selector } from 'testcafe';
import { BASE, cartRows, quantity, prepareCart, updateQuantity, expectCartCount, expectEmptyCart, screenshot } from '../helpers/cart';

// Define fixture and metadata
fixture('cart update test').page(BASE).meta({ tester: 'Zunyu Zhou', member: 'Jes2605', function: 'F08' });

// Scenario 1: Update quantity to a valid number (2)
test.meta({ scenario: 'TC08-S1' })('TC08-S1 update to 2', async t => {
    await prepareCart(t);
    // Get the unit price and verify it is a valid positive number
    const unitPrice = Number((await cartRows.find('td').nth(4).innerText).replace(/[^0-9.]/g, ''));
    await t.expect(Number.isFinite(unitPrice) && unitPrice > 0).ok();
    await updateQuantity(t, 2);
    await t.expect(quantity.value).eql('2');
    await expectCartCount(t, 2);
    // Verify the line total is correctly calculated (unit price * 2)
    const lineTotal = Number((await cartRows.find('td').nth(5).innerText).replace(/[^0-9.]/g, ''));
    await t.expect(lineTotal).eql(unitPrice * 2);
    await screenshot(t, 'TC08-S1-pass');
});

// Scenario 2: Update quantity to 0 (Invalid input)
test.meta({ scenario: 'TC08-S2' })('TC08-S2 update to 0', async t => {
    await prepareCart(t);
    await updateQuantity(t, 0);// Try to set quantity to 0
    await expectEmptyCart(t);// Verify system removes the item and shows empty cart
    await screenshot(t, 'TC08-S2-warning');
});

// Scenario 3: Update quantity to an over-stock number (9999)
test.meta({ scenario: 'TC08-S3' })('TC08-S3 update to huge number', async t => {
    await prepareCart(t);
    await updateQuantity(t, 9999);// Try to set quantity to 9999
     // Verify input value and check for out-of-stock warning message
    await t.expect(quantity.value).eql('9999')
        .expect(Selector('.alert-danger').innerText).contains('not available in the desired quantity or not in stock');
    await expectCartCount(t, 9999);
    await screenshot(t, 'TC08-S3-warning');
});
