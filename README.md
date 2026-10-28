# 32571 Enterprise Software Testing - Assignment 3


## Group Members

- Aimee Tai-Yun Shih
- Xuyang Zhao
- Member 3

## Testing Scope
Run against https://opencart.abstracta.us/ using real Chrome

Xuyang Zhao:
Three function cases: T010 registration, T011 login, T012 logout 


## Run

Install Node.js and Google Chrome, open this directory, run `npm install`, then `npm test`. 

You can also double-click `Run_TestCafe.command`. macOS may request TestCafe Browser Tools screen recording or browser automation access.

The runner executes nine scenarios serially, preserves its source snapshot, and saves timestamped original JSON results and screenshots under `reports/`. Set `BROWSER=chrome:headless` only if a real headless Chrome run is desired; the default is visible Chrome. JavaScript errors are not globally ignored.
