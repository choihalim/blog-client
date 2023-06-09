import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import BlogCard from "./BlogCard"
import BlogContainer from "./BlogContainer"
import Button from 'react-bootstrap/Button';
import NotFound from "./NotFound"

function BlogDetail() {

    const [blog, setBlog] = useState([])
    const [error, setError] = useState(false)
    const [fetchComplete, setFetchComplete] = useState(false);


    const params = useParams()

    const detailURL = params.id ? `/${params.username}/${params.id}` : `/${params.username}`;

    useEffect(() => {
        fetch(detailURL)
            .then((response) => {
                if (response.ok) {
                    return response.json()
                } else {
                    setError(true)
                    throw new Error("Network response was not OK.")
                }
            })
            .then(blogData => {
                setBlog(blogData)
            })
            .catch((error) => {
                console.error("Error fetching blog:", error)
                setError(true)
            })
            .finally(() => {
                setFetchComplete(true);
            })
    }, []);

    if (error) {
        return <NotFound />;
    }

    function renderEmptyBlog() {
        return (
            <div className="zero-blog-msg">
                <h2>No Blogs Found</h2>
                <h4>Click on the button below to start blogging!</h4>

                <Button variant="secondary" href="/create" >
                    Create Your First Blog
                </Button>
            </div>
        )
    }

    const isEmpty = blog.length === 0;

    return (
        <>
            {params.id ? <BlogCard blog={blog}></BlogCard> : <BlogContainer blogs={blog}></BlogContainer>}
            {fetchComplete && isEmpty && renderEmptyBlog()}
        </>
    )
}

export default BlogDetail