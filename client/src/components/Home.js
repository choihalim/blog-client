import React, { useEffect } from "react"
import BlogContainer from "./BlogContainer"

function Home({ blogs }) {

    return (
        <>
            <BlogContainer blogs={blogs} />
        </>
    )
}

export default Home