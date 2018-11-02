module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: './build/table-vdom.js'
    },
    module: {
        rules: [
            {
                test: /\$.js/,
                exclude: /(node_modules)/,
                loader: 'babel-loader'
            }
        ]
    }
}