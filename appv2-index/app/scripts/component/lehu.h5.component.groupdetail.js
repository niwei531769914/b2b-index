define('lehu.h5.component.groupdetail', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',
    'md5',
    'store',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_groupdetail'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid, md5, store,
    imagelazyload, busizutil,
    template_components_groupdetail) {
    'use strict';

    return can.Control.extend({

      helpers: {
        'lehu-img': function(imgprefix, img) {
          if (_.isFunction(imgprefix)) {
            imgprefix = imgprefix();
          }

          if (_.isFunction(img)) {
            img = img();
          }

          if (img.indexOf("http://") > -1) {
            return img;
          }

          return imgprefix + img;
        }
      },

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();
        this.render();
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
        this.URL.SERVER_URL_NJ = 'http://172.16.201.21:8080/';
        this.URL.SERVER_URL_NJ_TEMP = 'http://172.16.201.222:7070/';
      },

      render: function() {
        var that = this;
        var param = can.deparam(window.location.search.substr(1));
        this.action = param.action;

        //团id
        if (param.id) {
          this.options.userActivityId = param.id;
        }

        var map = {
          "open": "queryActivityInfo.do",
          "join": "partInActivityInfo.do",
          "success": "getSuccGroupInfo.do"
        }

        //根据orderCode获得团id
        if (param.ordercode) {
          var api = new LHAPI({
            url: this.URL.SERVER_URL_NJ + "getUserAc.do",
            data: {
              "orderCode": param.ordercode
            },
            method: 'post'
          });

          api.sendRequest()
            .done(function(data) {

              that.options.userActivityId = data.userActivityId;
              //直接走渲染
              that.sendRequest(map[that.action], that.options.activityid, param.id);

              return false;
            })
          return false;
        }

        this.sendRequest(map[this.action], param.activityid, param.id);
      },

      /**
       *id（团的id），activityid（活动id）
       */
      sendRequest: function(action, activityId, id) {
        var that = this;

        var param = {
          "activityId": activityId
        }

        if (id) {
          param.id = id;
        }

        busizutil.encription(param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL_NJ + action,
          data: param,
          method: 'post'
        });

        api.sendRequest()
          .done(function(data) {

            //团信息
            that.options.activitymap = data.activitymap;

            //参团用户
            that.options.userlist = data.userlist;

            //优惠券
            that.options.ticketmap = data.ticketmap;

            that.options.groupmap = data.groupmap;

            if (that.options.ticketmap) {
              if (that.options.ticketmap.HQ_TYPE == "1") {
                that.options.ticketmap.TIP = "满" + that.options.ticketmap.DEMAND + "使用";
              } else if (that.options.ticketmap.HQ_TYPE == "2") {
                that.options.ticketmap.TIP = "面值" + that.options.ticketmap.PRICE;
              }
            }

            that.options.isopen = (typeof that.action != 'undefined' && that.action == 'open');

            //图片前缀
            that.options.imgprefix = that.URL.IMAGE_URL;

            var renderList = can.mustache(template_components_groupdetail);
            var html = renderList(that.options, that.helpers);
            that.element.html(html);

            if (that.options.groupmap) {
              setInterval(function() {
                that.countDown($("#countdown"), that.options.groupmap.END_TIMESTAMP);
              }, 1000);
            }
          })
          .fail(function(error) {
            util.tip(error.msg);
          })
      },

      countDown: function(timeNode, endDate) {
        var leftTime = endDate - new Date().getTime();
        var result = "";

        if (leftTime > 0) {
          var leftsecond = parseInt(leftTime / 1000);
          var day1 = Math.floor(leftsecond / (60 * 60 * 24));
          var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
          var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
          var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
          if (day1 > 0) {
            result += day1 + "天";
          }
          if (hour > 0) {
            result += hour + "小时";
          }
          if (minute > 0) {
            result += minute + "分";
          }
          result += second + "秒";
        } else {
          result = "已结束"
        }

        timeNode.html(result);
      },

      isLogin: function() {
        var param = can.deparam(window.location.search.substr(1));

        this.userId = busizutil.getUserId();
        if (!this.userId) {
          if (util.isMobile.WeChat() || param.from == 'share') {
            location.href = "login.html?from=" + escape(location.href);
            return false;
          } else {
            var jsonParams = {
              'funName': 'login',
              'params': {
                "backurl": "index"
              }
            };
            LHHybrid.nativeFun(jsonParams);

            return false;
          }
        }

        return true;
      },

      toDetail: function(STORE_ID, GOODS_NO, GOODS_ID) {
        var jsonParams = {
          'funName': 'good_detail_fun',
          'params': {
            'STORE_ID': STORE_ID,
            'GOODS_NO': GOODS_NO,
            'GOODS_ID': GOODS_ID
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      ".footer_buy click": function() {
        this.toDetail(this.options.activitymap.STORE_ID, this.options.activitymap.GOODS_NO, this.options.activitymap.GOODS_ID);
      },

      '#opengroup click': function() {

        if (!this.isLogin()) {
          return false;
        }

        this.opencheck(this.opengroup);
      },

      opengroup: function() {
        var jsonParams = {
          'funName': 'group_buy_pay',
          'params': {
            "storeId": this.options.activitymap.STORE_ID,
            "storeName": this.options.activitymap.STORE_NAME,
            "goodsID": this.options.activitymap.GOODS_ID,
            "goodName": this.options.activitymap.GOODS_NAME,
            "goodsPrice": this.options.activitymap.ACTIVEPRICE,
            "goodsImg": this.options.activitymap.IMG,
            "activityId": this.options.activitymap.ID, //活动id
            "userActivityId": 0 //团id
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      opencheck: function(successCallback) {
        var that = this;
        var api = new LHAPI({
          url: this.URL.SERVER_URL_NJ_TEMP + "openActivity.do",
          data: {
            "userId": this.userId,
            "activityId": this.options.activitymap.ID
          },
          method: 'post'
        });

        api.sendRequest()
          .done(function(data) {
            successCallback.apply(that);
          })
          .fail(function(error) {
            util.tip(error.msg);
          });
      },

      joincheck: function(successCallback) {
        var that = this;

        var api = new LHAPI({
          url: this.URL.SERVER_URL_NJ_TEMP + "partakeActivity.do",
          data: {
            "userId": this.userId,
            "userActivityId": this.options.userActivityId //userActivityId团id
          },
          method: 'post'
        });

        api.sendRequest()
          .done(function(data) {
            successCallback.apply(that);
          })
          .fail(function(error) {
            util.tip(error.msg);
          });
      },

      joingroup: function() {
        var jsonParams = {
          'funName': 'group_buy_pay',
          'params': {
            "storeId": this.options.activitymap.STORE_ID,
            "storeName": this.options.activitymap.STORE_NAME,
            "goodsID": this.options.activitymap.GOODS_ID,
            "goodName": this.options.activitymap.GOODS_NAME,
            "goodsPrice": this.options.activitymap.ACTIVEPRICE,
            "goodsImg": this.options.activitymap.IMG,
            "activityId": this.options.activitymap.ID, //活动id
            "userActivityId": this.options.userActivityId //团id
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      "#joingroup click": function() {

        if (!this.isLogin()) {
          return false;
        }

        this.joincheck(this.joingroup);
      },

      "#sharetip click": function(element, event) {
        $("#sharetip").hide();
      },

      "#share click": function(element, event) {
        var param = can.deparam(window.location.search.substr(1));
        var version = param.version;
        if (!version && !util.isMobile.WeChat()) {
          util.tip("请升级app到最新版本后使用!");
          return false;
        }

        if (util.isMobile.WeChat()) {
          $("#sharetip").show();
          return false;
        }

        var jsonParams = {
          'funName': 'share_fun',
          'params': {
            'title': "汇银乐虎全球购-拼团",
            'type': "1",
            'video_img': "",
            'shareUrl': location.href,
            'shareImgUrl': "http://app.lehumall.com/html5/app/images/Shortcut_114_114.png",
            'text': "汇银乐虎全球购，拼团！"
          }
        };
        LHHybrid.nativeFun(jsonParams);
      },

      '.back click': function() {
        // temp begin  
        // 在app外部使用 点击返回 如果没有可返回则关闭掉页面
        var param = can.deparam(window.location.search.substr(1));
        if (!param.version) {
          if (history.length == 1) {
            window.opener = null;
            window.close();
          } else {
            history.go(-1);
          }
          return false;
        }
        // temp end

        if (util.isMobile.Android() || util.isMobile.iOS()) {
          var jsonParams = {
            'funName': 'back_fun',
            'params': {}
          };
          LHHybrid.nativeFun(jsonParams);
          console.log('back_fun');
        } else {
          history.go(-1);
        }
      }
    });

  });