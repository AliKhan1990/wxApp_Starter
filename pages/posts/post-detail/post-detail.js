//引入数据
var postData = require('../../../data/posts-data');

Page({
  data:{

  },
   onLoad:function(option){
       var postId = option.id;
       this.setData({
         detailData:postData.postList[postId],
         currentPostId:postId
       });
       //数据优先：但无数据，所以通过缓存模拟数据库；
       //初始化缓存
       var postsCollected = wx.getStorageSync("posts_collected");
      //判断缓存内是否存在
       if(postsCollected){
         var postCollected = postsCollected[postId];
         this.setData({//设置collected数据以
           collected:postCollected
         });
       }else{
         var postsCollected = {};
         postsCollected[postId] = false;
         //缓存上限10M
         //缓存的设置
         //只要不主动清除会永久存在
         wx.setStorageSync("posts_collected",postsCollected);
       }
   },
   //收藏图标点击事件
   onCollectionTap:function(event){
     var postsCollected = wx.getStorageSync("posts_collected");
     var postCollected = postsCollected[this.data.currentPostId];
     //取反操作
     postCollected = !postCollected;
     postsCollected[this.data.currentPostId] = postCollected;
     wx.setStorageSync('posts_collected',postsCollected);
     this.setData({
       collected:postCollected
     })
     console.log(this.data.collected);
   },
   onShareTap:function(){
     //clearStorageSync
    //wx.removeStorageSync("key");
   }
});
