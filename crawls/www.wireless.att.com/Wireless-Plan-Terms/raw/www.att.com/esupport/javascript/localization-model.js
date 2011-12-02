function validateZip(_id){
	var zip=document.getElementById(_id).value;
	var idReg2 = "[0-9][0-9][0-9][0-9][0-9]"; 
	zip = trim(zip);
/*
	if (zip.length == 0) {
		errMsg="Your ZIP code is required to provide information on services available in your area. Please enter your 5-digit ZIP code.";
		return showError(errMsg);
	}
	else if (zip.length < 5) {
		errMsg="The ZIP code you entered is incomplete. Please re-enter your 5-digit ZIP code.";
		return showError(errMsg);
	} else if (!zip.match(idReg2)) {
		errMsg="The ZIP code you entered contains non-numeric characters. Please re-enter your 5-digit ZIP code.";
		return showError(errMsg);
	}
	else if ( !zip.match(idReg2) || zip.length < 5 || Number(zip)=="0" ) {
		errMsg="Please enter a valid ZIP code (5 digits)";
		return showError(errMsg);
	}
	*/	
	if (zip.length == 0 || zip.length < 5 || !zip.match(idReg2) || Number(zip)=="0" ) {
		errMsg="Please verify that the ZIP Code you entered is a 5-digit number.";		
		return showError(errMsg,zip);
	}
	else{
		return true;
	}
}
function LTrim(value) {
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
}
function RTrim(value) {
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
}
function trim(value) {
	return LTrim(RTrim(value));
} 
function setWTParams(_zipCode,_status,_statusMsg){
	if(_zipCode=='')
		_zipCode=jQuery("#zipCode").val();
	dcsMultiTrack('DCSext.wtZipCode',_zipCode,'DCSext.wtEvent','Zip_Code_Submit', 'DCSext.wtSuccessFlag' ,_status,'DCSext.wtStatusMsg',_statusMsg,'DCSext.wtPN' ,'ZipCode Entry Modal Pg');
}
function setWTDefaultParams(winURL,reqURI){
	dcsMultiTrack('DCS.dcssip','www.att.com','DCS.dcsuri',reqURI,'DCS.dcsref',winURL,'DCSext.wtPN' ,'ZipCode Entry Modal Pg');
}
function showError(msg){
jQuery("label#zipLabel").addClass("acctTypeTextError");
//jQuery(window).resize();
jQuery("#zipCode").css("border", "1px solid red");
jQuery("#clientErrDiv").html(msg);
jQuery("#nyroModalWrapper").height(370);
jQuery("#nyroModalContent").height(370);
jQuery("div.full").show();
var zip=jQuery("#zipCode").val();
jQuery("#zipCode").val('');
setWTParams(zip,0,'UNSUCCESSFUL');
return false;
}
function getFocus(status){	
	if(jQuery("#serverErrDiv").attr("statusCode")=="true")	
	{	
		jQuery("label#zipLabel").removeClass("acctTypeTextError");
		jQuery(this).css("border", "1px solid #ccc");
		jQuery("div.full").hide();
		jQuery(window).resize(); 
	}
}
function isNumberKey(evt)
{try{
   var charCode = (evt.which) ? evt.which : event.keyCode
   if (charCode > 31 && (charCode < 48 || charCode > 57))
      return false;
   if(charCode==13)
	{
	try{		
		jQuery('#continue-button').click();
		return false;
	}catch(e){jQuery("#clientErrDiv").html('Error caught while calling submit'+e.message);}
   }
   else 
	return true;
}catch(e){ jQuery("#clientErrDiv").html('Error caught in numberKey'+e.message);};
}