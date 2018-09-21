import * as Tool from './360tool'

class NewsFeed {
  constructor() {
    this.reqtimes = 1;


    /*
      默认:正文下方
      "detail_yc":正文右侧
      "index_yc":首页右侧
      "index_xxl":首页信息流
      "index_lb":首页轮播
    */
    this.feedtype = "";
    /**
     * @property {object[]} ads - 存放请求的广告，存放已生成的node reference
     * */
    this.ads = []; //存放请求的广告

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
      size: 4, //每次请求的个数
      showid: 'RSBpV9',
      countForDisplay: 1,
      // 是否广告完全出现在视野内
      offsetExposeHeight: .2 //0-1之间   比如 0.5  就是提条广告露出一半高度
    }

    /**
     * @property {Array} defaultProducts - 兜底数据
     * @default
     * */
    this.defaultProducts = [{
        "slot": 1,
        "type": 1,
        "img": "//s3m.mediav.com/galileo/2c3373ac5364199733adc173ffeec53d.jpg",
        "desc": "订阅英孚【每日英语】，全年免费，每天不同主题，上下班路上，坐地铁，随时随地，利用碎片时间迅速提高自己的英语水平。 ",
        "title": "玩手机不如学一会儿英语",
        "src": "英孚英语广告",
        "curl": "//ssxd.mediav.com/s?type=2&r=20&pinfo=&mv_ref=www%2Ebtime%2Ecom&enup=CAABZeed4QgAAuGd52UA&mvid=NzAxMTkwODA0Mzk1NzE3MTAwMTAwMTc&bid=1131240636fcef37&price=AAAAAFi3gBkAAAAAAABKDp0Pzqfto+TocS3HEg==&finfo=DAABCAABAAAGnQgAAgAAANgEAAM/epA8DhNemAAIAAIAAAADCgADgKPfu662wGgIAAQAAAEFBgAGItAIAAgBAlTQCgAJAAAAAAAGABgGAAoAAAA&ugi=FczbDhWOnkBMFQIVsgQVABUAABXWrLruBBYEAA&uai=Ff6IvwElAhUCFqnUxJOX15Tc/gEV7gglrK6B3wQA&ubi=FZqrHRXcwasBFeanhg0VwOP0QhUGFRwW+qGCjBQWqdSvrI2RkNz+ATQCFrCAMCUGFfiEvc0LFawBAA&clickid=0&csign=33e727210eca5616&url=http%3A%2F%2Fwww%2Eef%2Ecom%2Ecn%2Fonline%2Flp%2FPPCET%2FSM%2FBSG%2FECEE%2D5minnosub%2Easpx%3Fctr%3Dcn%26ptn%3Dcnbd%26etag%3DEFCN%5FPPC%5F%2D7a4d9972727b4b76a176905aed79be1a%2DCNPPC%2DShanghai%2DBtime%2Dfb1%2D",
        "imptk": ["//ssxd.mediav.com/s?type=1&r=20&tid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&finfo=DAABCAABAAAAqggAAgAAANoEAAM/Q4BvxYW5bwAIAAIAAAADCgADSSHNdQoKwK8IAAQAAAEeBgAGK4UIAAgAGfCgCgAJAAAAAAAAAAgGAAoAAAA&mvid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&mv_ref=btime%2Ecom&enup=CAABZed3JggAAiZ352UA&bidid=1096c03e24ec9f38&ugi=FczbDhWOnkBMFQIVsgQVABUAABWM593NBwA&uai=FfyhjwElAhUCFvrg0+adl+KhkgEV7ggA&ubi=FfSBHhW4r7UBFfro/AwV/suzQhUGFRwWpKbtmhQW+uDozafd5qGSATQCFhAW+uDozQcVBgA&price=AAAAAFfX0fgAAAAAAAhJUJ8cgNleqs5qgtYaCQ==", "//max-l.mediav.com/rtb?type=2&d=100&b=1096c03e24ec9f38&p=1173630&l=120550&s=1&w=AAAAAFfX0fgAAAAAAAhJhAd6SMhKNl8a1161Ng==&k=VSc4GQAAAAA=&i=gPunJBMUs9JX&v=31521761606351419080016"],
        "clktk": [
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
        "imptk": ["//ssxd.mediav.com/s?type=1&r=20&tid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&finfo=DAABCAABAAAAqggAAgAAANoEAAM/Q4BvxYW5bwAIAAIAAAADCgADSSHNdQoKwK8IAAQAAAEeBgAGK4UIAAgAGfCgCgAJAAAAAAAAAAgGAAoAAAA&mvid=MzE1MjE3NjE2MDYzNTE0MTkwODAwMTY&mv_ref=btime%2Ecom&enup=CAABZed3JggAAiZ352UA&bidid=1096c03e24ec9f38&ugi=FczbDhWOnkBMFQIVsgQVABUAABWM593NBwA&uai=FfyhjwElAhUCFvrg0+adl+KhkgEV7ggA&ubi=FfSBHhW4r7UBFfro/AwV/suzQhUGFRwWpKbtmhQW+uDozafd5qGSATQCFhAW+uDozQcVBgA&price=AAAAAFfX0fgAAAAAAAhJUJ8cgNleqs5qgtYaCQ==", "//max-l.mediav.com/rtb?type=2&d=100&b=1096c03e24ec9f38&p=1173630&l=120550&s=1&w=AAAAAFfX0fgAAAAAAAhJhAd6SMhKNl8a1161Ng==&k=VSc4GQAAAAA=&i=gPunJBMUs9JX&v=31521761606351419080016"],
        "clktk": ["https://max-l.mediav.com/rtb?type=3&d=100&b=1096c03e24ec9f38&p=1173630&l=120550&s=1&k=VSc4GQAAAAA=&i=gPunJBMUs9JX&v=31521761606351419080016&turl="],
        "assets": [{
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

    this.nextUniqueId = 1
  }


  /**
   * @function
   * @description this.ads添加兜底素材
   * @param {number} count - 需要添加的兜底数量
   **/
  //进行兜底操作
  deposit(count) {
    let depositObj = {}
    const depositAds = [].concat(this.defaultProducts);

    function assign(target, obj) {
      if (!obj) return target;

      for (var key in obj) {
        if (target === obj[key]) continue;
        target[key] = obj[key];
      }
      return target;
    }
    if (depositAds.length < count) {
      for (var i = 0; i < (count - depositAds.length); i++) {
        var newDepositAd = assign({}, Tool.sample(this.defaultProducts, 1)[0]);
        newDepositAd.solt = depositAds.length + (i + 1);
        depositAds.push(newDepositAd);
      }
    }
    depositObj.ads = Tool.shuffle(depositAds);
    this.ads = this.ads.concat(this.renderDom(depositObj)).slice(0, count);
  }

  /**
   * @function take
   * @description 获取指定count数量广告，回调takeSuccess，最多请求3次，不足采用兜底数据
   * @param {number} count - 待取广告数量
   * @param {function} takeSuccess - 回调函数
   */
  take(count, takeSuccess, takeRetryTimes) {

    if (Tool.isUndefined(takeRetryTimes)) takeRetryTimes = 0;
    if (this.ads.length >= count) {
      var addata = this.ads.splice(0, count);

      takeSuccess && takeSuccess(addata);

    } else {
      this.requestAd(this.options.showid, this.options.size, innerTakeSuccess, this.reqtimes++);

      function innerTakeSuccess(data) {
        if (takeRetryTimes >= 2) {
          this.deposit(count);
        }
        if (data && data.hasOwnProperty('ads') && data.ads.length > 0) {
          this.renderDom(data);
        }
        this.take(count, takeSuccess, ++takeRetryTimes);
      }
    }
  }


  /**
   * @function isInSightAndWaitExposure
   * @description 曝光容器node
   * @param {object} containerDom - 监测结点
   * */
  //是否在视野中  在视野中需要发送曝光请求
  isInSightAndWaitExposure(containerDom) {
    const pv = pv
    Tool.forEach(containerDom, function (addom, i) {
      var domRect = addom[0].getBoundingClientRect();
      if (!((domRect.top + (domRect.bottom - domRect.top) * this.options.offsetExposeHeight) > ('innerHeight' in window ? window.innerHeight : document.documentElement.clientHeight)) && !(domRect.bottom < 0)) {
        //立即曝光
        pv(addom);
      } else {
        Tool.addEventListenerFn(window, 'scroll', scrollFnc)
      }

      function scrollFnc(e) {
        var domRect = addom[0].getBoundingClientRect();
        if (!((domRect.top + (domRect.bottom - domRect.top) * this.options.offsetExposeHeight) > ('innerHeight' in window ? window.innerHeight : document.documentElement.clientHeight)) && !(domRect.bottom < 0)) {
          pv(addom);
          Tool.removeEventListenerFn(window, 'scroll', scrollFnc);
        }
      }

    })
  }

  /**
   * @function
   * @description 点击监测发送
   * @param {string/string[]} clktk - 待发送链接
   * */
  trackClick(ad) {
    if (ad.hasOwnProperty('clktk') && ad.clktk.length > 0) {
      var clktks = Tool.isArray(ad.clktk) ? ad.clktk : ad.clktk.split(',');
      for (var i = 0; i < clktks.length; i++) {
        var clktk = clktks[i];
        clktk = clktk.replace('__EVENT_TIME_START__', ad.mouseDownTimestamp).replace('__EVENT_TIME_END__', ad.mouseUpTimestamp).replace('__OFFSET_X__', ad.offsetX).replace('__OFFSET_Y__', ad.offsetY);
        Tool.log(clktk);
      }
    }
  }
  /**
   * @function
   * @description 曝光监测
   * @param {object} container - node结点
   * */
  //打点
  pv(container) {
    //PV
    var imptk = container.data('data-imptk');
    if (imptk) {
      imptk = Tool.isArray(imptk) ? imptk : imptk.split(',');
      for (var i = 0; i < imptk.length; i++) {
        Tool.log(imptk[i])
      }
    }
  }

  /**
   * @function
   * @global
   * @description 闭包获取，获取请求次数reqtimes
   * @returns {string} - 请求次数字符串nextUniqueId
   * */
  nextUid() {
    return '' + this.nextUniqueId++;
  }



  /**
   * @function
   * @description 请求ads
   * @param {string} showid - 广告威showid参数
   * @param {number} size  - 请求广告数量
   * @param {function} fn - 回调函数
   * */
  requestAd(showid, size, fn, reqtimes) {
    if (window.location.protocol === 'https:') {
      var url = 'https://show-g.mediav.com/s';
      Tool.callByServer(url, fn, {
        timeOut: 7000,
        queryField: {
          scheme: 'https',
          type: 1,
          of: 4,
          newf: 1,
          impct: size,
          showid: showid,
          uid: Tool.Uid(),
          reqtimes: reqtimes
        },
        onfailure: function () {
          fn && fn(null);
        }
      });
    }
  }

}


export default NewsFeed
