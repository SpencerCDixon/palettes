# Test all the packages in test mode
test:
	GO_ENV=test go test ./...

dev:
	GO_ENV=development go run main.go server

.PHONY: test
