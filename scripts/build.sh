#!/bin/bash
set -e
source ./scripts/angular/.env
source ./scripts/helpers.sh

if shouldRunTest $PACKAGE; then
  ENVIRONMENT=staging yarn --cwd packages/$PACKAGE build:ssr
fi
