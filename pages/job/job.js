Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    page : 0,
    pagesize : 5,
    hasMoreData: true,
    jobName : '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.request({
      url: 'http://127.0.0.1:8080/job/0',
      method: 'GET',
      dataType: 'json',
      data: {},

      header: {
        "Content-Type": "json"
      },
      success: function (res) {
  
        var code = res.data.code;
        console.log("res--" + res.data.code);
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var that = this; // 此处this表示整个页面
    wx.request({
      url: 'http://127.0.0.1:8080/job/' + this.data.page+1,
      method: 'GET',
      dataType: 'json',
      data: {},

      header: {
        "Content-Type": "json"
      },
      success: function (res) {

        var code = res.data.code;
        console.log("res--" + res.data.code);
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
  SearchInput:function(e) {
    var that = this; // 此处this表示整个页面
    var name = e.detail.value;
    this.data.jobName = name;
    this.setData({
      jobName: name
    })
  },
  SearchConfirm:function(e) {
    var that = this; // 此处this表示整个页面
    console.log(this.data.jobName);
    wx.request({
      url: 'http://127.0.0.1:8080/job/0',
      method: 'POST',
      dataType: 'json',
      data: { 'jobName':this.data.jobName},
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success: function (res) {
        var code = res.data.code;
        console.log("这里" + res.data.code);
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
  },
  goToDetail: function(e) {
    var detailID = e.currentTarget.dataset.id;
    console.log(detailID)
    wx.navigateTo({
      url: '../detail/detail?uuid='+detailID
    })
   
  }
})

