import { SUPPORTED_LANGS, CURRENT_LANG } from './consts'
const langJSON = require('../locales/' + CURRENT_LANG + '.json');
// import langJSON from('../locales' + LANG + '.json') assert { type: 'json' };
let webMoneyHeader = new WebMoneyHeader();
let webMoneyFooter = new WebMoneyFooter();
const userData = { wmid: '' }

function isActivePage(page) {
    if (window.location.pathname.indexOf(page) > -1) {
        return true;
    }
    return false;
}

function addPage(page, url = null) {
    return {
        title: langJSON[page] || `${page}`,
        url: url,
        active: isActivePage(page)
    }
}

webMoneyHeader.init({
    rootElement: document.getElementById("webMoneyHeader"),
    lang: CURRENT_LANG,
    serviceName: "ServiceName",
    rid: "DDACEB81-AD68-4C26-A3FD-AF030166963A",
    firstLevel: [
        addPage("firstpagename", '/' ),
        addPage("secondpagename", 'second.html' ),
    ],
    onLoginBlockRendered: function(data) {
        if (data.wmid) {
            userData = data
        } else {}
    }
});

webMoneyFooter.init({
    rootElement: document.getElementById("webMoneyFooter"),
    lang: CURRENT_LANG,
    supportedLangs: SUPPORTED_LANGS,
    onChangeLang: function(lang) {}
});