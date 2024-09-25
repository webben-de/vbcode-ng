#!/bin/sh

COMMIT_MSG=$1

git add . 
git commit -m "$COMMIT_MSG" 
git add . 

rm -rf dist/* 
npm run build:prod 
git add .
git commit -m "chore: prod files"

git push