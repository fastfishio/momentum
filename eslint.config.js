const globals = require('globals');
const eslintPluginNext = require('@next/eslint-plugin-next');
const eslintPluginTypescript = require('@typescript-eslint/eslint-plugin');
const eslintPluginCssModules = require('eslint-plugin-css-modules');
const eslintPluginPrettier = require('eslint-plugin-prettier');
const eslintPluginJson = require('eslint-plugin-json');
const eslintPluginReact = require('eslint-plugin-react');
const eslintPluginReactHooks = require('eslint-plugin-react-hooks');
const eslintPluginImport = require('eslint-plugin-import');
const eslintPluginJsxA11y = require('eslint-plugin-jsx-a11y');
const parserTypescriptEslint = require('@typescript-eslint/parser');
const eslintPluginUnicorn = require('eslint-plugin-unicorn');

module.exports = [
    {
        files: ['**/*.ts', '**/*.tsx', '**/*.js'],
        ignores: ['node_modules/**', '**/.turbo/**', '**/.next/**', '**/card.lib.js', 'apps/cms/cms_package_dev/**'],
        languageOptions: {
            parser: parserTypescriptEslint,
            parserOptions: {
                project: './tsconfig.json',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        plugins: {
            unicorn: eslintPluginUnicorn,
            '@next/next': eslintPluginNext,
            '@typescript-eslint': eslintPluginTypescript,
            prettier: eslintPluginPrettier,
            json: eslintPluginJson,
            'css-modules': eslintPluginCssModules,
            react: eslintPluginReact,
            'react-hooks': eslintPluginReactHooks,
            /*
             * workaround till this plugin has support for flat config
             * uncomment the recommended rules from this plugin as well
             */
            import: { rules: eslintPluginImport.rules },
            'jsx-a11y': eslintPluginJsxA11y,
        },
        rules: {
            ...eslintPluginUnicorn.configs.recommended.rules,
            ...eslintPluginNext.configs.recommended.rules,
            ...eslintPluginTypescript.configs.recommended.rules,
            ...eslintPluginJson.configs.recommended.rules,
            ...eslintPluginCssModules.configs.recommended.rules,
            ...eslintPluginReact.configs.recommended.rules,
            ...eslintPluginReactHooks.configs.recommended.rules,
            ...eslintPluginJsxA11y.configs.recommended.rules,
            // ...eslintPluginImport.configs.recommended.rules, // enable when import has support for flat config
            ...eslintPluginPrettier.configs.recommended.rules,

            'prettier/prettier': [
                1,
                {
                    jsxSingleQuote: false,
                    jsxBracketSameLine: true,
                    printWidth: 120,
                    tabWidth: 4,
                    singleQuote: true,
                    trailingComma: 'all',
                },
            ],

            'import/extensions': [
                'error',
                {
                    json: 'always',
                    ts: 'never',
                    tsx: 'never',
                    css: 'always',
                    js: 'never',
                },
            ],
            'import/order': [
                'error',
                {
                    groups: [
                        'builtin', // Built-in types are first
                        'external',
                        'internal',
                        'unknown',
                        ['sibling', 'parent'], // Then sibling and parent types. They can be mingled together
                        'index', // Then the index file
                        'object',
                    ],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'builtin',
                            position: 'before',
                        },
                        {
                            pattern: '_core/**',
                            group: 'internal',
                            position: 'after',
                        },
                        {
                            pattern: '.**',
                            group: 'object',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    warnOnUnassignedImports: true,
                },
            ],
            'import/prefer-default-export': 'off',
            'import/extensions': 'off',

            'react-hooks/rules-of-hooks': 'error',

            'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
            'react/require-default-props': 0,
            'react/react-in-jsx-scope': 'off',
            'react-hooks/exhaustive-deps': 'off', // Breaking. make it warn when it has support for flat config

            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'typeAlias',
                    format: ['PascalCase'],
                    prefix: ['T'],
                },
                {
                    selector: 'variable',
                    types: ['boolean'],
                    format: ['PascalCase', 'UPPER_CASE'],
                    prefix: ['is', 'are', 'should', 'has', 'can', 'did', 'will', 'IS_'],
                },
            ],
            '@typescript-eslint/no-use-before-define': 0,
            '@typescript-eslint/explicit-module-boundary-types': 'off',

            '@next/next/no-img-element': 'off',
            '@next/next/no-html-link-for-pages': 'off',
            '@next/next/no-duplicate-head': 'off',

            'spaced-comment': ['error', 'always', { markers: ['/'] }],
            'sort-keys': [0, 'asc', { natural: true, minKeys: 3 }],
            'no-use-before-define': 'off',
            camelcase: [0, { properties: 'always' }],

            'jsx-a11y/no-autofocus': 'off',

            /**
             * unicorn 🦄
             * https://github.com/sindresorhus/eslint-plugin-unicorn
             */
            'unicorn/filename-case': ['error', { case: 'camelCase' }],
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/better-regex': 'warn',
            'unicorn/prevent-abbreviations': 'off',
            'unicorn/switch-case-braces': 'off',
            'unicorn/no-null': 'off',
            'unicorn/explicit-length-check': 'off',
            'unicorn/no-array-for-each': 'off',
            'unicorn/prefer-spread': 'off',
            'unicorn/no-typeof-undefined': 'off',
            'unicorn/no-negated-condition': 'off',
            'unicorn/better-regex': 'off',
            'unicorn/numeric-separators-style': 'off',
            'unicorn/no-array-reduce': 'off',
            'unicorn/prefer-module': 'off', // because of cms "modules" keywords
            'unicorn/no-object-as-default-parameter': 'off',
            'unicorn/escape-case': 'off',
            'unicorn/no-array-callback-reference': 'off',
        },
    },
    /**
     * Enforce Pascal case for:
     * 1. all tsx files, except within "app" directory
     * 2. all the *.types.ts and *.type.ts files (for the files placed alongside components)
     */
    {
        files: ['**/*.tsx', '**/*.types.ts', '**/*.type.ts'],
        ignores: ['node_modules/**', '**/.turbo/**', '**/.next/**'],
        rules: {
            'unicorn/filename-case': ['error', { case: 'pascalCase' }],
        },
    },
    {
        files: ['**/app/**/*.tsx', '**/next-env.d.ts'],
        ignores: ['node_modules/**', '**/.turbo/**', '**/.next/**'],
        rules: {
            'unicorn/filename-case': ['error', { case: 'kebabCase' }],
        },
    },
    {
        files: ['**/eslint.config.js', '**/next.config.js'],
        ignores: ['node_modules/**', '**/.turbo/**', '**/.next/**'],
        rules: {
            '@typescript-eslint/no-var-requires': 'off',
            'unicorn/prefer-module': 'off',
        },
    },
];
