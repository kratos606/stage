const User = require('../models/users');
const Joi = require('@hapi/joi');

// create Validation

const createValidation = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required().email(),
    password:Joi.string().required()
});

// Create a new user

const createUser = async (req, res) => {
    try{
        const { username,email,password,isAdmin } = req.body;
        if(!username || !email || !password) return res.json({ error: "You must fill all required fields" })
        const { error } = createValidation.validate({username,email,password});
        if(error) return res.json({error : error.details[0].message});
        const emailExist = await User.findOne({ email: req.body.email});
        if(emailExist) return res.json({error:"Email already exists"});
        const user = new User({
            username: username,
            email: email,
            password: password,
            isAdmin: isAdmin
        });
        const savedUser = await user.save();
        res.send({success:'User created successfully'});
    }catch (err) {
        res.send({error: err.message});
    }
}

// update validation

const updateValidation = Joi.object({
    username:Joi.string().required(),
    email:Joi.string().required().email()
});

// Update a user

const updateUser = async(req, res) => {
    try {
	const { username,email,password,isAdmin } = req.body;
        if(!username || !email) return res.json({ error: "You must fill all required fields" })
        const { error } = updateValidation.validate({username,email});
        if(error) return res.json({error : error.details[0].message});
	const emailExist = await User.findOne({_id:{$ne:req.params.id}, email: req.body.email });
	if(emailExist) return res.json({error:"Email already exists"});
        const updatedUser = await User.findById(req.params.id).then(async(user) => {
            if(!user) return res.json({ error: "User not found" });
            user.username = req.body.username;
            user.email = req.body.email;
            user.isAdmin = req.body.isAdmin;
            user.password = req.body.password ? req.body.password : user.password;
            await user.save();
            res.json({ success: "User updated successfully" });
        }).catch(err => res.json({ error: err.message }));
    }
    catch(err)
    {
        res.json({error: err.message});
    }
}

// delete user

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);
    }
    catch(err)
    {
        res.json({error: err.message});
    }
}

// get all users

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({_id:{$ne:req.user.id}}).select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.json({error: err.message});
    }
}

module.exports = {createUser,updateUser,deleteUser,getAllUsers};