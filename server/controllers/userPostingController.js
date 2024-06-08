const Posts = require('../models/posting');

//CREATE POST
const createUserPosting = async (req, res) => {
  try {
    const { userId, content } = req.body;
    const media = req.body.media; // Use req.body.media instead of req.file.buffer
    const newPost = new Posts({ userId, content, media });
    await newPost.save();
    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error creating post' });
  }
};

//GETPOST
const getPost = async (req , res) => {
  try {
    const posts = await Posts.find().populate('userId', 'firstName lastName');
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
  };
  

module.exports = {
    createUserPosting,
    getPost
};
