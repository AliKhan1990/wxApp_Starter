var app = getApp();
var doubanAPI = app.globalData.g_doubanAPI;
var utils = require("../../utils/utils");
var http = utils.http;
var star = utils.convertToStarsArray;
//requst接口
let q = "";
// let music_kind = "?tag=";
let count = "&count=5";
let start = "&start=";
let music_requst = doubanAPI + "v2/music/search?q=";
let totalMusic = null;
Page({
  data: {
    musicData: [],
    updataFlag: false,
    startCont: 0,
    dataCount: 0
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //例子数据
    q = "oohyo";
    let oohyo = doubanAPI + "v2/music/search?q=oohyo&count=10&start=0";
    http(oohyo, this.processData);
  },
  onBindFocus: function (event) {
    console.log("输入状态")
  },
  onReachBottom: function (event) {
    console.log("Updata!");
    let reURL = null;
    if (this.data.startCont < this.data.dataCount) {
      reURL = music_requst + q + count  + start + this.data.startCont;
      http(reURL, this.processData, true);
    }
    console.log(this.data.startCont, this.data.dataCount, reURL);
  },
  onBindBlur:function(){},
  onCancelXTap:function(){},
  abulmTap:function(event){
    let id = event.target.dataset.musicid;
    console.log(id);
  },
  onBindConfirm: function (event) {
    let that = this;
    //比较用户输入是否无差别
    if (event.detail.value == q) {
      return false;
    } else {
      that.setData({
        updataFlag:false
      });
      q = event.detail.value;
      http(music_requst + q + count + start + that.data.startCont, that.processData, true);
    }
  },
  processData: function (result) {
    let m_d = [];
    let ress = result.musics;
    //初始化数据总条数
    if(result.total==0){
      wx.showToast({
        title:"无搜索结果！",
        image:"../source/image/icon/gulp.png",
        duration:2000
      })
      return false;
    }
    this.setData({
      dataCount: result.total
    });
    //处理数据
    for (let idx in ress) {
      let res = ress[idx];
      let pubt = res.attrs.pubdate ? res.attrs.pubdate[0] : "无";
      let singer_e = res.attrs.singer ? res.attrs.singer[1] : null;
      let media = res.attrs.media ? res.attrs.media[0] : null;
      let imageURL = res.image;
      let ver = res.attrs.version ? res.attrs.version[0] : "无";
      let publ = res.attrs.publisher ? res.attrs.publisher[0] : "独立";
      let singer_o = res.attrs.singer ? res.attrs.singer[0] : "无";
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
    //处理加载数据－－start
    if (this.data.updataFlag) {//下拉刷新
      totalMusic = this.data.musicData.concat(m_d);
    } else {
      totalMusic = m_d;
      this.data.updataFlag = true;
    }
    this.setData({
      startCont: this.data.startCont + 10,//请求数据起始点更新
      musicData: totalMusic//更新数据
    })

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