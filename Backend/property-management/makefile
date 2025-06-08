# Simple Makefile for Gradle tasks using gradlew

GRADLEW=./gradlew

.PHONY: all build clean run stop refresh

all: clean build run

build:
	$(GRADLEW) build

clean:
	clear
	$(GRADLEW) clean

run:
	$(GRADLEW) bootRun

stop:
	$(GRADLEW) --stop

refresh:
	$(GRADLEW) build --refresh-dependencies

rebuild: clean refresh

scan: 
	$(GRADLEW) test --scan

install-lint:
	curl -sSLO https://github.com/pinterest/ktlint/releases/latest/download/ktlint && chmod a+x ktlint

lint:
	./ktlint -F "src/**/*.kt"

docker:
	docker-compose up

docker-build:
	docker-compose build

docker-flyway-info:
	docker-compose run --rm flyway info

docker-flyway-migrate:
	docker-compose run --rm flyway migrate