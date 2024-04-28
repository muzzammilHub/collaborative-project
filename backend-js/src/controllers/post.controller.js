import { Post } from "../models/post.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const createPost = async(req, res)=>{
    try {
        console.log(req.body)
        const { postContent, postCaption } = req.body
        const thumbnailLocalPath = req.file?.path

        if(!thumbnailLocalPath){
            return res.status(400).json({
                message: "thumbnail file required"
            })
        }

        if(!postContent && !postCaption){
            return res.status(400).json({
                message: "Post content is not available!!"
            })
        }

        const doctor = req.doctor?._id.toString()

     

        const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)

        console.log("&&&&&&&&&&&",thumbnail?.url)

        if(!thumbnail){
            return res.status(400).json({
                message: "thumbnail not uploaded successfully"
            })
        }

        
        const postAvailable = await Post.findOne({doctor})

        console.log("*************",postAvailable)

        if(postAvailable){
            postAvailable.post.push({
                postContent,
                postCaption,
                postThumbnail: thumbnail?.url
            })

            await postAvailable.save()

            return res.status(200).json({
                postAvailable
            })
        }

        const newPost = await Post.create({
            post: { 
                postContent,
                postCaption,
                postThumbnail: thumbnail?.url
            },
            doctor
        })

        return res.status(200).json({
            newPost
        })
        
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

const getAllBlog = async(req, res)=>{
    try {
        
        const allBlog = await Post.find({})

        if(!allBlog){
            return res.status(400).json({
                message: "Blog not found!!"
            })
        }

        return res.status(200).json({
            allBlog
        })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
}

export {
    createPost,
    getAllBlog
}