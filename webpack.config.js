const path = require('path');
const PugPlugin = require('pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const keepFoldersStructure = (pathData) => {
    const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
    return `${filepath}/[name].[contenthash:8][ext][query]`;
}

const postCss = {
    loader: "postcss-loader",
    options: {
        postcssOptions: {
            plugins: [
                [
                    "postcss-preset-env",
                ],
            ],
        },
    }
}

const config = {
    mode: 'development',
    entry: {
        index: './src/pug/pages/index.pug',
    },
    output: {
        path: path.join(__dirname, 'dist/'),
        publicPath: '',
    },
    plugins: [
        new PugPlugin({
            pretty: true,
            css: {
                filename: 'css/[name].[contenthash:8].css'
            },
            js: {
                filename: 'js/[name].[contenthash:8].js',
            },
        }),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [{
                test: /\.pug$/,
                loader: PugPlugin.loader
            },
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    'css-loader',
                    postCss, // replace with 'postcss-loader' if you don't want to use autoprefixer
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|ico|webp|svg)/,
                type: 'asset/resource',
                generator: {
                    filename: keepFoldersStructure
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                // include: /fonts/,
                generator: {
                    filename: keepFoldersStructure
                },
            },
        ]
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        watchFiles: {
            paths: ['src/**/*.*'],
            options: {
                usePolling: true
            }
        }
    },
    stats: 'errors-only'
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        //for debug in browser sources
        config.devtool = 'source-map';
    }
    return config
}