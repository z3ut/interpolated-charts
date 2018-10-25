module.exports = {
    "extends": "eslint:recommended",
    "plugins": [
        "import"
    ],
    "env": {
        'es6': true,
        'browser': true,
        'commonjs': true
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "modules": true
        }
    },
    "rules": {
        "eqeqeq": 1,
        "quotes": [2, "single"],
        "no-warning-comments": [1, {
            "terms": ["TODO"],
            "location": "anywhere"
        }],
        "no-console": "off",
        "prefer-const": 1
    }
};
