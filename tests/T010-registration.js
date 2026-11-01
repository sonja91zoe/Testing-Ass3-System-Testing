import { route, content, currentRoute, fillRegistration, registerButton,
    createSeed, account, evidence } from '../helpers/account';

fixture('T010 Account registration').page(route('register'))
    .meta({ member: 'D', tester: 'Xuyang Zhao', function: 'F10' });

test.meta({ scenario: 'T010-S1' })('T010-S1 Register a new account', async t => {
    // Register a disposable account and verify the success page and logged-in state.
    await createSeed(t);
    // Save a full-page screenshot as evidence of successful registration.
    await evidence(t, 'T010-S1');
});

test.meta({ scenario: 'T010-S2' })('T010-S2 Reject missing first name', async t => {
    // Leave the first name blank and verify that registration stays on the form with an error.
    await fillRegistration(t, { firstname: '', email: `missing.${account.email}` });
    // Submit the form and check the route, validation message, and unchanged blank field.
    await t.click(registerButton)
        .expect(currentRoute()).eql('account/register')
        .expect(content.find('.text-danger').innerText).contains('First Name must be between 1 and 32 characters!')
        .expect(content.find('#input-firstname').value).eql('');
    // Capture the rejected form and its validation message.
    await evidence(t, 'T010-S2');
});

test.meta({ scenario: 'T010-S3' })('T010-S3 Reject mismatched password confirmation', async t => {
    // Submit different passwords and verify the confirmation error.
    await fillRegistration(t, { confirm: 'DifferentPassword123!', email: `mismatch.${account.email}` });
    // Confirm that submission stays on registration and explains the password mismatch.
    await t.click(registerButton)
        .expect(currentRoute()).eql('account/register')
        .expect(content.find('.text-danger').innerText).contains('Password confirmation does not match password!');
    // Save the validation result for the test report.
    await evidence(t, 'T010-S3');
});
