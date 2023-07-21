const svgtofont = require('svgtofont');
const path = require('path');
const { unlink } = require('node:fs/promises')

const srcPath = path.resolve(process.cwd(), './src/images/icons/')
const distPath = path.resolve(process.cwd(), './src/iconfont/')
const fontName = 'iconfont'

const filesToDelete = ['.less', '.module.less', '.styl', '.symbol.svg']

svgtofont({
    src: srcPath,
    dist: distPath,
    fontName: fontName,
    css: true,
    website: false,
}).then(() => {
    filesToDelete.forEach(file => {
        unlink(distPath + '/' + fontName + file)
    })
}).then(() => {
    console.log('Done!');
});