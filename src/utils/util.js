// 验证号码是否合法
function checkPhone(phone) {
  // 必须是1开头，第二位数字可以是0-9任意一个，总长为11
  let reg = /^1([0-9])\d{9}$/
  // 必须是1开头，第二位数字可以是3|5|6|7|8|9任意一个，总长为11
  // let reg = /^1([3|5|6|7|8|9])\d{9}$/;
  if (reg.test(phone)) {
    return true
  } else {
    return false
  }
}
function checkUsername(username){
  var reg=/^[\u4E00-\u9FA5A-Za-z0-9]+$/
  if(reg.test(username)){
    return true;
  }else{
    return false
  }
}
module.exports = {
  checkPhone,
  checkUsername,
}
