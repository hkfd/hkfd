#!/bin/bash
set -e
source ./scripts/email/.env
source ./scripts/helpers.sh

export FIREBASE_TOKEN="$EMAIL_FIREBASE_TOKEN"

if shouldRunDeploy $PACKAGE; then
  lerna run deploy --scope=$PACKAGE
fi
