import React, { useState } from "react";


function BlogForm({ user }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [blogType, setBlogType] = useState("");

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleBodyChange = (e) => {
        setBody(e.target.value);
    };
    const handleTagsChange = (e) => {
        setTags(e.target.value);
    };
    const handleBlogTypeChange = (e) => {
        setBlogType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const blogData = {
            title: title,
            body: body,
            type: blogType,
            tags: tags.split(",").map((tag) => tag.trim()), // Convert tags to an array of trimmed tags
        };

        fetch(`/create/${user.username}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(blogData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Handle the response data from the server
                setTitle("");
                setBody("");
                setTags("");
                setBlogType("");
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={handleTitleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="body">Body</label>
                <textarea
                    id="body"
                    value={body}
                    onChange={handleBodyChange}
                    required
                ></textarea>
            </div>
            <div>
                <label htmlFor="tags">Tags</label>
                <input
                    type="text"
                    id="tags"
                    value={tags}
                    onChange={handleTagsChange}
                />
            </div>
            <div>
                <label htmlFor="blogType">Blog Type</label>
                <select
                    id="blogType"
                    value={blogType}
                    onChange={handleBlogTypeChange}
                    required
                >
                    <option value="">Select a type</option>
                    <option value="Personal">Personal</option>
                    <option value="Educational">Educational</option>
                    <option value="Entertainment">Entertainment</option>
                </select>
            </div>
            <button type="submit">Create Blog</button>
        </form>
    );
}

export default BlogForm;
