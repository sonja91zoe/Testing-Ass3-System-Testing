// Harness controls, run separately from the functional suite.
// The unrelated-error control is expected to fail with a JavaScript error.
import { Selector } from 'testcafe';

fixture('JavaScript error policy controls').page('https://opencart.abstracta.us/')
    .meta({ scope: 'harness controls' });

async function triggerImageError(t, message) {
    await t.eval(() => {
        const image = document.createElement('img');
        image.id = 'js-policy-probe';
        image.setAttribute('onload', `this.dataset.executed = 'true'; throw new ReferenceError(${JSON.stringify(errorMessage)});`);
        image.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
        document.body.appendChild(image);
    }, { dependencies: { errorMessage: message } });
    await t.expect(Selector('#js-policy-probe').getAttribute('data-executed')).eql('true');
}

test('CONTROL known PageSpeed image error is excluded', async t => {
    await triggerImageError(t, 'pagespeed is not defined');
});

test('CONTROL unrelated JavaScript error must fail', async t => {
    await triggerImageError(t, 'cart is not defined');
});
