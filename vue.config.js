module.exports = {
    lintOnSave: false,
  pages: {
      index: {
          // entry for the page
          //https://cli.vuejs.org/config/#pages
          entry: 'src/app/main.js'
      }
  },

  transpileDependencies: [
      'vuetify'
  ],

  runtimeCompiler: true,
}