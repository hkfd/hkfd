#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  yarn webdriver-manager update --standalone false --gecko false --versions.chrome 2.37
  yarn --cwd packages/$PACKAGE e2e --protractor-config=protractor-ci.conf.js --webdriver-update=false
fi
