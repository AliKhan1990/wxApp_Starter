//引入数据
var postData = require('../../../data/posts-data');

Page({
   onLoad:function(option){
       var postId = option.id;
       this.setData({
         isPlayingMusic:false,
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
      this.getPostsCollecedSync();
   },
   getPostsCollecedSync:function(){
     var postsCollected = wx.getStorageSync("posts_collected");
     var postCollected = postsCollected[this.data.currentPostId];
     //取反操作
     postCollected = !postCollected;
     postsCollected[this.data.currentPostId] = postCollected;
     this.collectedConfirm(postsCollected,postCollected);
   },
   collectedConfirm:function(postsCollected,postCollected){
    console.log(postCollected)
    var that = this;
    var text = postCollected?"是否收藏?":"是否取消收藏？";
     wx.showModal({
       title:"收藏",
       content:text,
       showCancel:true,
       confirmText:"確定",
       confirmColor:"#b0d1bd",
       cancelText:"取消",
       cancelColor:"#333",
       success:function(res){
         if(res.confirm){
           var collectedText = postCollected?"收藏成功":"取消收藏";
           var collectedIcon = postCollected?"success":"loading";
           wx.setStorageSync('posts_collected',postsCollected);
           that.setData({
             collected:postCollected
           });
           that.collectedStat(collectedText,collectedIcon)
         }
       }
     })
   },
   collectedStat:function(collectedText,collectedIcon){
     wx.showToast({
        title:collectedText,
        icon:collectedIcon,
        duration:800,
        mask:true
     })
   },
   //share Event
   onShareTap:function(){
     var itemLists = [
       "分享到微信好友",
       "分享到朋友圈"
     ];
     wx.showActionSheet({
       itemList:itemLists,
       itemColor:"#405f80",
       success:function(res){
         //res.cancle用戶點擊取消
         //res.tapIndex用戶點擊
         wx.showModal({
           title:itemLists[res.tapIndex],
           content:"現在無法實現分享功能"
         });
       }
     })
   },
   //音樂播放
   onMusicTap:function(){
     var that = this;
     var isPlayingMusic = this.data.isPlayingMusic;
     if(isPlayingMusic){
       wx.pauseBackgroundAudio();
     }else{
       wx.playBackgroundAudio({
         //只可以使用網絡流媒體
         dataUrl:that.data.detailData.music.url,
         title:that.data.detailData.music.title,
         coverImage:that.data.detailData.music.coverImage
       });
     }
     that.setData({
       isPlayingMusic:!isPlayingMusic
     });
   }
});
