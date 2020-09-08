const { merge } = require('webpack-merge');

const features = require("./package.json").features || [];


module.exports = features.includes('react') ? {
    module: {
        rules: [
            {
                test: /\.(jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            }
        ],
    },
    resolve: {
        extensions: ['.jsx'],
    },
} : {};