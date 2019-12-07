const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports.deleteImage = async (req, res, next) => {
  const { public_id } = req.body

  try {
    const result = await cloudinary.uploader.destroy(public_id)

    res.json(result)
  } catch(err) {
    console.log({error})
    next(new ApiError('Error deleting', 400))
  }
}