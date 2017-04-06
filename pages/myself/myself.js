Page({
  data:{
    name:"AliOmarKhan(علي)",
    come:"山西 太原",
    tel:"151-3519-8623",
    email:"aliomarkhan@sina.cn",
    skill:["HTML5","CSS3","ES5","ES6","Gulp",
           "Grunt","WechatApp","AngularJS",
           "SeaJs","D3Js","ReactJs","vuejs"],
    want:"10K+",
    graduated:"太原理工大学",
    major:"计算机科学与技术",
    address:"北京市－海淀区－西顶路－晨月园小区(西四环－近长春桥地铁站)",
    map:{
      longitude:116.281656,
      latitude:39.958996,
      scale:14,
      marker:[{
        iconPath: "/source/images/icon/point.png",
        id: 0,
        longitude:116.281656,
        latitude:39.958996,
        width: 20,
        height: 20,
        title:"My Home",
        alpha:0.7
      },{
        iconPath: "/source/images/icon/point.png",
        id: 1,
        longitude:116.293571,
        latitude:39.959016,
        width: 20,
        height: 20,
        title:"My Home",
        alpha:0.7
      }],
      polyline: [{
        points: [{
          longitude: 116.281656,
          latitude: 39.958996
        },{
          longitude: 116.28443,
          latitude: 39.959608 ,
        },{
          longitude: 116.286447,
          latitude: 39.959699
        },{
          longitude: 116.288131,
          latitude: 39.959485
        },{
          longitude: 116.290857,
          latitude: 39.959567
        },{
          longitude: 116.293592,
          latitude: 39.959649
        },{
          longitude: 116.293571,
          latitude: 39.959016
        }],
        color:"#FF0000DD",
        width: 2,
        dottedLine: true
      }],
      position:[{
        left:100,
        top:100,
        width:300,
        height:300
      }]
    }
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  }
})
