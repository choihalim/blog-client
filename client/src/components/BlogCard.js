import React from "react"

function BlogCard({ blog }) {

    const { title, type, body, tags, likes, created_at } = blog

    return (
        <>
            <div>
                <h2>{title}</h2>
                <h3>{type}</h3>
                <h3>{likes} ❤️</h3>
                <h4>Published: {created_at}</h4>
                <li>
                    {tags}
                </li>
                <p>{body}</p>

            </div>
        </>
    )
}

export default BlogCard