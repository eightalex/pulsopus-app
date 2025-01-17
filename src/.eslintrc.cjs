module.exports = {
    root: true,
    env: {browser: true, es2020: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh', 'simple-import-sort'],
    rules: {
        'no-underscore-dangle': 0,
        'no-plusplus': 0,
        'class-methods-use-this': 0,
        'radix': 0,
        'prefer-destructuring': 0,
        'no-param-reassign': 0,
        '@typescript-eslint/lines-between-class-members': 0,
        'no-continue': 0,
        'no-multiple-empty-lines': 0,
        'import/prefer-default-export': 0,
        'import/no-cycle': 0,
        'grouped-accessor-pairs': 0,
        "@typescript-eslint/naming-convention": 0,
        '@typescript-eslint/comma-dangle': ['error', {
            arrays: "only-multiline",
            objects: "only-multiline",
            imports: "only-multiline",
            exports: 'always-multiline',
            enums: "only-multiline",
            functions: 'never',
        }],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
            varsIgnorePattern: "^_",
        },
        ],
        'max-len': ['error', 120, 2, {
            ignoreUrls: true,
            ignoreComments: true,
            ignoreRegExpLiterals: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        "no-else-return": "error",
        "@typescript-eslint/semi": ["error", "always", {"omitLastInOneLineClassBody": true}],
        "@typescript-eslint/object-curly-spacing": ["error", "always"],
        //
        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
    "overrides": [
        {
            "files": ["*.js", "*.ts"],
            "rules": {
                "simple-import-sort/imports": [
                    "error",
                    {
                        "groups": [
                            [
                                "^\\u0000", "^\\w", "^@?\\w", "^(@)(/.*|$)",
                                "^\\.\\.(?!/?$)", "^\\.\\./?$",
                                "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"
                            ],
                        ]
                    }
                ],
            }
        }
    ]
}
