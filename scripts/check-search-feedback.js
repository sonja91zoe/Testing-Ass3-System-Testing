// Standalone content audit: retains the original feedback expectation.
import { Selector } from 'testcafe';
import { BASE, cards, search, screenshot } from '../helpers/catalogue-aimee';
import { expectedEmptyFeedback, recordSearchFeedback } from '../helpers/search-feedback';

fixture('Empty-search feedback audit').page(BASE)
    .meta({ tester: 'Aimee Tai-Yun Shih', member: 'Aimee', function: 'F01', scope: 'content audit' });

test.meta({ scenario: 'TC01-S02-feedback', defect: 'SEARCH-EMPTY-FEEDBACK' })
('TC01-S02-feedback Show correct no-match feedback', async t => {
    const keyword = 'AimeeNoSuchProduct739281';
    await search(t, keyword);
    await t.expect(cards.count).eql(0);
    const feedback = Selector('#content > h2 + p');
    recordSearchFeedback(await feedback.innerText, keyword);
    await screenshot(t, 'TC01-S02-feedback');
    await t.expect(feedback.innerText).contains(expectedEmptyFeedback);
});
