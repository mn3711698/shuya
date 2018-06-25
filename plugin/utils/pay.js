function wxpay(app, money, orderId, redirectUrl) {
  let remark = "在线充值";
  let nextAction = {};
  if (orderId != 0) {
    remark = "支付订单 ：" + orderId;
    nextAction = { type: 0, id: orderId };
  }
  wx.request({
    //url: 'https://api.it120.cc/' + app.globalData.subDomain + '/pay/wxapp/get-pay-data',
    url: app.globalData.suburl + '&part=get_pay_data',//获取支付数据
    data: {
      token:app.globalData.token,
      money:money,
      remark: remark,
      payName:"在线支付",
      nextAction: nextAction
    },
    //method:'POST',
    success: function(res){
      //console.log(res)
      if(res.data.code == 0){
        // 发起支付
        
        wx.requestPayment({
          timeStamp: res.data.data.timeStamp,
          nonceStr: res.data.data.nonceStr,
          package: res.data.data.package,
          signType: res.data.data.signType,
          paySign: res.data.data.paySign,
          //timeStamp:res.data.data.timeStamp,
          //nonceStr:res.data.data.nonceStr,
          //package:'prepay_id=' + res.data.data.prepayId,
          //signType:'MD5',
          //paySign:res.data.data.sign,
          fail:function (aaa) {
            //console.log(aaa,'aaa')
            wx.showToast({title: '支付失败'})
          },
          success:function (res) {
            //console.log(res,'res')
            wx.showToast({title: '支付成功'})
            wx.reLaunch({
              url: redirectUrl
            });
          }
        })
      } else {
        wx.showToast({ title:res.data.msg})
        if(res.data.code == 110){
          wx.reLaunch({
            url: redirectUrl
          });
        }
        /*wx.showModal({
          title: '错误',
          content: res.data.msg,
          showCancel: false
        })*/
      }
    }
  })
}

module.exports = {
  wxpay: wxpay
}
