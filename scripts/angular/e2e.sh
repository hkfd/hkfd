#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  yarn --cwd packages/$PACKAGE e2e --protractor-config=protractor-ci.conf.js
fi
