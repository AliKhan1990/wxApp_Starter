// pages/douban/douban-more-movies/movie-movies.js
var app = getApp();
var utils = require("../../../utils/utils.js");
var http = utils.http;
Page({
  onLoad:function(options){
    var that = this;
    // 页面初始化 options为页面跳转所带来的参数
    var categoryID = options.category;
    var dataUrl = "";
    var requestCount = "";
    if(categoryID=="inTheaters"){
      categoryID = "正在上映";
      dataUrl = app.globalData.g_doubanAPI + "/v2/movie/in_theaters"+requestCount;
    }else if(categoryID=="comingSoon"){
      categoryID = "即将上映";
      dataUrl = app.globalData.g_doubanAPI + "/v2/movie/coming_soon"+requestCount;
    }else{
      categoryID = "TOP250";
      dataUrl = app.globalData.g_doubanAPI + "/v2/movie/top250"+requestCount;
    }
    console.log(categoryID);
    this.setData({
      isEmpty:false,
      totalCount:0,
      dataUrl:dataUrl,
      categoryID:categoryID
    });
    http(dataUrl,that.processDoubanData,null);
  },
  processDoubanData:function(result){
    var moviesData = [];
    var totalMovies = [];
    for(let idx in result){
      var subject = result[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,6)+"...";
      }
      var tmp = {
        title:title,
        stars:utils.convertToStarsArray(subject.rating.stars),
        average:subject.rating.average,
        coverUrl:subject.images.large,
        movieId:subject.id,
        movieKind:subject.genres
      }
      moviesData.push(tmp);
    }
    if(!this.data.isEmpty){
      totalMovies = moviesData.concat(moviesData);
    }else{
      totalMovies = moviesData;
      this.data.isEmpty = false;
    }
    this.setData({
      totalCount:this.data.totalCount+20,
      movies:totalMovies
    })
    console.log(this.data.movies);
  },
  onScrollLower:function(event){
    var nextUrl = this.data.dataUrl +
                  "?start=" + this.data.totalCount + "&count=20";
    console.log(nextUrl);
    utils.http(nextUrl,this.processDoubanData);
  },
  onReady:function(event){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title:this.data.categoryID
    })
  }
})
