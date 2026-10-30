// Author: Aimee Tai-Yun Shih. Shared UI helpers for TC01–TC03.
import { Selector, ClientFunction } from 'testcafe';
export const BASE = 'https://opencart.abstracta.us/';
export const searchUrl = `${BASE}index.php?route=product/search&search=Mac`;
export const cards = Selector('#content .product-layout');
export const names = ClientFunction(() => Array.from(document.querySelectorAll('#content .product-layout h4 a')).map(a => a.textContent.trim()));
export const url = ClientFunction(() => location.href);
export async function search(t, query) {
    await t.typeText('#search input', query, { replace: true }).click('#search button');
    await t.expect(Selector('#content h1').innerText).eql(`Search - ${query}`);
}
export const screenshot = (t, id) => t.takeScreenshot({ path: `${id}.png`, fullPage: true });
export async function addCompare(t, name, count) {
    const card = cards.filter(node => node.querySelector('h4 a').textContent.trim() === productName, { productName: name });
    await t.click(card.find('button').withAttribute('onclick', /compare\.add/));
    await t.expect(Selector('#compare-total').innerText).contains(`(${count})`);
}
export async function openCompare(t) {
    await t.click('#compare-total');
    await t.expect(Selector('#content h1').innerText).eql('Product Comparison');
}
export const compared = Selector('#content table a').withAttribute('href', /route=product\/product/);
export async function expectCompared(t, products) {
    await t.expect(compared.count).eql(products.length);
    for (const product of products) await t.expect(compared.withExactText(product).visible).ok();
    for (const field of ['Price', 'Model', 'Brands']) {
        await t.expect(Selector('#content table').innerText).contains(field);
    }
}
