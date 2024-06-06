const User = require('../models/user');
const Posts = require('../models/posting');
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

// REGISTER ENDPOINT DITO
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // check if name was entered
        if (!firstName) {
            return res.json({
                error: 'First Name is required'
            });
        }
        if (!lastName) {
            return res.json({
                error: 'Last Name is required'
            });
        }
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be 6 characters long'
            });
        }
        // check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password)

        //create sa database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

// LOGIN ENDPOINT DITO
const loginUser = async(req, res) => {
    try {
       const {email, password} = req.body;
   
        //CHECK IF USER EXIST
       const user = await User.findOne({email});
       if(!user) {
           return res.json({
               error: 'No user Found'
           })
       }
       
       //CHECK IF PASSWORD MATCH
       const match = await comparePassword(password, user.password)
       if(match) {
           jwt.sign({email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName}, process.env.JWT_SECRET, {}, (err, token) => {
               if(err) throw err;
               res.cookie('token', token).json(user)
           })
       }
       if(!match) {
           res.json({
               error: 'Password do not match'
           })
       }
    } catch (error) {
       console.log(error)
    }
   }


//LOGOUT DITO
const logoutUser = (req, res) => {
    res.cookie('token', '', { maxAge: 1 }).json('Logged out');
};

//GET PROFILE

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}



  //CREATE NEW USERPOSTING DITO
const createPost = async (req, res) => {
    try {
        const { userId, content } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ error: 'User not found' });
        }

        // Create a new post
        const newPost = new Posts({ userId, content });
        await newPost.save();

        res.json(newPost);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

//getALL POST
// Get all posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('userId', 'firstName lastName picturePath') // Populating with specific fields
            .exec();
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//GETPOSTBYID
const getPostById = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Posts.findById(postId)
            .populate('userId')
            .populate('likes')
            .populate('comments')
            .exec();
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
  

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    createPost,
    getAllPosts,
    getPostById
};
