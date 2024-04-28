import React, { useState } from 'react'
import Heading from './Heading'
import CreatePost from './CreatePost'
import AllBlog from './AllBlog'

const HealthBlog = () => {

  const [createPost, setCreatePost] = useState(false)
  const [myBlog, setMyBlog] = useState(false)
  const [allBlog, setAllBlog] = useState(true)

  return (
    <div>
        <Heading/>
        <div className="flex">
            <div className="w-1/10 p-4 bg-gray-200">
                <div className="mb-4">
                    {!createPost ? (
                        <button
                            onClick={() => {
                                setCreatePost(!createPost);
                                setMyBlog(false);
                                setAllBlog(false)
                            }}
                            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-4 mt-[15rem] rounded focus:outline-none focus:shadow-outline"
                        >
                            Create Post
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                              setCreatePost(!createPost)
                              setAllBlog(true)
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Close Create Post
                        </button>
                    )}
                </div>
                <div className="mb-4">
                    {/* Toggle My Blog Button */}
                    {!myBlog ? (
                        <button
                            onClick={() => {
                                setMyBlog(!myBlog);
                                setCreatePost(false);
                                setAllBlog(false)
                            }}
                            className="bg-blue-700 hover:bg-blue-500 text-white font-bold py-2 px-[1.7rem] rounded focus:outline-none focus:shadow-outline"
                        >
                            My Blog
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                              setMyBlog(!myBlog)
                              setAllBlog(true)
                            }}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Close My Blog
                        </button>
                    )}
                </div>
                
            </div>

            {/* Main Content Section */}
            <div className="w-4/5 p-4 bg-white">
                {/* Conditional Rendering: Create Post or My Blog */}
                {createPost && <CreatePost />}
                {myBlog && <div>{"Render  myblog content here..."}</div>}
                {allBlog && 
                  <div>
                    <AllBlog/>
                  </div>
                }
            </div>
        </div>
    </div>
  )
}

export default HealthBlog