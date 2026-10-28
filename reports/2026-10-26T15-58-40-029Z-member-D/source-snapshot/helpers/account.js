import { Selector, ClientFunction } from 'testcafe';
import crypto from 'crypto';

export const BASE = process.env.BASE_URL || 'https://opencart.abstracta.us/';
export const route = name => `${BASE}index.php?route=account/${name}`;
export const currentRoute = ClientFunction(() => new URL(location.href).searchParams.get('route'));
export const content = Selector('#content');
export const loginButton = Selector('#content input[type="submit"][value="Login"]');
export const registerButton = Selector('#content input[type="submit"][value="Continue"]');
export const logoutLink = Selector('#column-right a').withAttribute('href', /route=account\/logout/);

// Disposable demo credentials are generated for this run, never taken from a personal account.
const suffix = process.env.ACCOUNT_RUN_ID || `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
export const account = {
    email: `a3.xuyang.${suffix}@example.invalid`,
    password: `A3!${crypto.randomBytes(9).toString('hex')}`
};
let seedCreated = false;

export async function fillRegistration(t, overrides = {}) {
    const data = { firstname: 'Account', lastname: 'Test', email: account.email,
        telephone: '900000000', password: account.password, confirm: account.password, ...overrides };
    for (const [name, value] of Object.entries(data)) {
        const field = Selector(`#input-${name}`);
        await t.selectText(field).pressKey('delete');
        if (value) await t.typeText(field, value);
    }
    // Do not subscribe the test identity to newsletters.
    await t.click(Selector('input[name="newsletter"][value="0"]'))
        .click(Selector('input[name="agree"]'));
}

export async function assertAuthenticated(t) {
    await t.expect(currentRoute()).eql('account/account')
        .expect(content.find('h2').withText('My Account').visible).ok()
        .expect(logoutLink.visible).ok();
}

export async function createSeed(t) {
    await t.navigateTo(route('register'));
    await fillRegistration(t);
    await t.click(registerButton)
        .expect(currentRoute()).eql('account/success');
    // The success route establishes provisioning even if a later content assertion fails.
    seedCreated = true;
    await t.expect(content.innerText).contains('Your new account has been successfully created!')
        .expect(logoutLink.visible).ok();
}

export async function login(t, password = account.password) {
    await t.navigateTo(route('login'))
        .typeText('#input-email', account.email)
        .typeText('#input-password', password)
        .click(loginButton);
}

export async function logout(t) {
    // Activate the actual logout link; do not manufacture cookies or authentication state.
    await t.click(logoutLink)
        .expect(currentRoute()).eql('account/logout')
        .expect(content.innerText).contains('You have been logged off your account.');
}

export async function ensureSeedAndSignOut(t) {
    if (!seedCreated) await createSeed(t);
    else { await login(t); await assertAuthenticated(t); }
    await t.navigateTo(route('account'));
    await assertAuthenticated(t);
    await logout(t);
}

export async function signIn(t) {
    if (!seedCreated) { await createSeed(t); await t.navigateTo(route('account')); }
    else await login(t);
    await assertAuthenticated(t);
}

export async function assertGuest(t) {
    await t.expect(currentRoute()).eql('account/login')
        .expect(Selector('#input-email').visible).ok()
        .expect(loginButton.visible).ok()
        .expect(logoutLink.exists).notOk();
}

export const evidence = (t, id) => t.takeScreenshot({ path: `${id}.png`, fullPage: true });
