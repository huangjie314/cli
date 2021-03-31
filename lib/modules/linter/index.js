const path = require('path')

const map = {
    airbnb: {
        'eslint-config-airbnb-base': '^14.2.1',
        'eslint-plugin-import': '^2.22.1',
    },
    standard: {
        'eslint-config-standard': '^16.0.2',
        'eslint-plugin-import': '^2.22.1',
        'eslint-plugin-node': '^11.1.0',
        'eslint-plugin-promise': '^4.3.1',
    },
}

module.exports = function(generator,  { lintOn, eslintConfig }) {
    generator.extendPackage({
        scripts: {
            "lint": 'eslint src --fix'
        },
        devDependencies: {
            'babel-eslint': '^10.1.0',
            'eslint': '^7.20.0',
            'eslint-plugin-vue': '^7.6.0',
            ...map[eslintConfig]
        },
    })
    if (lintOn.includes('save')) {
        generator.extendPackage({
            devDependencies: {
                'eslint-loader': '^4.0.2',
            }
        })
    }
    if (lintOn.includes('commit')) {
        generator.extendPackage({
            devDependencies: {
                'husky': '^5.0.9',
                'lint-staged': '^10.5.4',
            },
            husky: {
                hooks: {
                    'pre-commit': 'lint-staged'
                }
            },
            'lint-staged': {
                "src/**/*.js": "eslint --fix"
             }
        })
    }
    generator.injectTmplDir(
        {
            path: path.resolve(__dirname, './template'),
            data: {
                useAirbnb: eslintConfig === 'airbnb'
            }
        }
    )
}