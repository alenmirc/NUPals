const Posts = require('../models/posting');
const User = require('../models/user');
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

// ADMINLOGIN
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // CHECK IF USER EXISTS
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: 'No user found'
            });
        }

        // CHECK IF PASSWORD MATCHES
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.json({
                error: 'Password does not match'
            });
        }

        // CHECK IF USER HAS ADMIN ROLE
        if (user.roles.includes('admin')) {
            // Generate JWT token
            jwt.sign({ email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName, roles: user.roles }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) {
                    throw err;
                }
                // Set token in cookie and send user data
                res.cookie('token', token).json(user);
            });
        } else {
            // User does not have admin role
            return res.json({
                error: 'User does not have admin privileges'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//LOGOUT ADMIN
const logoutAdmin = (req, res) => {
    res.cookie('token', '', { maxAge: 1 }).json('Logged out');
};


//GET ALL USERS

const getUsers = async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      
      // Return the fetched users as a response
      res.json(users);
    } catch (error) {
      // Handle errors
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

//GET ALL Post

const getAllpost = async (req, res) => {
    try {
        // Fetch all posts from the database
        const posts = await Posts.find().populate('userId', 'firstName lastName'); // Populate userId with first and last names

        // Return the fetched posts as a response
        res.json(posts);
    } catch (error) {
        // Handle errors
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// DELETEPOST
const adminDeletepost = async (req, res) => {
    try {
      const postId = req.params.postId; // Get the post ID from the request parameters
  
      // Find the post by ID and delete it
      const deletedPost = await Posts.findByIdAndDelete(postId);
  
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
  
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Error deleting post:', error);
      res.status(500).json({ error: 'An error occurred while deleting the post' });
    }
  };

module.exports = {
    loginAdmin,
    logoutAdmin,
    getUsers,
    getAllpost,
    adminDeletepost
};
