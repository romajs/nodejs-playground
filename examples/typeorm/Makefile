#!make
-include .env
export $(shell sed 's/=.*//' .env)
export PATH := ./node_modules/.bin:$(PATH)

# development node
run:
	ts-node-dev --respawn --transpile-only ./src/index.ts

install:
	npm install

run-migration:
	ts-node ./node_modules/typeorm/cli.js migration:run

revert-migration:
	ts-node ./node_modules/typeorm/cli.js migration:revert
