const path = require('path')
const webpack = require('webpack')
const PugPlugin = require('pug-plugin')
const supportedLangs = require('./src/js/consts/supportedLangs.js')

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
        pages[`${lang}/index`] = `./src/pug/pages/index.pug?lang=${lang}`
        pages[`${lang}/second`] = `./src/pug/pages/second.pug?lang=${lang}`
    }

    return pages
}

function getConfig(env, argv) {
    const config = {
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
                hotUpdate: true,
                entry: getPages(),
                css: {
                    filename: 'assets/css/[name].[contenthash:8].css'
                },
                js: {
                    filename: 'assets/js/[name].[contenthash:8].js',
                },
                data: getLangPaths()
            }),

            new webpack.DefinePlugin({
                __SUPPORTED_LANGS__: JSON.stringify(supportedLangs)
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.(css|sass|scss)$/,
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                            },
                        },
                        {
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
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    sourceMapIncludeSources: true
                                }
                            }
                        },
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|ico|webp|svg|mp4|webm|mov)/,
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
        resolve: {
            alias: {
                '@images': path.join(__dirname, './src/images/'),
                '@scss': path.join(__dirname, './src/scss/'),
                '@js': path.join(__dirname, './src/js/'),
                '@locales': path.join(__dirname, './src/locales/'),
                '@pug': path.join(__dirname, './src/pug/'),
            },
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