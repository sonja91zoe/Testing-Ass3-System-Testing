// Author: Aimee Tai-Yun Shih | F02 Product sorting | TC02
import { Selector, ClientFunction } from 'testcafe';
import { searchUrl, cards, names, screenshot, url } from '../../helpers/catalogue-aimee';
const prices = ClientFunction(() => Array.from(document.querySelectorAll('#content .product-layout .price')).map(e => {
    const sale = e.querySelector('.price-new');
    const text = sale ? sale.textContent : e.firstChild.textContent;
    return Number(text.replace(/[^0-9.]/g, ''));
}));
fixture('Aimee TC02 Product sorting').page(searchUrl).meta({ tester: 'Aimee Tai-Yun Shih', member: 'Aimee', function: 'F02' });
const original = ['iMac', 'MacBook', 'MacBook Air', 'MacBook Pro'];
for (const [id, label, sort, order] of [
    ['TC02-S01', 'Price (Low > High)', 'p.price', 'ASC'],
    ['TC02-S02', 'Price (High > Low)', 'p.price', 'DESC'],
    ['TC02-S03', 'Name (A - Z)', 'pd.name', 'ASC']
]) {
    test.meta({ scenario: id })(`${id} ${label}`, async t => {
        await t.expect(cards.count).eql(4);
        await t.click('#input-sort').click(Selector('#input-sort option').withExactText(label));
        await t.expect(url()).contains(`sort=${sort}`);
        await t.expect(url()).contains(`order=${order}`);
        await t.expect(Selector('#input-sort option:checked').innerText).eql(label);
        const displayedNames = await names();
        // Check membership as well as ordering: empty, missing or duplicate results cannot pass.
        await t.expect([...displayedNames].sort()).eql([...original].sort());
        if (sort === 'p.price') {
            const displayed = await prices();
            await t.expect(displayed.every(Number.isFinite)).ok();
            await t.expect(new Set(displayed).size).gt(1);
            await t.expect(displayed).eql([...displayed].sort((a, b) => order === 'ASC' ? a - b : b - a));
        } else {
            await t.expect(displayedNames).eql(original);
        }
        await screenshot(t, id);
    });
}
