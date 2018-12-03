module.exports = {
	"env": {
		"mocha": true,
		"node": true
	},
	"extends": "airbnb-base",
	"rules": {
		"indent": [2, "tab"],
		"no-tabs": [1, {"allowIndentationTabs": true}],
		"no-console": 0, // we're outputting stuff to the console, so we'll allow it.
	}
};
