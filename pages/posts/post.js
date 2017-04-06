var postsData = require("../../data/posts-data");
//onReachBottom

Page({
    onPostTap:function(event){
        //非冒泡:currentTarget為事件捕獲的組件
        //dataset获取所有自定义属性，为postId的自定义属性
        var postId = event.currentTarget.dataset.postid;
        wx.navigateTo({
          url:"./post-detail/post-detail?id="+postId
        });
    },
    onSwiperTap:function(event){
        //冒泡:target為當前所点击的事件組件
        var postId = event.target.dataset.postid;
        wx.navigateTo({
          url:"./post-detail/post-detail?id="+postId
        });
    },
    onLoad:function(options){
      var app = getApp();
      var getPostColletedDatas = app.globalData.g_getPostsColleted;
      var postsCollected = {};
      console.log(getPostColletedDatas);
        console.log("onLoad");
        //数据优先：但无数据，所以通过缓存模拟数据库；
        //初始化缓存
       //判断缓存内是否存在
        if(!getPostColletedDatas){
          for(let i=0;i<postsData.postList.length;i++){
            postsCollected[i] = false;
          }
          //缓存上限10M
          //缓存的设置
          //只要不主动清除会永久存在
          wx.setStorageSync("posts_collected",postsCollected);
        }else{
          postsCollected = getPostColletedDatas;
        }
        //setData方法初始化数据；
        this.setData({
          post_key:postsData.postList,
          posts_collected:getPostColletedDatas
        });
    },
    onReady:function(){
        console.log("onReady");
    },
    onShow:function(){
        console.log("onShow");
    },
    onHide:function(){
        console.log("onHide");
    },
    onUnload:function(){
        console.log("onUnload");
    }
});
