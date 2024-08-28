import mongoose, { Schema } from "mongoose"

const commentSchema = new Schema({
    commenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

export const Comment = mongoose.model("Comment", commentSchema)
