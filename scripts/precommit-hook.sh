#!/usr/bin/env bash
BRANCH_NAME=`git rev-parse --abbrev-ref HEAD`

# if there is only one file changing
if [ "$BRANCH_NAME" != "master" ]; then
  # append it to $1 - the file containing the commit message
  echo " [ci skip]" >> $1
fi
