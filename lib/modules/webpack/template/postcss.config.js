module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: [
                "Android 4.1",
                "iOS 7.1",
                "Chrome > 31",
                "ff > 31",
                "ie >= 8",
                "last 2 versions"
            ]
        },
        "postcss-px-to-viewport": {
            viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度.
            unitPrecision: 3, // 保留几位小数，指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: [], // 指定不需要转换的类
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位.
            mediaQuery: true, // 允许在媒体查询中转换`px`,
            exclude: [/node_modules/],
            landscape: false, // 是否处理横屏情况
        },
    }
}