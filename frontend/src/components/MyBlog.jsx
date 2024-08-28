import React, {useState, useEffect} from 'react'
import BlogCard from './BlogCard'
import axios from 'axios'

const MyBlog = () => {
    const [blogContent, setBlogContent] = useState([])
    const [isCard, setIsCard] = useState(true)
    const [content, setContent] = useState("")

    const renderMyBlog = async () => {
        console.log(localStorage.getItem("doctorToken"))
        try {
            const { data } = await axios.get("http://127.0.0.1:4000/api/v1/doctor/myblog", {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("doctorToken")}`
                }
            })
            const { allMyBlog } = data
            setBlogContent(allMyBlog)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        renderMyBlog()
    }, [])

    const handleCardClick = (i, j) => {
        setIsCard(!isCard)
        console.log(i, j)
        console.log(blogContent[i].post[j])
        setContent(blogContent[i].post[j])
    }

    return (
        <div>
            {isCard && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogContent.map((data, dataIndex) => (
                    data.post.map((post, postIndex) => (
                        <BlogCard key={postIndex} post={post} onClick={() => handleCardClick(dataIndex,postIndex)} />
                    ))
                ))}
            </div>}
            {!isCard && <div className=" ml-[12rem] mx-auto bg-white shadow-md rounded-md p-6 my-4">
                <div className="font-bold text-3xl text-center mb-4 text-orange-600">{content?.postCaption}</div>
                <div className="mb-4 flex justify-center">
                    <img className=" rounded-md w-[60%] " src={content?.postThumbnail} alt="Thumbnail"  />
                </div>
                <div className="text-gray-700 text-lg" dangerouslySetInnerHTML={{ __html: content?.postContent }} />

                {/* Comments Section */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4">Comments</h2>
                        <div className="mb-4">
                            {comments.map((comment, index) => (
                                <div key={index} className="mb-2">
                                    <strong>{comment.commenter}:</strong> {comment.comment}
                                </div>
                            ))}
                        </div>

                        {/* Add Comment Form */}
                        <div className="mt-4">
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
            </div>}
        </div>
    )
}

export default MyBlog