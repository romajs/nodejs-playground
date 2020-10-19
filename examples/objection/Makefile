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

db: db_up db_migrate db_seed

db_up:
	docker-compose up -d db

db_migrate: db_wait
	knex --knexfile ./knexfile.ts migrate:latest

db_rollback: db_wait
	knex --knexfile ./knexfile.ts migrate:rollback

db_seed: db_wait
	knex --knexfile ./knexfile.ts seed:run

db_wait:
	wait-on tcp:$(DB_PORT) -v

clear:
	rm -rf build
	docker-compose down

reset_migration: db_wait
	db_rollback
	db_migrate
