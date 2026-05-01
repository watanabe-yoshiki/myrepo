/**
 * Created with JetBrains WebStorm.
 * User: hideaki
 * Date: 13/11/11
 * Time: 18:51
 * To change this template use File | Settings | File Templates.
 */
var hs = window.location.hash;
var sr = window.location.search;

//デフォルトメッセージ
var localeResource;
var _password_failure = "Password is wrong.";
var _label_password = "Password";
var _label_userinfo = "User Information";

var hr = String(location.href).split(hs).join("").split(sr).join("");
var fileName = getFileName(hr);

var _promptWidth = 290;
var _promptHeight = 200;

//Score用処理--------------------------------------
var _scoreUIMng = new lw.ScoreUserInputManager();

/***
 * Score用の設定ファイルロード完了イベントハンドラ（ファイルロード失敗しても実行される）
 * @private
 */
function _onCompletedInitScoreUI(){
    //alert("Score初期化完了")
    var userName = _scoreUIMng.getUserInfo();
    $("#userInfoName").val(userName);

    var message =  _scoreUIMng.getUserInfoMessage();
    message = message.replace(/\r?\n/g, "<br>");
    $("#msgText").html(message);

    //alert("_scoreUIMng.getPasswordFlg():" + _scoreUIMng.getPasswordFlg());
    //パスワード保護なし
    if(_scoreUIMng.getPasswordFlg() == "false"){
        $("#iconBox").css("display", "none");
        $("#userInfoTextBox").css("display", "none");
        $("#msgTextBox").css("margin-top", "0px");
    }

    //ユーザー情報入力なし
    if(_scoreUIMng.getUserInfoFlg() == "false"){
        $("#userInfoNameBox").css("display", "none");
        $("#msgTextBox").css("display", "none");
        $("#passwordLabel").css("display", "block");
        $("#passwordLabel").css("font-weight", "bold");
        $("#passwordLabel").css("width", "100%");
        $("#passwordLabel").css("text-align", "center");
        $("#userInfoText").css("text-align", "center");
    }else{
    }

    _promptWidth = $("#prompt_window").width();
    _promptHeight = $("#prompt_window").height();
    promptResize();

    //Score用で、かつパスワード保護なし、かつ、ユーザー情報入力なしの場合、すぐに本体へ移動
    if(_scoreUIMng.scoreFlg && _scoreUIMng.getPasswordFlg() == "false" &&
        _scoreUIMng.getUserInfoFlg() == "false"){
        var link = gotoUrl.replace(/\[hash\]/g, score_prefix);
        //リンク先へ移動する
        _gotoLinkPage(link, "");
    }else{
        $("#prompt_window").css("visibility", "visible");
    }

}
/***
 * htmlロード完了イベントハンドラ
 */
function onLoad() {
    //Score用処理--------------------------------------
    _scoreUIMng.onCompletedInit = jQuery.proxy(_onCompletedInitScoreUI, this);
    _scoreUIMng.init(scoreSettingFilePath);

    var getParam = getRequest();

    var _msg = "";
    var _userInfo = "";

    localeResource = getLocaleResource();
    if (localeResource) {
        //_password_message = localeResource.PASSWORD_MESSAGE;
        _password_failure = localeResource.PASSWORD_FAILURE;
        _label_password = localeResource.LABEL_PASSWORD;
        _label_userinfo = localeResource.LABEL_USERINFO;
    }

    //デフォルトメッセージ
    //_msg = _password_message;

    /*
     if (_msg == "undefined" || _msg == undefined || _msg == null) {
     _msg = "";
     }*/

    if (_userInfo == "undefined" || _userInfo == undefined || _userInfo == null) {
        _userInfo = "";
    }

    //_msg = _msg.replace(/\r?\n/g, "<br>");
    $("#msgText").append(_msg);
    $("#userInfoText").val(_userInfo);
    $("#userInfoLabel").text(_label_userinfo);
    $("#passwordLabel").text(_label_password);


    _promptWidth = $("#prompt_window").width();
    _promptHeight = $("#prompt_window").height();

    this.promptResize();

    $("img.rollover").mouseover(
        function () {
            $(this).attr("src", $(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_on$2"));
        }).mouseout(
        function () {
            $(this).attr("src", $(this).attr("src").replace(/^(.+)_on(\.[a-z]+)$/, "$1$2"));
        }).each(function () {
            $("<img>").attr("src", $(this).attr("src").replace(/^(.+)(\.[a-z]+)$/, "$1_on$2"));
        });
}

//getパラメータ取得
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

function promptResize() {

    var _winWidth = winWidth();
    var _winHeight = winHeight();

    var _promptTop = Math.round(Number(_winHeight - _promptHeight) / 2);
    var _promptLeft = Math.round(Number(_winWidth - _promptWidth) / 2);

    $("#prompt_window").css("position", "absolute");
    $("#prompt_window").css("top", _promptTop + "px");
    $("#prompt_window").css("left", _promptLeft + "px");
    if(_promptTop < 0){
        $("#prompt_window").css("top", "0px");
    }else{
    }
    //alert("_promptLeft:" +  $("#prompt_window").css("left"));
}

//※ウインドウサイズ取得
var ua = navigator.userAgent;
var nWidth, nHeight;
var nHit = ua.indexOf("MSIE");
var bIE = (nHit >= 0);
var bVer6 = (bIE && ua.substr(nHit + 5, 1) == "6");
var bStd = (document.compatMode && document.compatMode == "CSS1Compat");

var _widthMargin = 0;
var _heightMargin = 0;

function winWidth() {
    if (bIE) {
        if (bVer6 && bStd) {
            nWidth = document.documentElement.clientWidth;
        } else {
            nWidth = document.body.clientWidth;
        }
    } else {
        nWidth = window.innerWidth;
    }

    nWidth = Number(nWidth - _widthMargin);

    return nWidth;
}

function winHeight() {
    if (bIE) {
        if (bVer6 && bStd) {
            nHeight = document.documentElement.clientHeight;
        } else {
            nHeight = document.body.clientHeight;
        }
    } else {
        nHeight = window.innerHeight;
    }

    nHeight = Number(nHeight - _heightMargin);

    return nHeight;
}

function onResize() {
    promptResize();
}

function checkPassword() {
    var userInfo = "";
    //ユーザー情報入力ありの場合
    if(_scoreUIMng.getUserInfoFlg() == "true"){
        userInfo = $("#userInfoName").val();
        _scoreUIMng.saveUserInfo(userInfo);
    }

    var pass = $("#userInfoText").val();
    var hash = String(SHA256(pass).toUpperCase()).substring(0, 12);
    //パスワード保護なしの場合
    if(_scoreUIMng.getPasswordFlg() == "false"){
        hash = score_prefix;
        _password_failure = "Error!";
        if(localeResource != null && localeResource.SCORE_FAILURE != null){
            _password_failure = localeResource.SCORE_FAILURE;
        }
    }

    var link = gotoUrl.replace(/\[hash\]/g, hash);
    try {
        $.ajax(
            {
                url: link,
                //async: false,
                type: 'GET',
                dataType: 'html',
                timeout: 1000,

                error: function () {
                    // alert("パスワードが違います。");
                    alert(_password_failure);
                },

                success: function (xml) {
                    var userParam = "";
                    //ユーザー情報入力ありの場合、入力されたユーザー情報をuパラメータに追加
                    if(_scoreUIMng.getUserInfoFlg() == "true"){
                        userParam = '&u=' + encodeURIComponent(userInfo);
                    }

                    //リンク先へ移動する
                    _gotoLinkPage(link, userParam);
                }
            });

    } catch (error) {
        alert(_password_failure);
    }
}
/***
 *
 * @param keytime
 * @param userParam
 * @private
 */
function _gotoLinkPage(link, userParam){
    var str = String(new Date().getTime());
    var keytime = base64encodeURI(str);

    if (sr) {
        location.href = link + sr + '&k=' + keytime + userParam + hs;
    } else {
        location.href = link + '?k=' + keytime + userParam + hs;
    }
}

/***
 *
 */
function enter() {
    if (window.event.keyCode == 13) {
        checkPassword();
    }
}

function getFileName(file_url) {
    file_url = file_url.substring(file_url.lastIndexOf("/") + 1, file_url.length);
    return file_url;
}

function browserLanguage() {
    try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0, 2)
    }
    catch (e) {
        return undefined;
    }
}