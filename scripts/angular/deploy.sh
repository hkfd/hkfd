#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunDeploy $PACKAGE; then
  dpl --provider=heroku --api-key=$HEROKU_API
fi
