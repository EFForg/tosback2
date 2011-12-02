/* 
// this class encapsulates client side functionality of a full-screen takeover
// @author Andrew Burgess
*/

var TakeOverLib = function() {
	var W3C = (!document.all && document.getElementById);
	var IE = (document.all);
	var ns4 = (document.layers);
	var v_debug = false;
	var vPathName = '';
	var version = navigator.appVersion;
	var IE6 = (version.indexOf("MSIE 6.0") != -1) ? true : false;
	var isIE = (version.indexOf("MSIE") != -1) ? true : false;
	var isWin = (version.toLowerCase().indexOf("win") != -1) ? true : false;
	var isOpera = (navigator.userAgent.indexOf("Opera") != -1) ? true : false;
	var isIphone = (navigator.userAgent.indexOf("iPhone") != -1) ? true : false;
	var isIpad = (navigator.userAgent.indexOf("iPad") != -1) ? true : false;
	var isWebkit = (navigator.userAgent.indexOf("AppleWebKit") != -1) ? true : false;
	var pWidth = 980;
	var pHeight = 800;
	var pSwfHeight = 980;
	var pSwfWidth = 800;
	this.doDebug = function(str, e) {
		if (v_debug) {
			if (e) {
				if ( typeof(console) != 'undefined' ) {
					console.error("error in "+e);
				} else {
					alert("error in "+e);
				}
			} else {
				if ( typeof(console) != 'undefined' ) {
					console.warn(str);
				} else {
					alert(str);
				}
			}
		}
	};
	
	this.shunt = function(fPath, parent) {
		var pParent = document.getElementsByTagName(parent)[0];
		var pScript = document.createElement('script');
		pScript.setAttribute('type','text/javascript');
		pScript.setAttribute('src',fPath);
		pParent.appendChild(pScript);
	};
	
	this.init = function(options) {
		if (options) {
			
		}
		if (typeof swfobject === 'undefined') {
			this.shunt('http://www.att.com/media/en_US/scripts/flash.js', 'head');
		}
	};
	
	this.centerDiv = function(param,cutVert) {
		try {
			var dsocLeft=0, dsocTop=0;
			obj = document.getElementById(param);
			if (IE) {
				var iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
				winH = parseInt(iebody.clientHeight / 2, 10);
				winW = parseInt(iebody.clientWidth / 2, 10);
				dsocLeft = iebody.scrollLeft;
				dsocTop = iebody.scrollTop;
			} else {
				winH = parseInt(window.innerHeight / 2, 10);
				winW = parseInt(window.innerWidth / 2, 10);
				dsocLeft = window.pageXOffset;
				dsocTop = window.pageYOffset;
			}
			
			var top = dsocTop + winH - parseInt(obj.offsetHeight / 2, 10);
			var left = dsocLeft + winW - parseInt(obj.offsetWidth / 2, 10);
			if (!cutVert) {
				obj.style.top = top + "px";
			}
			obj.style.left = left + "px";
			
		} catch(e) {
			this.doDebug(arguments.callee.toString(), e);
		}
	};
	
	this.beginScreenTakeover = function(options, isQMC) {
		var body = document.getElementsByTagName('body')[0];
		var mPath;
		var vars = {};
		var params = {wmode: "transparent"};
		var attributes = { id:'takeoverSwf', name:'takeoverSwf' };
		
		if (options) {
			var optionsArr = options.split('|');
			mPath = optionsArr[0];
			pHeight = optionsArr[1];
			pWidth = optionsArr[2];
			pSwfHeight = optionsArr[3];
			pSwfWidth = optionsArr[4];
		}
		
		if (!document.getElementById('st_mainBlocker')) {
			var pSTDiv = document.createElement('div');
			pSTDiv.setAttribute('id', 'st_mainBlocker');
			
			pSTDiv.setAttribute('style', 'position: absolute; top:171px; width:'+pWidth+'px; height:'+pHeight+'px; margin-left:-7px; z-index:600; display: none;');
			if(isWebkit) {
				pSTDiv.setAttribute('style', 'position: absolute; top:170px; width:'+pWidth+'px; height:'+pHeight+'px; margin-left:-8px; z-index:600; display: none;');
			}
			if(IE) {
				pSTDiv.style.setAttribute('cssText', 'display: none; position: absolute; top:170px; width:'+pWidth+'px; height:'+pHeight+'px; margin-left:-1px; z-index:600; display: none;');
			}
			if(isQMC) { //fix for Quick Messaging Center
				pSTDiv.style.top = '219px';
				pSTDiv.style.marginLeft = '-6px';
				if(isWebkit) {
					pSTDiv.style.top = '218px';
					pSTDiv.style.marginLeft = '-7px';
				}
				if(IE) {
					pSTDiv.style.top = '234px';
					pSTDiv.style.marginLeft = '2px';
				}
			}
			body.appendChild(pSTDiv);
			var STObject = document.createElement('div');
			STObject.setAttribute('id', 'takeoverSwf');
			STObject.setAttribute('style', 'position: absolute; top:5px; width:'+pWidth+'px; height:'+pHeight+'px;');
			if(IE) {
				STObject.style.setAttribute('cssText', 'display: none; position: absolute; top:5px; width:'+pWidth+'px; height:'+pHeight+'px;');
			}
			document.getElementById('st_mainBlocker').appendChild(STObject);
		}
		
		swfobject.embedSWF(mPath, "takeoverSwf", pSwfWidth, pSwfHeight, "10.0", "/media/en_US/swf/uverse_center/js/expressInstall.swf", vars, params, attributes );
		
		if (typeof window.addEventListener != 'undefined') {
	    	window.addEventListener('resize',reCenterTakeoverDiv,false);
	    } else if (typeof window.attachEvent != 'undefined') {
	    	window.attachEvent('resize',reCenterTakeoverDiv,false);
	    }
		if (swfobject.hasFlashPlayerVersion('10.0')) {
			this.doTakeover();
		}
	};
	
	this.doTakeover = function() {
		var thisPtr = this;
		var pInterval = window.setInterval(function () {
			if (takeoverSwf.okayToProceed()) {
				document.getElementById('st_mainBlocker').style.display = 'block';
				thisPtr.centerDiv('st_mainBlocker', true);
				clearInterval(pInterval);
			}
		}, 500);
		if(document.getElementById('st_mainBlocker').style.display == 'block') {
			clearInterval(pInterval);
		}
	};
	
	this.endScreenTakeover = function(options) {
		var body = document.getElementsByTagName('body')[0];
		document.getElementById('st_mainBlocker').innerHTML = '';
		body.removeChild(document.getElementById('st_mainBlocker'));
	};
};

var STUtils = new TakeOverLib();
STUtils.init();
function reCenterTakeoverDiv() {
	STUtils.centerDiv('st_mainBlocker', true);
}
// fake takeoverSwf object for unit testing
var takeoverSwf = new Object();
takeoverSwf.okayToProceed = function() {
	return true;
};