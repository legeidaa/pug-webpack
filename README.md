

## О проекте

Сборка для верстки на [pug](https://pugjs.org/api/getting-started.html). Используются [pug-plugin](https://github.com/webdiscus/pug-plugin), [webpack5](https://webpack.js.org/concepts/), SCSS.

## Pug

Используется шаблон, расположенный в src/pug/components/template.pug.   
Страницы подключаются к шаблону с помощью    
```
extends ../components/template.pug

block title 
    -  var pageTitle = t`firstpagename`

block content
    //- контент страницы
```
Где pageTitle - название страницы, подставляющееся в тег title в шаблоне.   
Новые страницы подключаются в в функции getPages() в webpack.config.js, а также webMoneyHeader.init в src/js/sdkInit.js      

## Локализация

В pug используются функция t(), определенная в src/pug/components/locales.pug, пример использования:     
```
div= t`string_from_locale_json`

a(href=t`string_from_locale_json`) 

span какой-то #{t`string_from_locale_json`} текст 
```

json'ы с переводами расположены в папке src/locales   
Поддерживваемые языки добавляются в src/js/supportedLangs.js   

## [WebMoney Layout](https://cdn.web.money/layout/v2/doc.html)

Подключается в src/js/sdkInit.js   

## SCSS

Подключается к template.pug   
_vars - переменные из WM Design System   
_fonts - шрифты (в проекте уже есть Manrope), сюда же подключается иконочный шрифт. Если он использоваться не будет, удалить @import   
_mixins - миксины с типографикой из WM Design System    
wmds-reset - доработанный bootstrap reboot   

## Иконочный шрифт
Используется пакет [svgtofont](https://github.com/jaywcjlove/svgtofont)   
Запускается командой npm run iconfont   
Генерируется из svg, расположенных в папке src/images/icons   
Работает аналогично icomoon          
Настраивается в scripts/svgtofont.js   
Создает папку src/iconfont со шрифтами и css, если не будет использоваться, папку можно удалить   

## Svg-спрайт
Используется пакет [svg-sprite](https://github.com/svg-sprite/svg-sprite)   
Запускается командой npm run svgsprite   
Генерируется из svg, расположенных в папке src/images/icons    
Настраивается в scripts/svgtofont.js, src можно поменять в package.json   
Создает папку src/svgsprite со sprite.svg и html со всеми вариантами использования, если не будет использоваться, папку можно удалить
Если требуется изменить цвет с помощью css, нужно убрать атрибуты fill из исходной картинки   
Пример:   
```
svg#svg
    use(href=require('/src/svgsprite/sprite.svg#icon-example-1'))

style(type="text/css").
    #svg {
        fill: red;
    }

svg
    use(href=require('/src/svgsprite/sprite.svg#icon-example-2'))
```

## Babel

Если требуется скомпилировать js для более старых браузеров, можно изменить настройку ```@babel/preset-env``` в webpack.config.js   

## Postcss

Изменить [настройки](https://webpack.js.org/loaders/postcss-loader/) можно в объекте postCss в webpack.config.js   
