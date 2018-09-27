#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  ENVIRONMENT=staging lerna run build:ssr --scope=$PACKAGE
  yarn --cwd packages/$PACKAGE test:server --coverage --coverageReporters=text-lcov | yarn coveralls
fi
