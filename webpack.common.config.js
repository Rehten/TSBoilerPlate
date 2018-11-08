const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './index.ts'
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    context: path.resolve(__dirname, 'src'),
    module: {
        rules: [
            {
                test: /\.ts?$/,
                include: /src/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true,
                            errorsAsWarnings: true
                        }
                    }
                ]
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'eslint-loader',
                include: path.join(__dirname, '/src'),
                options: {
                    emitError: false,
                    emitWarning: true
                }
            },
            {
                exclude: /node_modules/,
                test: /\.js$/,
                loaders: ['babel-loader']
            },
            {
                enforce: "pre", test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                exclude: /node_modules/,
                test: /\.scss$/,
                loaders: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    'resolve-url-loader', 'sass-loader?sourceMap']
            },
            {
                exclude: /node_modules/,
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
            },
            {
                exclude: /node_modules/,
                test: /\.pug/,
                loaders: ['pug-loader']
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '99Production',
            template: 'index.pug',
            inlineSource: '.(js|css)$',
            filename: 'index.html'
        }),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            watch: 'src',
            tsconfig: './../tsconfig.json',
            tslint: './../tslint.json'
        }),
        new CopyWebpackPlugin([
            {from:'./assets/',to:'assets'}
        ]),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackInlineSourcePlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.json', 'pug']
    }
};
