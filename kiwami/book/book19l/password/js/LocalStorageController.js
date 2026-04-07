/**
 * Created with JetBrains WebStorm.
 * User: hideaki
 * Date: 13/10/08
 * Time: 12:24
 * To change this template use File | Settings | File Templates.
 */
this.flipperjs = this.flipperjs||{};

/***
 *　LocalStorageControllerクラス
 *
 * Flipper用のSCORM処理ライブラリ
 */
(function(window) {

    var LocalStorageController = function() {
        this.thisName = "LocalStorageController";
    }

    //継承なし
    var p = LocalStorageController.prototype;

    p._localStorageFlg = false;
    p._cookieVarObj = {};
    //p._localStorageObjForContent = {};
    p._localStorageObjForContentUser = {};
    //p._localStorageObjForContentKey = "";
    p._localStorageObjForContentUserKey = "";
    p._userInfo = "";


    /***
     * 初期処理
     */
    p.init = function (contentUrl, userInfo){
        this._userInfo = userInfo;

        //ブラウザがlocalStorageに対応しているどうか確認
        this._localStorageFlg = this._checkLocalStorage();
        if(this._localStorageFlg){
            try{
                //this._localStorageObjForContentKey = encodeURI(contentUrl);
                this._localStorageObjForContentUserKey = encodeURI(contentUrl + "_" + userInfo);
                var objString = localStorage.getItem(this._localStorageObjForContentUserKey);
                //alert("localStrorage[" + this._localStorageObjForContentUserKey + "]=" + objString);
                if(objString != null && objString != "" && objString != undefined){
                    this._localStorageObjForContentUser = JSON.parse(objString);
                }
            }catch(e){
            }
        }else{
            //alert("localStorage不可");
            this._cookieVarObj = this._getGetCookies();

            var temp = "";
             for(key in this._cookieVarObj){
                 temp += "_cookieVarObj[" + key + "]:" + this._cookieVarObj[key] + "/";
             }
            //alert(temp);
        }
    };


    /***
     *
     * @param key
     * @return {String}
     */
    p.getData = function(key){
        var value = "";
        if(this._localStorageFlg){
            value = localStorage.getItem(key);
        }else{
            //localStorageが使えない場合の処理
            if(this._cookieVarObj != null && this._cookieVarObj.hasOwnProperty(key)){
                value = this._cookieVarObj[key];
            }
        }
        if(value == null || value == undefined){
            value = "";
        }
        return value;
    };

    /***
     *
     * @param key
     * @param value
     */
    p.setData = function(key, value){
        if(this._localStorageFlg){
            localStorage.setItem(key, value);
        }else{
            var expire = new Date();
            expire.setYear(expire.getFullYear()+1);
            var cookieVarString = key + "=" + encodeURIComponent( value ) + ";path=/;expires=" + expire.toUTCString();
            //localStorageが使えない場合の処理
            document.cookie = cookieVarString;
        }
    };

    /***
     * 各ドメインの各コンテンツに紐づくデータを取得
     * @param key
     * @return {String}
     */
    p.getDataForContentUser = function(key){
        var value = "";
        if(this._localStorageFlg){
            try{
                if(this._localStorageObjForContentUser != null &&
                    this._localStorageObjForContentUser.hasOwnProperty(key)){
                    value = this._localStorageObjForContentUser[key];
                }
            }catch(e){
            }
        }else{
            //var newKey = encodeURIComponent(this._userInfo + "_" + key);
            var newKey = key;
            //localStorageが使えない場合の処理
            if(this._cookieVarObj != null && this._cookieVarObj.hasOwnProperty(newKey)){
                value = this._cookieVarObj[newKey];
            }
        }
        if(value == null || value == undefined){
            value = "";
        }
        return value;
    };

    /***
     * 各ドメインの各コンテンツに紐づくデータを保存
     * @param key
     * @param value
     */
    p.setDataForContentUser = function(key, value){
        if(this._localStorageFlg){
            try{
                this._localStorageObjForContentUser[key] = value;
                var objString = JSON.stringify(this._localStorageObjForContentUser);
                localStorage.setItem(this._localStorageObjForContentUserKey, objString);
            }catch(e){
            }
        }else{
            //var newKey = encodeURIComponent(this._userInfo + "_" + key);
            var newKey = key;
            var expire = new Date();
            expire.setYear(expire.getFullYear()+1);
            var cookieVarString = newKey + "=" + encodeURIComponent( value ) + ";expires=" + expire.toUTCString();
            //localStorageが使えない場合の処理
            document.cookie = cookieVarString;
        }
    };

    /***
     *
     * @return {Object}
     * @private
     */
    p._getGetCookies = function(){
        var result = new Object();
        var allcookies = document.cookie;
        //alert("Get cookieData:" + allcookies);
        if( allcookies != '' )
        {
            var cookies = allcookies.split( ';' );
            for( var i = 0; i < cookies.length; i++ )
            {
                // 前後のスペースをカットする
                var tmp = cookies[ i ].replace(/^\s+|\s+$/g, "");
                var cookie = tmp.split( '=' );

                // クッキーの名前をキーとして 配列に追加する
                result[cookie[0]] = decodeURIComponent( cookie[1]);
            }
        }
        /*
        for(key in result){
            alert("resutl[" + key + "]:" + result[key]);
        }
        */
        return result;
    }
    /***
     * ブラウザがlocalStorageに対応しているかどうかを確認
     * @return {Boolean}
     * @private
     */
    p._checkLocalStorage = function(){
        var flg = false;
        try{
            if(('localStorage' in window) && window['localStorage'] !== null){
                //localStrage対応なら、テストでストレージをセット
                localStorage.setItem('test', 'test');
                //テストでセットしたlocalStorageを変数として定義
                var test = localStorage.getItem('test');
                if(test){
                    flg = true;
                }else{
                    flg = false;
                }
            }
        }catch(e){
            flg = false;
        }
        return flg;
    };
    flipperjs.LocalStorageController =  LocalStorageController;
}(window));
