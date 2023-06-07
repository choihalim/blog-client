import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import NavBar from "./components/NavBar"
import Authentication from "./components/Authentication";
import NotFound from "./components/NotFound";


function App() {

  const [blogs, setBlogs] = useState([])

  const proxy = 'http://127.0.0.1:5555'

  useEffect(() => {
    fetchBlogs()
  }
    , [])

  function fetchBlogs() {
    fetch(proxy)
      .then(r => r.json())
      .then(setBlogs)
  }

  return (
    <>
      <NavBar />
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
        <Route exact path='/authentication'>
          <Authentication />
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
