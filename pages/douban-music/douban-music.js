var app = getApp();
var doubanAPI = app.globalData.g_doubanAPI;
var utils = require("../../utils/utils");
var http = utils.http;
var star = utils.convertToStarsArray;
//requst接口
let q = "";
let music_kind = "?tag=";
let count = "&count=10"
let music_requst = doubanAPI + "v2/music/search?q=";
Page({
  data: {
    musicData: [],
    updataFlag: false,
    startCont:0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //例子数据
    let oohyo = doubanAPI + "v2/music/search?q=oohyo&count=5&start=0";
    http(oohyo, this.processData);
  },
  onBindFocus: function (event) {
    console.log("输入状态")
  },
  
  onBindConfirm: function (event) {
    let that = this;
    q = event.detail.value;
    http(music_requst+q+count,that.processData,true);
  },
  processData: function (result) {
    let m_d = [];
    let ress = result.musics;
    for (let idx in ress) {
      let res = ress[idx];
      let pubt = res.attrs.pubdate?res.attrs.pubdate[0]:"无";
      let singer_e = res.attrs.singer?res.attrs.singer[1]:null;
      let media = res.attrs.media?res.attrs.media[0]:null;
      let imageURL = res.image;
      let ver = res.attrs.version?res.attrs.version[0]:"无";
      let publ = res.attrs.publisher?res.attrs.publisher[0]:"独立";
      let singer_o = res.attrs.singer?res.attrs.singer[0]:"无";
      let tmp = {
        title: res.title,
        id: res.id,
        ctime: pubt,
        singer_e: singer_e,
        singer_o: singer_o,
        publisher: publ,
        version: ver,
        media: media,
        image: imageURL,
        rating: res.rating.average,
        average: star(res.rating.average),
        numrat: res.rating.numRaters
      }
      m_d.push(tmp);
    }
    this.setData({
      musicData: m_d
    });

    console.log(this.data.musicData);
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