#!/bin/bash
set -e
source ./scripts/api/.env
source ./scripts/helpers.sh

export FIREBASE_TOKEN="$API_FIREBASE_TOKEN"

if shouldRunDeploy $PACKAGE; then
  lerna run deploy --scope=$PACKAGE
fi
