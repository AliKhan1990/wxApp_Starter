let utils = require('../../../../utils/utils.js');
let http = utils.http;
let star = utils.convertToStarsArray;
let app = getApp();
let doubanCastAPI = app.globalData.g_doubanAPI + 'v2/movie/celebrity/';

//https://api.douban.com//v2/movie/celebrity/

Page({
  data: {
    castInfo: null
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    let cid = options.cid;
    let that = this;
    http(doubanCastAPI + cid, that.processCastInfo, true);
  },
  processCastInfo: function(res) {
    var that = this;
    console.log(res);
    let cworks = [];
    let cwork = {
      roles: "",
      average: "",
      stars: "",
      title: "",
      movieKind:"",
      year:"",
      coverUrl:""
    };
    for (let idx in res.works) {
      cwork = {
        roles: res.works[idx].roles?res.works[idx].roles[0]:"无",//可能有多个角色
        average: res.works[idx].subject.rating.average?res.works[idx].subject.rating.average:"暂无评分",
        stars: res.works[idx].subject.rating.stars?star(res.works[idx].subject.rating.stars):"0",
        title: res.works[idx].subject.title?res.works[idx].subject.title:"...",
        movieKind: res.works[idx].subject.genres?res.works[idx].subject.genres[0]:"",
        year: res.works[idx].subject.year?res.works[idx].subject.year:"No Date",
        coverUrl: res.works[idx].subject.images.large?res.works[idx].subject.images.large:""
      };
      cworks.push(cwork);
    }
    let castInfo = {
      name: res.name,
      aka: res.aka_en?res.aka_en[0]:"",
      name_en:res.name_en,
      works: cworks,
      avatar:res.avatars.large,
      born:res.born_place
    }

    that.setData({
      castInfo: castInfo
    });
    console.log(that.data.castInfo);
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})