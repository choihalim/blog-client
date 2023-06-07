import React, { useEffect } from "react"
import BlogContainer from "./BlogContainer"

function Home({ blogs }) {

    return (
        <>
            <h1>Home Page</h1>
            <BlogContainer blogs={blogs} />
        </>
    )
}

export default Home