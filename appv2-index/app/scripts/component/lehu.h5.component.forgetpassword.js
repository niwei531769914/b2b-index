define('lehu.h5.component.forgetpassword', [
    'zepto',
    'can',
    'lehu.h5.business.config',
    'lehu.util',
    'lehu.h5.api',
    'lehu.hybrid',

    'imagelazyload',
    'lehu.utils.busizutil',

    'text!template_components_forgetpassword'
  ],

  function($, can, LHConfig, util, LHAPI, LHHybrid,
    imagelazyload, busizutil,
    template_components_forgetpassword) {
    'use strict';

    return can.Control.extend({

      param: {},

      /**
       * @override
       * @description 初始化方法
       */
      init: function() {
        this.initData();

        var renderList = can.mustache(template_components_forgetpassword);
        var html = renderList(this.options);
        this.element.html(html);
      },

      initData: function() {
        this.URL = LHHybrid.getUrl();
      },

      checkmobile: function(mobile) {
        if (!mobile) {
          return false;
        }
        return /^1\d{10}$/.test(mobile);
      },

      /*密码显示按钮*/
      ".btn_off click": function(element, event) {
        if (element.hasClass('btn_on')) {
          element.removeClass('btn_on');
          element.prev().attr('type', 'password');
        } else {
          element.addClass('btn_on');
          element.prev().attr('type', 'text');
        }
      },

      countdown: function(time) {
        var that = this;
        setTimeout(function() {
          if (time > 0) {
            time--;
            that.element.find('.btn_retransmit').text(time + '秒后可重新发送').addClass('btn_retransmit_disabled');
            that.countdown.call(that, time);
          } else {
            that.element.find('.btn_retransmit').text('获取验证码').removeClass('btn_retransmit_disabled');
          }
        }, 1000);
      },

      '.btn_retransmit click': function(element, event) {

        if (element.hasClass("btn_retransmit_disabled")) {
          return false;
        }
        var that = this;
        var userName = $(".txt_phone").val();

        if (userName == "") {
          $(".err_msg").text("手机号码不能为空").parent().css("display", "block");
          return false;
        }

        if (!that.checkmobile(userName)) {
          $(".err_msg").text("手机号码格式错误").parent().css("display", "block");
          return false;
        }

        this.param = {
          'phone': userName,
          'flag': "0"
        };

        busizutil.encription(this.param);

        var api = new LHAPI({
          url: this.URL.SERVER_URL + LHConfig.setting.action.verifycode,
          data: this.param,
          method: 'post'
        });
        api.sendRequest()
          .done(function(data) {
            if (data.type == 1) {
              that.countdown.call(that, 60);
              $(".item_tips").css("display", "none");
            } else {
              $(".err_msg").text(data.msg).parent().css("display", "block");
            }
          })
          .fail(function(error) {
            $(".err_msg").text("短信验证码发送失败").parent().css("display", "block");
          })
      },

      '.back click': function() {

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