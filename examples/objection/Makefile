#!make
-include .env
export $(shell sed 's/=.*//' .env)
export PATH := ./node_modules/.bin:$(PATH)

# development node
run:
	ts-node-dev --respawn --transpile-only ./src/index.ts

install:
	npm install

build:
	tsc --outDir build ./index.ts

run-migration:
	knex --knexfile ./knexfile.ts migrate:latest

revert-migration:
	knex --knexfile ./knexfile.ts migrate:rollback

seed-run:
	knex --knexfile ./knexfile.ts seed:run

clear:
	rm -rf build
