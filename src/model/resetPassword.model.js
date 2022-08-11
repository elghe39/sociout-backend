import mongoose from "mongoose"

const Schema = mongoose.Schema

const resetCode = new Schema({
    code: {
        type: String,
        required:  true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600,
    },
})

const resetCodeModel = mongoose.model("ResetCode", resetCode)

export default resetCodeModel