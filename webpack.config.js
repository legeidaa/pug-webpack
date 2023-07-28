const path = require('path')
const webpack = require('webpack')
const PugPlugin = require('pug-plugin')
const supportedLangs = require('./src/js/supportedLangs')



const keepFoldersStructure = (pathData) => {
    const filepath = path
        .dirname(pathData.filename)
        .split("/")
        .slice(1)
        .join("/");
    return `${filepath}/[name].[contenthash:8][ext][fragment][query]`

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

function getLocaleJson(lang) {
    return require(`./src/locales/${lang}.json`)
}

function getConfig(lang, env, argv) {
    const config = {
        entry: {
            index: './src/pug/pages/first.pug',
            second: './src/pug/pages/second.pug',
        },
        output: {
            path: path.join(__dirname, `dist/${lang}/`),
            clean: true,
        },
        plugins: [
            new PugPlugin({
                css: {
                    filename: 'css/[name].[contenthash:8].css'
                },
                js: {
                    filename: 'js/[name].[contenthash:8].js',
                },
            }),
            new webpack.DefinePlugin({
                __SUPPORTED_LANGS__: JSON.stringify(supportedLangs)
            })
        ],
        module: {
            rules: [{
                    test: /\.pug$/,
                    use: [{
                        loader: PugPlugin.loader,
                        options: {
                            data: {
                                localeJson: getLocaleJson(lang)
                            }
                        }
                    }]

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
                    test: /\.(png|jpg|jpeg|ico|webp|svg)/,
                    type: 'asset/resource',
                    generator: {
                        filename: keepFoldersStructure
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: keepFoldersStructure
                    },
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
                directory: path.join(__dirname, `dist/${lang}/`)
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



// для смены языка нужно вречную сменить первый параметр в getConfig
module.exports = (env, argv) => {
    return getConfig('ru', env, argv)
}