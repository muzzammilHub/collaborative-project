const BlogCard = ({ post, onClick }) => {
    return (
        <div className="border rounded-md p-4 my-4 cursor-pointer" onClick={onClick}>
            <div className="font-bold mb-2 text-center">{post.postCaption}</div>
            <img src={post.postThumbnail} alt="Thumbnail" className="mb-2 mx-auto w-[26rem] h-[17rem]" />
        </div>
    );
}

export default BlogCard