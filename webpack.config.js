var webpack = require('webpack');
module.exports = {
    entry: {
        app: './entry.js'
    },
    output:{
        path:__dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude : /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }, {
                test: /\.css$/, exclude: /\.useable\.css$/, loader: "style-loader!css-loader"
            }, {
                test: /\.useable\.css$/, loader: "style/useable!css"
            }, {
                test: /\.png$/, loader: "url-loader?limit=100000"
            }, {
                test: /\.jpg$/, loader: "file-loader"
            }
        ]
    }
};