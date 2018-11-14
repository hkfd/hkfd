#!/bin/bash
set -e
source ./scripts/helpers.sh

lintCommitMessage() {
  if commitlint-travis; then
    printf "${PASS}Commit message passed lint${RESET}"
    return 0;
  else
    printf "${FAIL}Commit message failed lint${RESET}"
    return 1
  fi
}

lintPackageAngular() {
  PACKAGE='angular';

  if ! isChangedPackage $PACKAGE; then return 0; fi;

  if yarn --cwd packages/$PACKAGE lint > /dev/null; then
    printf "${PASS}Package ${WHITE}\`${PACKAGE} \`${PASS} passed lint${RESET}"
    return 0;
  else
    printf "${FAIL}Package ${WHITE}\`${PACKAGE}\`${FAIL} failed lint${RESET}"
    return 1
  fi
}

lintPackageApi() {
  PACKAGE='api';

  if ! isChangedPackage $PACKAGE; then return 0; fi;

  if yarn --cwd packages/$PACKAGE lint > /dev/null; then
    printf "${PASS}Package ${WHITE}\`${PACKAGE} \`${PASS} passed lint${RESET}"
    return 0;
  else
    printf "${FAIL}Package ${WHITE}\`${PACKAGE}\`${FAIL} failed lint${RESET}"
    return 1
  fi
}

lintPackageEmail() {
  PACKAGE='email';

  if ! isChangedPackage $PACKAGE; then return 0; fi;

  if yarn --cwd packages/$PACKAGE/functions lint > /dev/null; then
    printf "${PASS}Package ${WHITE}\`${PACKAGE} \`${PASS} passed lint${RESET}"
    return 0;
  else
    printf "${FAIL}Package ${WHITE}\`${PACKAGE}\`${FAIL} failed lint${RESET}"
    return 1
  fi
}

lint_functions=(
  lintCommitMessage
  lintPackageAngular
  lintPackageApi
  lintPackageEmail
)

for test in "${lint_functions[@]}"; do
  $test
done
