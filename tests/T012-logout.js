import { Selector } from 'testcafe';
import { route, signIn, logout, login, assertGuest, assertAuthenticated,
    currentRoute, evidence } from '../helpers/account';

fixture('T012 Account logout').page(route('login'))
    .meta({ member: 'D', tester: 'Xuyang Zhao', function: 'F12' });

test.meta({ scenario: 'T012-S1' })('T012-S1 End an authenticated session', async t => {
    await signIn(t);
    await logout(t);
    await t.click(Selector('#content a').withText('Continue'))
        .expect(currentRoute()).eql('common/home');
    await t.navigateTo(route('account'));
    await assertGuest(t);
    await evidence(t, 'T012-S1');
});

test.meta({ scenario: 'T012-S2' })('T012-S2 Deny protected profile access after logout', async t => {
    await signIn(t);
    await logout(t);
    await t.navigateTo(route('edit'));
    await assertGuest(t);
    await t.expect(Selector('#input-firstname').exists).notOk();
    await evidence(t, 'T012-S2');
});

test.meta({ scenario: 'T012-S3' })('T012-S3 Allow a new login and another logout', async t => {
    await signIn(t);
    await logout(t);
    await login(t);
    await assertAuthenticated(t);
    await logout(t);
    await t.navigateTo(route('account'));
    await assertGuest(t);
    await evidence(t, 'T012-S3');
});
