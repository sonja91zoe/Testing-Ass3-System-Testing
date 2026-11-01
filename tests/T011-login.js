import { Selector } from 'testcafe';
import { route, currentRoute, ensureSeedAndSignOut, login, assertAuthenticated,
    assertGuest, loginButton, evidence } from '../helpers/account';

fixture('T011 Account login').page(route('login'))
    .meta({ member: 'D', tester: 'Xuyang Zhao', function: 'F11' });

test.meta({ scenario: 'T011-S1' })('T011-S1 Accept valid credentials', async t => {
    // If run alone, provision the same disposable account through the registration UI first.
    await ensureSeedAndSignOut(t);
    // Verify that valid credentials open the account page with authenticated controls.
    await login(t);
    // Check the account route, My Account heading, and visible logout link.
    await assertAuthenticated(t);
    // Capture the authenticated account page.
    await evidence(t, 'T011-S1');
});

test.meta({ scenario: 'T011-S2' })('T011-S2 Reject an incorrect password', async t => {
    // Use an existing account with a wrong password; verify the error and guest state.
    await ensureSeedAndSignOut(t);
    // Keep the registered email and replace only the password.
    await login(t, 'IncorrectPassword123!');
    // Confirm that the login form remains available and no logout link is present.
    await assertGuest(t);
    // Check that the page explains why authentication was rejected.
    await t.expect(Selector('.alert-danger').innerText).contains('No match for E-Mail Address and/or Password.');
    await evidence(t, 'T011-S2');
});

test.meta({ scenario: 'T011-S3' })('T011-S3 Reject blank credentials', async t => {
    // Submit the empty login form and verify that access is denied with an error.
    await t.click(loginButton);
    // Verify the guest state before checking the rejection message.
    await assertGuest(t);
    await t.expect(Selector('.alert-danger').innerText).contains('No match for E-Mail Address and/or Password.');
    // Capture the empty form and its login error.
    await evidence(t, 'T011-S3');
});
