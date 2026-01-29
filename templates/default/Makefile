.PHONY: dev prod install clean help

# Default target
help:
	@echo "Usage:"
	@echo "  make dev   - Switch to development mode (uses local @jet-w/astro-blog)"
	@echo "  make prod  - Switch to production mode (uses npm package @jet-w/astro-blog)"
	@echo "  make install - Run npm install after switching modes"
	@echo "  make clean - Remove node_modules and package-lock.json"

# Switch to development mode (local package)
dev:
	@echo "Switching to development mode..."
	@cp package.dev.json package.json
	@echo "Done! Run 'make install' or 'npm install' to install dependencies."

# Switch to production mode (npm package)
prod:
	@echo "Switching to production mode..."
	@cp package.prod.json package.json
	@echo "Done! Run 'make install' or 'npm install' to install dependencies."

# Install dependencies
install:
	npm install

# Clean node_modules and package-lock.json
clean:
	@echo "Cleaning..."
	@rm -rf node_modules package-lock.json
	@echo "Done!"

# Switch to dev and install
dev-install: dev install

# Switch to prod and install
prod-install: prod install
