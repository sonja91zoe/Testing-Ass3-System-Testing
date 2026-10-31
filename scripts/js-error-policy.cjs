// This demo's optional PageSpeed image beacon can execute without its global.
// Keep the exception narrow: other sites, errors and call sites must still fail.
function isKnownPagespeedError({ message, stack, pageUrl }) {
    if (!/^(?:(?:Uncaught )?ReferenceError:\s*)?pagespeed is not defined$/.test(message || ''))
        return false;
    if (!/(?:^|\n)\s*at HTMLImageElement\.onload\s*\(/.test(stack || ''))
        return false;
    try {
        return new URL(pageUrl).origin === 'https://opencart.abstracta.us';
    } catch {
        return false;
    }
}

module.exports = { isKnownPagespeedError };
