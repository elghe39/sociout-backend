import mongoose from 'mongoose'

const { Schema } = mongoose

const friendRequestSchema = new Schema({
    sendId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiveId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    read: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const friendRequestModel = mongoose.model("FriendRequest", friendRequestSchema)

export default friendRequestModel