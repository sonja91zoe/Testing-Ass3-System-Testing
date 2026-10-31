const { test } = require('node:test');
const assert = require('node:assert/strict');
const { isKnownPagespeedError } = require('./js-error-policy.cjs');

const known = {
    message: 'pagespeed is not defined',
    stack: 'ReferenceError: pagespeed is not defined\n    at HTMLImageElement.onload (https://opencart.abstracta.us/:1:1)',
    pageUrl: 'https://opencart.abstracta.us/'
};

test('accepts the recorded PageSpeed image callback error', () => {
    assert.equal(isKnownPagespeedError(known), true);
    assert.equal(isKnownPagespeedError({ ...known, pageUrl: 'https://opencart.abstracta.us:443/index.php?route=checkout/cart' }), true);
});

test('does not hide other JavaScript failures or PageSpeed failures outside the image callback', () => {
    for (const overrides of [
        { message: 'cart is not defined' },
        { message: 'pagespeed.CriticalImages is not a function' },
        { stack: 'ReferenceError: pagespeed is not defined\n    at addToCart (https://opencart.abstracta.us/:1:1)' },
        { stack: '' }
    ]) assert.equal(isKnownPagespeedError({ ...known, ...overrides }), false);
});

test('does not exclude errors on other origins or invalid URLs', () => {
    for (const pageUrl of [
        'https://example.com/', 'http://opencart.abstracta.us/',
        'https://opencart.abstracta.us.example.com/',
        'https://opencart.abstracta.us:444/', '', undefined
    ]) assert.equal(isKnownPagespeedError({ ...known, pageUrl }), false);
});
