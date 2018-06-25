//app.js
App({
  onLaunch: function () {
    let that = this;
    wx.login({
      success: function (res) {
        wx.request({
          url: that.globalData.suburl + '&part=login',
          data: {
            code: res.code
          },
          success: function (res) {
            if (res.data.code == 10000) {
              setTimeout(function () {
                wx.navigateTo({
                  url: "/pages/login/login"
                })
              }, 500)
              return;
            }
            if (res.data.code != 0) {
              wx.showModal({
                title: '系统提示',
                content: '您的配置信息可能有误',
                showCancel: false
              })
              return;
            }
          }
        })
      }
    })
    wx.request({
      url: that.globalData.suburl + '&part=get_config',
      data: {
        key: 'mallName'
      },
      success: function (res) {
        if (res.data.code == 0) {
          wx.setStorageSync('mallName', res.data.data.value);
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    suburl: 'https://wxapp.janedao.cn/api/1?viewid=home',
    payurl: 'https://wxapp.janedao.cn/api/1',
    version: "1.0.0",
    shareProfile: '清欢素雅'
  },
})