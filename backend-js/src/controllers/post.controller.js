// import { Post } from "../models/post.model.js"
// import { uploadOnCloudinary } from "../utils/cloudinary.js"
// import { genAI } from "../utils/geminiai.js"


// const createPost = async(req, res)=>{
//     try {
//         console.log(req.body)
//         const { postContent, postCaption } = req.body
//         const thumbnailLocalPath = req.file?.path

//         if(!thumbnailLocalPath){
//             return res.status(400).json({
//                 message: "thumbnail file required"
//             })
//         }

//         if(!postContent && !postCaption){
//             return res.status(400).json({
//                 message: "Post content is not available!!"
//             })
//         }

//         const doctor = req.doctor?._id.toString()

     

//         const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

//         console.log("&&&&&&&&&&&",thumbnail?.url)

//         if(!thumbnail){
//             return res.status(400).json({
//                 message: "thumbnail not uploaded successfully"
//             })
//         }

        
//         const postAvailable = await Post.findOne({doctor})

//         console.log("*************",postAvailable)

//         if(postAvailable){
//             postAvailable.post.push({
//                 postContent,
//                 postCaption,
//                 postThumbnail: thumbnail?.url
//             })

//             await postAvailable.save()

//             return res.status(200).json({
//                 postAvailable
//             })
//         }

//         const newPost = await Post.create({
//             post: { 
//                 postContent,
//                 postCaption,
//                 postThumbnail: thumbnail?.url
//             },
//             doctor
//         })

//         return res.status(200).json({
//             newPost
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             error
//         })
//     }
// }

// const getAllBlog = async(req, res)=>{
//     try {
        
//         const allBlog = await Post.find({})

//         if(!allBlog){
//             return res.status(400).json({
//                 message: "Blog not found!!"
//             })
//         }

//         return res.status(200).json({
//             allBlog
//         })

//     } catch (error) {
//         return res.status(500).json({
//             error
//         })
//     }
// }

// const getAllMyBlog = async(req, res)=>{
//     try {

//         const doctor_id = req.doctor._id

//         const allMyBlog = await Post.find({doctor: doctor_id})

//         if(!allMyBlog){
//             return res.status(400).json({
//                 message: "Don't find blog!!"
//             })
//         }

//         return res.status(200).json({
//             allMyBlog
//         })
        
//     } catch (error) {
//         return res.status(500).json({
//             message: error
//         })
//     }
// }

// const getCaption = async(req, res)=>{
//     try {
        
//         const { postContent } = req.body

        

//         const geminiQuery = `Generate the caption in not more than 10 words from this paragraph: ${postContent}`

//         const model = genAI.getGenerativeModel({ model: "gemini-pro"})
      
//         const result = await model.generateContent(geminiQuery)
//         const response = result.response
//         const text = response.text()
//         console.log(text)

//         return res.status(200).json({
//             text
//         })

//     } catch (error) {
//         return res.status(500).json({
//             message: error
//         })
//     }
// }

// export {
//     createPost,
//     getAllBlog,
//     getAllMyBlog,
//     getCaption
// }


import { Post } from "../models/post.model.js"
import { Comment } from "../models/comment.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { genAI } from "../utils/geminiai.js"

// Create a new post
const createPost = async (req, res) => {
    try {
        console.log(req.body)
        const { postContent, postCaption } = req.body
        const thumbnailLocalPath = req.file?.path

        if (!thumbnailLocalPath) {
            return res.status(400).json({
                message: "Thumbnail file required",
            })
        }

        if (!postContent && !postCaption) {
            return res.status(400).json({
                message: "Post content is not available!!",
            })
        }

        const doctor = req.doctor?._id.toString()
        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        if (!thumbnail) {
            return res.status(400).json({
                message: "Thumbnail not uploaded successfully",
            })
        }

        const postAvailable = await Post.findOne({ doctor })

        if (postAvailable) {
            postAvailable.post.push({
                postContent,
                postCaption,
                postThumbnail: thumbnail?.url,
            })

            await postAvailable.save()

            return res.status(200).json({
                postAvailable,
            })
        }

        const newPost = await Post.create({
            post: {
                postContent,
                postCaption,
                postThumbnail: thumbnail?.url,
            },
            doctor,
        })

        return res.status(200).json({
            newPost,
        })
    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

// Get all blogs
const getAllBlog = async (req, res) => {
    try {
        const allBlog = await Post.find({})

        if (!allBlog) {
            return res.status(400).json({
                message: "Blog not found!!",
            })
        }

        return res.status(200).json({
            allBlog,
        })
    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

// Get all blogs of a specific doctor
const getAllMyBlog = async (req, res) => {
    try {
        const doctor_id = req.doctor._id

        const allMyBlog = await Post.find({ doctor: doctor_id })

        if (!allMyBlog) {
            return res.status(400).json({
                message: "Don't find blog!!",
            })
        }

        return res.status(200).json({
            allMyBlog,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}

// Generate a caption using generative AI
const getCaption = async (req, res) => {
    try {
        const { postContent } = req.body
        const geminiQuery = `Generate the caption in not more than 10 words from this paragraph: ${postContent}`

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        const result = await model.generateContent(geminiQuery)
        const response = result.response
        const text = response.text()

        return res.status(200).json({
            text,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}

const getComment = async (req, res) => {
    try {
        const postContent = req.body

        console.log(postContent)
        const geminiQuery = `Generate precise comment for the paragraph: ${postContent?.content?.postContent}`

        const model = genAI.getGenerativeModel({ model: "gemini-pro" })

        const result = await model.generateContent(geminiQuery)
        const response = result.response
        const text = response.text()

        return res.status(200).json({
            text,
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
}

const addComment = async (req, res) => {
    try {
        const { id, blogId } = req.params // `id` is the Post document ID, `postId` is the individual post ID
        const commenter = req.user._id.toString()
        const { comment } = req.body

        console.log("**************",comment)

        console.log("************************",blogId, id)

        // Create the comment
        const newComment = await Comment.create({ commenter, comment })

        // Find the Post document by its ID
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Find the individual post by its ID within the `post` array
        const postToUpdate = post.post.find(p => p._id.toString() === blogId);

        if (!postToUpdate) {
            return res.status(404).json({ message: "Post item not found" });
        }

        // Add the new comment's ID to the comments array
        postToUpdate.comments.push(newComment._id);

        // Save the updated Post document
        await post.save();

        return res.status(200).json({
            comments: postToUpdate.comments,
        })
    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}


const getComments = async (req, res) => {
    try {

        const { id } = req.params
        

        const { blogId } = req.body


        const post = await Post.findById(id)
        
        const postWithComments = post.post.find(p => p._id.toString() === blogId)
        
        console.log("*******************", postWithComments.comments)

        let comments = []

        for (let i=0; i<postWithComments.comments.length; i++){

           let comment =  await Comment.findById(postWithComments.comments[i].toString()).populate("commenter")

           comments.push(comment)
        }

        console.log(comments)

        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({
            error,
        })
    }
}

export {
    createPost,
    getAllBlog,
    getAllMyBlog,
    getCaption,
    addComment,
    getComments,
    getComment
}
