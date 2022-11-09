// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
Page({
  data: {
    motto: 'Hello World',
    ipaddress_input: '192.168.0.114',
    power_switch: false,
    color_switch: false,
    rgb: 'rgb(0, 255, 255)',
    pick: false,
    response: '',
    light_value: '100',
    R : '255',
    G : '255',
    B : '255',
  },
 
  
  onLoad() {
   
  },

  ipInput(e){
    console.log(e.detail.value)
    this.setData({
      ipaddress_input : e.detail.value
    })
  },
  ipInputConfirm(e){
    console.log("input confirm", e.detail.value)
    let that = this
    wx.request({
      url: 'http://' + that.data.ipaddress_input + '/',
      method:"GET",
      success:(res)=>{
        console.log(res.data)
        this.setData({
          response : res.data
        })
      }
    })

  },


  powerSwitchChange(e) {
    console.log("power switch change", e.detail.value)
    if(e.detail.value){ // 关灯
      let that = this
      wx.request({
        url: 'http://' + that.data.ipaddress_input + '/switch',
        method:"GET",
        data:{
          light : 'on'
        },
        success:(res)=>{
          console.log(res.data)
        }
      })
    }else{              // 开灯
      let that = this
      wx.request({
        url: 'http://' + that.data.ipaddress_input + '/switch',
        method:"GET",
        data:{
          light : 'off'
        },
        success:(res)=>{
          console.log(res.data)
        }
      })
    }
  },
  
  colorSwitchChange(e) {
    console.log("color switch change")
    if(e.detail.value){ // 关彩虹
      let that = this
      wx.request({
        url: 'http://' + that.data.ipaddress_input + '/mode',
        method:"GET",
        data:{
          mode : 'auto'
        },
        success:(res)=>{
          console.log(res.data)
        }
      })
    }else{              // 开彩虹
      let that = this
      wx.request({
        url: 'http://' + that.data.ipaddress_input + '/mode',
        method:"GET",
        data:{
          mode : 'noauto'
        },
        success:(res)=>{
          console.log(res.data)
        }
      })
    }
  },
  // 显示取色器
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  //取色结果回调
  pickColor(e) {
    //let rgb = e.detail.color;
    console.log(e.detail.color)
    this.setData({
      rgb : e.detail.color
    })
    let RGBS = this.data.rgb.slice(4, this.data.rgb.length-1).split(',')
    this.setData({
      R:RGBS[0],
      G:RGBS[1],
      B:RGBS[2]
    })
    console.log(this.data.R, this.data.G, this.data.B)
    // 发起网络请求，修改后台rgb值
    let that = this
    wx.request({
      url: 'http://' + that.data.ipaddress_input + '/color',
      method:"GET",
      data:{
        R: this.data.R,
        G: this.data.G,
        B: this.data.B,
      },
      success:(res)=>{
        console.log(res.data)
      }
    })
  },

  slider1change: function (e) {
    console.log("change：", e.detail.value)
    this.setData({
      light_value : e.detail.value
    })

    let that = this
    wx.request({
      url: 'http://' + that.data.ipaddress_input + '/bright?bright=' + that.data.light_value,
      method:"GET",
      success:(res)=>{
        console.log(res.data)
      }
    })
  },

  
})
