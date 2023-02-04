const path = require("path");
const dotenv = require("dotenv")
dotenv.config();

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

// this is originally included by default
// but the adding a new minimizer means
// that I have to manually add this one
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    mode: process.env.MODE,
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "./public")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: "style.css" }),
        ...(process.env.ANALYZE === "true" ? [new BundleAnalyzerPlugin()] : [])
    ],
    optimization: {
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ]
    },
    devServer: {
        static: path.resolve(__dirname, "./public")
    },
    externals: {
        parse: 'parse'
    }
}