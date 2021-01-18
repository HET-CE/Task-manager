const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema({
    name :{
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 7,
        validate(str){
            if(str.toLowerCase().includes("password")){
                throw new Error('password not allowed');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(val){
            if(val<0){
                throw new Error('age must be greater than 0')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})

userSchema.virtual('tasks',{
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.getPublicProfile = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
}

userSchema.methods.getAuthToken = async function(){
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, 'thisismywebsite')

    user.tokens = user.tokens.concat({ token: token})
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async(email, password)=>{
    const user = await User.findOne({ email : email})

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }
    console.log(user)
    return user
}

userSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8) 
    }
    next()
})

userSchema.pre('remove',async function(next){
    const user = this
    await Task.deleteMany({ owner: user._id }) 
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User