Component({
  data: {
   
  },
  attached: function () {
    var that = this;
    wx.request({
      url: wx.getStorageSync('suburl') + '&part=category_all',
      success: function (res) {
        var categories = [];
        if (res.data.code == 0) {
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].level == 1) {
              categories.push(res.data.data[i]);
            }
          }
        }
        that.setData({
          categories: categories,
          activeCategoryId: categories[0].id,
        });
        that.getGoodsList(categories[0].id);
      }
    })
    
  },
  methods: {
    getGoodsList: function (categoryId) {
      if (categoryId == 0) {
        categoryId = "";
      }
      var that = this;
      wx.request({
        url: wx.getStorageSync('suburl') + '&part=category_all',
        success: function (res) {
          var categoriesdict = {}
          var categorieslist = [];
          if (res.data.code == 0) {
            for (var i = 0; i < res.data.data.length; i++) {
              if (categoryId != '') {
                if (res.data.data[i].pid == categoryId) {
                  categorieslist.push(res.data.data[i]);
                }
              } else {
                if (res.data.data[i].pid != 0) {
                  categorieslist.push(res.data.data[i]);
                }
              }
            }
          }
          categoriesdict[categoryId] = categorieslist
          that.setData({
            categorieslist: categorieslist,
            categoriesdict: categoriesdict
          });
        }
      })
    },
    tabClick: function (e) {
      this.setData({
        activeCategoryId: e.currentTarget.id
      });
      this.getGoodsList(this.data.activeCategoryId);
    },
    levelClick: function (e) {
      wx.navigateTo({
        url: "/pages/menu-list/index?id=" + e.currentTarget.dataset.id
      })
    }
  },
})