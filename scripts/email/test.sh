#!/bin/bash
set -e
source ./scripts/email/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  yarn --cwd packages/$PACKAGE test --coverage
  bash <(curl -s https://codecov.io/bash)
fi
