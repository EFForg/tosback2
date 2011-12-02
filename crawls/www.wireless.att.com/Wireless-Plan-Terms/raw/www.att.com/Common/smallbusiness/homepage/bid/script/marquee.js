/* ROTATE MARQUEES */
	var timeoutVariable; // Global variable for Timeouts. 
	var heroTime = 7000; // used by initiateRotateHero() and  autoRotate(heroToShow)

$jQuery('div').filter('.hero')
	
function autoRotate(heroToShow) {
	removeClasses();
	if(heroToShow == "hero1"){
		$jQuery('#hero1').show();
		$jQuery('#control1').addClass('mNavOn');
		$jQuery('#hero2').hide();
		$jQuery('#control2').addClass('mNavOff');
		if($jQuery('#hero3')){
			$jQuery('#hero3').hide();
			$jQuery('#control3').addClass('mNavOff');
		}
		if($jQuery('#hero4')){
			$jQuery('#hero4').hide();
			$jQuery('#control4').addClass('mNavOff');
		}	
		// call code to start autorotate	
		clearTimeout(timeoutVariable);
		timeoutVariable = setTimeout("autoRotate('hero2')",heroTime);
	}
	if(heroToShow == "hero2"){
		$jQuery('#hero1').hide();
		$jQuery('#control1').addClass('mNavOff');
		$jQuery('#hero2').show();
		$jQuery('#control2').addClass('mNavOn');
		if($jQuery('#hero4')){
			$jQuery('#hero4').hide();
			$jQuery('#control4').addClass('mNavOff');
		}	
		if($jQuery('#hero3')){
			$jQuery('#hero3').hide();
			$jQuery('#control3').addClass('mNavOff');
			// call code to start autorotate	
			clearTimeout(timeoutVariable);
			timeoutVariable = setTimeout("autoRotate('hero3')",heroTime);
		} else {
			// call code to start autorotate	
			clearTimeout(timeoutVariable);
			timeoutVariable = setTimeout("autoRotate('hero1')",heroTime);
		}
		
	}
	if(heroToShow == "hero3"){
		$jQuery('#hero1').hide();
		$jQuery('#control1').addClass('mNavOff');
		$jQuery('#hero2').hide();
		$jQuery('#control2').addClass('mNavOff');
		$jQuery('#hero3').show();
		$jQuery('#control3').addClass('mNavOn');
		if($jQuery('#hero4')){
			$jQuery('#hero4').hide();
			$jQuery('#control4').addClass('mNavOff');
			// call code to start autorotate	
			clearTimeout(timeoutVariable);
			timeoutVariable = setTimeout("autoRotate('hero4')",heroTime);
		} else {
			// call code to start autorotate	
			clearTimeout(timeoutVariable);
			timeoutVariable = setTimeout("autoRotate('hero1')",heroTime);
		}
	}
	if(heroToShow == "hero4"){
		$jQuery('#hero1').hide();
		$jQuery('#control1').addClass('mNavOff');
		$jQuery('#hero2').hide();
		$jQuery('#control2').addClass('mNavOff');
		$jQuery('#hero3').hide();
		$jQuery('#control3').addClass('mNavOff');
		$jQuery('#hero4').show();
		$jQuery('#control4').addClass('mNavOn');
		// call code to start autorotate	
		clearTimeout(timeoutVariable);
		timeoutVariable = setTimeout("autoRotate('hero1')",heroTime);
	}
}

function removeClasses() {
	$jQuery('#control1').removeClass();
	$jQuery('#control2').removeClass();
	$jQuery('#control3').removeClass();
	$jQuery('#control4').removeClass();
}

function centerMarqueeNav() {
	jQuery.noConflict()(function($jQuery){
	$jQuery(document).ready(function() {
			$jQuery('#control1').center(1,0,'#navText1');
			$jQuery('#control2').center(1,0,'#navText2');
			$jQuery('#control3').center(1,0,'#navText3');
			$jQuery('#control4').center(1,0,'#navText4');
			//$jQuery('#mrqNavBar').center(1,0,'#marquee');
		});
	});
}