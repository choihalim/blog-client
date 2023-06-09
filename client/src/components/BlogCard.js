import React, { useState } from "react"
import { useParams } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Nav from "react-bootstrap/Nav"
import "../styles/blogs.css"

function BlogCard({ blog, handleDeleteBlog, currentUser }) {
    const { id, title, type, body, tags, likes, created_at, username } = blog
    const params = useParams()

    const [likedPosts, setLikedPosts] = useState(new Set())
    const [updatedLikes, setUpdatedLikes] = useState(likes)



    // console.log(currentUser)
    const handleLikeClick = () => {
        if (!likedPosts.has(id)) {
            setUpdatedLikes(likes + 1)
            const updateObj = {
                likes: updatedLikes,
            }
            fetch(`/like/${username}/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateObj),
            })
                .then((response) => response.json())
                .then((data) => {
                    setLikedPosts(new Set(likedPosts.add(id)))
                    setUpdatedLikes(updatedLikes + 1)
                })
        }
    }

    const handleDeleteClick = () => {
        fetch(`/posts/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    handleDeleteBlog(id)
                    console.log("Post deleted successfully");
                } else {
                    console.log("Failed to delete post");
                }
            })
            .catch((error) => {
                console.log("Error deleting post:", error);
            });
    };

    const renderDeleteButton = () => {
        if (currentUser === username) {
            // console.log(currentUser)
            return (
                <Nav.Item>
                    <button className="delete-button" onClick={handleDeleteClick}>
                        Delete
                    </button>
                </Nav.Item>
            );
        }
        return null;
    };


    function isPostById() {
        if (params.id) {
            console.log(params)
            return true
        }
        else return false
    }

    const postLiked = () => {
        if (likedPosts.has(id)) {
            return (
                <Nav.Link href="#disabled" disabled>
                    {updatedLikes}
                    <button className="like-button" >
                        ❤️
                    </button>
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link href="#disabled" >
                    {updatedLikes}
                    <button className="like-button" onClick={handleLikeClick}>
                        ❤️
                    </button>
                </Nav.Link>
            )
        }
    }

    const renderLink = () => {
        if (isPostById()) {
            return (
                <Nav.Link href={`/${username}/${id}`} disabled>
                    <h2>{title}</h2>
                </Nav.Link>
            )
        } else {
            return (
                <Nav.Link href={`/${username}/${id}`}>
                    <h2>{title}</h2>
                </Nav.Link>
            )
        }
    }

    return (
        <div className="blog-card-div">
            <Card className="blog-card" border="secondary">
                <Card.Header className="card-title">
                    <div className="title-element">
                        <Nav.Item>
                            {renderLink()}
                        </Nav.Item>
                    </div>
                    <div className="title-element">
                        <Nav.Item>
                            <Nav.Link href="#disabled" disabled>
                                <h6>{type}</h6>
                            </Nav.Link>
                        </Nav.Item>
                    </div>
                    <div className="title-element">
                        <Nav.Item>
                            <Nav.Link href="#disabled" disabled style={{ display: 'inline-block', marginRight: '-25px' }}>
                                Author:
                            </Nav.Link>
                            <Nav.Link href={`/${username}`} style={{ display: 'inline-block' }}>
                                {username}
                            </Nav.Link>
                        </Nav.Item>
                    </div>
                    <div className="title-element">
                        <Nav.Item>
                            <Nav.Link href="#disabled" disabled>
                                {tags}
                            </Nav.Link>
                        </Nav.Item>
                    </div>
                    <div className="title-element">
                        <Nav.Item>
                            <Nav.Link href="#disabled" disabled>
                                Published: {created_at}
                            </Nav.Link>
                        </Nav.Item>
                    </div>
                    <div className="title-element" id="likes">
                        <Nav.Item>
                            {postLiked()}
                        </Nav.Item>
                    </div>
                    <div>
                        {renderDeleteButton()}
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <span>{body}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BlogCard
