#!/bin/bash
set -e

export RESET="\e[0m \n"
export WHITE="\e[39m"
export PASS="\e[32m"
export FAIL="\e[31m"
export SKIP="\e[33m"
export PASS_BG="\e[42m"
export SKIP_BG="\e[43m"

changedPackages() {
  yarn --silent lerna ls --since 2>/dev/null
}

isChangedPackage() {
  if changedPackages | grep -q $1; then
    printf "${PASS}Package ${WHITE}\`$1\`${PASS} has been modified${RESET}"
    return 0;
  else
    printf "${SKIP}Package ${WHITE}\`$1\`${SKIP} has not been modified${RESET}"
    return 1
  fi
}

isPullRequest() {
   if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
     printf "${SKIP}This is not a pull request${RESET}"
     return 1;
   else
     printf "${PASS}This is a pull request${RESET}"
     return 0
   fi
}

shouldRunTest() {
  if isPullRequest || isChangedPackage $1; then
    printf "${PASS_BG} Running test ${RESET}"
    return 0;
  else
    printf "${SKIP_BG} Not running test ${RESET}"
    return 1;
  fi
}

shouldRunDeploy() {
  checkoutPreviousCommit() {
    git checkout HEAD^ -q
  }

  resetToReleaseCommit() {
    git checkout ${TRAVIS_COMMIT} -q
  }

  checkoutPreviousCommit

  if isChangedPackage $1; then
    printf "${PASS_BG} Deploying ${RESET}"
    resetToReleaseCommit
    return 0;
  else
    printf "${SKIP_BG} Not deploying ${RESET}"
    return 1;
  fi
}
