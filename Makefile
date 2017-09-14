# Test all the packages in test mode
test:
	GO_ENV=test go test ./...

.PHONY: test
