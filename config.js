const ROOT = '.';

module.exports = {
	path: {
		root: `/${ROOT}`,
		dev: {
			index: `${ROOT}/src/`,
			script: `${ROOT}/src/js/`,
			style: `${ROOT}/src/scss/`
		},
		prod: {
			index: `${ROOT}/dist/`,
			script: `${ROOT}/dist/js/`,
			style: `${ROOT}/dist/css/`
		},
	}
};