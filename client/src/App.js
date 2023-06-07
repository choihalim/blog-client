import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";

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
      <Home blogs={blogs} />
    </>
  )
}

export default App;
