module.exports = {
	"husky": {
		"hooks": {
			"commit-msg": "commitlint -E HUSKY_GIT_PARAMS",
			"pre-commit": "lint-staged",
			"pre-push": "npm run test"
		}
	}
}
