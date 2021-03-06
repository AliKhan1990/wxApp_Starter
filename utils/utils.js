function convertToStarsArray(stars) {
  if(typeof stars=="string" && parseInt(stars)<10){
    stars=Math.floor(stars/2*10);
  }
  var num = stars.toString().substring(0, 1);
  var halfStarFlag = false;
  var fullStarFlag = false;
  if(stars.toString().substring(1, 2)<=5 && stars.toString().substring(1, 2)>0){
      halfStarFlag = true;
  }else if(stars.toString().substring(1, 2)<=9 && stars.toString().substring(1, 2)>5){
      fullStarFlag = true;
  }
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num || fullStarFlag==true && i==num*1+1) {
      array.push(1);
    }else if (halfStarFlag==true && i==num*1+1) {
      array.push(2)
    }else{
      array.push(0);
    }
  }
  return array;
}

function http(url, callBack, showToast) {
  douban_limit();
  if(showToast){
    wx.showLoading({
      title:"正在加载",
      icon:"loading",
      duration:10000
    });
    wx.showNavigationBarLoading();
  }
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
      if(showToast){
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      }
    },
    fail: function (error) {
      console.log(error)
      console.log("请求失败！");
      wx.showToast({
        title: '请求失败！',
        icon: 'loading',
        duration: 2000
      })
    }
  })
}

function douban_limit() {
   var timestamp = Date.parse(new Date());
   var requestDoubanTime = wx.getStorageSync('requestDoubanTime');
   var requestDoubanNum = wx.getStorageSync('requestDoubanNum');
   if (requestDoubanTime && timestamp - requestDoubanTime < 60000) {
       wx.setStorageSync('requestDoubanNum', requestDoubanNum += 1);
       if (requestDoubanNum < 35) {
           //Lower than 35/m,pass
           return;
       }
       else {
           wx.showToast({
               title: '豆瓣api请求频率超35/m，小心',
               icon: 'loading',
               duration: 5000
           })
           //提示或者去别的地方
           // wx.redirectTo({
           //      url:"pages/welcome/welcome"
           // });
       }
   }
   else {
       wx.setStorageSync('requestDoubanTime', timestamp);
       wx.setStorageSync('requestDoubanNum', 1);
   }
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name,
      id:casts[idx].id
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http: http,
  convertToCastString:convertToCastString,
  convertToCastInfos:convertToCastInfos
}
