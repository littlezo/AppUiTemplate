import jweixin from "jweixin-module/lib";
import { httpInterface } from "./config";

export default {
  isWechat: function () {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/micromessenger/i) == "micromessenger") {
      console.log("是微信客户端");
      return true;
    } else {
      console.log("不是微信客户端");
      return false;
    }
  },
  initJssdk: function (callback) {
    uni.request({
      url: httpInterface + "/wechat/config",
      data: {
        uri: window.location.href.split("#")[0],
      },
      success: (res) => jweixin.config(res.data.data),
      if(callback) {
        callback(res.data.data);
      },
    });
  },
  getlocation: function (callback) {
    if (!this.isWechat()) return;
    this.initJssdk(function (res) {
      jweixin.ready(function () {
        return new Promise((resolve, reject) => {
          jweixin.getLocation({
            type: "wgs84",
            success: function (res) {
              resolve(res);
            },
            fail: function (res) {
              reject(res);
            },
          });
        });
      });
    });
  },
  openlocation: function (data, callback) {
    if (!this.isWechat()) return;
    this.initJssdk(function (res) {
      jweixin.ready(function () {
        jweixin.openLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      });
    });
  },
  chooseImage: function (callback) {
    if (!this.isWechat()) return;
    this.initJssdk(function (res) {
      jweixin.ready(function () {
        jweixin.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          sourceType: ["album"],
          success: function (rs) {
            callback(rs);
          },
        });
      });
    });
  },
  wxpay: function (parameter, callback) {
    if (!this.isWechat()) return;
    this.initJssdk(function (res) {
      jweixin.ready(function () {
        jweixin.chooseWXPay({
          parameter,
          success: function (res) {
            callback(res);
          },
          fail: function (res) {
            callback("出错了");
            console.log(res);
          },
        });
      });
    });
  },
};
