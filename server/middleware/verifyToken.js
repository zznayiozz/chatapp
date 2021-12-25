require('dotenv').config()
const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const authorHeader = req.header('Authorization')
  const token = authorHeader && authorHeader.split(' ')[1]

  if(!token) {
    return  res.status(401).json({success: false, message: 'tocken not found'})
  }

  try {                             
    const decode = jwt.verify(token, process.env.ACCESS_TOCKEN_SECRET)
    req.userId = decode.userId
    next()
  } catch (error) {
    return res.status(403).json({success: false, message: 'Internal Server Error!'})
  }


}

module.exports = verifyToken