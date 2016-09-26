var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',

    entry: [
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist'
    },

    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
                query: {
                    presets: ['react', 'es2015'],
                }
            }
        ]
    }
};
