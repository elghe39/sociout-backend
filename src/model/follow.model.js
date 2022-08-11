import mongoose from 'mongoose'

const { Schema } = mongoose

const followSchema = new Schema({
    sendId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiveId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {timestamps: true})

const followModel = mongoose.model("Follow", followSchema)

export default followModel