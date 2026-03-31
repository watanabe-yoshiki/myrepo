this.mfl = this.mfl||{};

(function() {

    var FlipperAPI = function(window) {
        this.initialize(window);
    }
    var p = FlipperAPI.prototype = {};

    p.mflContent = null;

    p.events = [];

    p.initialize = function(window) {
        this.mflContent = window;
    }

    p.flipL = function(){
        this.mflContent.mflAction({"name": "flipL"});
    };

    p.flipLMax = function(){
        this.mflContent.mflAction({"name": "flipLMax"});
    };

    p.flipR = function(){
        this.mflContent.mflAction({"name": "flipR"});
    };

    p.flipRMax = function(){
        this.mflContent.mflAction({"name": "flipRMax"});
    };

    p.flipPage = function(page){
        this.mflContent.mflAction({"name": "flipPage", "page": page});
    };

    p.zoomIn = function(){
        this.mflContent.mflAction({"name": "zoomIn"});
    };

    p.zoomOut = function(){
        this.mflContent.mflAction({"name": "zoomOut"});
    };

    p.on = function(eventname, callback){
        // initialized
        // flipStart
        // flipStop
        // zoomStart
        // zoomStop
        // dragStart
        // dragStop
        this.events.push({"eventname": eventname, "callback": callback});
    };

    p.mflEvent = function(obj) {
        var l = this.events.length;
        for (var i = 0; i < l; i++) {
            if (this.events[i].eventname == obj.name) {
                this.events[i].callback(obj);
            }
        }
    }

    mfl.FlipperAPI = FlipperAPI;
}());

