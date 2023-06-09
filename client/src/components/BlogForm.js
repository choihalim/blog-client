import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button";

function BlogForm({ user }) {
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState("");
    const [blogType, setBlogType] = useState("");

    const history = useHistory()

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
            blog_type: blogType,
            tags: tags
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
                history.push(`/${user.username}`)
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
        <div className="blog-card-div">
            <Card id="new-post-card" border="secondary">
                <Card.Body>
                    <Form onSubmit={handleSubmit} style={{ width: "1000px" }}>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={handleTitleChange}
                                style={{ width: "500px" }}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="body">
                            <Form.Label>Body</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={body}
                                onChange={handleBodyChange}
                                style={{ height: "550px" }}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <Form.Control
                                type="text"
                                value={tags}
                                onChange={handleTagsChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="blogType">
                            <Form.Label>Blog Type</Form.Label>
                            <Form.Control
                                as="select"
                                value={blogType}
                                onChange={handleBlogTypeChange}
                                style={{ width: "250px", marginBottom: "10px" }}
                                required
                            >
                                <option value="">Select a type</option>
                                <option value="Personal">Personal</option>
                                <option value="Technology">Technology</option>
                                <option value="Education">Education</option>
                                <option value="Finance">Finance</option>
                                <option value="Business">Business</option>
                                <option value="Entertainment">Entertainment</option>
                            </Form.Control>
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" type="submit" style={{ width: "120px", height: "40px"}}>
                                Create Blog
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BlogForm;
