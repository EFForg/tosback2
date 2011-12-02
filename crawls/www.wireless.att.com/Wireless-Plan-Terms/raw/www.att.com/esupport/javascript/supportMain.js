

jQuery(document).ready(function(){
	tertiery();
	popupHandler();
	supportSettings();
	loadOverlayAndHover();
	prepareChatLink();
	hideEmptyTiles();
});


function loadOverlayAndHover() {
	// jTip Theme rollovers -- sticky!
	jQuery('a.jt').cluetip({
		local: false,   // default value, but wasn't working for ajax
	    cluetipClass: 'jtip', 
	    arrows: true, 
	    dropShadow: true,
	    sticky: true,
	    activation: 'click',
	    mouseOutClose: false,
	    closePosition: 'top',
		topOffset: 50, 
		showTitle: false,
		width: 220,
		positionBy: 'auto',
    	closeText: '<img src="/esupport/images/buttons/btn_close_x.gif" alt="close" />'
	});
  
	// default theme static rollovers not sticky
	jQuery('a.jtstat').cluetip({
		local: false,   // default value, but wasn't working for ajax
		cluetipClass: 'default', 
		arrows: true, 
		dropShadow: true,
		topOffset: 50, 
		width: 255,
		positionBy: 'auto',
		showTitle: false
	});
	  
	// default theme static rollover not sticky 153 px
	jQuery('a.jtstatNarrow').cluetip({
		local: false,  // default value, but wasn't working for ajax
		cluetipClass: 'default', 
		arrows: true, 
		dropShadow: true,
		topOffset: 50, 
		width: 153,
		positionBy: 'auto',
		showTitle: false
	});
}


function popupHandler(){
	jQuery(".popup").click(function(){		
		var relDim = jQuery(this).attr('rel');
		var dim = relDim.split("x");
		if(relDim == "" || relDim == null){
			var w = "800";
			var h = "600";
		}
		else{
			var w = dim[0];
			var h = dim[1];
		}		
		window.open(this.href,'Popup','toolbar=0,scrollbars=0,location=0,menubar=0,resizable=1,width='+w+',height='+h+'');
		return false;
	});
}

function tertiery(){
		
	var timeout    = 200;
	var closetimer = 0;
	var subnavitem = 0;
	
	jQuery("a.hasDropdown").each(function(){ 
		var tLink = jQuery(this).width()+31;
		jQuery(this).parent().css({"width":tLink});	
		jQuery(this).parent().next().css({"width":tLink});	
		//jQuery(this).parent().next().css({"border":"1px solid #000"});
	});
		
	function subnav_open(){
		if(jQuery(this).children().next().hasClass("tertiery")){
			subnav_canceltimer();
			subnav_close();
			subnavitem = jQuery(this).children().next().show();
			jQuery(this).addClass("secondaryLeftShadow");
			jQuery(this).children().addClass("secondaryRightShadow");
			jQuery(this).children().children().addClass("whiteBG downArrow")
			
			if(navigator.appName=="Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 6.")>-1)) {
				if(jQuery(this).children().children().hasClass("supportSettingsWidth") && jQuery("#cv").length > 0) {
					jQuery("#fakeSelect").attr("style","display:inline");
					jQuery("#cv").hide();
				}
				
				if(jQuery(this).children().children().hasClass("internetNavLink") && jQuery("#solutionFinderAnswerIdDropdown").length > 0) {
					jQuery("#fakeSolutionFinderAnswerIdImage").show();
					jQuery("#solutionFinderAnswerIdDropdown").hide();
				}
			}
		}
	}
	
	function subnav_close(){
		if(navigator.appName=="Microsoft Internet Explorer" && (navigator.appVersion.indexOf("MSIE 6.")>-1)) {
			if(jQuery("#cv").length > 0) {
				jQuery("#fakeSelect").attr("style","display:none;");
				jQuery("#cv").show();
			}
	
			if(jQuery("#solutionFinderAnswerIdDropdown").length > 0) {
				jQuery("#fakeSolutionFinderAnswerIdImage").hide();
				jQuery("#solutionFinderAnswerIdDropdown").show();
			}
		}
		
		if(subnavitem) subnavitem.hide();
		jQuery("a.hasDropdown").parent().parent().removeClass("secondaryLeftShadow");
		jQuery("a.hasDropdown").parent().removeClass("secondaryRightShadow");
		jQuery("a.hasDropdown").removeClass("whiteBG downArrow");
		jQuery("p.hasDropdown").parent().parent().removeClass("secondaryLeftShadow");
		jQuery("p.hasDropdown").parent().removeClass("secondaryRightShadow");
		jQuery("p.hasDropdown").removeClass("whiteBG downArrow");
	}
	
	function subnav_timer(){
		closetimer = window.setTimeout(subnav_close, timeout);
	}
	
	function subnav_canceltimer(){
		if(closetimer){
			window.clearTimeout(closetimer);
			closetimer = null;
		}
	}
	
	jQuery('.subnav > li').bind('mouseenter', subnav_open)	
	jQuery('.subnav > li').bind('mouseleave', subnav_timer)	
	
	//document.onclick = subnav_close;
}

function supportSettings() {			
	jQuery('#support_hover').append( jQuery('#support_hover_content').html() );	
}

/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', {expires: 7, path: '/', domain: 'jquery.com', secure: true});
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }prepareChatLink
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        var path = options.path ? '; path=' + options.path : '';
        var domain = options.domain ? '; domain=' + options.domain : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};

function resetForm(id) {
	jQuery('#'+id).each(function(){
	        this.reset();
	});
}

function prepareChatLink() {
	jQuery('a.chat').live('click', function () {
		var c_cltcookie=jQuery.cookie("attPersistantLocalization");
	if(c_cltcookie!=null && c_cltcookie!='' )
	{
		var serviceCode = jQuery('input#additionalSupportServiceCodeForChat').val();
		var regionCode = jQuery('input#additionalSupportRegionFolderCode').val();

		if( serviceCode != '820' && serviceCode != '821' ){
			var url = 'https://pattta.att.motive.com/netagent/questionnaire_c2c_dsl_sw.aspx';
			if ( serviceCode == '803' ||
					serviceCode == '812' ||
					serviceCode == '813' ||
					serviceCode == '814' ) {
				url = 'https://pattta.att.motive.com/netagent/questionnaire_uverse.aspx';
			} else if ( regionCode.indexOf('71') == 0 ) {
				url = 'https://pattta.att.motive.com/netagent/questionnaire_c2c_dsl_se.aspx';
			}
			var popup_options = 'menubar=no,toolbar=no,scrollbars=no,resizable=no,width=472,height=350';
			var newWin = window.open(url, "attchat", popup_options);
			newWin.focus();
			return false;
		}
		
		return true;
		}	
	else
	{		
			jQuery.nyroModalManual({
			autosizeable: false,
			url: '/esupport/akamai-header/localizationModelOverlay.jsp?invokeFrom=chat',
			modal:false,
			width: 650,
			height: 350
			});				
		return false;
	}
	});
}

function hideEmptyTiles() {
	jQuery('div.empty-tile').parent().hide();
}

// The Teamsite CIF team uses the method name with a capital 'S' .......
function ShowKiosk(contentId){
		jQuery.get('/esupport/sharedSegments/kioskContentItem.jsp?contentItemId='+contentId, function (data) { 
		jQuery('#kioskID').html(data);
		});
}


//The original dev team implementation was to use the method name with a lower-case 's' .......
//function showKiosk(contentId){
	//jQuery.get('/esupport/sharedSegments/kioskContentItem.jsp?contentItemId='+contentId, function (data) { 
	//jQuery('#kioskID').html(data);
	//});
//}

function ShowFeaturesKiosk(contentId){
	var isDSelected = isDeviceSelected();
	if(isDSelected==false){
		var currentURL=document.URL;
		var returnUrl;
		if(currentURL.indexOf('?')!=-1){
			returnUrl=currentURL+'&contentItemidParam='+contentId;
		}else
		{
			returnUrl=currentURL+'?contentItemidParam='+contentId;
		}
		openDeviceModel(returnUrl);
	}else{
		jQuery.get('/esupport/sharedSegments/kioskContentItem.jsp?contentItemId='+contentId, function (data) { 
		jQuery('#kioskID').html(data);
		});
	}
}

function openVirtuOzChat(chatName){
	var clt_cookie = jQuery.cookie("attPersistantLocalization");
	if(clt_cookie =null && clt_cookie ==''){
		//commented for JIRA ticket ECAR1105-82
		//VirtuOzVars.ui.zip= '';
		//VirtuOzVars.ui.st= '';
	}
	VirtuOz.AgentLoader.loadAgent(chatName);
}
function ShowMoreFeatures(){
	location.replace('/esupport/main.jsp?ct=9003621&pv=2'); 
}

function checkLabelLenth(label){
	if(label.length>60){
		return label.substring(0,56)+"...";
	}
	return label;
}

function ChangeService()
{
	var cvCode = document.getElementById("cvCode").value;
	location.href="main.jsp?cv="+cvCode;
}
showTips = function(id) {

	jQuery('#'+id).fadeIn('slow');
}

hideTips = function(id) {
	jQuery('#'+id).fadeOut('slow');
}


