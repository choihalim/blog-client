import React, { useEffect } from "react"
import BlogContainer from "./BlogContainer"
import NavBar from "./NavBar"

function Home({ blogs }) {

    return (
        <>
            <h1>Home Page</h1>
            <NavBar />
            <BlogContainer blogs={blogs} />
        </>
    )
}

export default Home