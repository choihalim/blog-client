import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar"
import Authentication from "./components/Authentication";
import NotFound from "./components/NotFound";
import BlogForm from "./components/BlogForm";
import BlogDetail from "./components/BlogDetail";


function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchUser()
    fetchBlogs()
  }, [])

  function fetchBlogs() {
    fetch('/home')
      .then(r => r.json())
      .then(data => {
        setBlogs(data)
        setLoading(false)
      })
  }

  function fetchUser() {
    fetch('/authorize')
      .then(r => r.json())
      .then(user => {
        if (!user.errors) {
          updateUser(user)
          console.log("working")
        }
        else updateUser(null)
      })
      .finally(() => setLoading(false))
  }


  function updateUser(user) {
    setUser(user)
  }

  if (loading) {
    // Render a loading state component or spinner while data is being fetched
    return <></>;
  }

  if (!user) {
    return (
      <>
        <NavBar updateUser={updateUser} user={user} />
        <Switch>
          <Route exact path='/authentication'>
            <Authentication updateUser={updateUser} fetchUser={fetchUser} />
          </Route>
          {/* <Route exact path='/'>
            <Home blogs={blogs} />
          </Route> */}
          <Route component={NotFound} />
        </Switch>

      </>
    )
  }

  return (
    <>
      <NavBar updateUser={updateUser} user={user} />
      <Switch>
        {/* <Route path='/productions/new'>
          <ProductionForm addProduction={addProduction} />
        </Route>
        <Route path='/productions/edit/:id'>
          <ProductionEdit updateProduction={updateProduction} productionEdit={productionEdit} />
        </Route>
        <Route path='/productions/:id'>
          <ProductionDetail handleEdit={handleEdit} deleteProduction={deleteProduction} />
        </Route> */}
        <Route exact path='/create'>
          <BlogForm user={user} />
        </Route>
        <Route exact path='/home'>
          <Home blogs={blogs} />
        </Route>
        <Route exact path='/:username/:id'>
          <BlogDetail />
        </Route>
        <Route exact path='/:username'>
          <BlogDetail />
        </Route>
        <Route exact path='/'>
          <Home blogs={blogs} />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  )
}

export default App;
