const cloudinary = require('../utils/cloudinary/cloudinary')
const tryCathc = require('../utils/tryCathc')

exports.createSignCloudinary = tryCathc(async (req, res) => {
  const timestamp = Math.round((new Date()).getTime() / 1000)
  const signature = await cloudinary.utils.api_sign_request({
    timestamp
    // source: req.body.source,
    // folder: req.body.folder,
    // public_id: req.body.public_id,
    // api_key: process.env.CLOUDINARY_API_KEY
  }, process.env.CLOUDINARY_API_SECRET)
  res.status(200).json({
    timestamp,
    signature
  })
})
