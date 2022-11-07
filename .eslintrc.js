/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-magic-numbers */
module.exports = {
    extends: [
        '@nuxtjs/eslint-config-typescript'
    ],
    rules: {
        'comma-dangle': ['error', {
            arrays: 'ignore',
            objects: 'never',
            imports: 'never',
            exports: 'never',
            functions: 'never'
        }],
        'comma-spacing': 'off',
        'array-bracket-spacing': ['error', 'never', { singleValue: false }],
        semi: ['error', 'always'],
        'no-debugger': 'error',
        'no-multiple-empty-lines': ['error', { max: 2 }],
        'quote-props': ['error', 'as-needed'],
        'no-irregular-whitespace': ['error'],
        'space-before-function-paren': ['error', 'always'],
        'no-restricted-imports': ['error', {
            paths: [{
                name: 'moment',
                message: 'Use dayjs instead!'
            }]
        }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/member-ordering': ['error', {
            default:
              [
                  'public-static-field',
                  'private-static-field',
                  'public-instance-field',
                  'private-instance-field',
                  'public-constructor',
                  'private-constructor',
                  'public-instance-method',
                  'protected-instance-method',
                  'private-instance-method'
              ]
        }],
        complexity: ['error', 20],
        'max-len': ['error', 200],
        quotes: ['error', 'single'],
        'no-else-return': ['error', { allowElseIf: false }],
        // note you must disable the base rule as it can report incorrect errors
        'no-magic-numbers': 'off',
        '@typescript-eslint/no-magic-numbers': ['error', { ignoreEnums: true, ignoreReadonlyClassProperties: true, ignoreNumericLiteralTypes: true, ignoreArrayIndexes: true, ignore: [1, 0, -1] }],
        // note you must disable the base rule as it can report incorrect errors
        indent: 'off',
        '@typescript-eslint/indent': ['error', 4, {
            SwitchCase: 1
        }],
        'vue/html-indent': ['error', 4],
        'linebreak-style': 'off',
        'vue/max-attributes-per-line': ['error', {
            singleline: 1,
            multiline: {
                max: 1,
                allowFirstLine: true
            }
        }],
        'vue/html-closing-bracket-newline': ['error', {
            multiline: 'never'
        }]
    }
};
