import React, {useState} from 'react'
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import axios from 'axios'

const modules = {
    toolbar: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }], // Add font size options
        ['clean']
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link',
    'color', 'background',
    'size' // Include 'size' format
];

const CreatePost = () => {
    const [postCaption, setPostCaption] = useState("")
    const [ postThumbnail, setPostThumbnail] = useState(null)
    const [postContent, setPostContent] = useState("")


    const handleFormSubmit = async(e)=>{
        e.preventDefault()
        
        const formData = new FormData()

        formData.append("postCaption", postCaption)
        formData.append("postContent", postContent)
        formData.append("postThumbnail", postThumbnail)

        try {

            const data = await axios.post("http://127.0.0.1:4000/api/v1/doctor/post", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${localStorage.getItem("doctorToken")}`
                }
            })

            alert("Post Created Successfully!!")

            console.log(data)
            
        } catch (error) {
            alert("Post not Created!!")
            console.log(error.message)
        }

    }

    const handelGenerateCaption = async()=>{
        try {
            
            const { data } = await axios.post("http://127.0.0.1:4000/api/v1/doctor/getCaption", { postContent }, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("doctorToken")}`
                }
            })

            const {text} = data

            setPostCaption(text)

        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className=" max-w-[60%] mx-auto h-auto bg-white shadow shadow-blue-700 rounded px-8 pt-6 pb-8 mb-4 mt-28 ml-[8.5rem]">
    <form
     onSubmit={handleFormSubmit}
     className="space-y-4">
            <ReactQuill
            className=' border border-black'
                modules={modules}
                formats={formats}
                value={postContent}
                onChange={(value)=>setPostContent(value)}
            />
    <button
    onClick={handelGenerateCaption}
    className="relative bg-gradient-to-r from-red-500 to-yellow-500 hover:from-yellow-500 hover:to-red-500 text-black font-bold py-2 px-4 rounded transition-all duration-300"
>
    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent to-transparent rounded transition-all duration-300"></span>
    Generate Caption
</button>
        <input 
            className="appearance-none border border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            type='text'
            name='postCaption'
            placeholder="Caption"
            value={postCaption}
            onChange={(e)=>setPostCaption(e.target.value)}
        />
        
        <div className="flex items-center justify-center">
            <label className="w-64 flex flex-col items-center  bg-white text-blue-500 rounded-lg shadow-lg tracking-wide uppercase border border-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white">
                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M17.586 4.586a2 2 0 0 0-2.828 0L10 9.172 6.242 5.414a2 2 0 1 0-2.828 2.828L7.172 12 4.414 14.758a2 2 0 0 0 2.828 2.828L10 14.828l3.758 3.758a2 2 0 0 0 2.828-2.828L12.828 12l3.758-3.758a2 2 0 0 0 0-2.828z"></path></svg>
                <span className="mt-2 text-base leading-normal">{postThumbnail === null ? "Select a Thumbnail" : postThumbnail?.name}</span>
                <input
                    type='file'
                    name='postThumbnail'
                    className="hidden"
                    onChange={(e)=>setPostThumbnail(e.target.files[0])}
                />
            </label>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Create Post
        </button>
    </form>
</div>

  )
}

export default CreatePost