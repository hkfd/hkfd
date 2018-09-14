#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  ENVIRONMENT=staging lerna run build:ssr --scope=$PACKAGE
  lerna run test:server --scope=$PACKAGE --stream
fi
