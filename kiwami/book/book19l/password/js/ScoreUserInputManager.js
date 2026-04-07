/**
 * Created with JetBrains WebStorm.
 * User: hideaki
 * Date: 13/10/31
 * Time: 16:32
 * To change this template use File | Settings | File Templates.
 */
this.lw = this.lw||{};
(function(window) {
    var ScoreUserInputManager = function() {
        this.thisName = "ScoreUserInputManager";
    }

    //継承なし
    var p = ScoreUserInputManager.prototype;

    p._managerId = "";
    p._contentId = "";
    p._contentTitle = "";
    p._contentUrl = "";

    p._userInfo = "";

    p._userInfoMandatory = "false";
    p._password = "true";
    p._userInfoMessage = "";

    p._SCORE_USER_INFO_KEY = "scoreUserInfo";
    p._localStorageCtrl;

    p.scoreFlg = false;

    /***
     * [Public]初期処理
     * @param settingUrl
     */
    p.init = function (settingUrl){
        if(settingUrl == "" || settingUrl == null){
            this.onCompletedInit();
        }else{
            this._loadSettingXml(settingUrl);
        }

    };
    /***
     * [Public]Score用の入力されたユーザー情報を内部保存
     * @param userInfo
     */
    p.saveUserInfo = function(userInfo){
        this._userInfo = userInfo;
        this._localStorageCtrl.setData(this._SCORE_USER_INFO_KEY, userInfo);
    };
    p.getUserInfo = function(){
        return this._userInfo;
    };
    p.getUserInfoMessage = function(){
        return this._userInfoMessage;
    };
    p.getUserInfoFlg = function(){
        return this._userInfoMandatory;
    };
    p.getPasswordFlg = function(){
        return this._password;
    };
    /***
     *  設定XMLファイルロード
     * @param url
     * @private
     */
    p._loadSettingXml = function(url) {
        var tmpUrl = url + "?c=" + new Date().getTime();
        var scope = this;
        $.ajax({
            type: "GET",
            url: tmpUrl,
            dataType: "xml",
            success: function(xml) {scope._onCompleteLoadSettingXml(xml); },
            error: function(xml) { scope._onErrorLoadSettingXml(); }
        });
    };

    /***
     * 設定XMLファイルロード完了イベントハンドラ
     * @param xml
     * @private
     */
    p._onCompleteLoadSettingXml = function(xml){
        this._parseSettingXml(xml);
        this.scoreFlg = true;
        this._init();
    };
    /***
     * 設定XMLファイルロード失敗イベントハンドラ
     * @param xml
     * @private
     */
    p._onErrorLoadSettingXml = function(){
        //alert("Error Load XML");
        this.onCompletedInit();
    };

    /***
     *
     * @param xml
     * @return {flipperjs.ScoreSettingData}
     * @private
     */
    p._parseSettingXml = function(xml){
        this._managerId = $(xml).find("managerId").text();
        this._contentId = $(xml).find("contentId").text();
        this._contentTitle = $(xml).find("contentTitle").text();
        this._contentUrl = [location.protocol, location.host, location.pathname].join("/");
        this._userInfoMandatory = $(xml).find("userInfoMandatory").text();
        this._password = $(xml).find("password").text();
        this._userInfoMessage = $(xml).find("userInfoMessage").text();

        //alert("_parseSettingXml:" + [setting.userInfo, setting.managerId,setting.browsedPageSec,setting.completedRate].join("/"));
    };

    p._init = function(){
        //内部保存でデータ操作用クラスインスタンス生成
        this._localStorageCtrl = new flipperjs.LocalStorageController();
        this._localStorageCtrl.init(this._contentUrl, "");
        this._userInfo = this._localStorageCtrl.getData(this._SCORE_USER_INFO_KEY);
        if(this._userInfo == "undefined"){
            this._userInfo = "";
        }
        //alert("userInfoを内部から取得：" + this._userInfo);

        this.onCompletedInit();
    }
    /***
     * 初期化処理完了イベント
     */
    p.onCompletedInit = function(){
        //デリゲート
    }


    lw.ScoreUserInputManager = ScoreUserInputManager;
}(window));
