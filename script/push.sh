#!/bin/sh

currentBranch=`git rev-parse --abbrev-ref HEAD`
message=`date "+%Y-%m-%d %H:%M:%S"`

git add .
git commit -m "${message}"
git push origin ${currentBranch}