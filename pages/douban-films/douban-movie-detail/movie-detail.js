// pages/douban/douban-movie-detail/movie-detail.js
var app = getApp();
var doubanAPI = app.globalData.g_doubanAPI;
var utils = require("../../../utils/utils.js");
var http = utils.http;
var stars = utils.convertToStarsArray;
var casts = utils.convertToCastString;
var castsInfo = utils.convertToCastInfos;

Page({
  data:{
    movie:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let mid = options.mid;
    var url = doubanAPI + "/v2/movie/subject/" + mid;
    this.setData({
      url:url
    })
    http(url,this.processDoubanData,true);
  },
  processDoubanData:function(data){
    //导演信息处理
    let director = {
      avatar:"",
      name:"",
      id:""
    };
    if(data.directors[0]!=null){
      director.avatar = data.directors[0].avatars.large;
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    //电影信息处理
      let movieInfo = {
        movieImg:data.images ? data.images.large : "",
        country:data.countries[0],
        title:data.title,
        originalTitle:data.original_title,
        wishCount:data.comments_count,
        year:data.year,
        genres:data.genres.join("、"),
        stars:stars(data.rating.stars),
        score:data.rating.average,
        director:director,
        casts:casts(data.casts),
        castsInfo:castsInfo(data.casts),
        summary:data.summary
      }
    //数据初始化
    this.setData({
      movie:movieInfo
    });
    console.log(this.data.movie);
  },
  viewMoviePostImg:function(event){
    let src = event.currentTarget.dataset.src;
    console.log(src);
    wx.previewImage({
      current:src,
      urls:[src]
    })
  },
  onPullDownRefresh:function(){
    console.log("re");
    let refreshUrl = this.data.url;
    this.setData({
      movie:{}
    });
    http(refreshUrl,this.processDoubanData,true);
    // wx.stopPullDownRefresh();
  },
  onReady:function(){
    // 页面渲染完成
  }
})
