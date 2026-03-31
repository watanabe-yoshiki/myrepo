var Message;
if (!window.Message) {
    Message = new Object();
}


//※ロケールリソース
//※ja_JP
Message["ja_JP"] = {};
Message["ja_JP"].locale = "ja_JP";
Message["ja_JP"].PASSWORD_MESSAGE = "PASSWORD";
Message["ja_JP"].PASSWORD_FAILURE = "パスワードが違います。";
Message["ja_JP"].SCORE_FAILURE = "通信に失敗しました。";
Message["ja_JP"].LABEL_USERINFO = "ユーザー情報";
Message["ja_JP"].LABEL_PASSWORD = "パスワード";

//※en_US
Message["en_US"] = {};
Message["en_US"].locale = "en_US";
Message["en_US"].PASSWORD_MESSAGE = "PASSWORD";
Message["en_US"].PASSWORD_FAILURE = "Password is wrong.";
Message["en_US"].SCORE_FAILURE = "Network Error!";
Message["en_US"].LABEL_USERINFO = "User Information";
Message["en_US"].LABEL_PASSWORD = "Password";


//※keyによる取得
function getLocaleResource(locale) {
    var _localeResource;
    if (locale) {
        _localeResource = Message[locale];
    } else {
        var _locale = browserLanguage();
        switch (_locale) {
            case "ja":
            case "ja_JP":
                _locale = "ja_JP";
                break;
            case "en":
            case "en_US":
                _locale = "en_US";
                break;
            default:
                _locale = "en_US";
                break;
        }
        _localeResource = Message[_locale];
    }
    return  _localeResource;
}

//※keyによる取得
function getMessageText(lang, key) {
    return Message[lang][key];
}

function browserLanguage() {
    try {
        return (navigator.browserLanguage || navigator.language || navigator.userLanguage);
    }
    catch (e) {
        return undefined;
    }
}