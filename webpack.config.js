var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.ts',
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.ts?$/,
                loaders: ['ts-loader', 'angular2-template-loader']
            },
            {
                test: /\.(html)?$/,
                loaders: ['raw-loader']
            },
            {
                test: /\.(css)?$/,
                loaders: ['raw-loader']
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.ts']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]

};
