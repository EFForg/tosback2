searchFormOptions = function() {
	
			jQuery('#searchOptions').bind('click', function (event) {
                  	jQuery('#search_options_container').slideToggle('slow', function() {
    					// Animation complete.
 				 	});
            });
			
			
			setSearchTerm = function(term) {
  				var whatSearched = term;	
				//alert(whatSearched);			
				jQuery('#selectedSearch').val(whatSearched);
				
				switch(whatSearched) {
					case 'internet':
						jQuery("div#search_options_container ul#searchList li a#internet").addClass("setSearchText");
						jQuery("#uverse").removeClass("setSearchText");
						jQuery("#digital").removeClass("setSearchText");
						jQuery("#phone").removeClass("setSearchText");
						break;
					case 'uverse':
						jQuery("#uverse").addClass("setSearchText");
						jQuery("#internet").removeClass("setSearchText");
						jQuery("#digital").removeClass("setSearchText");
						jQuery("#phone").removeClass("setSearchText");
						break;
					case 'digital':
						jQuery("#digital").addClass("setSearchText");
						jQuery("#internet").removeClass("setSearchText");
						jQuery("#uverse").removeClass("setSearchText");
						jQuery("#phone").removeClass("setSearchText");
						break;
					default:
						jQuery("#phone").addClass("setSearchText");
						jQuery("#internet").removeClass("setSearchText");
						jQuery("#uverse").removeClass("setSearchText");
						jQuery("#digital").removeClass("setSearchText");
						break;
				}
				
				jQuery("#search_options_container").hide("slow");
			};
			
			jQuery('#askInput').focus(function() {
				var searchValue = jQuery('#askInput').val();
  				if (searchValue=='Find support articles') {
					jQuery('#askInput').val("");
				}
			});
			
			jQuery('#askInput').blur(function() {
				var searchValue = jQuery('#askInput').val();
  				if (searchValue=='') {
					jQuery('#askInput').val("Find support articles");
				}
			});
}

initializeBreadcrumbs = function() {
	showTips = function() {
		jQuery('.tips-container').fadeIn('slow');
	}
	hideTips = function() {
		jQuery('.tips-container').fadeOut('slow');
	}
}

initializeInterstitialWide = function() {
	jQuery('#settings').bind('click', function (event) {
		jQuery('#settings').addClass('active outline');
		jQuery('#services').removeClass('active ');
		
		jQuery('#settingsContentDiv').show();
		jQuery('#serviceContentDiv').hide();
		jQuery('#requiredFieldsDiv').show();
	});
	
	jQuery('#services').bind('click', function (event) {
		jQuery('#services').addClass('active outline');
		jQuery('#settings').removeClass('active ');
		
		jQuery('#serviceContentDiv').show();
		jQuery('#settingsContentDiv').hide();
		jQuery('#requiredFieldsDiv').show();
	});	
}

/** BEGIN: eSupport Landing Page Functions **/

jQuery(function($){
	if($('.moreSupportLink').length != 0) $.fn.hoverSlider();
});


/* BEGIN FUNCTIONS */
(function($){
	$.fn.hoverSlider = function(){
		$('.moreSupportLink').each(function(){
			$(this).hoverIntent({over:hoverSlideOVER, timeout:300, out:hoverSlideOUT});
		});		
		$('.moreSupportLink li a').each(function(){
			$(this).focus(function(){
				$(this).next().slideToggle(400);
				$('a:first', $(this).next()).focus();
			});
		});
		$('.supportLinkContainer a').each(function(){
			$(this).focus(function(){
				$('.moreSupportLink li > div').slideUp(400);
			});
		});
		$(document).keydown(function(event){
			if(event.keyCode == "27"){
				jQuery(".moreSupportLink li > div").slideUp(400);
			}
		});
	};
			
})(jQuery);

/* Need for HOVERSLIDE */
function hoverSlideOVER(){
	jQuery("#" + jQuery(this).attr('rel')).slideDown(400);
}
function hoverSlideOUT(){
	jQuery("#" + jQuery(this).attr('rel')).slideUp(400);
}


/* HOVER SLIDE */
function hoverSlide(){
	jQuery(".moreSupportLink").each(function(){
		jQuery(this).mouseenter(function(){
			jQuery(".moreSupportLink li > div").slideUp(400);
			jQuery("#" + jQuery(this).attr('rel')).slideDown(400);
		});
		jQuery(this).mouseleave(function(){
			jQuery(".moreSupportLink li > div").slideUp(400);
		});
	});
	jQuery(".moreSupportLink li a").each(function(){
		jQuery(this).focus(function(){
			jQuery(this).parent().parent().mouseenter();
		});			
	});
}

/** END: eSupport Landing Page Functions **/