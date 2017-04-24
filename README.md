### 说明

1. 目录结构：
    
```
wxApp_Starter//ROOT
├─ app.js//App全局变量及全局参数
├─ app.json//page()/window参数/tabar设置
├─ app.wxss
├─ data//posts新闻页面模拟数据
│    └─ posts-data.js
├─ pages//pages Root
│    ├─ camera-scan//scan页面表单及摄像头接口调用
│    │    ├─ scan.js
│    │    ├─ scan.json
│    │    ├─ scan.wxml
│    │    └─ scan.wxss
│    ├─ douban-books//豆瓣书籍(未做)
│    │    ├─ douban-books.js
│    │    ├─ douban-books.json
│    │    ├─ douban-books.wxml
│    │    └─ douban-books.wxss
│    ├─ douban-films//豆瓣电影
│    │    ├─ douban-more-movies//更多电影
│    │    ├─ douban-movie-detail//电影详情页
│    │    ├─ douban-movie-grid//电影九宫格－模版
│    │    ├─ douban-movie-item//单个电影－模版
│    │    ├─ douban-movie-list//电影列表－模版
│    │    ├─ douban-movie-star//电影评分－模版
│    │    ├─ douban-movies.js//
│    │    ├─ douban-movies.json//
│    │    ├─ douban-movies.wxml//
│    │    └─ douban-movies.wxss//
│    ├─ myself//aboutMyself页面
│    │    ├─ myself.js
│    │    ├─ myself.json
│    │    ├─ myself.wxml
│    │    └─ myself.wxss
│    ├─ posts//新闻页面
│    │    ├─ post-detail
│    │    ├─ post-item
│    │    ├─ post.js
│    │    ├─ post.json
│    │    ├─ post.wxml
│    │    └─ post.wxss
│    └─ welcome//欢迎页面
│           ├─ welcome.js
│           ├─ welcome.json
│           ├─ welcome.wxml
│           └─ welcome.wxss
├─ source//媒体资源
│    ├─ .DS_Store
│    └─ images
│           ├─ .DS_Store
│           ├─ avatar
│           ├─ icon
│           ├─ iqiyi.png
│           ├─ music
│           ├─ post
│           ├─ vr.png
│           └─ wx.png
└─ utils//工具组件
       └─ utils.js
```
2.业务流程图
    ![image](https://lh3.googleusercontent.com/0c1KbjPghE_nxFePmW8tJWhti0CdUnIK88DlSDAFfoOnJIvH_bJiKRfWidv1t-jIm11j-XpQpKqwTPanZxqo7DcexZi7dbUfmPGyaRm6se_jEnH5nPqXrwYx4I7VrdzuVcswXjpc31XsAajjBeYXvhZ917FY1uW6elxB2Pa60Acw85NVC-5wG4rIkouTsXCE7-2nN8M_jDUTStbXkwTFZFW2FdTPevPUUgsl0rR4MyR-unnsX2s5W1lrHUtMqYYuI10XN11DqwDchZQNuXj6HsXzxy_Y1ckCVBctUSSBY0W-iK8oxpvi-s0a-vaxsmsvw2t7Uw9iR4fFmh8hwpNPtFsx3yuv9E5W5TsTFmcKp1Zb08TtA6e22zCM8sp9AAXusmgSHfDaNb_elgyI3AabOSjVh3uijTaCYnpb6rVsue_1KRjW0_vthgqinPfoWnk-JJQEJfwanpQFI185dJrgtEvhe7Ai68Gl5dX8eTldZrHKM7l_0w6keHXyonnZkg-KyvMov41BjIWAL6N8zARdpZY08wUXECSxW0GtQXWR0Y_7dKdrdILL7Nv4-YtMAa3GCirOaGRH=w2000-h2096)


3.版本：**0.15.12900**

4.API：[doubanAPI v2](https://www.douban.com/group/dbapi/) [MINA](https://mp.weixin.qq.com/debug/wxadoc/dev/)
