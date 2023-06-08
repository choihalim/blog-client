import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import BlogCard from "./BlogCard"
import BlogContainer from "./BlogContainer"
import NotFound from "./NotFound"

function BlogDetail() {

    const [blog, setBlog] = useState([])
    const [error, setError] = useState(false)

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
            .then(setBlog)
            .catch((error) => {
                console.error("Error fetching blog:", error)
                setError(true)
            });
    }, []);

    if (error) {
        return <NotFound />;
    }

    return (
        <>
            {params.id ? <BlogCard blog={blog}></BlogCard> : <BlogContainer blogs={blog}></BlogContainer>}
        </>
    )
}

export default BlogDetail