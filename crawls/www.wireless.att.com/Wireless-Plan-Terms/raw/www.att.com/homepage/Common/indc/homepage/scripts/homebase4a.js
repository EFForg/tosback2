/* Version 1.2 last updated by Andrew Burgess on 01-06-2009 */
try{document.execCommand('BackgroundImageCache', false, true);} catch(e){}

/* SWFObject v2.1 <http://code.google.com/p/swfobject/>
    Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
    This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

/* WINDOWS ONLOAD */
jQuery(document).ready(function() {
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
        document.title = "AT&T";
    }
	if ( jQuery('.userInputNote') != 0 ){
		if ( jQuery('#numWireless').val() != '' ) jQuery('#numWireless + .userInputNote').hide();
		if ( jQuery('#accUverse').val() != '' ) jQuery('#accUverse + .userInputNote').hide();
		if ( jQuery('#userAccountmanager').val() != '' ) jQuery('#userAccountmanager + .userInputNote').hide();
	}
});

/* Caps lock detection */
function capsLock(e) {
   var s = String.fromCharCode( e.which ), caps = jQuery('.capsLock');
   if ( s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey ) {
   	caps.show();
   }else {
   	caps.hide();
   }
}

function autotab(event) {
	var formname = event.data.selectedApp;
	var curr_field = jQuery(this);
	var char_count = event.data.charCount;
	
    var Val;    
    var isNN = (navigator.appName.indexOf("Netscape")!=-1);
    var theEvent = window.event || arguments.callee.caller.arguments[0];    
    Val = (isNN) ? theEvent.which : theEvent.keyCode;

    //CHECKING FOR THE SHIFT KEY OR THE TAB KEY BEING PRESSED
    if (Val == 16 || Val == 9 || Val == 36 || Val == 37 || Val == 39 || Val == 46) {
    } else {
       var field_length = curr_field.val().length;
       if (char_count == field_length) { 
    	   var nonHiddenInputs = jQuery('#' + formname + ' input[type!=hidden]');
    	   nonHiddenInputs.each(function(index) {
    		   if (jQuery(this).attr('name') == curr_field.attr('name')) {
    			   if ((nonHiddenInputs.eq(index + 1).attr('type') == 'text') || (nonHiddenInputs.eq(index + 1).attr('type') == 'password')) {
    				   nonHiddenInputs.eq(index + 1).focus();
    				   return false;
    			   }
    		   }
    	   });
       }
    }
}

function loginOnload() {
    var cookie = getCookie("colam_ctn"), myApp, myC, domain, order = [], cookiejar = [], numWireless = jQuery('#numWireless'), userAcctMgr = jQuery('#userAccountmanager'), accUverse = jQuery('#accUverse');
	
    if(cookie != null) {
		cookiejar = cookie.split(";");
		
		if ( cookiejar[6] == "rme_m=Y" ) {
			myApp = "accountmanager";
			myC = cookiejar[5].split("=");
			domain = cookiejar[7].split("=");
			userAcctMgr.val(myC[1] + domain[1]);
			jQuery('#remAccountmanager').attr('checked', true);
			jQuery('#userAccountManager + .userInputNote').hide();
			order.push(myApp);
		}
		if ( cookiejar[3] == "rme_u=Y" ) {
			myApp = "uverse";
			myC = cookiejar[2].split("=");
			domain = cookiejar[4].split("=");
			accUverse.val(myC[1] + domain[1]);
			jQuery('#remUverse').attr('checked', true);
			jQuery('#accUverse + .userInputNote').hide();
			order.push(myApp);
		}
		if ( cookiejar[1] == "rme_i=Y" ) {
			myApp = "wireless";
			myC = cookiejar[0].split("=");
			numWireless.val(myC[1]);
			jQuery('#remWireless').attr('checked', true);
			jQuery('#numWireless + .userInputNote').hide();
			order.push(myApp);
		}
    }
    else {
        myApp = 'nonce';
		order.push("wireless");
    }
    loginSwitch(order[0]);
}

function loginSwitch(appToSelect) {
    var getSelectValue = jQuery('#login-select').val();
    if(typeof appToSelect != 'undefined') {
        switch(appToSelect) {
            case 'wireless':
                getSelectValue = 'wireless';
            break;
            case 'accountmanager':
                getSelectValue = 'account';
            break;
            case 'uverse':
                getSelectValue = 'uverse';
            break;
            case 'none':
                getSelectValue = 'wireless';
            break;
        }
    }

    if(getSelectValue == "wireless") {
    	jQuery('#login-select option[value=wireless]').attr('selected', 'selected');
    	jQuery('#divWireless').show();
        jQuery('#divAccountmanager').hide();
        jQuery('#divUverse').hide();
        jQuery('#numWireless').bind('keyup', {selectedApp:'Wireless', charCount:50}, autotab);

    }
    else if(getSelectValue == "account") {
        jQuery('#login-select option[value=account]').attr('selected', 'selected');
        jQuery('#divWireless').hide();
        jQuery('#divAccountmanager').show();
        jQuery('#divUverse').hide();   
    }
    else if(getSelectValue == "uverse") { 
        jQuery('#login-select option[value=uverse]').attr('selected', 'selected');
        jQuery('#divWireless').hide();
        jQuery('#divAccountmanager').hide();
        jQuery('#divUverse').show();  
    }
    if(typeof loginShadow != 'undefined') {
    	setTimeout("loginShadow.show()", 2000);
    }
}

// Check #accUverse input: Verify U-verse Member ID is an email address in valid format
function isValidEmail(emailAddress) {
		return (/^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(emailAddress));
	}

// This function replaces removeSpaces(string) and removeHyphens(string) for #numWireless input
// For Wireless Number, return only digits.
function cleanString(str) {
	return str.replace(/[^\d]/g, "");
}

function removeSpaces(string) {
    return string.split(' ').join('');
}

function removeHyphens(string) {
    var str = string.split('-').join('');
    if (str != "" && str.length>0) {            
        if(isNaN(str)){                
            return string;
        }else{
            return str;
        }
    } else {
        return "";
    }
}

function remMe(appNameOLD) {
	var appName = jQuery(this).attr('id'), cred = '', app = '', oldCookie = getCookie("colam_ctn"), value, loginFormName, uvals = jQuery('#accUverse').val().split("@"), mvals = jQuery('#userAccountmanager').val().split("@"), numWirelessVal = jQuery('#numWireless').val(), cookiejar;
	
	if ( oldCookie != null ) cookiejar = oldCookie.split(";");
    
	if(jQuery(this).is(':checked') == false) {
        if ( appName == "remWireless" ) {
			if ( cookiejar != null ) {
				cookiejar[1] = "rme_i=N"; cookiejar[0] = "i=";
				value = cookiejar.join(";");
			}else {
				value = "i=;rme_i=N;u=;rme_u=N;ud=;m=;rme_m=N;md=;";
			}
		}
		if ( appName == "remUverse" ) {
			if ( cookiejar != null ){
				cookiejar[3] = "rme_u=N"; cookiejar[2] = "u="; cookiejar[4] = "ud=";
				value = cookiejar.join(";");
			}else {
				value = "i=;rme_i=N;u=;rme_u=N;ud=;m=;rme_m=N;md=;";
			}
		}
		if ( appName == "remAccountmanager" ) {
			if ( cookiejar != null ){
				cookiejar[6] = "rme_m=N"; cookiejar[5] = "m="; cookiejar[7] = "md=";
				value = cookiejar.join(";");
			}else{
				value = "i=;rme_i=N;u=;rme_u=N;ud=;m=;rme_m=N;md=;";
			}
		}
		setCookie("colam_ctn",value,"365","/","");
		
        loginFormName = 'none';
    } else {
        loginFormName = appName.substr(3,appName.length);
    }
    
    switch(loginFormName) {
        case 'Wireless':
            cred = jQuery('#numWireless').val();
            app = 'wireless';
        break;
        case 'Accountmanager':
            cred = jQuery('#userAccountmanager').val();
            app = 'accountmanager'; 
        break;
        case 'Uverse':
            cred = jQuery('#accUverse').val(); 
            app = 'uverse';
        break;
    }
    if(loginFormName != 'none') {
        if ( appName == "remWireless" ) {
			if ( oldCookie != null ) {
				cookiejar[1] = "rme_i=Y"; cookiejar[0] = "i=" + numWirelessVal;
				value = cookiejar.join(";");
			}else {
				value = "i=" + numWirelessVal + ";rme_i=Y;u=;rme_u=N;ud=;m=;rme_m=N;md=;";
			}
		}
		if ( appName == "remUverse" ) {
			if ( oldCookie != null ){
				cookiejar[3] = "rme_u=Y"; cookiejar[2] = "u=" + uvals[0]; cookiejar[4] = "ud=" + uvals[1];
				value = cookiejar.join(";");
			}else {
				value = "i=;rme_i=N;u=" + uvals[0] + ";rme_u=Y;ud=" + uvals[1] + ";m=;rme_m=N;md=;";
			}
		}
		if ( appName == "remAccountmanager" ) {
			if ( oldCookie != null ){
				cookiejar[6] = "rme_m=Y"; cookiejar[5] = "m=" + mvals[0]; cookiejar[7] = "md=" + mvals[1];
				value = cookiejar.join(";");
			}else{
				value = "i=;rme_i=N;u=;rme_u=N;ud=;m=" + mvals[0] + ";rme_m=Y;md=" + mvals[1] +";";
			}
		}
		setCookie("colam_ctn",value,"365","/","");
    }
}

function setCookie( name, value, expires, path, domain, secure ){
    var today = new Date(), expires_date = new Date( today.getTime() + (expires) );
    today.setTime( today.getTime() );
    if ( expires ){
        expires = expires * 1000 * 60 * 60 * 24;
    }
    document.cookie = name + "=" + escape(( value )) +
    ( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) + 
    ( ( path ) ? ";path=" + path : "" ) + 
    ( ( domain ) ? ";domain=" + domain : "" ) +
    ( ( secure ) ? ";secure" : "" );
}

function getCookie(name) {
    var dc = document.cookie, cname = name + "=", clen = dc.length, cbegin = 0, vbegin, vend;
    while (cbegin < clen) {
		vbegin = cbegin + cname.length;
		if (dc.substring(cbegin, vbegin) == cname) {
			vend = dc.indexOf (";", vbegin);
			if (vend == -1) vend = clen;
				return unescape(dc.substring(vbegin, vend));
		}
		cbegin = dc.indexOf(" ", cbegin) + 1;
		if (cbegin== 0) break;
	}
	return null;
}

function submitOnEnter(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode
    	jQuery(this).parents('form:first').submit();

    }
}

var loginShadow;

jQuery(document).ready(function() {

	//  onBlur validation for Wireless Account user field: Wireless Number
	jQuery("#numWireless").blur(function() {
		var thisUserInput = jQuery(this);
		// NOTE: input is pre-sanitized: onblur="this.value=cleanString(this.value);"
		var numChars = thisUserInput.val().length;
		var inError = thisUserInput.closest("fieldset").prev(".formErrorMessage").is(":visible") ? 'yes' : 'no';
			// show userInputNote if field not in error
			if (inError == 'no') {
				thisUserInput.closest("fieldset").children(".userInputNote").show();
			}
			// show field in error if we don't have ten digits
			if (numChars != 10 && numChars > 0) {
				thisUserInput.closest("fieldset").children("span.textInput-wrapper").addClass("error");
				thisUserInput.closest("fieldset").find("span.textInput-wrapper span").addClass("error");
				thisUserInput.closest("fieldset").prev(".formErrorMessage").show();
				thisUserInput.closest("fieldset").children(".userInputNote").hide();
			}
			// remove error classes if we have ten digits; hide userInputNote
			else if (numChars == 10) {
				thisUserInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
				thisUserInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
				thisUserInput.closest("fieldset").prev(".formErrorMessage").hide();
				thisUserInput.closest("fieldset").children(".userInputNote").hide();
			}
			// allow user to clear field; show userInputNote
			else if (numChars == 0 ) {
				thisUserInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
				thisUserInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
				thisUserInput.closest("fieldset").prev(".formErrorMessage").hide();
				thisUserInput.closest("fieldset").children(".userInputNote").show();
			}
		
		jQuery("#numWireless").focus(function() {
			jQuery(this).closest("fieldset").children(".userInputNote").hide();
		});
    });
	
	// onBlur validation for Home Phone and Internet user field: Username
	jQuery("#userAccountmanager").blur(function() {
		var thisUserInput = jQuery(this);
		var numChars = thisUserInput.val().length;
		var inError = thisUserInput.closest('fieldset').prev(".formErrorMessage").is(":visible") ? 'yes' : 'no';
			// show userInputNote if field not in error
			if (inError == 'no') {
				thisUserInput.closest('fieldset').children('.userInputNote').show();
			}
			// remove error classes if we have input; hide userInputNote
			if (numChars > 0) {
				thisUserInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
				thisUserInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
				thisUserInput.closest('fieldset').prev(".formErrorMessage").hide();
				thisUserInput.closest('fieldset').children('.userInputNote').hide();
			}
			// allow user to clear field; show userInputNote
			else if (numChars == 0) {
				thisUserInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
				thisUserInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
				thisUserInput.closest('fieldset').prev(".formErrorMessage").hide();
				thisUserInput.closest('fieldset').children('.userInputNote').show();
			}
		
		jQuery("#userAccountmanager").focus(function() {
			jQuery(this).closest("fieldset").children(".userInputNote").hide();
		});
    });
	
	// onBlur validation for ATT U-verse user field: U-verse Member ID
		jQuery("#accUverse").blur(function() {
			var thisUserInput = jQuery(this);
			var userInput = jQuery("#accUverse").val();
			var numChars = thisUserInput.val().length;
			var inError = thisUserInput.closest('fieldset').prev(".formErrorMessage").is(":visible") ? 'yes' : 'no';
				// show userInputNote if field not in error
				if (inError == 'no') {
					thisUserInput.closest('fieldset').children('.userInputNote').show();
				}
				// show field in error if we don't have valid input; hide userInputNote
				if (!(isValidEmail(userInput))) {
					thisUserInput.closest("fieldset").children("span.textInput-wrapper").addClass("error");
					thisUserInput.closest("fieldset").find("span.textInput-wrapper span").addClass("error");
					//thisUserInput.closest('fieldset').prev(".formErrorMessage p").text(""); // jQuery doesn't like this. Use instead:
					jQuery("#divUverse .formErrorMessage:first p").text("Please check that your email address is in valid format. (Example: jane@att.net)");
					thisUserInput.closest('fieldset').prev(".formErrorMessage").show();
					thisUserInput.closest('fieldset').children('.userInputNote').hide();
				}
				// remove error classes if we have valid input; hide userInputNote
				if (isValidEmail(userInput)) {
					thisUserInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
					thisUserInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
					thisUserInput.closest('fieldset').prev(".formErrorMessage").hide();
					thisUserInput.closest('fieldset').children('.userInputNote').hide();
				}
				// allow user to clear field; show userInputNote
				else if (numChars == 0) {
					thisUserInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
					thisUserInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
					thisUserInput.closest('fieldset').prev(".formErrorMessage").hide();
					thisUserInput.closest('fieldset').children('.userInputNote').show();
				}

		jQuery("#accUverse").focus(function() {
			jQuery(this).closest("fieldset").children(".userInputNote").hide();
		});
    });
	
	jQuery(".userInputNote").each(function() {
		jQuery(this).click(function() {
			var thisNote = jQuery(this);
			thisNote.hide();
			thisNote.closest('form').find('input[type=text]').focus();
		});
    });
	
	// onBlur validation for 3 password fields: Wireless; Home Phone & Internet; ATT U-verse
	var loginPassBoxes = [jQuery('#passWireless'), jQuery('#passAccountmanager'), jQuery('#passUverse')];
	jQuery(loginPassBoxes).each(function() {
		jQuery(this).blur(function() {
			var thisPassInput = jQuery(this);
			var numChars = thisPassInput.val().length;
			var inError = thisPassInput.closest("fieldset").prev(".formErrorMessage").is(":visible") ? 'yes' : 'no';
				// show userInputNote if field not in error
				if (inError == 'no') {
					thisPassInput.closest("fieldset").children('.passInputNote').show();
				}
				// check whether password is less than 4 characters; hide userInputNote
				if (numChars < 4 && numChars != 0) {
					thisPassInput.closest("fieldset").children("span.textInput-wrapper").addClass("error");
					thisPassInput.closest("fieldset").find("span.textInput-wrapper span").addClass("error");
					thisPassInput.parents("div").find(".formErrorMessage:last p").text("Password must be a minimum of 4 characters.");
					thisPassInput.closest("fieldset").prev(".formErrorMessage").show();	
					thisPassInput.closest("fieldset").children('.passInputNote').hide();
				}
				// remove error classes if we have valid input; hide userInputNote
				if (numChars >= 4) {
				thisPassInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
				thisPassInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
				thisPassInput.closest("fieldset").prev(".formErrorMessage").hide();
				thisPassInput.closest("fieldset").children('.passInputNote').hide();	
				}
				
				// allow user to clear field; show userInputNote
				else if (numChars == 0) {
				thisPassInput.closest("fieldset").children("span.textInput-wrapper").removeClass("error");
				thisPassInput.closest("fieldset").find("span.textInput-wrapper span").removeClass("error");
				thisPassInput.closest("fieldset").prev(".formErrorMessage").hide();	
				thisPassInput.closest("fieldset").children('.passInputNote').show();
				}

		});
		jQuery(this).focus(function() {
			jQuery(this).closest("fieldset").children('.passInputNote').hide();
		});
    });


	jQuery('.passInputNote').each(function() {
		jQuery(this).click(function() {
			var thisNote = jQuery(this);
			thisNote.hide();
			thisNote.closest('form').find('input[type=password]').focus();
		});
    });

	
	var loginTextBoxes = [jQuery('#numWireless'), jQuery('#passWireless'), jQuery('#userAccountmanager'), jQuery('#passAccountmanager'), jQuery('#accUverse'), jQuery('#passUverse')];
	jQuery(loginTextBoxes).each(function() {
		jQuery(this).keypress(submitOnEnter);
    });
	
	jQuery('input[type=checkbox]').each(function() {
		var thisCheckBox = jQuery(this);
		thisCheckBox.change(remMe);
	});
	
	var offset = {
					msie: {zIndex: "-1", top:-27,left:0,height:2,width:2},
					modern: {zIndex: "0", top:-20,left:0,height:0,width:-2}
				};
	var loginSectionDiv = document.getElementById("loginSection");
	loginShadow = new GlobalNav.shadow(loginSectionDiv, "shadowClass", offset, loginSectionDiv.parentNode);
	setTimeout("loginShadow.show()", 2000);
	
	jQuery.fn.uniformCallBack=function(){ 
		setTimeout("loginShadow.show()", 2000);
	}

	jQuery('.servicesPopupMenuWrapper').each(function(index) {		
		currentMenu = document.getElementById('menu' + index);
		currentMenuShadow = new GlobalNav.shadow(currentMenu, "shadowClassBB", offset, currentMenu.parentNode);
		currentMenuShadow.show();			
	});
	
	if( jQuery('.capsLock') != 0 ) {
        jQuery('.capsLock').hide();
        jQuery('#passUverse, #passAccountmanager, #passWireless, #numWireless, #userAccountmanager, #accUverse').keypress(capsLock);
    }
}); // END jQuery(document).ready(function() {

// onSubmit validation for Wireless form
// ----------------
function doWirelessSubmit() {
	document.Wireless.action = formActionHrefPrefix + "/olam/loginAction.doview";
	//document.Wireless.action = "https://www.att.com/olam/loginAction.doview";

	// check Wireless Number
	// note: input is pre-sanitized: onblur="this.value=cleanString(this.value);"
	var userInput = jQuery("#numWireless").val();	
	var passwordInput = jQuery("#passWireless").val();
	var submitUserFailed=false,submitPasswordFailed=false,submitPassLengthFailed=false;
	
	// show field in error if we don't have ten digits
	if (userInput.length != 10) {
		jQuery("#numWireless").focus();
		jQuery("#divWireless span.textInput-wrapper:first").addClass("error");
		jQuery("#divWireless span.textInput-wrapper span:first").addClass("error");
		jQuery("#divWireless .formErrorMessage:first").show();
		jQuery("#divWireless .userInputNote:first").hide();
		submitUserFailed=true;
	} else if (passwordInput == '') {
		// check whether password field is empty	
		jQuery("#passWireless").focus();
		jQuery("#divWireless span.textInput-wrapper:last").addClass("error");
		jQuery("#divWireless span.textInput-wrapper span:last").addClass("error");
		jQuery("#divWireless .formErrorMessage:last p").text("Please enter your password.");
		jQuery("#divWireless .formErrorMessage:last").show();
		submitPasswordFailed=true;
	
	} else if (passwordInput.length < 4) {
		// check whether password is less than 4 characters
		jQuery("#passWireless").focus();
		jQuery("#divWireless span.textInput-wrapper:last").addClass("error");
		jQuery("#divWireless span.textInput-wrapper span:last").addClass("error");
		jQuery("#divWireless .formErrorMessage:last p").text("Password must be a minimum of 4 characters.");
		jQuery("#divWireless .formErrorMessage:last").show();
		submitPassLengthFailed=true;
	}

	if (submitUserFailed==true || submitPasswordFailed==true || submitPassLengthFailed==true) {
		return false;
		//jQuery("#numWireless").focus();
	} else {
		//click tracking tag
		dcsMultiTrack('DCS.dcsuri','/olam/','DCS.dcssip','www.wireless.att.com','DCS.dcsref',window.location.href,'DCSext.wtLinkName','myWireless login from homepage','DCSext.wtLinkLoc','Link Farm','DCSext.wtNoHit','1','WT.svl','','DCSext.pid','');
		return true;

	}
}

// onSubmit validation for Home Phone and Internet form
// ----------------
function doPhoneInternetSubmit() {
	//if (region === 'OF') {
		//document.getElementById('userAccountmanager').name = 'userid';
		//document.getElementById('passAccountmanager').name = 'password';
		//document.Telco.action = "https://cprodmasx.att.com/commonLogin/igate_wam/multiLogin.do";
	//} else {
		document.Telco.action = formActionHrefPrefix + "/olam/loginAction.doview";
	//}
	
	// check whether Username field is empty
	var userInput = jQuery("#userAccountmanager").val();
	var passwordInput = jQuery("#passAccountmanager").val();
	var submitTelcoUserFailed=false,submitTelcoPasswordFailed=false,submitTelcoPassLengthFailed=false;

	if (userInput == '') {
		jQuery("#userAccountmanager").focus();
		jQuery("#divAccountmanager span.textInput-wrapper:first").addClass("error");
		jQuery("#divAccountmanager span.textInput-wrapper span:first").addClass("error");
		jQuery("#divAccountmanager .formErrorMessage:first").show();
		jQuery("#divAccountmanager .userInputNote:first").hide();
		submitTelcoUserFailed=true;
	} else if (passwordInput == '') {
	// check whether password field is empty
		jQuery("#passAccountmanager").focus();
		jQuery("#divAccountmanager span.textInput-wrapper:last").addClass("error");
		jQuery("#divAccountmanager span.textInput-wrapper span:last").addClass("error");
		jQuery("#divAccountmanager .formErrorMessage:last p").text("Please enter your password.");
		jQuery("#divAccountmanager .formErrorMessage:last").show();
		submitTelcoPasswordFailed=true;
	} else if (passwordInput.length < 4) {
		// check whether password is less than 4 characters
		jQuery("#passAccountmanager").focus();
		jQuery("#divAccountmanager span.textInput-wrapper:last").addClass("error");
		jQuery("#divAccountmanager span.textInput-wrapper span:last").addClass("error");
		jQuery("#divAccountmanager .formErrorMessage:last p").text("Password must be a minimum of 4 characters.");
		jQuery("#divAccountmanager .formErrorMessage:last").show();
		submitTelcoPassLengthFailed=true;
	}
	if (submitTelcoUserFailed==true || submitTelcoPasswordFailed==true || submitTelcoPassLengthFailed==true) {
		return false;
	} else {
		//click tracking tag
		dcsMultiTrack('DCS.dcsuri','/commonLogin/','DCS.dcssip','cprodmasx.att.com','DCS.dcsref',window.location.href,'DCSext.wtLinkName','residential login from homepage','DCSext.wtLinkLoc','Link Farm','DCSext.wtNoHit','1','WT.svl','','DCSext.pid','');
		return true;
	}
}

// onSubmit validation for U-verse form
// ----------------
function doUverseSubmit() {
	document.Uverse.action = formActionHrefPrefix + "/olam/loginAction.olamexecute";

	var userInput = jQuery("#accUverse").val();
	var passwordInput = jQuery("#passUverse").val();
	var submitUverseUserFailed=false, submitUverseValidEmailFailed=false, submitUversePasswordFailed=false, submitUversePassLengthFailed=false;
	// check whether U-verse Member ID field is empty
	if (userInput == '') {
		jQuery("#accUverse").focus();
		jQuery("#divUverse span.textInput-wrapper:first").addClass("error");
		jQuery("#divUverse span.textInput-wrapper span:first").addClass("error");
		jQuery("#divUverse .formErrorMessage:first p").text("Please enter your U-verse Member ID.");
		jQuery("#divUverse .formErrorMessage:first").show();
		jQuery("#divUverse .userInputNote:first").hide();
		submitUverseUserFailed=true;
	} else if (!(isValidEmail(userInput))) {
		// check that U-verse Member ID is an email address in valid format
		jQuery("#accUverse").focus();
		jQuery("#divUverse span.textInput-wrapper:first").addClass("error");
		jQuery("#divUverse span.textInput-wrapper span:first").addClass("error");
		jQuery("#divUverse .formErrorMessage:first p").text("Please check that your email address is in valid format. (Example: john@att.net)");
		jQuery("#divUverse .formErrorMessage:first").show();
		submitUverseValidEmailFailed=true;
	} else if (passwordInput == '') {
		// check whether password field is empty
		jQuery("#passUverse").focus();
		jQuery("#divUverse span.textInput-wrapper:last").addClass("error");
		jQuery("#divUverse span.textInput-wrapper span:last").addClass("error");
		jQuery("#divUverse .formErrorMessage:last p").text("Please enter your password.");
		jQuery("#divUverse .formErrorMessage:last").show();
		submitUversePasswordFailed=true;
	} else if (passwordInput.length < 4) {
		// check whether password is less than 4 characters
		jQuery("#passUverse").focus();
		jQuery("#divUverse span.textInput-wrapper:last").addClass("error");
		jQuery("#divUverse span.textInput-wrapper span:last").addClass("error");
		jQuery("#divUverse .formErrorMessage:last p").text("Password must be a minimum of 4 characters.");
		jQuery("#divUverse .formErrorMessage:last").show();
		submitUversePassLengthFailed=true;
	}
	
	if (submitUverseUserFailed==true || submitUverseValidEmailFailed==true || submitUversePasswordFailed==true || submitUversePassLengthFailed==true) {
		return false;
	} else {
		//click tracking tag
		dcsMultiTrack('DCS.dcsuri','/commonLogin/','DCS.dcssip','cprodmasx.att.com','DCS.dcsref',window.location.href,'DCSext.wtLinkName','U-verse login from homepage','DCSext.wtLinkLoc','Link Farm','DCSext.wtNoHit','1','WT.svl','','DCSext.pid','');
		return true;
	}
	
}