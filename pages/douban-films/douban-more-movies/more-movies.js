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
    if(categoryID=="inTheaters"){
      categoryID = "正在上映";
      dataUrl = app.globalData.g_doubanAPI + "/v2/movie/in_theaters";
    }else if(categoryID=="comingSoon"){
      categoryID = "即将上映";
      dataUrl = app.globalData.g_doubanAPI + "/v2/movie/coming_soon";
    }else{
      categoryID = "TOP250";
      dataUrl = app.globalData.g_doubanAPI + "/v2/movie/top250";
    }
    console.log(categoryID);
    this.setData({
      isEmpty:true,//是否加载刷新的flag
      totalCount:0,
      dataUrl:dataUrl,
      categoryID:categoryID
    });
    http(dataUrl,that.processDoubanData,true);
  },

  processDoubanData:function(result){
    var results = result.subjects;
    console.log(results);
    var moviesData = [];
    var totalMovies = [];
    for(let idx in results){
      var subject = results[idx];
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
    //处理加载数据－－start
    if(!this.data.isEmpty){//下拉刷新
      totalMovies = this.data.movies.concat(moviesData);
    }else{
      totalMovies = moviesData;
      this.data.isEmpty = false;
    }
    this.setData({
      totalCount:this.data.totalCount+20,//请求数据起始点更新
      movies:totalMovies//更新数据
    })
    console.log(this.data.movies);
  },
  onScrollLower:function(event){
    var nextUrl = this.data.dataUrl +
                  "?start=" + this.data.totalCount + "&count=20";
    console.log(nextUrl);
    utils.http(nextUrl,this.processDoubanData,true);
  },
  onPullDownRefresh:function(){
    console.log("re");
    let refreshUrl = this.data.dataUrl + "?start=0&count=20";
    this.setData({
      totalMovies:{},
      isEmpty:true
    });
    http(refreshUrl,that.processDoubanData,true);
    // wx.stopPullDownRefresh();
  },
  onMovieTap:function(event){
    let mid = event.currentTarget.dataset.movieid;
    console.log(mid);
    wx.navigateTo({
      url:"../douban-movie-detail/movie-detail?mid="+mid
    });
  },
  onReady:function(event){
    // 页面渲染完成
    wx.setNavigationBarTitle({
      title:this.data.categoryID
    })
  }
})
