#!/bin/bash
set -e
source ./scripts/email/.env
source ./scripts/helpers.sh

export FIREBASE_TOKEN="$EMAIL_FIREBASE_TOKEN"

if shouldRunDeploy $PACKAGE; then
  yarn --cwd packages/$PACKAGE deploy
fi
