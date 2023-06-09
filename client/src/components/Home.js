import BlogContainer from "./BlogContainer"

function Home({ blogs, handleDeleteBlog, currentUser }) {


    // console.log(currentUser)
    return (
        <>
            <BlogContainer
                blogs={blogs}
                handleDeleteBlog={handleDeleteBlog}
                currentUser={currentUser}
            />
        </>
    )
}

export default Home