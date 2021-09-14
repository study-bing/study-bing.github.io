module.exports = function (content, map, meta) {
  console.log(111);
  this.callback(null, content, map, meta);
}
// pitch->loader函数执行前执行
module.exports.pitch = function () {
  console.log('pitch 111');
}