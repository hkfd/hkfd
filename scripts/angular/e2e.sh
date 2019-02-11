#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  yarn webdriver-manager update --standalone false --gecko false --versions.chrome 2.37
  yarn --cwd packages/$PACKAGE start-server-and-test serve:ssr http://localhost:4000 e2e:ci
fi
