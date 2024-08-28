// import React, { useState, useEffect } from 'react'
// import axios from 'axios'
// import BlogCard from './BlogCard'


// const AllBlog = () => {
//     const [blogContent, setBlogContent] = useState([])
//     const [isCard, setIsCard] = useState(true)
//     const [content, setContent] = useState("")

//     const renderAllBlog = async () => {
//         try {
//             const { data } = await axios.get("http://127.0.0.1:4000/api/v1/doctor/allblog")
//             const { allBlog } = data
//             setBlogContent(allBlog)
            
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(() => {
//         renderAllBlog()
//     }, [])

//     const handleCardClick = (i, j) => {
//         setIsCard(!isCard)
//         console.log(i, j)
//         console.log(blogContent[i].post[j])
//         setContent(blogContent[i].post[j])
//     }

//     return (
//         <div>
//             {isCard && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {blogContent.map((data, dataIndex) => (
//                     data.post.map((post, postIndex) => (
//                         <BlogCard key={postIndex} post={post} onClick={() => handleCardClick(dataIndex,postIndex)} />
//                     ))
//                 ))}
//             </div>}
//     {!isCard && <div className="ml-0 bg-white  p-6 my-4">
//         <div className="font-bold text-3xl text-center mb-[3rem] text-orange-600">{content?.postCaption}</div>
//         <div className="mb-4 flex justify-center">
//             <img className=" rounded-md w-[100%] h-[30rem] " src={content?.postThumbnail} alt="Thumbnail"  />
//         </div>
//         <div className="text-gray-700 text-lg" dangerouslySetInnerHTML={{ __html: content?.postContent }} />
//         {/* Comments Section */}
//         <div className="mt-8">
//                         <h2 className="text-2xl font-bold mb-4">Comments</h2>
//                         {/* <div className="mb-4">
//                             {comments.map((comment, index) => (
//                                 <div key={index} className="mb-2">
//                                     <strong>{comment.commenter}:</strong> {comment.comment}
//                                 </div>
//                             ))}
//                         </div> */}

//                         {/* Add Comment Form */}
//                         <div className="mt-4">
//                             <textarea
//                                 className="w-full p-2 border rounded-md"
//                                 rows="4"
//                                 placeholder="Add a comment..."
//                                 // value={newComment}
//                                 // onChange={(e) => setNewComment(e.target.value)}
//                             />
//                             <button
//                                 // onClick={handleAddComment}
//                                 className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
//                                 Submit
//                             </button>
//                         </div>
//                     </div>
//     </div>}
//         </div>
//     )
// }

// export default AllBlog


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from './BlogCard'

const AllBlog = () => {
    const [blogContent, setBlogContent] = useState([])
    const [isCard, setIsCard] = useState(true)
    const [content, setContent] = useState("")
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    const handelGenerateCaption = async()=>{
        try {
            
            const { data } = await axios.post("http://127.0.0.1:4000/api/v1/user/getCaption", { content}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            })

            const {text} = data

            setNewComment(text)

        } catch (error) {
            console.log(error)
        }
    }

    const renderAllBlog = async () => {
        try {
            const { data } = await axios.get("http://127.0.0.1:4000/api/v1/doctor/allblog")
            setBlogContent(data.allBlog)

            console.log("******************", data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = async (id, blogId) => {
        // console.log("*************", id)

        // console.log("Fetch Comment**************")
        try {
            const { data } = await axios.post(`http://127.0.0.1:4000/api/v1/user/myblog/${id}/comments`, {blogId}, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("userToken")}`
                }
            })

            console.log("****************",data)
            setComments(data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCardClick = (i, j) => {
        setIsCard(false)
        setContent(blogContent[i].post[j])
        // console.log("************************post id",blogContent[i].post[j]._id)
        fetchComments(blogContent[i]._id, blogContent[i].post[j]._id) // Fetch comments when a blog post is selected
    }

    const handleAddComment = async () => {
        const token = localStorage.getItem("userToken")
        
        if (!token) {
            // Handle scenario when the token is missing, e.g., redirect to login
            console.log("User not authenticated")
            return
        }
    
        try {
            // The `content._id` refers to the individual post ID

           

            // const id = blogContent.find(blog => blog.post.includes(content._id))

            const findBlogIdByPostId = () => {
                // Iterate over all blog documents
                for (let i = 0; i < blogContent.length; i++) {
                    const blog = blogContent[i];
            
                    // Iterate over each post within the blog document
                    for (let j = 0; j < blog.post.length; j++) {
                        const post = blog.post[j];
            
                        // Check if this post's _id matches the postId you're looking for
                        if (post._id === content._id) {
                            return blog._id; // Return the _id of the main blog document
                        }
                    }
                }
            
                return null; // Return null if no match is found
            }

            const id = findBlogIdByPostId()

            console.log("*****************", id)
            const { data } = await axios.post(
                `http://127.0.0.1:4000/api/v1/user/myblog/${id}/post/${content._id}/comment`, 
                {
                    comment: newComment
                }, 
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            )
            setComments(data.comments)
            setNewComment("")
            fetchComments(id, content._id)
        } catch (error) {
            console.log(error)
        }
    }
    

    useEffect(() => {
        renderAllBlog()
    }, [])

    return (
        <div>
            {isCard && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {blogContent.map((data, dataIndex) => (
                        data.post.map((post, postIndex) => (
                            <BlogCard key={postIndex} post={post} onClick={() => handleCardClick(dataIndex, postIndex)} />
                        ))
                    ))}
                </div>
            )}
            {!isCard && (
                <div className="ml-0 bg-white p-6 my-4">
                    <div className="font-bold text-3xl text-center mb-[3rem] text-orange-600">{content?.postCaption}</div>
                    <div className="mb-4 flex justify-center">
                        <img className="rounded-md w-[100%] h-[30rem]" src={content?.postThumbnail} alt="Thumbnail" />
                    </div>
                    <div className="text-gray-700 text-lg" dangerouslySetInnerHTML={{ __html: content?.postContent }} />

                    {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Comments</h2>
                        <div className="mb-4">
                            {comments.length == 0 ? "No Comment" :
                             comments.map((comment, index) => (
                                <div key={index} className="mb-2">
                                    <strong>{comment?.commenter?.firstName }{comment?.commenter?.lastName}</strong> {comment?.comment}
                                </div>
                            ))}
                        </div>

                        {/* Add Comment Form */}

                        <div className="mt-4">
                            <button
                                onClick={handelGenerateCaption}
                                className=" mb-4 relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-yellow-500 hover:to-red-500 text-black font-bold py-2 px-4 rounded transition-all duration-300"
                            >
                                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-transparent rounded transition-all duration-300"></span>
                                Generate Caption
                            </button>
                            <textarea
                                className="w-full p-2 border rounded-md"
                                rows="4"
                                placeholder="Add a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <button
                                onClick={handleAddComment}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllBlog

