#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  lerna run test:browser --scope=$PACKAGE -- --progress=false --browsers=HeadlessChromeNoSandbox --code-coverage
  cat packages/$PACKAGE/coverage/lcov.info | yarn coveralls
fi
