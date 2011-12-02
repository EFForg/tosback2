// JavaScript Document
//alert(document.documentMode + ' | ' + document.compatMode);

jQuery(document).ready(function() {

	if (pid == '5000') { /* SOCIAL MEDIA */
		jQuery('#PrimaryNav li a#pn-compinfo').parent('li').addClass('selected');	
		jQuery('#PrimaryNav li a#au_media_resources_link').parent('li').addClass('selected');	
	}



	
	
	if ( jQuery('#main-menu-cs div.menuContent').length != '0' ) {
	//	jQuery("div.menuContent").hide(); 
	}
		
	/* =SITE MAP */
	
	if (pid == "17564" ) {
		var script = document.createElement('script');
		script.src = '/Common/global/scripts/about_us/sitemap.js';
		script.type = 'text/javascript';
		jQuery('head')[0].appendChild(script);
	}
			
	/* OLD News Releases */
	if ( pid == "4800" ) {
		jQuery('#content-container').addClass('archive-newsrelease');
	
		/* add Search link */
		var checkSearchresults = location.href;
		checkSearchresults = checkSearchresults.indexOf('searchresults')
		//alert(checkSearchresults);
		if ( checkSearchresults == '-1' ) {
			/* do nothing */
		} else {
			jQuery('p.OrangeHeader:contains("Archived News Releases")').after('<p><a href="/gen/press-room?pid=9880" title="Search news release archives">Search news release archives</a></p>');
			document.title="Corporate News and Press Release Archive | AT&T";
				jQuery("meta[name=description]").attr("content","Read AT&T news including corporate news, network advancements and wireless news. Visit the AT&T newsroom for the latest technology news.");
			jQuery("meta[name=keywords]").attr("content","at&t news, att news, att network news, at&t wirelss news, at&t newsroom, At&t in the news");
		}
	
	}
	
	/* Regulatory Doc */
	if (pid == '320') {
		jQuery(document).ready(function() {
			jQuery('ul.section-links').hide();
			
			 jQuery('h6').click(function () {
			  var mySection = jQuery(this).attr('id');
			  var mySectionLinks = 'ul#' + mySection + '-links';
			  //alert(mySectionLinks);
			  jQuery(this).addClass('open');
			  jQuery(mySectionLinks).show('slow');
		   });
		   
		});
	}

});