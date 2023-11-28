const { override, addLessLoader } = require('customize-cra')

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true
      // 以下是其他您可能需要的 LESS 配置项
    }
  })
)
