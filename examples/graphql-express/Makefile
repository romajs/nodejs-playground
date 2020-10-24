#!make
-include .env
export $(shell sed 's/=.*//' .env)
export PATH := ./node_modules/.bin:$(PATH)

# development node
run:
	nodemon index.js
