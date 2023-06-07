import React from "react";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import "../styles/blogs.css";

function BlogCard({ blog }) {
    const { title, type, body, tags, likes, created_at, username } = blog;

    return (
        <div className="blog-card-div">
            <Card className="blog-card" border="secondary">
                <Card.Header className="card-title">
                    <div className="title-element">
                        <Nav.Item>
                            <Nav.Link href="#disabled" disabled>
                                <h2>{title}</h2>
                            </Nav.Link>
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
                            <Nav.Link href="#disabled" disabled>
                                Author: {username}
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
                                {likes} <button className="like-button">❤️</button>
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
