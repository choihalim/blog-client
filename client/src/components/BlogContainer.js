import React from "react"
import BlogCard from "./BlogCard"

function BlogContainer({ blogs }) {

    return (
        <>
            <div>
                {blogs.map(blog => <BlogCard key={blog.id} blog={blog} />)}
            </div>
        </>
    )
}

export default BlogContainer