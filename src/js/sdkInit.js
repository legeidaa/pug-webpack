let webMoneyHeader = new WebMoneyHeader();
let webMoneyFooter = new WebMoneyFooter();
let userData = { wmid: '' }

webMoneyHeader.init({
    rootElement: document.getElementById("webMoneyHeader"),
    lang: "ru",
    serviceName: "ServiceName",
    rid: "DDACEB81-AD68-4C26-A3FD-AF030166963A",
    onLoginBlockRendered: function(data) {
        if (data.wmid) {
            userData = data
        } else {
        }
    }
});

webMoneyFooter.init({
    rootElement: document.getElementById("webMoneyFooter"),
    lang: "ru"
});