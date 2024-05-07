import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';


const AllBlog = () => {
    const [blogContent, setBlogContent] = useState([]);
    const [isCard, setIsCard] = useState(true)
    const [content, setContent] = useState("")

    const renderAllBlog = async () => {
        try {
            const { data } = await axios.get("http://127.0.0.1:4000/api/v1/doctor/allblog");
            const { allBlog } = data
            setBlogContent(allBlog)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        renderAllBlog()
    }, []);

    const handleCardClick = (i, j) => {
        setIsCard(!isCard)
        console.log(i, j)
        console.log(blogContent[i].post[j])
        setContent(blogContent[i].post[j])
    };

    return (
        <div>
            {isCard && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {blogContent.map((data, dataIndex) => (
                    data.post.map((post, postIndex) => (
                        <BlogCard key={postIndex} post={post} onClick={() => handleCardClick(dataIndex,postIndex)} />
                    ))
                ))}
            </div>}
    {!isCard && <div className="ml-0 bg-white  p-6 my-4">
        <div className="font-bold text-3xl text-center mb-[3rem] text-orange-600">{content?.postCaption}</div>
        <div className="mb-4 flex justify-center">
            <img className=" rounded-md w-[100%] h-[30rem] " src={content?.postThumbnail} alt="Thumbnail"  />
        </div>
        <div className="text-gray-700 text-lg" dangerouslySetInnerHTML={{ __html: content?.postContent }} />
    </div>}
        </div>
    )
}

export default AllBlog
