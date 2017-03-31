var app=getApp();
var doubanAPI = app.globalData.g_doubanAPI;
var utils = require("../../utils/utils.js");
var http = utils.http;

Page({

  onLoad:function(event){
    const requestStart = "?start=0&count=6";
    let inTheatersURL = doubanAPI+"/v2/movie/in_theaters"+requestStart;
    let comingSoonURL = doubanAPI+"/v2/movie/coming_soon"+requestStart;
    let top250URL = doubanAPI+"/v2/movie/top250"+requestStart;
    this.getMovieListData(inTheatersURL,"inTheaters");
    this.getMovieListData(comingSoonURL,"comingSoon");
    this.getMovieListData(top250URL,"top250");
  },
  onMoreTap:function(event){
    let category = event.currentTarget.dataset.category;
    console.log("moreMovies",category);
    wx.navigateTo({
      url:"douban-more-movies/more-movies?category="+category
    });
  },
  getMovieListData:function(url,settedKey){
    var that = this;
    wx.request({
      url:url,
      // data:{},
      method:"GET",  //OPTIONS GET POST HEAD PUT DELETE TRACE CONNECT
      header:{
        "content-type":"json"
      },
      success:function(res){
        console.log(res.data.subjects);
        that.processDoubanData(res.data.subjects,settedKey);//array
      },
      fail:function(error){
          console.log("请求失败！");
          wx.showToast({
            title: '请求失败！',
            icon: 'loading',
            duration: 2000
          })
      }
    });
  },
  processDoubanData:function(result,settedKey){
    var moviesData = [];
    for(let idx in result){
      var subject = result[idx];
      var title = subject.title;
      if(title.length >= 6){
        title = title.substring(0,7);
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
    var readyData = {};

    readyData[settedKey] = {
      categoryTitle:settedKey,
      movies: moviesData
    };
    this.setData(readyData)
  }
})
