import { route, content, currentRoute, fillRegistration, registerButton,
    createSeed, account, evidence } from '../helpers/account';

fixture('T010 Account registration').page(route('register'))
    .meta({ member: 'D', tester: 'Xuyang Zhao', function: 'F10' });

test.meta({ scenario: 'T010-S1' })('T010-S1 Register a new account', async t => {
    await createSeed(t);
    await evidence(t, 'T010-S1');
});

test.meta({ scenario: 'T010-S2' })('T010-S2 Reject missing first name', async t => {
    await fillRegistration(t, { firstname: '', email: `missing.${account.email}` });
    await t.click(registerButton)
        .expect(currentRoute()).eql('account/register')
        .expect(content.find('.text-danger').innerText).contains('First Name must be between 1 and 32 characters!')
        .expect(content.find('#input-firstname').value).eql('');
    await evidence(t, 'T010-S2');
});

test.meta({ scenario: 'T010-S3' })('T010-S3 Reject mismatched password confirmation', async t => {
    await fillRegistration(t, { confirm: 'DifferentPassword123!', email: `mismatch.${account.email}` });
    await t.click(registerButton)
        .expect(currentRoute()).eql('account/register')
        .expect(content.find('.text-danger').innerText).contains('Password confirmation does not match password!');
    await evidence(t, 'T010-S3');
});
