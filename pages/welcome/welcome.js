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
  
    onUnload:function(){

    },
    onHide:function(){

    }
});
