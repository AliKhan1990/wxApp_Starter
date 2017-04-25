var utils = require("../../../../utils/utils.js");
var http = utils.http;
var stars = utils.convertToStarsArray;
var casts = utils.convertToCastString;
var castsInfo = utils.convertToCastInfos;
class Movie{
  constructor(url){
    this.url = url;
  }
  getMovieData(cb){
    this.cb = cb;
    http(this.url,this.processDoubanData.bind(this),true);
  }
  processDoubanData(data){
    console.log(data)
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
      var movieInfo = {
        movieImg:data.images ? data.images.large : "",
        country:data.countries[0],
        title:data.title,
        commentCont:data.comments_count,
        originalTitle:data.original_title,
        wishCount:data.collect_count,
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
    this.cb(movieInfo);
    console.log(movieInfo.castsInfo);
  }
}

export {Movie}
