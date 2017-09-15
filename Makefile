# Test all the packages in test mode
test:
	GO_ENV=test go test ./...

# Dev starts up the server in development mode
dev:
	GO_ENV=development go run main.go server

# Deploy deploys both the API and the React UI
deploy:
	@echo "Deploying API"
	up
	@cho "Deploying UI"
	cd ui && npm run deploy

.PHONY: test dev deploy
