var app=getApp();
var doubanAPI = app.globalData.g_doubanAPI;
var utils = require("../../utils/utils.js");
var http = utils.http;

Page({

  onLoad:function(event){
    this.setData({
      containerShow:true,
      searchPanelShow:false,
      searchResultState:true,
      searchResult:{}
    });
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
        if(settedKey=="searchResult"){
          that.setData({
            searchResultState:false
          })
        }
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
  onBindFocus:function(){
    console.log("输入状态！");
    this.setData({
      containerShow:false,
      searchPanelShow:true
    });
  },
  onBindBlur:function(){
    console.log("失去焦点！");
  },
  onBindConfirm:function(event){
    console.log("完成输入！");
    var searchText = event.detail.value;
    var searchUrl = doubanAPI+"/v2/movie/search?q="+searchText;
    this.getMovieListData(searchUrl,"searchResult");
  },
  onCancelXTap:function(){
    this.setData({
      containerShow:true,
      searchPanelShow:false
      // searchResult:{}
    });
  },
  onMovieTap:function(event){
    let mid = event.currentTarget.dataset.movieid;
    console.log(mid);
    wx.navigateTo({
      url:"douban-movie-detail/movie-detail?mid="+mid
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
        movieKind:subject.genres,
        movieId:subject.id
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
