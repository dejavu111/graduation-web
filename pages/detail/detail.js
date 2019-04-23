Page({
  data: {
    wxParseData: [],
    article: {},
    style: 0
  },
  onLoad: function (options) {
    var that = this; // 此处this表示整个页面
    console.log(options)
    wx.request({
      url: 'http://127.0.0.1:8080/detailInfo/' + options.uuid,
      method: 'GET',
      dataType: 'json',
      data: {},
      success: function (res) {
        var code = res.data.code;
        console.log(res);
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

  getArticleDetail(opt) {
    post('v2/news/detail.html', { news_id: opt.id, chid: opt.chid }).then(res => {

      var data = res.newsDetail
      var { news_title: title, news_date: date, news_praise_count: praise, news_comment_count: comment, news_source: tag } = data
      // 专题页面
      if (data.news_blocks && data.news_blocks.length) {
        this.setData({
          article: { title, date, praise, comment, tag }
        })
        return wx.showToast({ title: '目前不支持解析专题页面' })
      }

      // var article = data = strDiscode(data.news_content);
      // var json = HtmlToJson(article)
      // this.setData({wxParseData:json})
      WxParse.wxParse('html', data.news_content, this)
      this.setData({
        article: { title, date, praise, comment, tag }
      })

    }).catch(err => console.log(err))
  }
})