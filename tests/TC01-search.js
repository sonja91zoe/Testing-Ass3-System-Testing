// Author: Aimee Tai-Yun Shih | F01 Product search | TC01
import { Selector } from 'testcafe';
import { BASE, cards, names, search, screenshot, url } from '../helpers/catalogue-aimee';
fixture('Aimee TC01 Product search').page(BASE).meta({ tester: 'Aimee Tai-Yun Shih', member: 'Aimee', function: 'F01' });
test.meta({ scenario: 'TC01-S01' })('TC01-S01 Find MacBook products', async t => {
    await search(t, 'MacBook');
    await t.expect(cards.count).eql(3);
    await t.expect(names()).eql(['MacBook', 'MacBook Air', 'MacBook Pro']);
    await screenshot(t, 'TC01-S01-results');
    await t.click(cards.find('h4 a').withExactText('MacBook'));
    await t.expect(Selector('#content h1').innerText).eql('MacBook');
    await t.expect(url()).contains('product_id=43');
    await screenshot(t, 'TC01-S01-detail');
});
test.meta({ scenario: 'TC01-S02' })('TC01-S02 Show an empty result for an unknown keyword', async t => {
    await search(t, 'AimeeNoSuchProduct739281');
    await t.expect(cards.count).eql(0);
    await t.expect(Selector('#content').innerText).contains('There is no product that matches the search criteria.');
    await screenshot(t, 'TC01-S02');
});
test.meta({ scenario: 'TC01-S03' })('TC01-S03 Replace MacBook results with iPhone results', async t => {
    await search(t, 'MacBook');
    await t.expect(cards.count).eql(3);
    await search(t, 'iPhone');
    await t.expect(names()).eql(['iPhone']);
    await t.expect(Selector('#input-search').value).eql('iPhone');
    await screenshot(t, 'TC01-S03');
});
