#!/bin/bash
set -e
source ./scripts/email/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  lerna run test --scope=$PACKAGE --stream
fi
