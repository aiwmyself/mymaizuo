module.exports = {
  devServer: {
    proxy: {
      '/ajax': { target: 'https://m.maoyan.com', changOrigin: true }
    }
  }
}
