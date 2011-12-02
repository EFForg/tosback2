//<![CDATA[
//To get attPersistantLocalization cookie
function getTopCookie(name) {
	var dc = document.cookie;
    var cname = name + "=";
    var clen = dc.length;
    var cbegin = 0;
    while (cbegin < clen) {
	    var vbegin = cbegin + cname.length;
		if (dc.substring(cbegin, vbegin) == cname) {
	        var vend = dc.indexOf (";", vbegin);
            if (vend == -1) vend = clen;
	            return unescape(dc.substring(vbegin, vend));
            }
            cbegin = dc.indexOf(" ", cbegin) + 1;
            if (cbegin== 0) break;
        }
        return null;
}
function cleanup() {
	document.searchForm.query.value="";
}
//]]>