const cloudinary = require('./cloudinary')

exports.pdoadImage = async (img, paths) => {
  const result = await cloudinary.uploader.upload(img, {
    folder: paths
  })
  return result.secure_url
}
