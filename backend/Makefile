.PHONY: test tests lint check dev

test:
	npm run test

tests: test

lint:
	npm run lint

check: lint test

dev:
	npm run dev

deploy:
	@echo "1. Building frontend..."
	cd ../frontend && npm install && npm run build
	@echo "2. Copying frontend build to backend/public..."
	rm -rf public
	mkdir public
	cp -r ../frontend/index.html public/
	cp -r ../frontend/css public/
	cp -r ../frontend/dist public/
	@echo "3. Deploying to Cloud Run..."
	gcloud run deploy luzmo-app --source . --allow-unauthenticated --service-account=luzmo-deployer@leonardosouza.iam.gserviceaccount.com
