import mongoose, {Schema} from "mongoose"

// const postSchema = new Schema({
//     post: [
//         {
//            postContent: {
//             type: String,
//             required: true
//            },
//            postThumbnail:{
//             type: String,
//             required: true
//            },
//            postCaption:{
//             type: String,
//             required: true
//            },
//            createdAt:{
//             type: Date,
//             default: Date.now
//            } 
//         }
//     ],
//     doctor: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Doctor'
//     }
// })

// export const Post = mongoose.model("Post", postSchema)

const postSchema = new Schema({
    post: [
        {
            postContent: {
                type: String,
                required: true,
            },
            postThumbnail: {
                type: String,
                required: true,
            },
            postCaption: {
                type: String,
                required: true,
            },
            createdAt: {
                type: Date,
                default: Date.now,
            },
            comments: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Comment",
                },
            ],
        },
    ],
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
    },
});

export const Post = mongoose.model("Post", postSchema);
