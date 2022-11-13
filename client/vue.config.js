const path = require('path')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/assets/style/_config.scss";'
      }
    }
  },

  outputDir: path.resolve(__dirname, '../server/public')
}