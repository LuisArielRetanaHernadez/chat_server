const tryCathc = fn => (req, res, next) => {
  fn(req, res, next).catch(next)
}

module.exports = tryCathc
