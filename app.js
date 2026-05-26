App({
  onLaunch() {
    const cloudConfig = require('./utils/cloudConfig')

    if (wx.cloud && cloudConfig.env) {
      wx.cloud.init({
        env: cloudConfig.env,
        traceUser: true
      })
      this.globalData.cloudEnabled = true
    }
  },

  globalData: {
    appName: '调酒助手',
    cloudEnabled: false
  }
})
