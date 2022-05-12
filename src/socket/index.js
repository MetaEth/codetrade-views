import io from 'socket.io-client'

// 创建链接
const socket = io()
//进行连接监听
socket.on('hello',data=>{
  console.log('服务端发来的消息是：'+data)
})
socket.emit('client',{name:'Tom',age:'12'})
socket.emit('client',{name:'Plunger',age:'18'})



export default socket
