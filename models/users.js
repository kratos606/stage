const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    }
})

userSchema.pre('save', async function(next) {
    if(this.password.length>=59){
        next();
    }
    else{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next(); 
    }
    
});

userSchema.pre('update', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.verifyPassword = async function(candidatePassword,userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User',userSchema);