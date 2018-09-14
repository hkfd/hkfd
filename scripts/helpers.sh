#!/bin/bash
set -e

RESET="\e[0m \n"
NORMAL="\e[22m"
BOLD="\e[1m"
BLACK="\e[30m"
WHITE="\e[39m"
GREY="\e[37m"
GREEN="\e[32m"
GREY_BG="\e[47m"
GREEN_BG="\e[42m"

changedPackages() {
  lerna ls --since 2>/dev/null
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
