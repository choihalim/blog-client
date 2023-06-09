import React from "react";
import { useParams } from "react-router-dom"
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import "../styles/blogs.css";

function BlogCard({ blog }) {
    const { id, title, type, body, tags, likes, created_at, username } = blog;

    const handleLikeClick = () => {
        console.log("click")
        const updatedLikes = likes + 1;
        const updateObj = {
            likes: updatedLikes,
        };
        fetch(`/${username}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updateObj),
        })
            .then((response) => response.json())

    const params = useParams()

    function isPostById() {
        if (params.id) {
            console.log(params)
            return true
        }
        else return false
    }

    const renderLink = () => {
        if (isPostById()) {
            return (
                <Nav.Link href={`/${username}/${id}`} disabled>
                    <h2>{title}</h2>
                </Nav.Link>
            );
        } else {
            return (
                <Nav.Link href={`/${username}/${id}`}>
                    <h2>{title}</h2>
                </Nav.Link>
            );
        }
    };

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
                            <Nav.Link href="#disabled" disabled>
                                {likes}
                                <button className="like-button" onClick={handleLikeClick}>
                                    ❤️
                                </button>
                            </Nav.Link>
                        </Nav.Item>
                    </div>
                </Card.Header>

                <Card.Body>
                    <Card.Text>
                        <span>{body}</span>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BlogCard;
