/*
    Created by venkataramana
    Date: 28/08/20
*/
const API_URL = 'http://localhost:3000';

function getMobileOS() {
    // from https://stackoverflow.com/questions/21741841/detecting-ios-android-operating-system
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

function fetchMerchantLinks(cb) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cb(JSON.parse(this.responseText))
        }
    };
    xhttp.open("GET", API_URL, true);
    xhttp.send();
}

function redirect() {
    setTimeout(function () {
        window.location.href = 'https://www.ports.rocks/offer/187581|24228?data1=Track1&data2=Track2&website={subID}&placement={sub_subID}';
    }, 5000)
}

function openIntent() {
    fetchMerchantLinks(function (response) {
        var url = (getMobileOS() === 'iOS') ? response['ios'] : response['android'];
        window.open(url, '_self');
        redirect()
    })
}
