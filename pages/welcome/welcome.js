Page({
    onContainerTap:function(){
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        console.log("Tap");
        wx.redirectTo({
            url:"../posts/post"
        });
    },
    clearStorage:function(){
      wx.clearStorage();
    },

    onContainerMovieTap:function(){
      console.log("Movies,HeiHei~")
    },

    onUnload:function(){

    },
    onHide:function(){

    }
});
