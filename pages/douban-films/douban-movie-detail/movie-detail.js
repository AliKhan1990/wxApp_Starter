// pages/douban/douban-movie-detail/movie-detail.js
import { Movie } from "class/Movie.js";
var app = getApp();
var doubanAPI = app.globalData.g_doubanAPI;

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let mid = options.mid;
    var url = doubanAPI + "/v2/movie/subject/" + mid;
    var movie = new Movie(url);
    movie.getMovieData((movieInfo) => {
      this.setData({
        movie: movieInfo
      })
    })
  },
  castTap: (event) => {
    let castId = event.currentTarget.dataset.castid;
    wx.navigateTo({
      url: 'cast-detail/cast?cid='+castId,
      success: function(res){
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  },
  viewMoviePostImg: (event) => {
    let src = event.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      current: src,
      urls: [src]
    })
  },
  onPullDownRefresh: () => {
    console.log("re");
    let refreshUrl = this.data.url;
    this.setData({
      movie: {}
    });
    http(refreshUrl, this.processDoubanData, true);
    // wx.stopPullDownRefresh();
  },
  onReady: function () {
    // 页面渲染完成
  }
})
