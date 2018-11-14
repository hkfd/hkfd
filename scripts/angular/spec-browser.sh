#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

# if shouldRunTest $PACKAGE; then
  yarn --cwd packages/$PACKAGE test:browser --progress=false --browsers=HeadlessChromeNoSandbox --code-coverage
  cat packages/$PACKAGE/coverage/lcov.info | yarn coveralls
# fi
