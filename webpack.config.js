var path = require("path");

module.exports = {
    entry: {
        app: ['./entry.js']
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: 'bundle.js' // 输出文件的名称
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['babel?presets[]=es2015'],
            exclude: /node_modules/
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
}