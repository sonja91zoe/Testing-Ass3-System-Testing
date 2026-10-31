import { Selector, ClientFunction } from 'testcafe';
import { waitForAnimations } from './ui';

export const BASE = process.env.BASE_URL || 'https://opencart.abstracta.us/';
export const cartTotal = Selector('#cart-total');
const currentRoute = ClientFunction(() => new URL(location.href).searchParams.get('route'));
export const cartRows = Selector('#content form .table-responsive tbody tr');
export const quantity = cartRows.find('input[name^="quantity["]');
export const screenshot = (t, id) => t.takeScreenshot({ path: `${id}.png`, fullPage: true });

export async function expectCartCount(t, count) {
    await t.expect(cartTotal.innerText).match(new RegExp(`^\\s*${count} item\\(s\\) - `));
}

export async function addProduct(t, name, count) {
    const card = Selector('#content .product-layout').filter(node =>
        node.querySelector('h4 a').textContent.trim() === productName, { productName: name });
    // Identify the action independently of translated/capitalised button text.
    await t.click(card.find('button').withAttribute('onclick', /cart\.add\(/));
    await t.expect(Selector('.alert-success').innerText).contains(name);
    // Wait for the AJAX cart refresh before another add or navigation.
    await expectCartCount(t, count);
}

export async function openCart(t) {
    await waitForAnimations(t);
    // The mini-cart dropdown is replaced by a separate AJAX request after adding.
    // Use the persistent header link so a dropdown refresh cannot swallow the click.
    await t.click(Selector('#top-links a').withAttribute('href', /route=checkout\/cart(?:&|$)/));
    await t.expect(currentRoute()).eql('checkout/cart')
        .expect(cartRows.exists).ok();
}

export async function prepareCart(t) {
    await expectCartCount(t, 0);
    await addProduct(t, 'MacBook', 1);
    await openCart(t);
    await t.expect(cartRows.count).eql(1)
        .expect(cartRows.find('a').withExactText('MacBook').visible).ok()
        .expect(quantity.value).eql('1');
}

export async function updateQuantity(t, value) {
    // replace works on macOS as well as Windows/Linux; Ctrl+A does not on macOS.
    await t.typeText(quantity, String(value), { replace: true })
        .click(cartRows.find('button[type="submit"]'));
}

export async function removeProduct(t) {
    await t.click(cartRows.find('button').withAttribute('onclick', /cart\.remove\(/));
}

export async function expectEmptyCart(t) {
    await t.expect(Selector('#content').innerText).contains('Your shopping cart is empty!')
        .expect(cartRows.count).eql(0)
        .expect(quantity.exists).notOk();
    await expectCartCount(t, 0);
}
