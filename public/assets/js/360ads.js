/**
 * Author  sihuan.huang
 * huangsihuan@360.cn
 */

(function(global){
    var _globals = global;

    function namespace(ns) {
        var a = ns.split("."),
            p = _globals, i;
        for (i = 0; i < a.length; i++) {
            p[a[i]] = p = p[a[i]] || {};
        }
        return p;
    }


    var  mediav = namespace("mediavnewsfeed"),_ = namespace('mediavnewsfeed.lang'),$mvUtil = namespace("mediavnewsfeed.util"),$sio = namespace("mediavnewsfeed.sio");
    //2017.9.4 add by wangguangbin
    var $j=namespace('mediavnewsfeed.jqlite');

    /**
     * @global
     * @property {function} NewFeed - class of NewFeed
     * */
    _globals.NewsFeed = NewsFeed;
    /**
     * @description 信息流广告构造函数
     * @constructs NewFeed
     * @requires module:jqlite
     * */
    function NewsFeed(){
        var newfeed = this;

        this.reqtimes=1;

        /*
        	默认:正文下方
         "detail_yc":正文右侧
         "index_yc":首页右侧
         "index_xxl":首页信息流
         "index_lb":首页轮播
        */
        this.feedtype="";
        /**
         * @property {object[]} ads - 存放请求的广告，存放已生成的node reference
         * */
        this.ads = [];  //存放请求的广告

        /**
         * @property {object} options -配置参数
         * @property {number} options.size - 每次请求的个数
         * @property {string} options.showid - 广告未showid
         * @property {number} options.countForDisplay - 展示条数
         * @property {number} options.offsetExposeHeight - 0-1之间   比如 0.5  就是提条广告露出一半高度
         * @example
         * this.options = {
         *   size:10,   //每次请求的个数
         *   showid:'RSBpV9',
         *   countForDisplay:1,
         *   // 是否广告完全出现在视野内
         *   offsetExposeHeight:.2   //0-1之间   比如 0.5  就是提条广告露出一半高度
         *  }
         * @default
         * */
        this.options = {
            size:4,   //每次请求的个数
            showid:'RSBpV9',
            countForDisplay:1,
            // 是否广告完全出现在视野内
            offsetExposeHeight:.2   //0-1之间   比如 0.5  就是提条广告露出一半高度
        }

        /**
         * @property {Array} defaultProducts - 兜底数据
         * @default
         * */
        //兜底素材
        this.defaultProducts  =  [
            {
                "slot":1,
                "type":1,
                "img":"//s3m.mediav.com/galileo/2c3373ac5364199733adc173ffeec53d.jpg",
                "desc":"订阅英孚【每日英语】，全年免费，每天不同主题，上下班路上，坐地铁，随时随地，利用碎片时间迅速提高自己的英语水平。 ",
                "title":"玩手机不如学一会儿英语",
                "src":"英孚英语广告",
                "curl":"//ssxd.mediav.com/s?type=2&r=20&pinfo=&mv_ref=www%2Ebtime%2Ecom&enup=CAABZeed4QgAAuGd52UA&mvid=NzAxMTkwODA0Mzk1NzE3MTAwMTAwMTc&bid=1131240636fcef37&price=AAAAAFi3gBkAAAAAAABKDp0Pzqfto+TocS3HEg==&finfo=DAABCAABAAAGnQgAAgAAANgEAAM/epA8DhNemAAIAAIAAAADCgADgKPfu662wGgIAAQAAAEFBgAGItAIAAgBAlTQCgAJAAAAAAAGABgGAAoAAAA&ugi=FczbDhWOnkBMFQIVsgQVABUAABXWrLruBBYEAA&uai=Ff6IvwElAhUCFqnUxJOX15Tc/gEV7gglrK6B3wQA&ubi=FZqrHRXcwasBFeanhg0VwOP0QhUGFRwW+qGCjBQWqdSvrI2RkNz+ATQCFrCAMCUGFfiEvc0LFawBAA&clickid=0&csign=33e727210eca5616&url=http%3A%2F%2Fwww%2Eef%2Ecom%2Ecn%2Fonline%2Flp%2FPPCET%2FSM%2FBSG%2FECEE%2D5minnosub%2Easpx%3Fctr%3Dcn%26ptn%3Dcnbd%26etag%3DEFCN%5FPPC%5F%2D7a4d9972727b4b76a176905aed79be1a%2DCNPPC%2DShanghai%2DBtime%2Dfb1%2D",
                "imptk":[       "//ssxd.mediav.com/s?type=1&r=20&tid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&finfo=DAABCAABAAAAqggAAgAAANoEAAM/Q4BvxYW5bwAIAAIAAAADCgADSSHNdQoKwK8IAAQAAAEeBgAGK4UIAAgAGfCgCgAJAAAAAAAAAAgGAAoAAAA&mvid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&mv_ref=btime%2Ecom&enup=CAABZed3JggAAiZ352UA&bidid=1096c03e24ec9f38&ugi=FczbDhWOnkBMFQIVsgQVABUAABWM593NBwA&uai=FfyhjwElAhUCFvrg0+adl+KhkgEV7ggA&ubi=FfSBHhW4r7UBFfro/AwV/suzQhUGFRwWpKbtmhQW+uDozafd5qGSATQCFhAW+uDozQcVBgA&price=AAAAAFfX0fgAAAAAAAhJUJ8cgNleqs5qgtYaCQ==",      "//max-l.mediav.com/rtb?type=2&d=100&b=1096c03e24ec9f38&p=1173630&l=120550&s=1&w=AAAAAFfX0fgAAAAAAAhJhAd6SMhKNl8a1161Ng==&k=VSc4GQAAAAA=&i=gPunJBMUs9JX&v=31521761606351419080016"
                ],
                "clktk":[
                    "https://max-l.mediav.com/rtb?type=3&d=100&b=1096c03e24ec9f38&p=1173630&l=120550&s=1&k=VSc4GQAAAAA=&i=gPunJBMUs9JX&v=31521761606351419080016&turl="
                ]
            },
            {
                "slot": 2,
                "type": 2,
                "desc": "订阅英孚【每日英语】，全年免费，每天不同主题，上下班路上，坐地铁，随时随地，利用碎片时间迅速提高自己的英语水平。 ",
                "title": "玩手机不如学一会儿英语",
                "src": "英孚英语广告",
                "curl": "//ssxd.mediav.com/s?type=2&r=20&pinfo=&mv_ref=www%2Ebtime%2Ecom&enup=CAABZeed4QgAAuGd52UA&mvid=NzAxMTkwODA0Mzk1NzE3MTAwMTAwMTc&bid=1131240636fcef37&price=AAAAAFi3gBkAAAAAAABKDp0Pzqfto+TocS3HEg==&finfo=DAABCAABAAAGnQgAAgAAANgEAAM/epA8DhNemAAIAAIAAAADCgADgKPfu662wGgIAAQAAAEFBgAGItAIAAgBAlTQCgAJAAAAAAAGABgGAAoAAAA&ugi=FczbDhWOnkBMFQIVsgQVABUAABXWrLruBBYEAA&uai=Ff6IvwElAhUCFqnUxJOX15Tc/gEV7gglrK6B3wQA&ubi=FZqrHRXcwasBFeanhg0VwOP0QhUGFRwW+qGCjBQWqdSvrI2RkNz+ATQCFrCAMCUGFfiEvc0LFawBAA&clickid=0&csign=33e727210eca5616&url=http%3A%2F%2Fwww%2Eef%2Ecom%2Ecn%2Fonline%2Flp%2FPPCET%2FSM%2FBSG%2FECEE%2D5minnosub%2Easpx%3Fctr%3Dcn%26ptn%3Dcnbd%26etag%3DEFCN%5FPPC%5F%2D7a4d9972727b4b76a176905aed79be1a%2DCNPPC%2DShanghai%2DBtime%2Dfb1%2D",
                "imptk": ["//ssxd.mediav.com/s?type=1&r=20&tid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&finfo=DAABCAABAAAAqggAAgAAANoEAAM/Q4BvxYW5bwAIAAIAAAADCgADSSHNdQoKwK8IAAQAAAEeBgAGK4UIAAgAGfCgCgAJAAAAAAAAAAgGAAoAAAA&mvid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&mv_ref=btime%2Ecom&enup=CAABZed3JggAAiZ352UA&bidid=1096c03e24ec9f38&ugi=FczbDhWOnkBMFQIVsgQVABUAABWM593NBwA&uai=FfyhjwElAhUCFvrg0+adl+KhkgEV7ggA&ubi=FfSBHhW4r7UBFfro/AwV/suzQhUGFRwWpKbtmhQW+uDozafd5qGSATQCFhAW+uDozQcVBgA&price=AAAAAFfX0fgAAAAAAAhJUJ8cgNleqs5qgtYaCQ==", "//max-l.mediav.com/rtb?type=2&d=100&b=1096c03e24ec9f38&p=1173630&l=120550&s=1&w=AAAAAFfX0fgAAAAAAAhJhAd6SMhKNl8a1161Ng==&k=VSc4GQAAAAA=&i=gPunJBMUs9JX&v=31521761606351419080016"
                ],
                "clktk": ["https://max-l.mediav.com/rtb?type=3&d=100&b=1096c03e24ec9f38&p=1173630&l=120550&s=1&k=VSc4GQAAAAA=&i=gPunJBMUs9JX&v=31521761606351419080016&turl="
                ],
                "assets": [
                    {
                        "img": "//s3m.mediav.com/galileo/2c3373ac5364199733adc173ffeec53d.jpg",
                        "curl": "//ssxd.mediav.com/s?type=2&r=20&pinfo=&mv_ref=www%2Ebtime%2Ecom&enup=CAABZeed4QgAAuGd52UA&mvid=NzAxMTkwODA0Mzk1NzE3MTAwMTAwMTc&bid=1131240636fcef37&price=AAAAAFi3gBkAAAAAAABKDp0Pzqfto+TocS3HEg==&finfo=DAABCAABAAAGnQgAAgAAANgEAAM/epA8DhNemAAIAAIAAAADCgADgKPfu662wGgIAAQAAAEFBgAGItAIAAgBAlTQCgAJAAAAAAAGABgGAAoAAAA&ugi=FczbDhWOnkBMFQIVsgQVABUAABXWrLruBBYEAA&uai=Ff6IvwElAhUCFqnUxJOX15Tc/gEV7gglrK6B3wQA&ubi=FZqrHRXcwasBFeanhg0VwOP0QhUGFRwW+qGCjBQWqdSvrI2RkNz+ATQCFrCAMCUGFfiEvc0LFawBAA&clickid=0&csign=33e727210eca5616&url=http%3A%2F%2Fwww%2Eef%2Ecom%2Ecn%2Fonline%2Flp%2FPPCET%2FSM%2FBSG%2FECEE%2D5minnosub%2Easpx%3Fctr%3Dcn%26ptn%3Dcnbd%26etag%3DEFCN%5FPPC%5F%2D7a4d9972727b4b76a176905aed79be1a%2DCNPPC%2DShanghai%2DBtime%2Dfb1%2D"
                    },
                    {
                        "img": "//s3m.mediav.com/galileo/2c3373ac5364199733adc173ffeec53d.jpg",
                        "curl": "//ssxd.mediav.com/s?type=2&r=20&pinfo=&mv_ref=www%2Ebtime%2Ecom&enup=CAABZeed4QgAAuGd52UA&mvid=NzAxMTkwODA0Mzk1NzE3MTAwMTAwMTc&bid=1131240636fcef37&price=AAAAAFi3gBkAAAAAAABKDp0Pzqfto+TocS3HEg==&finfo=DAABCAABAAAGnQgAAgAAANgEAAM/epA8DhNemAAIAAIAAAADCgADgKPfu662wGgIAAQAAAEFBgAGItAIAAgBAlTQCgAJAAAAAAAGABgGAAoAAAA&ugi=FczbDhWOnkBMFQIVsgQVABUAABXWrLruBBYEAA&uai=Ff6IvwElAhUCFqnUxJOX15Tc/gEV7gglrK6B3wQA&ubi=FZqrHRXcwasBFeanhg0VwOP0QhUGFRwW+qGCjBQWqdSvrI2RkNz+ATQCFrCAMCUGFfiEvc0LFawBAA&clickid=0&csign=33e727210eca5616&url=http%3A%2F%2Fwww%2Eef%2Ecom%2Ecn%2Fonline%2Flp%2FPPCET%2FSM%2FBSG%2FECEE%2D5minnosub%2Easpx%3Fctr%3Dcn%26ptn%3Dcnbd%26etag%3DEFCN%5FPPC%5F%2D7a4d9972727b4b76a176905aed79be1a%2DCNPPC%2DShanghai%2DBtime%2Dfb1%2D"
                    },
                    {
                        "img": "//s3m.mediav.com/galileo/2c3373ac5364199733adc173ffeec53d.jpg",
                        "curl": "//ssxd.mediav.com/s?type=2&r=20&pinfo=&mv_ref=www%2Ebtime%2Ecom&enup=CAABZeed4QgAAuGd52UA&mvid=NzAxMTkwODA0Mzk1NzE3MTAwMTAwMTc&bid=1131240636fcef37&price=AAAAAFi3gBkAAAAAAABKDp0Pzqfto+TocS3HEg==&finfo=DAABCAABAAAGnQgAAgAAANgEAAM/epA8DhNemAAIAAIAAAADCgADgKPfu662wGgIAAQAAAEFBgAGItAIAAgBAlTQCgAJAAAAAAAGABgGAAoAAAA&ugi=FczbDhWOnkBMFQIVsgQVABUAABXWrLruBBYEAA&uai=Ff6IvwElAhUCFqnUxJOX15Tc/gEV7gglrK6B3wQA&ubi=FZqrHRXcwasBFeanhg0VwOP0QhUGFRwW+qGCjBQWqdSvrI2RkNz+ATQCFrCAMCUGFfiEvc0LFawBAA&clickid=0&csign=33e727210eca5616&url=http%3A%2F%2Fwww%2Eef%2Ecom%2Ecn%2Fonline%2Flp%2FPPCET%2FSM%2FBSG%2FECEE%2D5minnosub%2Easpx%3Fctr%3Dcn%26ptn%3Dcnbd%26etag%3DEFCN%5FPPC%5F%2D7a4d9972727b4b76a176905aed79be1a%2DCNPPC%2DShanghai%2DBtime%2Dfb1%2D"
                    },
                    {
                        "img": "//s3m.mediav.com/galileo/2c3373ac5364199733adc173ffeec53d.jpg",
                        "curl": "//ssxd.mediav.com/s?type=2&r=20&pinfo=&mv_ref=www%2Ebtime%2Ecom&enup=CAABZeed4QgAAuGd52UA&mvid=NzAxMTkwODA0Mzk1NzE3MTAwMTAwMTc&bid=1131240636fcef37&price=AAAAAFi3gBkAAAAAAABKDp0Pzqfto+TocS3HEg==&finfo=DAABCAABAAAGnQgAAgAAANgEAAM/epA8DhNemAAIAAIAAAADCgADgKPfu662wGgIAAQAAAEFBgAGItAIAAgBAlTQCgAJAAAAAAAGABgGAAoAAAA&ugi=FczbDhWOnkBMFQIVsgQVABUAABXWrLruBBYEAA&uai=Ff6IvwElAhUCFqnUxJOX15Tc/gEV7gglrK6B3wQA&ubi=FZqrHRXcwasBFeanhg0VwOP0QhUGFRwW+qGCjBQWqdSvrI2RkNz+ATQCFrCAMCUGFfiEvc0LFawBAA&clickid=0&csign=33e727210eca5616&url=http%3A%2F%2Fwww%2Eef%2Ecom%2Ecn%2Fonline%2Flp%2FPPCET%2FSM%2FBSG%2FECEE%2D5minnosub%2Easpx%3Fctr%3Dcn%26ptn%3Dcnbd%26etag%3DEFCN%5FPPC%5F%2D7a4d9972727b4b76a176905aed79be1a%2DCNPPC%2DShanghai%2DBtime%2Dfb1%2D"
                    }
                ]
            }
        ];



        /**
         * @function
         * @description 根据ad.type渲染生成node references
         * @param {object} data 待渲染数据
         * @param {object[]} data.ads - 广告对象
         * @param {number} data.ads[].type -  这里的type代表不同的广告类型
         * 1表示单图小图样式，2表示组图样式，3表示单图大图样式, 根据类型 渲染成相应的广告样式
         * */
        //根据数据渲染成dom并添加点击事件   curl是跳转地址  仅供参考
        this.renderDom = function(data){
            console.log('this.ads', this.ads)
            console.log('data',data)
            var newsfeed = this;
            for(var i=0;i<data.ads.length;i++){

                var ad = data.ads[i];

                /**
                 *  这里的type代表不同的广告类型
                 *  1表示单图小图样式，2表示组图样式，3表示单图大图样式
                 *  根据类型 渲染成相应的广告样式
                 *
                 *  可以加上不同的class  方便做样式修改
                 */

                var addom=null,template;
                if(newsfeed.feedtype==""){
	                if(ad.type == '1'){
							        template = $mvUtil.supplant(
													'<li class="recommend_news">'+
												  '<div class="pic">'+
												    '<a href="{curl}" target="_blank" title="{title}">'+
												      '<img onerror="nofind(this);" class="animation" src="{img}" alt="{title}"></a>'+
												  '</div>'+
												  '<a href="{curl}" target="_blank"><div class="text">'+
												    '<h3>'+
												      '{title}</h3>'+
												    '<p class="source">'+
	                        	'<div class="mediav-newsfeed-listitem__footer-bar">'+
		                        '<span class="mediav-newsfeed-listitem__ad-tag">广告</span>'+
		                        '<span class="mediav-newsfeed-listitem__src" style="font-size:12px">{src}</span></div></p>'+
												  '</div></a>'+
												'</li>',ad);
	                    addom =  $j.JQLite(template);
	                    addom.addClass('mediav-newsfeed-listitem-type-1');
	                    addom.addClass('mediavfeed-newsitem');
	                }else if(ad.type == '3'){
	                    template = $mvUtil.supplant('<li><div class="mediav-newsfeed-listitem">'+
	                        '<div  class="mediav-newsfeed-listitem__img-wrap"> <a href="{curl}" target="_blank" style=" display: inline-block;cursor: pointer;"><img src = "{img}" data-baiduimageplus-ignore /></a></div>' +
	                        '<a href="{curl}" target="_blank"><div class="mediav-newsfeed-listitem__content-wrap" >'+
	                        '<h2 class="mediav-newsfeed-listitem__title">{title}</h2>'+
	                        '<div class="mediav-newsfeed-listitem__footer-bar">'+
	                        '<span class="mediav-newsfeed-listitem__ad-tag">广告</span>'+
	                        '<span style="font-size:14px" class="mediav-newsfeed-listitem__src">{src}</span>'+
	                        '</div>'+
	                        '</div>'+
	                        '</a></div></li>',ad);
	                    addom =  $j.JQLite(template);
	                    addom.addClass('mediav-newsfeed-listitem-type-3');
	                    addom.addClass('mediavfeed-newsitem');
	                }else if(ad.type == '2'){

	                    var imagewraper = [];

	                    for(var j = 0; j < ad.assets.length ;j++){
	                        imagewraper.push('<div  class="mediav-newsfeed-listitem__img-wrap"> <a href="{assets.'+j+'.curl}" target="_blank" style=" display: inline-block;cursor: pointer;"><img style="width:140px;height:105px;margin-right:20px;"src = "{assets.'+j+'.img}"/></a></div>');
	                    }

	                    template = $mvUtil.supplant('<li><div class="mediav-newsfeed-listitem">'+
	                        imagewraper.join(' ') +
	                        '<a href="{curl}" target="_blank"><div class="mediav-newsfeed-listitem__content-wrap" >'+
	                        '<h2 class="mediav-newsfeed-listitem__title">{title}</h2>'+
	                        '<div class="mediav-newsfeed-listitem__footer-bar">'+
	                        '<span class="mediav-newsfeed-listitem__ad-tag">广告</span>'+
	                        '<span style="font-size:14px" class="mediav-newsfeed-listitem__src">{src}</span>'+
	                        '</div>'+
	                        '</div></a>'+
	                        '</div></li>',ad);
	                    addom =  $j.JQLite(template);
	                    addom.addClass('mediav-newsfeed-listitem-type-2');
	                    addom.addClass('mediavfeed-newsitem');
	                }
                }else if(newsfeed.feedtype=="index_xxl"){
	                if(ad.type == '1'){
							        template = $mvUtil.supplant(
													'<li>'+
												   '<div class="bui-box single-mode">'+
												    '<div class="bui-left single-mode-lbox">'+
												     '<a href="{curl}" target="_blank" class="img-wrap"> <img src="{img}" style="width:200px;"/> </a>'+
												    '</div>'+
												    '<a href="{curl}" target="_blank"><div class="single-mode-rbox">'+
												     '<div class="single-mode-rbox-inner">'+
												      '<div class="title-box">'+
												       '{title}'+
												      '</div>'+
												      '<div class="bui-box footer-bar">'+
												       '<div class="bui-left footer-bar-left">'+
			                        	'<div class="mediav-newsfeed-listitem__footer-bar">'+
				                        '<span class="mediav-newsfeed-listitem__ad-tag">广告</span>'+
				                        '<span class="mediav-newsfeed-listitem__src" style="font-size:12px">{src}</span></div>'+
												       '</div>'+
												      '</div>'+
												     '</div>'+
												    '</div></a>'+
												   '</div>'+
												  '</li>',ad);
	                    addom =  $j.JQLite(template);
	                    addom.addClass('mediav-newsfeed-listitem-type-1');
	                    addom.addClass('mediavfeed-newsitem');
	                }else if(ad.type == '3'){
	                    template = $mvUtil.supplant('<li><div class="mediav-newsfeed-listitem">'+
	                        '<div  class="mediav-newsfeed-listitem__img-wrap"> <a href="{curl}" target="_blank" style=" display: inline-block;cursor: pointer;"><img src = "{img}" data-baiduimageplus-ignore /></a></div>' +
	                        '<a href="{curl}" target="_blank"><div class="mediav-newsfeed-listitem__content-wrap" >'+
	                        '<h2 class="mediav-newsfeed-listitem__title" style="font-size:1.5em;color:#333333">{title}</h2>'+
	                        '<div class="mediav-newsfeed-listitem__footer-bar">'+
	                        '<span class="mediav-newsfeed-listitem__ad-tag">广告</span>'+
	                        '<span style="font-size:14px" class="mediav-newsfeed-listitem__src">{src}</span>'+
	                        '</div>'+
	                        '</div>'+
	                        '</a></div></li>',ad);
	                    addom =  $j.JQLite(template);
	                    addom.addClass('mediav-newsfeed-listitem-type-3');
	                    addom.addClass('mediavfeed-newsitem');
	                }else if(ad.type == '2'){

	                    var imagewraper = [];

	                    for(var j = 0; j < ad.assets.length ;j++){
	                    		if(j<ad.assets.length-1)
	                        	imagewraper.push('<div  class="mediav-newsfeed-listitem__img-wrap"> <a href="{assets.'+j+'.curl}" target="_blank" style=" display: inline-block;cursor: pointer;"><img style="width:156px;height:104px;margin-right:8px;"src = "{assets.'+j+'.img}"/></a></div>');
													else
	                        	imagewraper.push('<div  class="mediav-newsfeed-listitem__img-wrap"> <a href="{assets.'+j+'.curl}" target="_blank" style=" display: inline-block;cursor: pointer;"><img style="width:156px;height:104px;margin-right:0px;"src = "{assets.'+j+'.img}"/></a></div>');
	                    }

	                    template = $mvUtil.supplant('<li><div class="mediav-newsfeed-listitem">'+
	                        '<a href="{curl}" target="_blank"><h2 class="mediav-newsfeed-listitem__title title-box">{title}</h2></a>'+
	                        imagewraper.join(' ') +
	                        '<a href="{curl}" target="_blank" ><div class="mediav-newsfeed-listitem__content-wrap" >'+
	                        '<div class="mediav-newsfeed-listitem__footer-bar">'+
	                        '<span class="mediav-newsfeed-listitem__ad-tag">广告</span>'+
	                        '<span style="font-size:14px" class="mediav-newsfeed-listitem__src">{src}</span>'+
	                        '</div>'+
	                        '</div></a>'+
	                        '</div></li>',ad);
	                    addom =  $j.JQLite(template);
	                    addom.addClass('mediav-newsfeed-listitem-type-2');
	                    addom.addClass('mediavfeed-newsitem');
	                }
	              }else if(newsfeed.feedtype=="detail_yc"){
					        template = $mvUtil.supplant(
											'<li>'+
			                  '<a href="{curl}" target="_blank" title="{title}">'+
			                    '<span><img onerror="nofind(this);" src="{img}" alt="{title}"></span>'+
			                    '<p style="height:55px">{title}</p>'+
					                '<div style="float:left;width:190px;padding-left:10px" class="mediav-newsfeed-listitem__footer-bar">'+
					                '<spann class="mediav-newsfeed-listitem__ad-tag">广告</span>'+
					                '<spann class="mediav-newsfeed-listitem__src"> <a href="{curl}" target="_blank" >{src} </a> </span>'+
					                '</div>'+
			                  '</a>'+
			                '</li>',ad);
			            addom =  $j.JQLite(template);
			            addom.addClass('mediav-newsfeed-listitem-type-1');
	              }else if(newsfeed.feedtype=="index_yc"){
	              	if(i<2){
						        template = $mvUtil.supplant(
												'<li class="article-item clearfix">'+
												  '<a href="{curl}" target="_blank" class="news-link">'+
												    '<div class="module-pic news-pic">'+
												      '<img src="{img}"><i class="ad-icon"></i></div>'+
												    '<div class="news-inner">'+
												      '<p class="module-title">{title}</p>'+
												    '</div>'+
												  '</a>'+
												'</li>',ad);
				            addom =  $j.JQLite(template);
				            addom.addClass('mediav-newsfeed-listitem-type-1');
				          }else{
						        template = $mvUtil.supplant(
													'<li class="video-item">'+
													  '<a href="{curl}" target="_blank" class="link">'+
													    '<dl>'+
													      '<dt class="module-pic">'+
													        '<img alt="{title}" src="{img}"><i class="ad-icon"></i>'+
													        '<span>{title}</span></dt>'+
													      '<dd>'+
													        '<div class="cell">'+
													          '<h4>{title}</div>'+
													      '</dd>'+
													    '</dl>'+
													  '</a>'+
													'</li>',ad);
				            addom =  $j.JQLite(template);
				            addom.addClass('mediav-newsfeed-listitem-type-1');
				          }
	              }else if(newsfeed.feedtype=="index_lb"){
	              	if(ad.type == '3'){
										template = $mvUtil.supplant('<li class="slide-item">'+
												  '<a href="{curl}" target="_blank">'+
												    '<img src="{img}" alt="">'+
												    '<p class="title"><span class="mediav-newsfeed-listitem__ad-tag">广告</span>{title}</p></a>'+
													'</li>',ad);

	                  addom =  $j.JQLite(template);
	                  addom.addClass('mediav-newsfeed-listitem-type-3');
	                }
	              }

								if(addom!=null) {
	                /**
	                 * 添加点击监测
	                 * */
	                var links = addom.find('a');
	                for (var j = 0; j < links.length; j++) {
                      // 将占位符替换为时间戳
                      console.log('ad.mouseDownTimestamp', ad)
	                    $j.JQLite(links[j]).on('mousedown', (function (ad) {
	                        return function (e) {
	                            if (mediav.util.isLeftClick(e)) {
	                                ad.mouseDownTimestamp = new Date().valueOf();
	                            }
	                            ad.offsetX = e.offsetX;
	                            ad.offsetY = e.offsetY;
	                        };
	                    })(ad)).on('click', (function (ad) {
	                        return function () {
	                            ad.mouseUpTimestamp = new Date().valueOf();
                              this.href = ad.curl.replace('__EVENT_TIME_START__', ad.mouseDownTimestamp).replace('__EVENT_TIME_END__', ad.mouseUpTimestamp).replace('__OFFSET_X__', ad.offsetX).replace('__OFFSET_Y__', ad.offsetY);

	                            newsfeed.trackClick(ad);
	                        }
	                    })(ad));
	                }

	                /**
	                 * 结点添加自定义属性
	                 * */
	                addom.data('data-imptk',ad.imptk);
	                /**
	                 * push结点到列表队列
	                 * */
	                newfeed.ads.push(addom);
	              }
            }

        }


        /**
         * @function
         * @description this.ads添加兜底素材
         * @param {number} count - 需要添加的兜底数量
         */
        //进行兜底操作
        this.deposit = function(count){
          var depositObj = {},depositAds = [].concat(this.defaultProducts);

          function assign(target,obj) {
              if (!obj) return target;

              for (var key in obj) {
                  if (target === obj[key]) continue;
                  target[key] = obj[key];
              }

              return target;
          }

          if(depositAds.length < count){
              for(var i = 0;i< (count - depositAds.length);i++){
                  var newDepositAd = assign({},_.sample(this.defaultProducts,1)[0]);
                  newDepositAd.solt = depositAds.length + (i + 1);
                  depositAds.push(newDepositAd);
              }
          }
          depositObj.ads = _.shuffle(depositAds);
          console.log(' depositObj.ads:', depositObj.ads)
          this.ads =  this.ads.concat(this.renderDom(depositObj)).slice(0,count);

          console.log('this.ads:', this.ads)
      }


        /**
         * @function take
         * @description 获取指定count数量广告，回调takeSuccess，最多请求3次，不足采用兜底数据
         * @param {number} count - 待取广告数量
         * @param {function} takeSuccess - 回调函数
         */
        this.take = function(count,takeSuccess,takeRetryTimes){
            var newsfeed = this;
            if(_.isUndefined(takeRetryTimes))  takeRetryTimes = 0;
            if(this.ads.length >= count){
                var addata = this.ads.splice(0,count) ;

                takeSuccess && takeSuccess(addata);

            }else{
                this.requestAd(newsfeed.options.showid,newsfeed.options.size,innerTakeSuccess,newsfeed.reqtimes++);
                function innerTakeSuccess(data){

                    if(takeRetryTimes >= 2){
                      console.log(count)
                      newsfeed.deposit(count);
                    }
                    if(data && data.hasOwnProperty('ads') && data.ads.length>0) {
                    	newsfeed.renderDom(data);
                    }
                    newsfeed.take(count,takeSuccess,++takeRetryTimes);
                }
            }
        }


        /**
         * @function isInSightAndWaitExposure
         * @description 曝光容器node
         * @param {object} containerDom - 监测结点
         * */
        //是否在视野中  在视野中需要发送曝光请求
        this.isInSightAndWaitExposure = function(containerDom){
            var newsfeed = this;
            _.forEach(containerDom, function(addom,i){
                var domRect = addom[0].getBoundingClientRect();
                if(!(   (domRect.top +  (domRect.bottom-domRect.top)* newsfeed.options.offsetExposeHeight ) > ('innerHeight' in window?window.innerHeight :document.documentElement.clientHeight)) && !(domRect.bottom < 0)){
                    //立即曝光
                    newsfeed.pv(addom);
                }else{
                    addEventListenerFn(window,'scroll',scrollFnc)
                }
                function scrollFnc(e){
                    var domRect = addom[0].getBoundingClientRect();
                    if(!(  (domRect.top +  (domRect.bottom-domRect.top) * newsfeed.options.offsetExposeHeight )  > ('innerHeight' in window?window.innerHeight :document.documentElement.clientHeight)) && !(domRect.bottom < 0)){
                        newsfeed.pv(addom);
                        removeEventListenerFn(window,'scroll',scrollFnc);
                    }
                }
            })
        }

    }

    /**
     * @function
     * @description 点击监测发送
     * @param {string/string[]} clktk - 待发送链接
     * */
    NewsFeed.prototype.trackClick = function (ad) {
        if (ad.hasOwnProperty('clktk') && ad.clktk.length > 0) {
            var clktks = _.isArray(ad.clktk) ? ad.clktk : ad.clktk.split(',');
            for (var i = 0; i < clktks.length; i++) {
                var clktk = clktks[i];
                clktk = clktk.replace('__EVENT_TIME_START__', ad.mouseDownTimestamp).replace('__EVENT_TIME_END__', ad.mouseUpTimestamp).replace('__OFFSET_X__', ad.offsetX).replace('__OFFSET_Y__', ad.offsetY);
                $sio.log(clktk);
            }
        }
    }

    /**
     * @function
     * @description 曝光监测
     * @param {object} container - node结点
     * */
    //打点
    NewsFeed.prototype.pv  =  function(container){
        //PV
        var imptk = container.data('data-imptk');
        if (imptk) {
            imptk =  _.isArray(imptk) ? imptk:imptk.split(',');
            for (var i = 0; i < imptk.length; i++) {
                $sio.log(imptk[i])
            }
        }
    }

    var nextUniqueId = 1;
    /**
     * @function
     * @global
     * @description 闭包获取，获取请求次数reqtimes
     * @returns {string} - 请求次数字符串nextUniqueId
     * */
    function nextUid() {
        return '' + nextUniqueId++;
    }
    /**
     * @function
     * @description 请求ads
     * @param {string} showid - 广告威showid参数
     * @param {number} size  - 请求广告数量
     * @param {function} fn - 回调函数
     * */
    NewsFeed.prototype.requestAd = function(showid,size,fn,reqtimes){
    	if(window.location.protocol=='https:')
    	{
        var url = 'https://show-g.mediav.com/s';
        mediav.sio.callByServer(url,fn,{
            timeOut:7000,
            queryField:{
            		scheme:'https',
                type: 1,
                of: 4,
                newf: 1,
                impct: size,
                showid: showid,
                uid:_.Uid(),
                reqtimes:reqtimes
            },
            onfailure:function(){
                fn && fn(null);
            }
        });
    	}
    	else
    	{
        var url = 'http://show.g.mediav.com/s';
        mediav.sio.callByServer(url,fn,{
            timeOut:7000,
            queryField:{
                type: 1,
                of: 4,
                newf: 1,
                impct: size,
                showid: showid,
                uid:_.Uid(),
                reqtimes:reqtimes
            },
            onfailure:function(){
                fn && fn(null);
            }
        });
      }
    }

})(window);


