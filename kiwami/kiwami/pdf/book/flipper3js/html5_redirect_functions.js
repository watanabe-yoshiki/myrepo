var DCProductURLs = {
"html": "html5.html"
};

function redirecthtml5(scormscoretype){
  var hs = window.location.hash;
  var p = hs.substr(1)
  if(Number(p)>0) hs = "#page="+p;
  var sr = window.location.search;
  if(scormscoretype != "") {
    if (sr == "") {
      sr = "?" + scormscoretype;
    } else {
      sr += "&" + scormscoretype;
    }
  }
  if(hs=="") hs = "#page=1";
  window.location.href = DCProductURLs["html"] + sr + hs;
}
