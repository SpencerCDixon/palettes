# Test all the packages in test mode
test:
	GO_ENV=test go test ./...

# Dev starts up the server in development mode
dev:
	GO_ENV=development go run main.go server

# Deploy deploys both the API and the React UI
deploy:
	@echo "Deploying API"
	@up
	@echo "Deploying UI"
	@cd ui && npm run deploy

# Clean removes the Go binary and built JS
clean:
	@rm ./palettes
	@cd ui && npm run clean

# Build compiles the go API
build:
	@echo "Building palettes..."
	@go build 

.PHONY: test dev deploy build
