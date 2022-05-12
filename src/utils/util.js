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
function randomStr(){	//产生一个32为随机字符串，作为订单号
  var str = "";
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  for(var i=1;i<=32;i++){
    var random = Math.floor(Math.random()*arr.length);
    str += arr[random];
  }
  return str;
}
module.exports = {
  checkPhone,
  checkUsername,
  randomStr,
}
