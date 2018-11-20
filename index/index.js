//index.js
//获取应用实例
const app = getApp()
var img_urls = app.data.img_urls;
Page({
  data: {
    m_show:false,
    flags:false,
    sing_type:'',
    imgUrls: [
      img_urls +'index_img/index_banner.png',
      img_urls + 'index_img/index_banner.png',
    ],
    car_date:[{
      flag: false,
      car_mark:'京MA8000',
      banner_dtime: 350,
      ex_time: '未到年检办理时间',
      sing_type:'xjr',
    },{
        flag: false,
        car_mark: '京MA8000',
        banner_dtime: 350,
        ex_time: '未到年检办理时间',
        sing_type: 'xjr',
    }],
    imgUrls: img_urls +'index_img/index_banner.png',
    img_car: img_urls +'index_img/index_car.png',
    img_updata: img_urls +'index_img/index_updata.png',
    img_add: img_urls +'index_img/banner_add.png',
    // ex_time:'未到年检办理时间',
    // banner_dtime:350,
    swiperIndex: 0, //这里不写第一次启动展示的时候会有问题
  },
  car_add:function(e){
    console.log(e.currentTarget.dataset.index)
    var index = e.currentTarget.dataset.index
    wx:wx.navigateTo({
      url: '../car_add/car_add?index='+index+'',
    })
  },
  // 监听轮播图滑动 
  bindchange(e) {
    var index = e.detail.current
    console.log(index);
    var car_data = this.data.car_date[index];
    console.log(car_data);
    this.setData({
      swiperIndex: e.detail.current,
      flags:car_data.flag,
      sing_type: car_data.sing_type
    })
    console.log(this.data.flags);
    console.log(this.data.sing_type);
  },
  onLoad:function(){
    var _this = this;
    var car_date = _this.data.car_date
    console.log(car_date)
        _this.setData({
          flags: car_date[0].flag,
          sing_type: car_date[0].sing_type,
        })
  },
  onShow: function () {
    console.log('show')
    var _this = this;
    console.log('显示indexs');
    wx.getStorage({
      key: 'cars_list',
      success: function (res) {
        if (res.data.length < 2) {
          res.data.push({ flag: false, sing_type: 'xjr' })
        }
        console.log(res.data);
        console.log(res.data[0]);
        var todays = Number(new Date()) // 当前时间戳
        var a_s_time1 = res.data[0].a_s_time; //注册时间时间戳
        var a_s_time2 = res.data[1].a_s_time; //注册时间时间戳
        var timestamp1 = new Date(a_s_time2)          
        console.log(timestamp1)
        a_s_time1 = a_s_time1 - todays;
        a_s_time2 = a_s_time2 - todays;
        console.log(a_s_time1)
        console.log(todays)
        res.data[0].a_s_times = Math.floor((a_s_time1 / 1000 / 60 / 60 / 24) - 90);
        res.data[1].a_s_times = Math.floor((a_s_time2 / 1000 / 60 / 60 / 24) - 90);
        console.log(res.data[0].a_s_times )
        _this.setData({
          car_date: res.data,
        })
        console.log(_this.data.car_date)
        var index = _this.data.swiperIndex;
        console.log(index)
        var data=res.data[index];
        console.log(data);
          _this.setData({
            flags: data.flag,
            sing_type: data.sing_type,
          })
      },
    })
  },
  // 预约年检
  subscribe:function(){
    var sing_type = this.data.sing_type
    if (sing_type =='heck_sing'){
      wx.navigateTo({
        url: '../preview_results/preview_results',
      })
    }
  },
  // 跳转代领年检标页
  get_acting: function () { 
    var sing_type = this.data.sing_type
    if (sing_type == 'gets_sing') {
     wx.navigateTo({
       url: '../get_details/get_details',
     })
    }
  },
  // 跳转修该页面
  banner_up:function(e){
    var index=e.currentTarget.dataset.index;
    console.log(index)
    wx.navigateTo({
      url: '../car_particulars/car_particulars?index=' + index + '&&_index=update',
    })
  },
  // 确认
  m_but_right:function(){
    this.setData({
      // m_show: false
    })
  },
})
