import { Selector } from 'testcafe';
import { route, signIn, logout, login, assertGuest, assertAuthenticated,
    currentRoute, evidence } from '../helpers/account';

fixture('T012 Account logout').page(route('login'))
    .meta({ member: 'D', tester: 'Xuyang Zhao', function: 'F12' });

test.meta({ scenario: 'T012-S1' })('T012-S1 End an authenticated session', async t => {
    // Log out, return home, then verify that the account page requires login again
    await signIn(t);
    // Click the real logout link and verify the logout confirmation page
    await logout(t);
    // Follow Continue and confirm that it returns to the home page

    await t.click(Selector('#content a').withText('Continue'))
        .expect(currentRoute()).eql('common/home');
        
    // Revisit a protected page to confirm that the session has ended
    await t.navigateTo(route('account'));
    await assertGuest(t);
    await evidence(t, 'T012-S1');
});

test.meta({ scenario: 'T012-S2' })('T012-S2 Deny protected profile access after logout', async t => {
    // Visit the profile-edit URL after logout and verify that its form is inaccessible
    await signIn(t);
    await logout(t);

    // Open the protected URL directly rather than relying on account navigation links
    await t.navigateTo(route('edit'));
    await assertGuest(t);
    // Confirm that the profile's first-name field is absent after the redirect to login
    await t.expect(Selector('#input-firstname').exists).notOk();
    await evidence(t, 'T012-S2');
});

test.meta({ scenario: 'T012-S3' })('T012-S3 Allow a new login and another logout', async t => {
    // Verify that logging in again works and a second logout restores the guest state
    await signIn(t);
    await logout(t);

    // Reuse the valid credentials and verify that a new authenticated session can start
    await login(t);
    await assertAuthenticated(t);
    // End the new session and verify that the account page is protected again
    await logout(t);
    await t.navigateTo(route('account'));
    await assertGuest(t);

    // Save the final guest state after the second logout
    await evidence(t, 'T012-S3');
});
