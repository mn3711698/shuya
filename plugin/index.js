var data = require('./api/data.js');
var shopCart = require('./components/shop-cart/index.js');

module.exports = {
  getData: data.getData,
  setData: data.setData,
  shopCart: shopCart.shop_Cart
}