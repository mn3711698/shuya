var WxParse = require('../../utils/wxParse/wxParse.js');
Component({
  data: {
    aboutShow: true,
    tabClass: ["", "", "", "", ""]
  },
  attached: function() {
    var that = this;
    wx.request({
      url: wx.getStorageSync('suburl') + '&part=notice_list',
      data: {
        type: 'about'
      },
      success: function(res) {
        if (res.data.code == 0) {
          that.setData({
            about: res.data.data.dataList[0]
          });
        }
      }
    })
  },
  methods: {
    getAbout: function(e) {
      var that = this;
      wx.request({
        url: wx.getStorageSync('suburl') + '&part=notice_detail',
        data: {
          id: e.currentTarget.dataset.id
        },
        success: function(res) {
          if (res.data.code == 0) {
            that.setData({
              aboutShow: false,
              aboutCon: res.data.data
            });
            WxParse.wxParse('article', 'html', res.data.data.content, that, 5);
          }
        }
      })
    },
    close: function() {
      var that = this;
      that.setData({
        aboutShow: true
      });
    },
    goorderlist(e) {
      var id = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: "/pages/order-list/index?currentType=" + id
      })
    },
    getVip: function() {
      wx.navigateTo({
        url: "/pages/vip/index"
      })
    }
  },
})