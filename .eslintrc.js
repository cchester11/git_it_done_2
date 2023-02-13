module.exports = {
    "plugins": [
        "jquery"
    ],
    "globals": {
        "$": true
    },
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
        "no-duplicate-imports": ["warn", { "includeExports": true }],
        "jquery/no-ajax": "off",
        "jquery/no-animate": "off"
    }
}
