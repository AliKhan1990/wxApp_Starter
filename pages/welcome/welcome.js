Page({
    onTap:function(){
        // wx.navigateTo({
        //     url:"../posts/post"
        // });
        wx.redirectTo({
            url:"../posts/post"
        });
    },
    onUnload:function(){

    },
    onHide:function(){

    }
});