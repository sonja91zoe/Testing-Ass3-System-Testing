#!/bin/zsh
# Double-click in Finder to run the installed project in the user's Terminal.
cd -- "$(dirname -- "$0")" || exit 2
TASK_NODE="$(command -v node)"
if [[ -z "$TASK_NODE" && -x /Users/xuyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node ]]; then
  TASK_NODE=/Users/xuyang/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node
fi
if [[ -z "$TASK_NODE" ]]; then
  print 'Install Node.js, run npm install in this directory, then try again.'
  read -r '?Press Enter to close.'
  exit 2
fi
"$TASK_NODE" scripts/run.cjs
TASK_STATUS=$?
print "TestCafe exit code: $TASK_STATUS"
read -r '?Press Enter to close.'
exit "$TASK_STATUS"
