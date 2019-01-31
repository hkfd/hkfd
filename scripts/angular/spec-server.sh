#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  ENVIRONMENT=staging yarn --cwd packages/$PACKAGE build:ssr
  yarn --cwd packages/$PACKAGE test:server --coverage --maxWorkers=2
  bash <(curl -s https://codecov.io/bash)
fi
