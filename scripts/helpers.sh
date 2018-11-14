#!/bin/bash
set -e

export RESET="\e[0m \n"
export NORMAL="\e[22m"
export BOLD="\e[1m"
export BLACK="\e[30m"
export WHITE="\e[39m"
export GREY="\e[37m"
export GREEN="\e[32m"
export RED="\e[31m"
export GREY_BG="\e[47m"
export GREEN_BG="\e[42m"

changedPackages() {
  yarn --silent lerna ls --since 2>/dev/null
}

isChangedPackage() {
  if changedPackages | grep -q $1; then
    printf "${GREEN}Package ${BOLD}${WHITE}\`$1\`${NORMAL}${GREEN} has been modified${RESET}"
    return 0;
  else
    printf "${GREY}Package ${BOLD}\`$1\`${NORMAL} has not been modified${RESET}"
    return 1
  fi
}

isPullRequest() {
   if [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
     printf "${GREY}This is not a pull request${RESET}"
     return 1;
   else
     printf "${GREEN}This is a pull request${RESET}"
     return 0
   fi
}

shouldRunTest() {
  if isPullRequest || isChangedPackage $1; then
    printf "${GREEN_BG}${BOLD}${WHITE} Running test ${RESET}"
    return 0;
  else
    printf "${GREY_BG}${BOLD}${BLACK} Not running test ${RESET}"
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
    printf "${GREEN_BG}${BOLD}${WHITE} Deploying ${RESET}"
    resetToReleaseCommit
    return 0;
  else
    printf "${GREY_BG}${BOLD}${BLACK} Not deploying ${RESET}"
    return 1;
  fi
}
