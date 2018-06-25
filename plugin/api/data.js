var data = 'init data'

function getData() {
  return data
}

function setData(value) {
  data = value
}

wx.request({
  url: 'https://wxapp.janedao.cn/login ',
  data: {},
  success: function(res) {
    wx.setStorageSync('suburl', 'https://wxapp.janedao.cn/api/1?viewid=home');
    wx.setStorageSync('payurl', 'https://wxapp.janedao.cn/api/1');
    if (res.data.code == 0) {


    } else {
      wx.showToast({
        title: '授权失败',
        icon: 'none',
        duration: 2000,
        mask: true
      })
    }
  }
})
module.exports = {
  getData: getData,
  setData: setData
}