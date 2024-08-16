stg:
	rm -rf build
	npm run build:stage
	firebase use bigc-run-together-stg
	firebase deploy --only hosting:bigc-run-together-stg

prod:
	rm -rf build
	npm run build:prod
	firebase use bigc-run-together-prod
	firebase deploy --only hosting:bigc-run-together-prod
