import React from "react"
import Card from "react-bootstrap/Card"
import Nav from 'react-bootstrap/Nav';
import "../styles/blogs.css"

function BlogCard({ blog }) {

    const { title, type, body, tags, likes, created_at } = blog

    return (
        <>
            <div className="blog-card-div">
                <Card className="blog-card" border="secondary" style={{ width: '100rem' }}>
                    <Card.Header>
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link href="#disabled" disabled><h2>{title}</h2></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#disabled" disabled>
                                    <h6>{type}</h6>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#disabled" disabled>
                                    x {tags}
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#disabled" disabled>
                                    Published: {created_at}
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                    {likes} <button className="like-button">❤️</button>
                            </Nav.Item>
                        </Nav>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <span>{body}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>

            </div >
        </>
    )
}

export default BlogCard