require('dotenv').config()
const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../middleware/verifyToken')

// @route GET api/getposts
// @desc Get posts
// @access Private
router.get('/', verifyToken, async (req, res) => {
	try {
		const posts = await Post.find({ user: req.userId }).populate('user', [
			'username'
		])
		res.json({ success: true, data: posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route GET api/getposts/:id
// @desc Get posts
// @access Private
router.get('/:id', verifyToken, async (req, res) => {
  if(!req.params.id) return	res.status(401).json({ success: false, message: 'Can not Find Post' })

	try {
		const posts = await Post.find({ _id: req.params.id }).populate('user', [
			'username'
		])
		res.json({ success: true, data: posts })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

module.exports = router 