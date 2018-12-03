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

yarn config set version-tag-prefix "apps-skd-v"
yarn build;
yarn version --new-version --${1};

git push;
git push --tags;
yarn publish;