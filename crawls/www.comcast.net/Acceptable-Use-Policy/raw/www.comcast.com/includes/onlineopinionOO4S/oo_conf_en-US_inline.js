/* OnlineOpinion v4.1.5 */
/* This product and other products of OpinionLab, Inc. are protected by U.S. Patent No. 6606581, 6421724, 6785717 B1 and other patents pending. */

/* Create new OnlineOpinion Object instance */
var oOobj3 = new OnlineOpinion.ocode(); 

/* OnlineOpinion Object Preferences */
oOobj3.Preferences = {
		/* Configure Object Persitence (REQUIRED) */
		Persistence: {
			enabled: false, 			// Disapear onClick
			cookie_name: '',	// cookie name 
			cookie_type: '', 		// Remembers which page got rated
			expiration: 0	 		// How long to remember each page got Rated (in secs)
		},
		/* Configure Object Parameters (REQUIRED) */
		Render: {
			type: 'inline'
		},
		Plugins: {
			/* Configure URL Rewrite (optional) */
			URLRewrite: {
				active: false,
				regex_search_pattern: '' ,
				regex_replace_pattern: '',
				full_url_rewrite: ''
			},
			/* Configure Embedded Comment Card (optional) */
			CardOnPage: {
				enabled: false,
				close_link: ''
			}
		}
}

/* Configure Custom Variables to Accompany Survey (optional) */
// oOobj3.Metrics.custom.clientID = 1234;
// oOobj3.Metrics.custom.countryCode = 'usa';

/*  OnlineOpinion v4.1.5, Copyright 2009 Opinionlab, Inc. */