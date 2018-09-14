#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  lerna run e2e --scope=$PACKAGE -- --protractor-config=protractor-ci.conf.js
fi
