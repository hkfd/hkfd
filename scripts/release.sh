#!/bin/bash
set -e

git checkout master
git reset --hard

eval "$(ssh-agent -s)"
openssl aes-256-cbc -K $encrypted_ba5c3ba7e694_key -iv $encrypted_ba5c3ba7e694_iv -in .travis/github_deploy.enc -out github_deploy -d
chmod 600 github_deploy
ssh-add github_deploy

git remote add release git@github.com:hkfd/hkfd.git
lerna version --force-publish --yes --git-remote release
