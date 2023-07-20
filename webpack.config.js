const path = require('path');
const PugPlugin = require('pug-plugin');

const keepFoldersStructure = (pathData) => {
    const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
    return `${filepath}/[name].[hash][ext][query]`;
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
        })
    ],
    module: {
        rules: [{
                test: /\.pug$/,
                loader: PugPlugin.loader
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|ico|webp|svg)/,
                type: 'asset/resource',
                generator: {
                    filename: keepFoldersStructure
                }
            },
            {
                //TODO добавить поддежку svg
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext][query]'
                }
            }
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
        //для дебага в браузере
        config.devtool = 'source-map';
    }
    return config
}