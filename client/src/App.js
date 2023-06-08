import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar"
import Authentication from "./components/Authentication";
import NotFound from "./components/NotFound";


function App() {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetchUser()
    fetchBlogs()
  }, [])

  function fetchBlogs() {
    fetch('/home')
      .then(r => r.json())
      .then(setBlogs)
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
  }


  function updateUser(user) {
    setUser(user)
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
          <Route>
            <NotFound />
          </Route>
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
        <Route exact path='/home'>
          <Home blogs={blogs} />
        </Route>
        <Route exact path='/'>
          <Home blogs={blogs} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  )
}

export default App;
