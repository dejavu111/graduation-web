// pages/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page : 0,
    pages : 1,
    pagesize : 5,
    hasMoreData: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    this.setData({
      scroll_height: windowHeight * 750 / windowWidth  - 30
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 访问后台，获取区域信息
    var that = this; // 此处this表示整个页面
    var pages = this.data.pages;
    wx.request({
      url: 'http://188.131.252.159:8080/listInfo/0',
      method: 'GET',
      dataType: 'json',
      data: {},

      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        var code = res.data.code;
        pages = res.data.pages;

        if (code == -1) {
          var toastText = '获取数据失败' + res.data.msg;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000,
          });
        } else {
          var list = JSON.parse(res.data.data);
    
          // for(var item in list) {
          //   item.date = DateTimeFormate
          // }
          that.setData({
            list: list,
            pages: pages
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

 
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh(); 
  },
   /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  searchScrollLower: function () {
    var that = this; // 此处this表示整个页面
    if (this.data.page < this.data.pages-1) {
      this.data.page = this.data.page + 1
      wx.request({
        url: 'http://188.131.252.159:8080/listInfo/' + this.data.page,
        method: 'GET',
        dataType: 'json',
        data: {},

        header: {
          "Content-Type": "json"
        },
        success: function (res) {

          var code = res.data.code;
          console.log("下拉" + res.data.code);
          console.log("data--" + res.data.data);
          if (code == -1) {
            var toastText = '获取数据失败' + res.data.msg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000,
            });
          } else {
            var list = JSON.parse(res.data.data);

            // for(var item in list) {
            //   item.date = DateTimeFormate
            // }
            that.setData({
              list: that.data.list.concat(list),
            });
          }
        }
      })
    }
    
  },

  /**
   * 页面上拉事件的处理函数
   */
  searchScrollHigher: function () {
    var that = this; // 此处this表示整个页面
    if (this.data.page > 0) {
      this.data.page = this.data.page - 1;
      wx.request({
        url: 'http://188.131.252.159:8080/listInfo/' + this.data.page,
        method: 'GET',
        dataType: 'json',
        data: {},

        header: {
          "Content-Type": "json"
        },
        success: function (res) {

          var code = res.data.code;
          console.log("上拉" + res.data.code);
          console.log("data--" + res.data.data);
          if (code == -1) {
            var toastText = '获取数据失败' + res.data.msg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000,
            });
          } else {
            var list = JSON.parse(res.data.data);

            // for(var item in list) {
            //   item.date = DateTimeFormate
            // }
            that.setData({
              list: list
            });
          }
        }
      })
    }

  },
   /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
 
  goToDetail: function(e) {
    var detailID = e.currentTarget.dataset.id;
    console.log(detailID)
    wx.navigateTo({
      url: '../detail/detail?uuid='+detailID
    })
   
  }
})

