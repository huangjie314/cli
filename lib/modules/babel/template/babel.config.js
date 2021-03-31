module.exports = {
    presets: [
        '@babel/preset-env'
    ],
    <%_ if (useTs) { _%>
    plugins: [
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        [
            "@babel/proposal-class-properties", 
            { 
                "loose": true 
            }
        ]
    ]
    <%_ } _%>
}
  