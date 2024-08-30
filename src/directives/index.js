export default {
  install(app) {
    // 同步导入
    const directives = import.meta.globEager('./modules/*.js')
    for (const [key, value] of Object.entries(directives)) {
      const arr = key.split('/')
      const DirectiveName = arr[arr.length - 1].replace('.js', '')

      app.directive(DirectiveName, value.default)
    }
  }
}
