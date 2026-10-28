import { Selector } from 'testcafe';
import { route, currentRoute, ensureSeedAndSignOut, login, assertAuthenticated,
    assertGuest, loginButton, evidence } from '../helpers/account';

fixture('T011 Account login').page(route('login'))
    .meta({ member: 'D', tester: 'Xuyang Zhao', function: 'F11' });

test.meta({ scenario: 'T011-S1' })('T011-S1 Accept valid credentials', async t => {
    // If run alone, provision the same disposable account through the registration UI first.
    await ensureSeedAndSignOut(t);
    await login(t);
    await assertAuthenticated(t);
    await evidence(t, 'T011-S1');
});

test.meta({ scenario: 'T011-S2' })('T011-S2 Reject an incorrect password', async t => {
    await ensureSeedAndSignOut(t);
    await login(t, 'IncorrectPassword123!');
    await assertGuest(t);
    await t.expect(Selector('.alert-danger').innerText).contains('No match for E-Mail Address and/or Password.');
    await evidence(t, 'T011-S2');
});

test.meta({ scenario: 'T011-S3' })('T011-S3 Reject blank credentials', async t => {
    await t.click(loginButton);
    await assertGuest(t);
    await t.expect(Selector('.alert-danger').innerText).contains('No match for E-Mail Address and/or Password.');
    await evidence(t, 'T011-S3');
});
