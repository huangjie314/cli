module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: [
    'plugin:vue/essential',
    <%_ if (useAirbnb) { _%>
    'airbnb-base',
    <%_ } else { _%>
    'standard',
    <%_ } _%>
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    "no-console": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "no-debugger": process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // "indent": [
    //   "error",
    //   "tab"
    // ],
    "linebreak-style": [
      "error",
      "windows"
    ],
    // "quotes": [
    //   "error",
    //   "double"
    // ],
    // "semi": [
    //   "error",
    //   "always"
    // ],
    "class-methods-use-this": "off",
  }
}
