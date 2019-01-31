#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  yarn --cwd packages/$PACKAGE test:browser --coverage --maxWorkers=2
  bash <(curl -s https://codecov.io/bash)
fi
