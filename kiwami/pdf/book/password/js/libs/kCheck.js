var redirectPath = redirectPath || "./index.html";

var hs = window.location.hash;
var sr = window.location.search;
var srObj = getRequest();

if (srObj['k']) {

    //※kが存在する→keyTime
    var keyTime = base64decodeURI(srObj['k']);
    var nowtime = new Date().getTime();

    if (nowtime - keyTime > 10000) {
        //※時間切れ → ログイン画面に戻る
        location.href = redirectPath + removeParam("k") + hs;
    } else {
        //※タイムOK → そのまま続行
    }

} else {
    //※kがない → ログイン画面に戻る
    location.href = redirectPath + sr + hs;
}

//※kパラメータの削除
function removeParam(param) {
    var nowSr =  window.location.search;
    var newSr = "";
    if (nowSr.length > 1) {
        //※最初の?をトル
        var ret = nowSr.substr(1).split("&");
        for (var i = 0; i < ret.length; i++) {
            var r = ret[i].split("=");
            if (r[0] != param) {
                newSr = newSr + ret[i] + "&";
            }
        }
        if (newSr.length >= 1) {
            //※最後の&をトル。最初に?を付ける
            newSr = "?" + newSr.substr(0, -1);
        }
    }
    return newSr;
}

//※getパラメータ取得
function getRequest() {
    if (location.search.length > 1) {
        var get = new Object();
        var ret = location.search.substr(1).split("&");
        for (var i = 0; i < ret.length; i++) {
            var r = ret[i].split("=");
            get[r[0]] = r[1];
        }
        return get;
    } else {
        return false;
    }
}