# 32571 Enterprise Software Testing - Assignment 3


## Group Members

- Aimee Tai-Yun Shih
- Xuyang Zhao
- Zunyu Zhou


## Testing Scope
Run against https://opencart.abstracta.us/ using real Chrome

Xuyang Zhao: T010 registration, T011 login, T012 logout

Aimee Tai-Yun Shih: TC01 product search, TC02 product sorting, TC03 product comparison

Zunyu Zhou: TC07 add to cart, TC08 update cart, TC09 remove cart

## Run

Install Node.js and Google Chrome, open this directory, run `npm install`, then `npm test`.

You can also double-click `Run_TestCafe.command`. macOS may request TestCafe Browser Tools screen recording or browser automation access.

## Run all tests

After installing dependencies, run:

```sh
npm test
```

If Node.js is available without npm and dependencies are already installed:

```sh
node scripts/run.cjs
```


To rerun selected files, pass paths or quoted globs after `--`:

```sh
BROWSER=chrome:headless npm test -- 'tests/TC0[789]-*.js'
```
