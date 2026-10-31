import { ClientFunction } from 'testcafe';

// Product actions scroll the page with jQuery. Clicking a link while its
// position is still moving can miss the target under native automation.
const animationsFinished = ClientFunction(() =>
    !window.jQuery || window.jQuery(':animated').length === 0);

export async function waitForAnimations(t) {
    await t.expect(animationsFinished()).ok('Page animations should finish before navigation');
}
