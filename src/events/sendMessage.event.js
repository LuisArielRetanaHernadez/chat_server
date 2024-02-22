exports.sendMessage = (data, socket) => {
  return socket.to(data.to).emit('message', data.message)
}
