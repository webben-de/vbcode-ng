#!/bin/sh

COMMIT_MSG=$1

rm -rf dist/* 
npm run build:prod 
git add . 
git commit -m "$COMMIT_MSG" 
gp