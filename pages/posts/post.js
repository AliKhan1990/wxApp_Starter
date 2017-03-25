var postsData = require("../../data/posts-data");
Page({
    data:{
        //小程序会读取data对象来做数据绑定
    },
    onPullDownRefresh:function(){
      wx.stopPullDownRefresh();
    },
    imPath:"",
    onPostTap:function(event){
        //currentTarget所点击的DOM，dataset获取所有自定义属性，为postId的自定义属性
        var postId = event.currentTarget.dataset.postid;
        console.log("TAP，"+postId);
        wx.navigateTo({
            url:'post-detail/post-detail?id' + postId
        });
    },
    onLoad:function(options){
        console.log("onLoad");
        //setData方法初始化数据；
        this.setData({post_key:postsData.postList});
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
