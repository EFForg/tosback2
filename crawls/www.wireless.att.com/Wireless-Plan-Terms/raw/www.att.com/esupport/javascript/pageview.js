function showPageView(pv_number) {
    jQuery('div.pv').hide();
    jQuery('div.pv'+pv_number).show();
}

function initPageViewLinks() {
	jQuery('a.showPageView').click(function() {
	    var href = jQuery(this).attr('href');
	    showPageView(href);
	    return false;
	});
}

jQuery(document).ready(function() {
	initPageViewLinks();
});

