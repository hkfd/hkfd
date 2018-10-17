#!/bin/bash
set -e

git config --global user.email "44237005+hkfd-ci@users.noreply.github.com"
git config --global user.name "Hkfd CI"

git checkout master
git reset --hard

git remote add release https://${GH_ACCESS_TOKEN}@github.com/hkfd/hkfd.git
lerna version --yes --git-remote release
