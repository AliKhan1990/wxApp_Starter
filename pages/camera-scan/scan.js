// pages/douban-books/douban-books.js

const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1 ; i <= 12; i++) {
  months.push(i)
}

for (let i = 1 ; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    year: date.getFullYear(),
    value: [9999, 1, 1],
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    date: '2016-09-01',
    time: '12:01'
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  bindChange: function(e) {
   const val = e.detail.value
   this.setData({
     year: this.data.years[val[0]],
     month: this.data.months[val[1]],
     day: this.data.days[val[2]]
   })
 },
 bindCheckBoxChange:function(e){
   console.log(e.detail.value);
 },
 formSubmit: function(e) {
   let formData = e.detail.value;
   let otherData = {
     year:this.data.year,
     month:this.data.month,
     day:this.data.day,
     date:this.data.date,
     index:this.data.index
   }
    console.log('form发生了submit事件，携带数据为：', e.detail.value,otherData)
  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  call:function(){
    wx.makePhoneCall({
      phoneNumber: '15135198623' //仅为示例，并非真实的电话号码
    });
  },
  scan:function(){
    wx.scanCode({
      success:(res)=>{
        console.log(res);
      }
    })
  }
})
