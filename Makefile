.PHONY: build dev clean publish publish-dry version-patch version-minor version-major

# Load .env file if exists
ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Build the package
build:
	npm run build

# Development mode with watch
dev:
	npm run dev

# Clean build artifacts
clean:
	rm -rf dist node_modules

# Install dependencies
install:
	npm install

# Dry run publish (preview what will be published)
publish-dry:
	npm publish --dry-run --access public

# Publish to npm with token
# Usage: make publish NPM_TOKEN=your_token OTP=123456
# Or export NPM_TOKEN in your environment first
publish:
ifndef NODE_AUTH_TOKEN
	$(error NODE_AUTH_TOKEN is not set. Usage: make publish NODE_AUTH_TOKEN=your_token OTP=123456)
endif
	@echo "//registry.npmjs.org/:_authToken=$(NODE_AUTH_TOKEN)" > .npmrc
	npm run build
ifdef OTP
	npm publish --access public --otp=$(OTP)
else
	npm publish --access public
endif
	@rm -f .npmrc
	@echo "Published successfully!"

# Version bump helpers
version-patch:
	npm version patch

version-minor:
	npm version minor

version-major:
	npm version major

# Bump version and publish
# Usage: make release NPM_TOKEN=your_token VERSION=patch|minor|major OTP=123456
release:
ifndef NPM_TOKEN
	$(error NPM_TOKEN is not set. Usage: make release NPM_TOKEN=your_token VERSION=patch OTP=123456)
endif
ifndef VERSION
	$(error VERSION is not set. Usage: make release NPM_TOKEN=your_token VERSION=patch|minor|major OTP=123456)
endif
	npm version $(VERSION)
	@echo "//registry.npmjs.org/:_authToken=$(NPM_TOKEN)" > .npmrc
	npm run build
ifdef OTP
	npm publish --access public --otp=$(OTP)
else
	npm publish --access public
endif
	@rm -f .npmrc
	@echo "Released successfully!"

help:
	@echo "Available targets:"
	@echo "  build         - Build the package"
	@echo "  dev           - Development mode with watch"
	@echo "  clean         - Clean build artifacts"
	@echo "  install       - Install dependencies"
	@echo "  publish-dry   - Dry run publish (preview)"
	@echo "  publish       - Publish to npm (requires NPM_TOKEN, OTP optional)"
	@echo "  version-patch - Bump patch version"
	@echo "  version-minor - Bump minor version"
	@echo "  version-major - Bump major version"
	@echo "  release       - Bump version and publish (requires NPM_TOKEN and VERSION, OTP optional)"
	@echo ""
	@echo "NPM_TOKEN can be set via:"
	@echo "  1. .env file:  NPM_TOKEN=npm_xxxxx"
	@echo "  2. Environment: export NPM_TOKEN=npm_xxxxx"
	@echo "  3. Command line: make publish NPM_TOKEN=npm_xxxxx"
	@echo ""
	@echo "OTP (One-Time Password) for 2FA:"
	@echo "  Required if your npm account has 2FA enabled"
	@echo "  Pass via command line: make publish OTP=123456"
	@echo ""
	@echo "Usage examples:"
	@echo "  make publish"
	@echo "  make publish OTP=123456"
	@echo "  make release VERSION=patch OTP=123456"
