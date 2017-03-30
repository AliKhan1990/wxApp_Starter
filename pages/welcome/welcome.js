Page({
    onContainerTap:function(){
        console.log("Enter");
        wx.switchTab({
            url:"../posts/post"
        });
    },
    clearStorage:function(){
      wx.clearStorage();
    },

    onUnload:function(){

    },
    onHide:function(){

    }
});
