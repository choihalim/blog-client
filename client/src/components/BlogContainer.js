import React from "react"
import BlogCard from "./BlogCard"

function BlogContainer({ blogs, handleDeleteBlog, currentUser }) {


    // console.log(currentUser)
    return (
        <div>
            {blogs.map(blog =>
                <BlogCard
                    key={blog.id}
                    blog={blog}
                    handleDeleteBlog={handleDeleteBlog}
                    currentUser={currentUser}
                />)}
        </div>
    )
}

export default BlogContainer