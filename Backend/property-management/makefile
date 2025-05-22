# Simple Makefile for Gradle tasks using gradlew

GRADLEW=./gradlew

.PHONY: all build clean run stop refresh

all: build

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

