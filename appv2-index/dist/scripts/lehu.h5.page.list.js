!function(a){a.fn.picLazyLoad=function(b){function c(){d.each(function(){var c=a(this);if(c.is("img")){if(c.attr("data-original")){var d=c.offset().top;d-b.threshold<=f+e&&(c.attr("src",c.attr("data-original")),c.removeAttr("data-original"))}}else if(c.attr("data-original")){"none"==c.css("background-image")&&c.css("background-image","url("+b.placeholder+")");var d=c.offset().top;d-b.threshold<=f+e&&(c.css("background-image","url("+c.attr("data-original")+")"),c.removeAttr("data-original"))}})}var d=a(this),e=0,f=a(window).height();b=a.extend({threshold:0,placeholder:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"},b||{}),c(),a(window).on("scroll",function(){e=a(window).scrollTop(),c()})}}(Zepto),define("imagelazyload",function(){}),define("text",["module"],function(a){var b,c,d,e,f,g=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],h=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,i=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,j="undefined"!=typeof location&&location.href,k=j&&location.protocol&&location.protocol.replace(/\:/,""),l=j&&location.hostname,m=j&&(location.port||void 0),n={},o=a.config&&a.config()||{};return b={version:"2.0.14",strip:function(a){if(a){a=a.replace(h,"");var b=a.match(i);b&&(a=b[1])}else a="";return a},jsEscape:function(a){return a.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:o.createXhr||function(){var a,b,c;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(b=0;3>b;b+=1){c=g[b];try{a=new ActiveXObject(c)}catch(d){}if(a){g=[c];break}}return a},parseName:function(a){var b,c,d,e=!1,f=a.lastIndexOf("."),g=0===a.indexOf("./")||0===a.indexOf("../");return-1!==f&&(!g||f>1)?(b=a.substring(0,f),c=a.substring(f+1)):b=a,d=c||b,f=d.indexOf("!"),-1!==f&&(e="strip"===d.substring(f+1),d=d.substring(0,f),c?c=d:b=d),{moduleName:b,ext:c,strip:e}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(a,c,d,e){var f,g,h,i=b.xdRegExp.exec(a);return i?(f=i[2],g=i[3],g=g.split(":"),h=g[1],g=g[0],!(f&&f!==c||g&&g.toLowerCase()!==d.toLowerCase()||(h||g)&&h!==e)):!0},finishLoad:function(a,c,d,e){d=c?b.strip(d):d,o.isBuild&&(n[a]=d),e(d)},load:function(a,c,d,e){if(e&&e.isBuild&&!e.inlineText)return void d();o.isBuild=e&&e.isBuild;var f=b.parseName(a),g=f.moduleName+(f.ext?"."+f.ext:""),h=c.toUrl(g),i=o.useXhr||b.useXhr;return 0===h.indexOf("empty:")?void d():void(!j||i(h,k,l,m)?b.get(h,function(c){b.finishLoad(a,f.strip,c,d)},function(a){d.error&&d.error(a)}):c([g],function(a){b.finishLoad(f.moduleName+"."+f.ext,f.strip,a,d)}))},write:function(a,c,d){if(n.hasOwnProperty(c)){var e=b.jsEscape(n[c]);d.asModule(a+"!"+c,"define(function () { return '"+e+"';});\n")}},writeFile:function(a,c,d,e,f){var g=b.parseName(c),h=g.ext?"."+g.ext:"",i=g.moduleName+h,j=d.toUrl(g.moduleName+h)+".js";b.load(i,d,function(){var c=function(a){return e(j,a)};c.asModule=function(a,b){return e.asModule(a,j,b)},b.write(a,i,c,f)},f)}},"node"===o.env||!o.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]&&!process.versions["atom-shell"]?(c=require.nodeRequire("fs"),b.get=function(a,b,d){try{var e=c.readFileSync(a,"utf8");"﻿"===e[0]&&(e=e.substring(1)),b(e)}catch(f){d&&d(f)}}):"xhr"===o.env||!o.env&&b.createXhr()?b.get=function(a,c,d,e){var f,g=b.createXhr();if(g.open("GET",a,!0),e)for(f in e)e.hasOwnProperty(f)&&g.setRequestHeader(f.toLowerCase(),e[f]);o.onXhr&&o.onXhr(g,a),g.onreadystatechange=function(){var b,e;4===g.readyState&&(b=g.status||0,b>399&&600>b?(e=new Error(a+" HTTP status: "+b),e.xhr=g,d&&d(e)):c(g.responseText),o.onXhrComplete&&o.onXhrComplete(g,a))},g.send(null)}:"rhino"===o.env||!o.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?b.get=function(a,b){var c,d,e="utf-8",f=new java.io.File(a),g=java.lang.System.getProperty("line.separator"),h=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(f),e)),i="";try{for(c=new java.lang.StringBuffer,d=h.readLine(),d&&d.length()&&65279===d.charAt(0)&&(d=d.substring(1)),null!==d&&c.append(d);null!==(d=h.readLine());)c.append(g),c.append(d);i=String(c.toString())}finally{h.close()}b(i)}:("xpconnect"===o.env||!o.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(d=Components.classes,e=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),f="@mozilla.org/windows-registry-key;1"in d,b.get=function(a,b){var c,g,h,i={};f&&(a=a.replace(/\//g,"\\")),h=new FileUtils.File(a);try{c=d["@mozilla.org/network/file-input-stream;1"].createInstance(e.nsIFileInputStream),c.init(h,1,0,!1),g=d["@mozilla.org/intl/converter-input-stream;1"].createInstance(e.nsIConverterInputStream),g.init(c,"utf-8",c.available(),e.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),g.readString(c.available(),i),g.close(),c.close(),b(i.value)}catch(j){throw new Error((h&&h.path||"")+": "+j)}}),b}),define("text!template_components_list",[],function(){return'\n<div >\n<div class="ajax_noload"><img src="images/wifi.png">网络请求失败，请稍候再试<span><img src="images/sx.png"></span></div>\n\n<!--顶部-->\n<div class="nheader_list">\n    <div class="nindex_fanhui"></div>\n    <div class="nindex_sousuo" unselectable="on" style="-moz-user-select:none;-webkit-user-select:none;" onselectstart="return false;"><em></em><b class="nkeyword">全球购，找到好口碑</b></div>\n    <div class="list_style"></div>\n</div>\n<!--/顶部-->\n<!--站内搜索关键词-->\n<input type="hidden" name="#request.keywordCodition" value="" id="keywordCodition">\n<!--搜索关键字-->\n<input type="hidden" name="#request.flagCodition" value="1" id="flagCodition">\n<!--1,升序，2降序-->\n<input type="hidden" name="#request.sortCodition" value="2" id="sortCodition">\n<!--当前页-->\n<input type="hidden" name="#request.pageNumCodition" value="1" id="pageNumCodition">\n<!--品牌-->\n<input type="hidden" name="#request.brandCodition" value="" id="brandCodition">\n<!--搜索关键字-->\n<input type="hidden" name="#request.attributeCodition" value="" id="attributeCodition">\n<!--搜索关键字-->\n<input type="hidden" name="#request.markCodition" value="0" id="markCodition">\n<!--三级类目-->\n<input type="hidden" name="#request.goods_category_id" value="12" id="goods_category_id">\n<!--每页大小-->\n<input type="hidden" name="pageBean.page.size" value="10" id="goodsNum">\n\n\n<!--select-->\n<div class="nlist_top">\n    <span class="cur" id="salesvolume">销量</span>\n    <span id="price" class="sheng0 ">价格</span>\n    <span id="countreview">评价</span>\n    <span id="viewcount">人气</span>\n</div>\n<!--/select-->\n\n<!--list-->\n<div class="nlist_list nlist_list_kuai" id="ajax_goodsList"></div>\n<!--/list-->\n<div class="clear"></div>\n<img src="images/loading.gif" class="nlist_loading">\n<!--没有更多提示-->\n<img src="images/nomore.png" class="nlist_nomore">\n<!--没有商品提示-->\n<img src="images/no.png" class="nlist_no">\n\n<a href="#" class="fix_go_top" onclick="return false;"></a>\n</div>'}),define("lehu.h5.component.list",["zepto","can","lehu.h5.business.config","lehu.util","lehu.h5.api","lehu.hybrid","imagelazyload","text!template_components_list"],function(a,b,c,d,e,f,g,h){return b.Control.extend({param:{},helpers:{},init:function(){this.initData();var a=b.mustache(h),c=a(this.options);this.element.html(c),this.param=this.initParams(),this.totalPageNum="",this.goodsCategoryList(),this.bindScroll()},initData:function(){this.URL=f.getUrl()},initParams:function(){var a=b.deparam(window.location.search.substr(1));return a.pageSize=10,a.pageIndex=1,a},goodsCategoryList:function(){var b=this,d=new e({url:c.setting.action.goodsCategoryList,data:this.param,method:"post"});d.sendRequest().done(function(c){a("html").attr("data_type",c.type);var d="";b.totalPageNum=c.totalPageNum;var e=c&&c.goodsList;if(e&&e.length>0){a(".nlist_nomore,.nlist_no").css("display","none");for(var f=0;f<e.length;f++){var g=e[f].IS_CONSUMPTION_COUPON,h=String(e[f].PRICE.toString()),i=Math.floor(h),j=h.slice(-2),k=e[f].DISCOUNT_PRICE;if(d+="<div class='nlist_list_main'  data-STORE_ID='"+e[f].STORE_ID+"' data-GOODS_NO='"+e[f].GOODS_NO+"' data-GOODS_ID='"+e[f].GOODS_ID+"' >",d+="<img class='nlist_list_mainleft lazyload'  src="+b.URL.IMAGE_URL+e[f].GOODS_IMG+" >",d+="<div class='nlist_list_mainright'>",d+="<div class='nlist_list_title'>",1==g&&(d+="<span class='nlist_list_title_zhiyou'>【海外直邮】</span>"),2==g&&(d+="<span class='nlist_list_title_zhiyou'>【保税区发货】</span>"),d+=e[f].GOODS_NAME,d+="</div>",void 0!==k){var l=String(k),m=Math.floor(l),n=l.slice(-2);d+="<div class='nlist_list_jiage'><span>￥"+m+".<em>"+n+"</em></span><i>￥<del>"+h+"</del></i></div>"}else d+="<div class='nlist_list_jiage'><span>￥"+i+".<em>"+j+"</em></span></div>";e[f].STORE_NAME&&(d+="<div class='nlist_list_pinglun'>"+e[f].STORE_NAME+"</div>"),d+="</div></div>"}a("#ajax_goodsList").append(d),b.lazyload(),a(".nwrapper_list").removeClass("one_loading"),a(".nlist_list_main").unbind("click").click(function(){var b=a(this).attr("data-STORE_ID"),c=a(this).attr("data-GOODS_NO"),d=a(this).attr("data-GOODS_ID"),e={funName:"good_detail_fun",params:{STORE_ID:b,GOODS_NO:c,GOODS_ID:d}};native.nativeFun(e),console.log("good_detail_fun"),console.log("1")}),a(".nmiaosha_main a,.prommotionLayout_detail").click(function(){var b=a(this).attr("data-STORE_ID"),c=a(this).attr("data-GOODS_NO"),d=a(this).attr("data-GOODS_ID"),e={funName:"good_detail_fun",params:{STORE_ID:b,GOODS_NO:c,GOODS_ID:d}};native.nativeFun(e)})}else b.nlist_no();b.param.pageIndex==c.totalPageNum&&b.nlist_no()}).fail(function(){a(".ajax_noload").show()})},bindScroll:function(){{var b=this,c=400,d=!0,e=0;a("#ajax_goodsList")}a(window).scroll(function(){if(b.param.pageIndex>b.totalPageNum)return void b.nlist_no();var f=a(window).scrollTop();e=parseFloat(a(window).height())+parseFloat(f),a(document).height()==e?(b.param.pageIndex++,b.goodsCategoryList(),b.lazyload()):a(document).height()-e<=c?d&&(d=!1,b.param.pageIndex++,b.goodsCategoryList(),b.lazyload()):d=!0})},"#salesvolume click":function(b){b.hasClass("cur")||(a(".nlist_nomore").css("display","none"),a(".nlist_loading").css("display","block"),a(".nwrapper_list").addClass("one_loading"),this.param.pageIndex=1,this.param.sort=2,this.param.sortMode=1,this.param.sortType=2,a("#ajax_goodsList").empty(),this.goodsCategoryList(),a("#price").removeClass("jiang"),a("#price").removeClass("sheng"))},"#price click":function(b){b.hasClass("sheng")?(b.removeClass("sheng"),b.addClass("jiang"),a(".nlist_nomore").css("display","none"),a(".nlist_loading").css("display","block"),a(".nwrapper_list").addClass("one_loading"),this.param.pageIndex=1,this.param.sort=2,this.param.sortMode=2,this.param.sortType=2,a("#ajax_goodsList").empty(),this.goodsCategoryList()):(b.removeClass("jiang"),b.addClass("sheng"),a(".nlist_nomore").css("display","none"),a(".nlist_loading").css("display","block"),a(".nwrapper_list").addClass("one_loading"),this.param.pageIndex=1,this.param.sort=2,this.param.sortMode=2,this.param.sortType=1,a("#ajax_goodsList").empty(),this.goodsCategoryList())},"#countreview click":function(b){b.hasClass("cur")||(a(".nlist_nomore").css("display","none"),a(".nlist_loading").css("display","block"),a(".nwrapper_list").addClass("one_loading"),this.param.pageIndex=1,this.param.sort=2,this.param.sortMode=3,this.param.sortType=2,a("#ajax_goodsList").empty(),this.goodsCategoryList(),a("#price").removeClass("jiang"),a("#price").removeClass("sheng"))},"#viewcount click":function(){a(this).hasClass("cur")||(a(".nlist_nomore").css("display","none"),a(".nlist_loading").css("display","block"),a(".nwrapper_list").addClass("one_loading"),this.param.pageIndex=1,this.param.sort=2,this.param.sortMode=4,this.param.sortType=2,a("#ajax_goodsList").empty(),this.goodsCategoryList(),a("#price").removeClass("jiang"),a("#price").removeClass("sheng"))},".nlist_top span click":function(b){a(".nlist_top span").removeClass("cur"),b.addClass("cur"),a(".nlist_top").css("position","static"),a(".nlist_list").css("margin-top","0")},".list_style click":function(b){b.toggleClass("list_style_kuai"),b.hasClass("list_style_kuai")?(a(".nlist_list").removeClass("nlist_list_kuai"),a("body").css("background","#ffffff"),this.lazyload()):(a(".nlist_list").addClass("nlist_list_kuai"),a("body").css("background","#ecebf2"))},nlist_no:function(){a(".nlist_loading").css("display","none");var b=a("#ajax_goodsList").html();""==b?a(".nlist_no").show():a(".nlist_nomore").css("display","block")},lazyload:function(){a(".lazyload").picLazyLoad({threshold:1e3})},".nindex_sousuo click":function(){var a={funName:"search_fun",params:{}};f.nativeFun(a),console.log(search_fun)},".nindex_fanhui click":function(){var a={funName:"back_fun",params:{}};f.nativeFun(a),console.log("back_fun")},getQueryString:function(a){var b=new RegExp("(^|&)"+a+"=([^&]*)(&|$)","i"),c=window.location.search.substr(1).match(b);return null!=c?unescape(decodeURIComponent(c[2])):null}})}),function(){function a(b,d){function e(a,b){return function(){return a.apply(b,arguments)}}var f;if(d=d||{},this.trackingClick=!1,this.trackingClickStart=0,this.targetElement=null,this.touchStartX=0,this.touchStartY=0,this.lastTouchIdentifier=0,this.touchBoundary=d.touchBoundary||10,this.layer=b,this.tapDelay=d.tapDelay||200,this.tapTimeout=d.tapTimeout||700,!a.notNeeded(b)){for(var g=["onMouse","onClick","onTouchStart","onTouchMove","onTouchEnd","onTouchCancel"],h=this,i=0,j=g.length;j>i;i++)h[g[i]]=e(h[g[i]],h);c&&(b.addEventListener("mouseover",this.onMouse,!0),b.addEventListener("mousedown",this.onMouse,!0),b.addEventListener("mouseup",this.onMouse,!0)),b.addEventListener("click",this.onClick,!0),b.addEventListener("touchstart",this.onTouchStart,!1),b.addEventListener("touchmove",this.onTouchMove,!1),b.addEventListener("touchend",this.onTouchEnd,!1),b.addEventListener("touchcancel",this.onTouchCancel,!1),Event.prototype.stopImmediatePropagation||(b.removeEventListener=function(a,c,d){var e=Node.prototype.removeEventListener;"click"===a?e.call(b,a,c.hijacked||c,d):e.call(b,a,c,d)},b.addEventListener=function(a,c,d){var e=Node.prototype.addEventListener;"click"===a?e.call(b,a,c.hijacked||(c.hijacked=function(a){a.propagationStopped||c(a)}),d):e.call(b,a,c,d)}),"function"==typeof b.onclick&&(f=b.onclick,b.addEventListener("click",function(a){f(a)},!1),b.onclick=null)}}var b=navigator.userAgent.indexOf("Windows Phone")>=0,c=navigator.userAgent.indexOf("Android")>0&&!b,d=/iP(ad|hone|od)/.test(navigator.userAgent)&&!b,e=d&&/OS 4_\d(_\d)?/.test(navigator.userAgent),f=d&&/OS [6-7]_\d/.test(navigator.userAgent),g=navigator.userAgent.indexOf("BB10")>0;a.prototype.needsClick=function(a){switch(a.nodeName.toLowerCase()){case"button":case"select":case"textarea":if(a.disabled)return!0;break;case"input":if(d&&"file"===a.type||a.disabled)return!0;break;case"label":case"iframe":case"video":return!0}return/\bneedsclick\b/.test(a.className)},a.prototype.needsFocus=function(a){switch(a.nodeName.toLowerCase()){case"textarea":return!0;case"select":return!c;case"input":switch(a.type){case"button":case"checkbox":case"file":case"image":case"radio":case"submit":return!1}return!a.disabled&&!a.readOnly;default:return/\bneedsfocus\b/.test(a.className)}},a.prototype.sendClick=function(a,b){var c,d;document.activeElement&&document.activeElement!==a&&document.activeElement.blur(),d=b.changedTouches[0],c=document.createEvent("MouseEvents"),c.initMouseEvent(this.determineEventType(a),!0,!0,window,1,d.screenX,d.screenY,d.clientX,d.clientY,!1,!1,!1,!1,0,null),c.forwardedTouchEvent=!0,a.dispatchEvent(c)},a.prototype.determineEventType=function(a){return c&&"select"===a.tagName.toLowerCase()?"mousedown":"click"},a.prototype.focus=function(a){var b;d&&a.setSelectionRange&&0!==a.type.indexOf("date")&&"time"!==a.type&&"month"!==a.type?(b=a.value.length,a.setSelectionRange(b,b)):a.focus()},a.prototype.updateScrollParent=function(a){var b,c;if(b=a.fastClickScrollParent,!b||!b.contains(a)){c=a;do{if(c.scrollHeight>c.offsetHeight){b=c,a.fastClickScrollParent=c;break}c=c.parentElement}while(c)}b&&(b.fastClickLastScrollTop=b.scrollTop)},a.prototype.getTargetElementFromEventTarget=function(a){return a.nodeType===Node.TEXT_NODE?a.parentNode:a},a.prototype.onTouchStart=function(a){var b,c,f;if(a.targetTouches.length>1)return!0;if(b=this.getTargetElementFromEventTarget(a.target),c=a.targetTouches[0],d){if(f=window.getSelection(),f.rangeCount&&!f.isCollapsed)return!0;if(!e){if(c.identifier&&c.identifier===this.lastTouchIdentifier)return a.preventDefault(),!1;this.lastTouchIdentifier=c.identifier,this.updateScrollParent(b)}}return this.trackingClick=!0,this.trackingClickStart=a.timeStamp,this.targetElement=b,this.touchStartX=c.pageX,this.touchStartY=c.pageY,a.timeStamp-this.lastClickTime<this.tapDelay&&a.preventDefault(),!0},a.prototype.touchHasMoved=function(a){var b=a.changedTouches[0],c=this.touchBoundary;return Math.abs(b.pageX-this.touchStartX)>c||Math.abs(b.pageY-this.touchStartY)>c?!0:!1},a.prototype.onTouchMove=function(a){return this.trackingClick?((this.targetElement!==this.getTargetElementFromEventTarget(a.target)||this.touchHasMoved(a))&&(this.trackingClick=!1,this.targetElement=null),!0):!0},a.prototype.findControl=function(a){return void 0!==a.control?a.control:a.htmlFor?document.getElementById(a.htmlFor):a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea")},a.prototype.onTouchEnd=function(a){var b,g,h,i,j,k=this.targetElement;if(!this.trackingClick)return!0;if(a.timeStamp-this.lastClickTime<this.tapDelay)return this.cancelNextClick=!0,!0;if(a.timeStamp-this.trackingClickStart>this.tapTimeout)return!0;if(this.cancelNextClick=!1,this.lastClickTime=a.timeStamp,g=this.trackingClickStart,this.trackingClick=!1,this.trackingClickStart=0,f&&(j=a.changedTouches[0],k=document.elementFromPoint(j.pageX-window.pageXOffset,j.pageY-window.pageYOffset)||k,k.fastClickScrollParent=this.targetElement.fastClickScrollParent),h=k.tagName.toLowerCase(),"label"===h){if(b=this.findControl(k)){if(this.focus(k),c)return!1;k=b}}else if(this.needsFocus(k))return a.timeStamp-g>100||d&&window.top!==window&&"input"===h?(this.targetElement=null,!1):(this.focus(k),this.sendClick(k,a),d&&"select"===h||(this.targetElement=null,a.preventDefault()),!1);return d&&!e&&(i=k.fastClickScrollParent,i&&i.fastClickLastScrollTop!==i.scrollTop)?!0:(this.needsClick(k)||(a.preventDefault(),this.sendClick(k,a)),!1)},a.prototype.onTouchCancel=function(){this.trackingClick=!1,this.targetElement=null},a.prototype.onMouse=function(a){return this.targetElement?a.forwardedTouchEvent?!0:a.cancelable&&(!this.needsClick(this.targetElement)||this.cancelNextClick)?(a.stopImmediatePropagation?a.stopImmediatePropagation():a.propagationStopped=!0,a.stopPropagation(),a.preventDefault(),!1):!0:!0},a.prototype.onClick=function(a){var b;return this.trackingClick?(this.targetElement=null,this.trackingClick=!1,!0):"submit"===a.target.type&&0===a.detail?!0:(b=this.onMouse(a),b||(this.targetElement=null),b)},a.prototype.destroy=function(){var a=this.layer;c&&(a.removeEventListener("mouseover",this.onMouse,!0),a.removeEventListener("mousedown",this.onMouse,!0),a.removeEventListener("mouseup",this.onMouse,!0)),a.removeEventListener("click",this.onClick,!0),a.removeEventListener("touchstart",this.onTouchStart,!1),a.removeEventListener("touchmove",this.onTouchMove,!1),a.removeEventListener("touchend",this.onTouchEnd,!1),a.removeEventListener("touchcancel",this.onTouchCancel,!1)},a.notNeeded=function(a){var b,d,e,f;if("undefined"==typeof window.ontouchstart)return!0;if(d=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1]){if(!c)return!0;if(b=document.querySelector("meta[name=viewport]")){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(d>31&&document.documentElement.scrollWidth<=window.outerWidth)return!0}}if(g&&(e=navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/),e[1]>=10&&e[2]>=3&&(b=document.querySelector("meta[name=viewport]")))){if(-1!==b.content.indexOf("user-scalable=no"))return!0;if(document.documentElement.scrollWidth<=window.outerWidth)return!0}return"none"===a.style.msTouchAction||"manipulation"===a.style.touchAction?!0:(f=+(/Firefox\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1],f>=27&&(b=document.querySelector("meta[name=viewport]"),b&&(-1!==b.content.indexOf("user-scalable=no")||document.documentElement.scrollWidth<=window.outerWidth))?!0:"none"===a.style.touchAction||"manipulation"===a.style.touchAction?!0:!1)},a.attach=function(b,c){return new a(b,c)},"function"==typeof define&&"object"==typeof define.amd&&define.amd?define("fastclick",[],function(){return a}):"undefined"!=typeof module&&module.exports?(module.exports=a.attach,module.exports.FastClick=a):window.FastClick=a}(),define("lehu.h5.page.list",["can","zepto","fastclick","lehu.util","lehu.h5.framework.comm","lehu.h5.business.config","lehu.hybrid","lehu.h5.component.list"],function(a,b,c,d,e,f,g,h){c.attach(document.body);var i=a.Control.extend({init:function(){new h("#list")}});new i("#list")}),require(["lehu.h5.page.list"]);