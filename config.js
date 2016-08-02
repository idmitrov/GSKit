var DS = '/',
	ROOT = '.';

module.exports = {
	path: {
		root: DS + ROOT, 
		dev: {
			index: ROOT + DS + 'src' + DS,
			script: ROOT + DS + 'src' + DS + 'js' + DS,
			style: ROOT + DS + 'src' + DS + 'scss' + DS
		},
		prod: {
			index: ROOT + DS + 'public' + DS,
			script: ROOT + DS + 'public' + DS + 'js' + DS,
			style: ROOT + DS + 'public' + DS + 'css' + DS,
		}
	}
};