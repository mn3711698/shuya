let app = getApp();
let plugin = requirePlugin("QingHuanSuYa");
Page({
  onShow: function () {
    plugin.shopCart()
  }
})