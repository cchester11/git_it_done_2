module.exports = {
    "plugins": [ 
        "jquery" 
    ],
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true
    },
    "extends": "eslint:recommended",
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest"
    },
    "rules": {
        "no-duplicate-imports": ["warn", {"includeExports": true}]
    }
}
