
zvents_save_jquery={};if(typeof jQuery!='undefined')zvents_save_jquery.jQuery=jQuery;if(typeof $!='undefined')zvents_save_jquery.$=$;Math.uuid=(function(){var CHARS='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');return function(len,radix){var chars=CHARS,uuid=[],rnd=Math.random;radix=radix||chars.length;if(len){for(var i=0;i<len;i++)uuid[i]=chars[0|rnd()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(var i=0;i<36;i++){if(!uuid[i]){r=0|rnd()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r&0xf];}}}
return uuid.join('');};})();var randomUUID=Math.uuid;if(typeof Zvents=="undefined"){Zvents={};}
(function(Z){if(typeof Z.Object=="undefined"){Z.Object={bindMethod:function(that,f){return function(){return f.apply(that,arguments)}},combine:function(){return Z.Object.updateFromArray({},arguments,0);},copy:function(self){return Z.Object.combine(self)},update:function(self){return Z.Object.updateFromArray(self,arguments,1);},updateFromArray:function(self,array,start,stop){stop=stop||array.length;for(var i=start;i<stop;i++){var obj=array[i];if(obj){for(var prop in obj){if(typeof Object.prototype[prop]=='undefined'){var a=self[prop],b=obj[prop];if(typeof a=='object'&&typeof b=='object'){Z.Object.update(a,b);}
else{self[prop]=b;}}}}}
return self;}};}})(Zvents);if(typeof Zvents=="undefined"){Zvents={}}
Zvents.Cookie={read:function(name){var match=document.cookie.match(new RegExp(name+'=([^;]+)'));return match&&unescape(match[1]);},write:function(name,value){document.cookie=name+'='+escape(value);}};if(typeof Zvents=="undefined"){Zvents={};}
(function(Z){var type_abbr_mapping={event:'e',venue:'v',group:'g',artist:'g',performer:'p',restaurant:'r',movie:'m',film:'f',url:'u'};function _uniqueId()
{return _getTime().toString()+Math.random().toString();}
function _abbrTypes(s)
{if(s){for(var type in type_abbr_mapping){var abbr=type_abbr_mapping[type];s=s.replace(new RegExp(type+":","g"),abbr+":");}}
return s;}
function _getTime()
{var d=new Date();return d.getTime();}
function _send(url,callback)
{var img=new Image(1,1);img.onload=function(){if(callback)callback(true);this.onload=null;}
img.src=url;}
function _query_string(params)
{var qs=[];var p;for(p in params){qs.push(p+'='+encodeURIComponent(params[p]));}
return'?'+qs.join('&');}
function _track(url,loads,callback)
{var load={};for(var i=0;i<loads.length;i++){if(loads[i]){Z.Object.update(load,loads[i]);}}
var id_attrs=['oids','spids','ctx','from','to'];for(var i=0;i<id_attrs.length;i++){var attr=id_attrs[i];if(load[attr])load[attr]=_abbrTypes(load[attr]);}
var bool_attrs=['sp','ctx_sp'];for(var i=0;i<bool_attrs.length;i++){var attr=bool_attrs[i];if(typeof load[attr]!="undefined")load[attr]=load[attr]?1:0;}
Z.Object.update(load,{"__t":_getTime()});_send(url+_query_string(load),callback);}
function _bindListener(element,event,listener,capture)
{if(element.addEventListener){element.addEventListener(event,listener,capture);}
else if(element.attachEvent){element.attachEvent('on'+event,listener);}}
function _unbindListener(element,event,listener)
{if(element.removeEventListener){element.removeEventListener(event,listener);}
else if(element.detachEvent){element.detachEvent('on'+event,listener);}}
var _ctrlDown=false;var _shiftDown=false;var _altDown=false;function _normalizeEvent(event){if(window.event){event=window.event;}
return event;}
function _onKeyDown(event){event=_normalizeEvent(event);switch(event.keyCode){case 16:_shiftDown=true;break;case 17:_ctrlDown=true;break;case 18:_altDown=true;break;}}
function _onKeyUp(event){event=_normalizeEvent(event);switch(event.keyCode){case 16:_shiftDown=false;break;case 17:_ctrlDown=false;break;case 18:_altDown=false;break;}}
function _isControlKeyPressed(){return _ctrlDown||_shiftDown||_altDown;}
Z.Tracker=function(config){Z.Object.update(this,{instance_id:_uniqueId(),initialized:false,settings:{url:'http://images.zvents.com/zat',alive_interval:20000,max_alive:300000,stall_interval:2000,disable_alive:false,params:{r:document.referrer,url:document.location.href}},init:function(config){var settings=this.settings;if(config){Z.Object.update(settings,config);}
if(!settings.params.sid){var sid=Zvents.Cookie.read('zvents_tracker_sid');if(!sid){sid=_uniqueId();Zvents.Cookie.write('zvents_tracker_sid',sid);}
settings.params.sid=sid;}
if(!settings.params.uid){settings.params.uid=_uniqueId();}
if(!settings.disable_alive){this.alive_timer=setInterval("Zvents.trackers['"+this.instance_id+"'].alive();",settings.alive_interval);this.stop_alive_timer_at=_getTime()+this.settings.max_alive;}
_bindListener(document,"keydown",_onKeyDown);_bindListener(document,"keyup",_onKeyUp);_bindListener(document,"unload",function(){_unbindListener(document,"keydown",_onKeyDown);_unbindListener(document,"keyup",_onKeyUp);});this.initialized=true;},alive:function(){if(!this.initialized)return true;var settings=this.settings;_track(settings.url,[settings.params,{type:"alive"}]);if(this.stop_alive_timer_at<_getTime()){clearInterval(this.alive_timer);}},notify:function(params){if(!this.initialized)return true;var settings=this.settings;_track(settings.url,[settings.params,params]);return true;},notifyCallback:function(params,callback,timeout){var settings=this.settings;var done_callback;var timer;if(callback){var notify_done=false;var done_callback=function(success){clearTimeout(timer);if(!notify_done){notify_done=true;callback(success);}};window["z__notifyDone"]=done_callback;timer=setTimeout("z__notifyDone(false);",timeout);}
_track(settings.url,[settings.params,params],done_callback);},click:function(params,anchor){if(!this.initialized)return true;var callback;var settings=this.settings;var timer;var stall=anchor&&!_isControlKeyPressed()&&(typeof anchor=="function"||(!anchor.target||anchor.target.length==0||anchor.target=="_top"||anchor.target=="_self"||anchor.target=="_parent"));if(stall){if(typeof anchor=="function"){callback=anchor;}
else{callback=function(){window.location.href=anchor.href;}}}
this.notifyCallback(Z.Object.update({type:'click'},params),callback,settings.stall_interval);return!stall;},notifyView:function(params)
{return this.notify(Z.Object.update({type:'view'},params));},notifyClick:function(params,anchor){return this.click(Z.Object.update({type:"click"},params),anchor);}});if(!config||!config.skip_init){this.init(config);}
Z.trackers[this.instance_id]=this;};Z.trackers={};Z.tracker=new Zvents.Tracker({skip_init:true});})(Zvents);if(typeof ZWidgets=="undefined"){ZWidgets={};if(typeof $ZJQuery=="undefined"){$ZJQuery=jQuery.noConflict(true);}
(function($,Z){Z._doc_ready=false;$(function(){Z._doc_ready=true;});Z.Array={map:function(a,f){var m=[];for(i=0;i<a.length;i++){m[i]=f(a[i]);}
return m;},mapWithIndex:function(a,f){var m=[];for(i=0;i<a.length;i++){m[i]=f(a[i],i);}
return m;},sort_by_property:function(a,prop){function prop_cmp(x,y){if(x[prop]==y[prop]){return 0;}
if(x[prop]>y[prop]){return 1;}
else{return-1;}}
a.sort(prop_cmp);}};Z.Object={bindMethod:function(that,f){return function(){return f.apply(that,arguments);};},combine:function(){return Z.Object.updateFromArray({},arguments,0);},copy:function(self){return Z.Object.combine(self);},update:function(self){return Z.Object.updateFromArray(self,arguments,1);},clone:function(obj){if(obj&&typeof obj=='object'){var new_obj={};Z.Object.update(new_obj,obj);obj=new_obj;}
return obj;},updateFromArray:function(self,array,start,stop){stop=stop||array.length;for(var i=start;i<stop;i++){var obj=array[i];if(obj){for(var prop in obj){if(typeof Object.prototype[prop]=='undefined'){var a=self[prop];var b=obj[prop];if(a&&typeof a=='object'&&b&&typeof b=='object'){Z.Object.update(a,b);}
else{self[prop]=Z.Object.clone(b);}}}}}
return self;}};Z.String={trim:function(s){var m=s.match(/^\s*(.*)\s*$/);return m?m[1]:'';},truncate:function(s,n){var truncated=false;if(typeof s!='string'){return'';}
var len=s.length;var ts="";if(typeof n=='number'&&n<len){n-=2;var si=0;while(si<s.length){var word="";while(si<s.length&&word.indexOf(' ')==-1){word+=s.substr(si,1);si++;}
if((word.length+ts.length)<=n){ts+=word;}
else{if(ts.substr(ts.length-1,1)==' '){ts=ts.substr(0,ts.length-1);}
truncated=true;break;}}}
else{ts=s;}
if(truncated){if(ts.length===0){ts=s.substr(0,n);}
ts+='&#8230;';}
return ts;},hash:function(s){var hash=5381;for(i=0;i<s.length;i++){hash=((hash<<5)+hash)+s.charCodeAt(i);}
return Math.abs(hash);},toOrdinal:function(i){var sfx=['th','st','nd','rd','th','th','th','th','th','th'];return i+(($.inArray(i%100,[11,12,13])==-1)?sfx[i%10]:'th');}};Z.Image={thumbUrl:function(url){return url.replace(/_thumb\./,'.').replace(/\.([^.]+)$/,'_thumb.$1');}};Z.Date=function(time){if(this===ZWidgets){return new Z.Date(time);}
this.valid=Z.Date.dateStrict(time);this.date=this.valid||Z.Date.dateNow();return this;};Z.Date.prototype={format:function(str){var self=this;return str.replace(/{(\w+)(:(\d+))?}/g,function(match,code,x,arg){return self[code]?self[code](arg):match;});},a:function(){return this.am().slice(0,1);},A:function(){return this.a().toUpperCase();},am:function(){return this.date.getUTCHours()<12?'am':'pm';},AM:function(){return this.am().toUpperCase();},Dth:function(){return Z.String.toOrdinal(this.date.getUTCDate());},D:function(){return this.date.getUTCDate();},DD:function(){return Z.pad(this.D(),2);},h:function(){return((this.date.getUTCHours()+11)%12+1);},hh:function(){return Z.pad(this.h(),2);},h24:function(){return this.date.getUTCHours();},hh24:function(){return Z.pad(this.h24(),2);},hmm:function(){return this.format('{h}:{mm}&#160;{am}');},Jan:function(){return this.January().slice(0,3);},January:function(){return Z.Date.monthNames[this.date.getUTCMonth()];},m:function(){return this.date.getUTCMinutes();},mm:function(){return Z.pad(this.m(),2);},M:function(){return this.date.getUTCMonth()+1;},MM:function(){return Z.pad(this.M(),2);},MDY:function(){return this.format('{M}/{D}/{Y}');},s:function(){return this.date.getUTCSeconds();},ss:function(){return Z.pad(this.s(),2);},Sun:function(){return this.Sunday().slice(0,3);},Sunday:function(){return Z.Date.dayNames[this.date.getUTCDay()];},Y:function(){return this.date.getUTCFullYear();},YMD:function(){return this.format('{Y}-{MM}-{DD}');}};Z.Object.update(Z.Date,{oneSecond:1000,oneMinute:1000*60,oneHour:1000*60*60,oneDay:1000*60*60*24,oneWeek:1000*60*60*24*7,dayNames:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],monthNames:['January','February','March','April','May','June','July','August','September','October','November','December'],date:function(time){return Z.Date.dateStrict(time)||Z.Date.dateNow();},dateStrict:function(time){var date=(function(time){try{if(!time){return null;}
if(typeof time=='number'){if(time<100000000000){time*=1000;}
return new Date(time);}
if(typeof time=='object'){if(time.getTime){return new Date(time.getTime());}
if(time.date&&time.valid){return new Date(time.date.getTime());}}
if(typeof time!='string'){return null;}
time=Z.String.trim(time);var m=time.match(/^[a-z]{3} ([a-z]{3}) (\d{2}) (\d{2}):(\d{2}):(\d{2}) \w{3} (\d{4})$/i);if(m){return new Date(Date.UTC(+m[6],Z.Date.numberFromShortMonth(m[1]),+m[2],+m[3],+m[4],+m[5]));}
m=time.match(/^([a-z]+)\s*(\d+)\s*,?\s*(\d+)$/i);if(m){var mon=Z.Date.numberFromShortMonth(m[1]);if(typeof mon!="undefined"){return new Date(Date.UTC(+m[3],mon,+m[2]));}}
m=time.match(/^(\d{4})-(\d{2})(-(\d{2})( (\d{2}):(\d{2})(:(\d{2}))?)?)?$/);if(m){return new Date(Date.UTC(+m[1],m[2]-1,+m[4]||1,+m[6]||0,+m[7]||0,+m[9]||0));}
m=time.match(/^(\d{4})(\d{2})(\d{2})$/);if(m){return new Date(Date.UTC(m[1],m[2]-1,m[3]));}}
catch(e){}
return null;})(time);return date&&!isNaN(date.getTime())?date:null;},dateNow:function(){var date=new Date;return new Date(date.getTime()-date.getTimezoneOffset()*Z.Date.oneMinute);},time:function(time){return Z.Date.date(time).getTime();},now:function(){return Z.Date.dateNow().getTime();},midnight:function(time){return Z.Date.date(time).setUTCHours(0,0,0,0);},today:function(){return Z.Date.midnight(Z.Date.now());},isToday:function(time){return Z.Date.midnight(time)==Z.Date.today();},formatNumberDate:function(time,sep){return Z.Date(time).format(['{Y}','{MM}','{DD}'].join(typeof sep!="undefined"?sep:'-'));},formatMdyDate:function(time,sep){return Z.Date(time).format(['{M}','{D}','{Y}'].join(typeof sep!="undefined"?sep:'/'));},formatNumberMonth:function(time,sep){return Z.Date(time).format(['{Y}','{MM}'].join(typeof sep!="undefined"?sep:'-'));},formatLongDate:function(time,weekDay){return Z.Date(time).format((weekDay?'{Sunday}, ':'')+'{January} {D}, {Y}');},formatMonthYear:function(time){return Z.Date(time).format('{January} {Y}');},formatCalendarDate:function(time){return Z.Date(time).format('{Jan} {D}');},formatWeekDay:function(time){return Z.Date(time).format('{Sunday}');},formatShortTime:function(time){return Z.Date(time).hmm();},formatTimeRange:function(first,last){first=Z.Date.formatShortTime(first);if(!last){return first;}
else{last=Z.Date.formatShortTime(last);return first+'&#8211;'+last;}},numberFromShortMonth:function(shortMonth){var months={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};return months[shortMonth.slice(0,3)];},addDaysAtMidnight:function(time,days){time=Z.Date.midnight(time);if(typeof days=='function'){days=days(time);}
var date=Z.Date.date(time);return date.setUTCDate(date.getUTCDate()+days);},nextWeek:function(time){return Z.Date.addDaysAtMidnight(time,7);},nextDay:function(time){return Z.Date.addDaysAtMidnight(time,1);},beginWeek:function(time){return Z.Date.beginPeriod(time,'getUTCDay',0);},beginMonth:function(time){return Z.Date.beginPeriod(time,'getUTCDate',1);},beginPeriod:function(time,getter,first){var date=Z.Date.date(time);return Z.Date.addDaysAtMidnight(time,function(time){return first-date[getter]();});},isWeekend:function(time){var date=Z.Date.date(time);switch(date.getUTCDay()){case 0:case 6:return true;default:return false;}},isToday:function(time){return Z.Date.midnight(time)==Z.Date.today();},firstWeekOfMonth:function(time){return Z.Date.beginWeek(Z.Date.beginMonth(time));},addMonth:function(time,incr){var date=Z.Date.date(Z.Date.beginMonth(time));return date.setUTCMonth(date.getUTCMonth()+incr);}});Z.Object.update(ZWidgets,{widgets:{},configMerge:function(to_config,in_config){if(!to_config){to_config={};}
for(param in in_config){if(to_config[param]&&typeof to_config[param]=="object"){arguments.callee(to_config[param],in_config[param]);}
else{to_config[param]=in_config[param];}}},overrideRenderers:function(widget,renderers){for(var renderer in renderers){if(renderer.substring(0,6)=="render"&&typeof widget[renderer]=="function"){widget[renderer]=renderers[renderer];}
else{throw"Invalid renderer: "+renderer;}}},makeJQueryPlugin:function(widget){return function(config){this.each(function(){if(typeof config=="undefined"){config={};}
config.inline=false;config.id=this.id;var w=new widget(config);$(this).html(w.render()).data('widget',w);});return this;};},pad:function(v,n){return!n?v:(1000000000000000+v+'').slice(-n);}});function Loader(){this.jsons_cache={};this.jsonp_fun_cache={};this.request_cnt=0;}
Loader._callback_count=0;Loader.prototype={json:function(url,params,cb){var self=this;var url_and_params=url+$.param(params);var json=self.jsons_cache[url_and_params];if(typeof json!="undefined"){Z.defer(function(){cb(json);});return;}
var jsonp_fun=self.jsonp_fun_cache[url_and_params];if(jsonp_fun){var prev_jsonp=jsonp_fun;var new_jsonp=function(response){function callback(json){$(document).bind('jsonp-callback',function(){Z.defer(function(){cb(json)});self.jsons_cache[full_url]=json;}).trigger('jsonp-callback');}
eval(response);prev_jsonp(response);};new_jsonp.jsonp_name=prev_jsonp.jsonp_name;self.jsonp_fun_cache[url_and_params]=window[jsonp_fun.jsonp_name]=new_jsonp;return;}
var jsonp_name='jsp_'+Loader._callback_count;Loader._callback_count++;function loadScript(){params.jsonsp=jsonp_name;var full_url=url+'?'+$.param(params);var jsonp_fun=function(response){function callback(json){self.jsons_cache[url_and_params]=json;Z.defer(function(){cb(json);});}
eval(response);window[jsonp_name]=null;self.jsonp_fun_cache[url_and_params]=null;$('head script:last').remove();};jsonp_fun.jsonp_name=jsonp_name;window[jsonp_name]=jsonp_fun;var script=document.createElement('script');script.type='text/javascript';script.charset='utf-8';script.src=full_url;document.body.appendChild(script);}
if(Z._doc_ready){loadScript();}
else{$(function(){loadScript();});}}};Z.Ajax={loader:new Loader(),loadJson:function(url,params,callback,errback){return Z.Ajax.loader.json(url,params,callback,errback);}};Z.Css={addRules:function(rules){var cssBlocks=[];for(rule in rules){cssBlocks.push(rule+"{"+rules[rule]+"}");}
var styleEl=document.createElement('style');styleEl.setAttribute("type","text/css");if(styleEl.styleSheet){styleEl.styleSheet.cssText=cssBlocks.join('');}else{styleEl.appendChild(document.createTextNode(cssBlocks.join('')));}
document.getElementsByTagName('head')[0].appendChild(styleEl);}};var _deferCount=0;window['_z_deferFire']=function(i){$(document).trigger('defer-event-'+i);};Z.defer=function(cb){$(document).bind('defer-event-'+_deferCount,cb);setTimeout('_z_deferFire('+_deferCount+')',0);_deferCount++;};Z.onDocReady=function(cb){if(Z._doc_ready){cb();}
else{$(cb);}};})($ZJQuery,ZWidgets);}
(function($,Z){if(typeof Z.widgets.EventList=="undefined"){var default_settings={id:null,partner_id:0,venues_only:false,show_images:false,show_date:true,max_title:40,max_venue_name:40,sort:true,site:'http://www.zvents.com',method:'search',hide_on_empty:false,include_quantcast:true,disable_shuffling:false,links_open_new_window:false,what_var:'',where_var:'',when_var:'',labels:{loading:'Loading&#8230;',sponsored:'Sponsored',today:'today',tomorrow:'tomorrow',prompt_tickets_now:'ON SALE NOW',prompt_tickets_future:'ON SALE {day}',ticket_icon:'Ticket'},classes:{block:'ZventsEventList',loading:'ZventsLoading',loading_text:'ZventsTT',event_list:'ZventsEventList',sponsored_label:'ZventsSponsoredLabel',sponsored_list:'ZventsSponsoredList',date:'ZventsEventDate',event:'ZventsEvent',event_time:'ZventsEventTime',event_link:'ZventsEventName',venue_link:'ZventsEventName',venue:'ZventsVenue',image_link:'ZventsImageLink',image:'ZventsImage',tickets_prompt:'ZventsTicketsPrompt',ticket_icon:'ZventsTicketIcon',ticket_icon_link:'ZventsTicketIcon'},images:{spinner:'http://images.zvents.com/images/spinner16.gif',ticket_icon:null},selector:null,inline:true,load:{spn_limit:1,advq:true},image_width:66,image_height:66,base_css:{".ZventsEventList, .ZventsSponsoredList":"list-style-type: none;margin: 0;padding: 3px;width: auto",".ZventsSponsoredLabel":"color: #888;font-weight:bold",".ZventsSponsoredList":"border: solid 1px #ccc;",".ZventsEventList li":"display: block;margin: 0;padding: 0;",".ZventsSponsoredList li":"display: block;margin: 0;padding: 0;",".ZventsImage":"margin: 3px;vertical-align: middle;",".ZventsTicketsPrompt":"text-transform:uppercase"},disable_tracking:false,tracker:{disable_alive:true,params:{src:"widget"}}};var el_link_count=0;var method_cm_mapping={search:"search",featured_events:"featured",hot_tickets:"hot_tickets",performer_events:"performer_events",recently_created:"recently_created",related_events:"related"};var widget=function(config){var self=this;var undefined;this.settings={};Z.Object.update(this.settings,default_settings);Z.Object.update(this.settings,config);if(this.settings.load.ssrss){this.settings.load.spn_limit=this.settings.load.ssrss;delete this.settings.load['ssrss'];}
if(this.settings.load.spn_limit<1)
this.settings.load.spn_limit=1;if(!this.settings.disable_shuffling){this.settings.load.rand_spn=this.settings.load.spn_limit*5;}
if((!(typeof config.what_var=="undefined"))&&(!(typeof window[config.what_var]=="undefined"))){self.settings.load.what=window[config.what_var];}
if((!(typeof config.when_var=="undefined"))&&(!(typeof window[config.when_var]=="undefined"))){self.settings.load.when=window[config.when_var];}
if((!(typeof config.where_var=="undefined"))&&(!(typeof window[config.where_var]=="undefined"))){self.settings.load.where=window[config.where_var];}
this.settings.tracker.params.pid=this.settings.partner_id;if(!this.settings.tracker.params.cm){this.settings.tracker.params.cm=method_cm_mapping[this.settings.method];}
if(!this.settings.tracker.params.site){this.settings.tracker.params.site=this.settings.site;}
if(this.settings.renderers){Z.overrideRenderers(this,this.settings.renderers);}
Z.Css.addRules(this.settings.base_css);if(this.settings.css){Z.Css.addRules(this.settings.css);}
if(typeof this.settings.load.st=="undefined"){if(this.settings.venues_only){this.settings.load.st="venue";}
else{this.settings.load.st="event";}}
this.url=this.settings.site+'/partner_json/'+this.settings.method;this.today=Z.Date.today();if(!this.settings.selector&&this.settings.id){this.selector="#"+this.settings.id;}
else{this.selector=this.settings.selector;}
if(!this.selector){throw new Error('Widget requires id or selector in config.');}
if(!this.settings.disable_tracking){this.tracker=new Zvents.Tracker(this.settings.tracker);}
else{this.settings.include_quantcast=false;}
if(this.settings.inline){document.write(this.render());}};function _tracker_ids_from_listings(type,listings){var ids=[];if(listings){for(var i=0;i<listings.length;i++){var l=listings[i];ids.push(type+":"+l.id);}}
return ids.join(",");}
function _updateRanks(items){for(var i=0;i<items.length;i++){items[i].rank=i+1;}}
function _isEmptyDataSet(data){var content=data.content;return(!content.venue_count&&!content.event_count&&!content.sponsored_event_count);}
widget.EV_EVENTS_LOADED='events-loaded';widget.prototype={EV_EVENTS_LOADED:widget.EV_EVENTS_LOADED,load:function(){var self=this;Z.Ajax.loadJson(self.url,self.settings.load,Z.Object.bindMethod(self,self.loadResponse));},trackView:function(type,organic_listings,sponsored_items,identifier){if(this.tracker){this.tracker.notify({type:"view",oids:_tracker_ids_from_listings(type,organic_listings),spids:_tracker_ids_from_listings(type,sponsored_items),search:identifier});}},extractObjectFromAnchor:function(anchor){var item=this.link_to_item_map[anchor.id];return{rank:item.rank,type:item.type,sponsored:item.sponsored,id:item.id};},trackClick:function(anchor,rank,type,id,sponsored){if(this.tracker){var typed_id=type+":"+id;return this.tracker.click({rank:rank,from:typed_id,to:typed_id,sp:sponsored},anchor);}
return true;},attachClickTrackers:function(){var self=this;$(self.selector).find('a').click(function(){var info=self.extractObjectFromAnchor(this);if(info){return self.trackClick(this,info.rank,info.type,info.id,info.sponsored);}
return true;});},loadResponse:function(data){var self=this;$(function(){self.response=data.rsp;switch(self.response.status){case'error':$(self.selector).html(self.renderError(self.response.msg));break;case'ok':self.link_to_item_map={};if(self.settings.include_quantcast&&!_isEmptyDataSet(self.response)){Z.onDocReady(function(){if(typeof _qoptions=='undefined'){var quantcast_tag=['<script type="text/javascript">','_qoptions={','qacct:"p-54UqpxMM201CU"','};','</script>','<script type="text/javascript" src="http://edge.quantserve.com/quant.js"></script>'].join('');$('body').append(quantcast_tag);}});}
$(self.selector).html(self.renderListings(self.response));self.attachClickTrackers();break;default:$(self.selector).html('');break;}
$(self.selector).trigger(self.EV_EVENTS_LOADED);});},render:function(){html=this.renderLoading();if(this.settings.load){this.load();}
return html;},renderError:function(error){console.log(error);},prepareVenues:function(data){var content=data.content;var venues=content.venues||[];var venue;venues.total=content.venue_count;venues.byId={};for(var v=0,n=venues.length;v<n;v++){venue=venues[v];venue.sponsored=false;venue.type="venue";venue.events=[];venues.byId[venue.id]=venue;}
if(typeof this.settings.load.limit!="undefined"){venues=venues.splice(0,this.settings.load.limit);}
_updateRanks(venues);return venues;},prepareEvent:function(event,venues){var venue=event.venue=venues.byId[event.venue_id];if(venue){if(venue.parent_id){venue=event.venue=venues.byId[venue.parent_id];}
venue.events[venue.events.length]=event;}
event.starttime=Z.Date.time(event.starttime);event.date=Z.Date.midnight(event.starttime);if(event.endTime){event.endtime=Z.Date.time(event.endTime);}
if(event.sponsored&&event.tickets_on_sale){var on_sale_date=Z.Date.midnight(Z.Date.time(event.tickets_on_sale));var delta=(this.today-on_sale_date);if(delta<=0){event.tickets_prompt=this.settings.labels.prompt_tickets_future.replace('{day}',this.renderDay(on_sale_date));}
else
if(delta<(Z.Date.oneDay*14)){event.tickets_prompt=this.settings.labels.prompt_tickets_now;}}},prepareEvents:function(data){var content=data.content;var events=content.events||[];var sponsored_events=content.sponsored_events||[];var venues=content.venues||[];events.repeats=0;events.total=content.event_count?content.event_count:0;sponsored_events.repeats=0;sponsored_events.total=content.sponsored_event_count?content.sponsored_event_count:0;venues.total=content.venue_count;venues.byId={};events.byId={};sponsored_events.byId={};var v,n,e,venue,event;for(v=0,n=venues.length;v<n;v++){venue=venues[v];venue.events=[];venue.type="venue";venues.byId[venue.id]=venue;}
for(e=0,n=sponsored_events.length;e<n;e++){event=sponsored_events[e];event.sponsored=true;event.type="event";sponsored_events.byId[event.id]=event;this.prepareEvent(event,venues);}
for(e=0,n=events.length;e<n;e++){event=events[e];event.sponsored=false;event.type="event";events.byId[event.id]=event;this.prepareEvent(event,venues);}
if(this.settings.sort){Z.Array.sort_by_property(sponsored_events,'starttime');Z.Array.sort_by_property(events,'starttime');}
if(typeof this.settings.max_displayed!="undefined"&&(events.length+sponsored_events.length)>this.settings.max_displayed){if(sponsored_events.length>=this.settings.max_displayed){events=[];if(sponsored_events.length>this.settings.max_displayed){sponsored_events.splice(this.settings.max_displayed,sponsored_events.length-this.settings.max_displayed);}}
else{events.splice(this.settings.max_displayed-sponsored_events.length,events.length-(this.settings.max_displayed-sponsored_events.length));}}
_updateRanks(events);_updateRanks(sponsored_events);return{sponsored:sponsored_events,organic:events};},renderListings:function(data){if(this.settings.hide_on_empty&&_isEmptyDataSet(data)){$(this.selector).hide();return'';}
else
if(this.settings.venues_only){this.venues=this.prepareVenues(data);this.trackView("venue",this.venues,[],data.content.identifier);return this.renderVenues(this.venues);}
else{this.events=this.prepareEvents(data);this.trackView("event",this.events.organic,this.events.sponsored,data.content.identifier);return this.renderEvents(this.events);}},renderDay:function(date){if(date==this.today){return this.settings.labels.today;}
if(date==this.today+Z.Date.oneDay){return this.settings.labels.tomorrow;}
else{return Z.Date(date).format(date<this.today+Z.Date.oneDay*7?'{Sunday}':'{M}/{DD}');}},renderDate:function(event){if(this.settings.show_date===false){return'';}
else{return this.renderDay(event.date);}},renderTime:function(event){if(this.settings.show_time===false){return'';}
else{var date=Z.Date(event.starttime);var hours=date.date.getUTCHours();var minutes=date.date.getUTCMinutes();return date.format(minutes?'{h}:{mm} {am}':{0:'Midnight',12:'Noon'}[hours]||'{h} {am}');}},listingLinkAttrs:function(listing,rank,sponsored){el_link_count++;var link_id="z_link_"+this.settings.id+'_'+el_link_count;this.link_to_item_map[link_id]={id:listing.id,type:listing.type,rank:rank,sponsored:sponsored};return[' id="',link_id,'" href="',this.settings.site,listing.zurl,'" '].join("");},renderListingLink:function(listing,content,link_class){if(!link_class){link_class=this.settings.classes.event_link;}
return[,'<a ',this.settings.links_open_new_window?' target="_blank" ':'',this.listingLinkAttrs(listing,listing.rank,listing.sponsored),' class="',link_class,'" >',content,'</a>'].join("");},renderSponsoredLabel:function(){return['<label class="',this.settings.classes.sponsored_label,'">',this.settings.labels.sponsored,'</label>'].join('');},renderEventName:function(event){return this.renderListingLink(event,Z.String.truncate(event.name,this.settings.max_title));},renderEventVenueName:function(event){return['<a class="',this.settings.classes.venue_link,'" ',this.settings.links_open_new_window?' target="_blank" ':'',this.listingLinkAttrs(event.venue,event.rank,event.sponsored),' >',ZWidgets.String.truncate(event.venue.name,this.settings.max_venue_name),'</a>'].join('');},renderSponsoredEvent:function(event,i){return this.renderEvent(event,i);},renderEvent:function(event,i){var date=this.renderDate(event);if(date){date=['<span class="',this.settings.classes.date,'">',date,'</span>',' '].join('');}
return['<li class="',this.settings.classes.event,'">',this.settings.show_images?this.renderImage(event):'','<span class="',this.settings.classes.event_time,'">',this.renderTime(event),'</span>',' ',date,this.renderEventName(event),'</li>'].join('');},renderSponsoredEvents:function(events){if(events&&events.length>0){return[this.renderSponsoredLabel(),'<ul class="',this.settings.classes.sponsored_list,'">',Z.Array.mapWithIndex(events,Z.Object.bindMethod(this,this.renderSponsoredEvent)).join(''),'</ul>'].join('');}
else{return'';}},renderOrganicEvents:function(events){return['<ul class="',this.settings.classes.event_list,'">',Z.Array.mapWithIndex(events,Z.Object.bindMethod(this,this.renderEvent)).join(''),'</ul>'].join('');},renderEvents:function(events){return[this.renderSponsoredEvents(events.sponsored),this.renderOrganicEvents(events.organic)].join('');},renderVenue:function(venue,for_event){var rank=for_event?for_event.rank:venue.rank;var sponsored=for_event?for_event.sponsored:venue.sponsored;return['<li class="',this.settings.classes.venue,'">',this.settings.show_images?this.renderImage(venue):'','<a ',this.settings.links_open_new_window?' target="_blank" ':'',this.listingLinkAttrs(venue,rank,sponsored),' class="',this.settings.classes.venue_link,'" >',Z.String.truncate(venue.name,this.settings.max_title),'</a>','<br />at ',venue.address,', ',venue.city,', ',venue.state,'. ',venue.phone,'</li>'].join('');},renderVenues:function(venues){return['<ul class="',this.settings.classes.event_list,'">',Z.Array.map(venues,Z.Object.bindMethod(this,this.renderVenue)).join(''),'</ul>'].join('');},renderLoading:function(){return['<div class="',this.settings.classes.loading,'">','<img src="',this.settings.images.spinner,'" />','<span class="',this.settings.classes.loading_span,'">',this.settings.labels.loading,'</span>','</div>'].join('');},renderImg:function(src,width,height,title,image_class){if(!src)
return"";return['<img class="',image_class,'" alt="',title,'" title="',title,'" border="0" src="',src,'" ',width?' width="'+width+'" ':'',height?' height="'+height+'" ':'','/>'].join('');},renderTicketIcon:function(event){if(event.has_tickets){return this.renderImgLink(event,this.settings.images.ticket_icon,null,null,this.settings.labels.ticket_icon,this.settings.classes.ticket_icon,this.settings.classes.ticket_icon_link);}},renderImgLink:function(event,src,width,height,title,image_class,image_link_class){if(!src)
return"";return this.renderListingLink(event,this.renderImg(src,width,height,title,image_class),image_link_class);},renderImage:function(event){var image=event.images[0];if(image){return this.renderImgLink(event,image.url,this.settings.image_width,this.settings.image_height,'image',this.settings.classes.image,this.settings.classes.image_link);}
else{return'';}}};$.fn.ZventsEventList=Z.makeJQueryPlugin(widget);Z.widgets.EventList=widget;}})($ZJQuery,ZWidgets);if(typeof zvents_save_jquery!="undefined"){jQuery=zvents_save_jquery.jQuery;$=zvents_save_jquery.$;}