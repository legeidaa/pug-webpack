import './sdkInit'
import './myfont.font'

const mobileWidthMediaQuery = window.matchMedia('(max-width: 420px)')

function printLog(isMobileSize) {
    const size = isMobileSize ? 'уже или равен' : 'шире'

    console.log(`Размер экрана ${size} 420px`)
}

printLog(mobileWidthMediaQuery.matches)

mobileWidthMediaQuery.addEventListener('change', function(event) {
    printLog(event.matches)
})

