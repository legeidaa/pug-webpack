const path = require('path')
const webpack = require('webpack')
const PugPlugin = require('pug-plugin')
const CopyPlugin = require("copy-webpack-plugin");
const supportedLangs = require('./src/js/supportedLangs')

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

function getLangPaths() {
    let paths = {}

    for (let i = 0; i < supportedLangs.length; i++) {
        const lang = supportedLangs[i];
        paths[lang] = `${lang}/`
    }

    return paths
}

function getPages() {
    let pages = {}

    for (let i = 0; i < supportedLangs.length; i++) {
        const lang = supportedLangs[i];
        pages[`${lang}/index`] = `./src/pug/pages/first.pug?lang=${lang}`
        pages[`${lang}/second`] = `./src/pug/pages/second.pug?lang=${lang}`
    }

    return pages
}

function getConfig(env, argv) {
    const config = {
        entry: getPages(),
        output: {
            path: path.join(__dirname, 'dist'),
            clean: true,
            assetModuleFilename: (pathData) => {
                const filepath = path
                    .dirname(pathData.filename)
                    .split("/")
                    .slice(1)
                    .join("/");
                return `assets/${filepath}/[name].[hash:8][ext][fragment][query]`
            },

        },
        plugins: [
            new PugPlugin({
                css: {
                    filename: 'assets/css/[name].[contenthash:8].css'
                },
                js: {
                    filename: 'assets/js/[name].[contenthash:8].js',
                },
            }),
            new webpack.DefinePlugin({
                __SUPPORTED_LANGS__: JSON.stringify(supportedLangs)
            }),
            new CopyPlugin({
                patterns: [
                    { from: "src/index.html", to: "" },
                ],
            })

        ],
        module: {
            rules: [{
                    test: /\.pug$/,
                    loader: PugPlugin.loader,
                    options: {
                        data: getLangPaths()
                    }
                },
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        'css-loader',
                        postCss,
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|ico|webp|svg|mp4)/,
                    type: 'asset/resource',
                    
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                },
                {
                    test: /\.(?:js|mjs|cjs)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: "defaults" // "> 0.2% and not dead" для поддержки старых браузеров
                                }]
                            ]
                        }
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
        stats: 'errors-only',
    }

    if (argv.mode === 'development') {
        config.devtool = 'source-map';
    }
    return config
}

module.exports = (env, argv) => {
    return getConfig(env, argv)
}