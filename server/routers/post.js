require('dotenv').config()
const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const verifyToken = require('../middleware/verifyToken')


// @Router api/post
// @desc User post
// @access Private
router.post('/', verifyToken, async (req, res) => {
  const {title, description, url, status} = req.body
  if(!title) return res.status(401).json({success: false, message: 'Please input Title'})

  try {
    const newPost = new Post({
      title,
      description,
      url,
      status,
      user: req.userId
    })
    await newPost.save()
  
    res.json({success: true, message: 'User created successfuly!', data: newPost})
  } catch (error) {
    console.log(error)
    res.status(500).json({success: false, message: 'Internal Server Error'})
  }
})

// @route PUT api/posts/:id
// @desc Update post
// @access Private
router.put('/:id', verifyToken, async (req, res) => {
	const { title, description, url, status } = req.body

	// Simple validation
	if (!title)
		return res
			.status(400)
			.json({ success: false, message: 'Title is required' })

	try {
		let updatedPost = {
			title,
			description: description || '',
			url: (url.startsWith('https://') ? url : `https://${url}`) || '',
			status: status || 'TO LEARN'
		}

		const postUpdateCondition = { _id: req.params.id, user: req.userId }

		updatedPost = await Post.findOneAndUpdate(
			postUpdateCondition,
			updatedPost,
			{ new: true }
		)

		// User not authorised to update post or post not found
		if (!updatedPost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({
			success: true,
			message: 'Excellent progress!',
			post: updatedPost
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})

// @route PUT api/posts/delete/:id
// @desc Delete post
// @access Private
router.delete('/:id', verifyToken, async (req, res) => {
	try {
		const deletePostCondition = { _id: req.params.id, user: req.userId }
	  const deletePost = await Post.findOneAndDelete(deletePostCondition)

		// User not authorised to delete post or post not found
		if (!deletePost)
			return res.status(401).json({
				success: false,
				message: 'Post not found or user not authorised'
			})

		res.json({ success: true, message: 'Delete Post Successfuly!',	post: deletePost })
	} catch (error) {
		console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
	}
})


module.exports = router 