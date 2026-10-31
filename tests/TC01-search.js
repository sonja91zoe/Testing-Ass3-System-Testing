// Author: Aimee Tai-Yun Shih | F01 Product search | TC01
import { Selector } from 'testcafe';
import { BASE, cards, names, search, screenshot, url } from '../helpers/catalogue-aimee';
import { recordSearchFeedback } from '../helpers/search-feedback';
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
test.meta({ scenario: 'TC01-S02', scope: 'Functional empty search; wording audited separately' })('TC01-S02 Show an empty result for an unknown keyword', async t => {
    const keyword = 'AimeeNoSuchProduct739281';
    await search(t, keyword);
    const feedback = Selector('#content > h2 + p');
    await t.expect(url()).contains('route=product/search')
        .expect(Selector('#input-search').value).eql(keyword)
        .expect(cards.count).eql(0)
        .expect(Selector('#content a').withAttribute('href', /route=product\/product/).count).eql(0)
        .expect(feedback.visible).ok()
        .expect(feedback.innerText).match(/\S/);
    recordSearchFeedback(await feedback.innerText, keyword);
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
