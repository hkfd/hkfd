#!/bin/bash
set -e
source ./scripts/helpers.sh

lintCommitMessage() {
  if echo "$(eval $COMMIT_MESSAGE)" | yarn commitlint; then
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

shouldRunLint() {
  if ! isReleaseCommit; then
    printf "${PASS_BG} Running lint ${RESET}"
    return 0;
  else
    printf "${SKIP_BG} Not running lint ${RESET}"
    return 1;
  fi
}

if shouldRunLint; then
  lint_functions=(
    lintCommitMessage
    lintPackageAngular
    lintPackageApi
    lintPackageEmail
  )

  for test in "${lint_functions[@]}"; do
    $test
  done
fi
