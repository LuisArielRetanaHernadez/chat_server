const middlewares = {}
exports.applyMiddleware = (socket, event, next) => {
  const middlewareApply = middlewares[event[0]]
  if (middlewareApply) {
    middlewareApply(socket, event, next)
  } else {
    next()
  }
}
