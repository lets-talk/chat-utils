#!/bin/sh

set -e;

if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

yarn config set version-tag-prefix "@lets-talk/apps-sdk@"
yarn build;
yarn publish --new-version ${1};

git push -u origin $CIRCLE_BRANCH;
git push --tags;