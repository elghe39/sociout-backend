import mongoose from 'mongoose'
import crypto from 'crypto'
import 'dotenv/config'

const secret = process.env.SECRET

const { Schema } = mongoose

const userSchema = new Schema({
    email: {
        type: String, 
        lowercase: true, 
        unique: true, 
        required: [true, "Email can't be blank"], 
        match:  [/\S+@\S+\.\S+/, 'is invalid'], 
        index: true
    },
    salt: {
        type: String,
    },
    hash: {
        type: String,
    },
    firstName: {
        type: String,
        required: [true, "First Name can't be blank"]
    },
    lastName: {
        type: String,
        required: [true, "Last Name can't be blank"]
    },
    gender: {
        type: String,
        enum: ["Male", "Female"],
    },
    dayOfBirth: {
        type: Date,
    },
    sumary: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://tleliteracy.com/wp-content/uploads/2017/02/default-avatar.png',
        updatedAt: Date.now()
    },
    friendList: [{
        type: Schema.Types.ObjectId,
        ref: "Friend"
    }],
    followList: [{
        type: Schema.Types.ObjectId,
        ref: "Follow"
    }],
    requestFriendList: [{
        type: Schema.Types.ObjectId,
        ref: "FriendRequest"
    }],
    notification: [{
        type: Schema.Types.ObjectId,
        ref: "Notification"
    }],
    resetCode: {
        type: Schema.Types.ObjectId,
        ref: "ResetCode"
    }
}, {timestamps: true})

    userSchema.methods.validatePassword = function(password) {
        var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
        return this.hash == hash
    }

const userModel = mongoose.model("User", userSchema)

export default userModel