import { Routes, Route } from "react-router-dom";
import {useState} from "react";

import './App.css'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import Footer from "../Footer/Footer.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchQuery)
    setSearchQuery("")
  }

  return (
    <div className="app">
      <div className="app__content">
        <Header
        isLoggedIn={isLoggedIn}
        />
        <Routes>
          <Route
              path="/"
              element={
                <Main
                  searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onSubmit={handleSearch}
                />
              } />
        </Routes>

        <Footer/>
      </div>
    </div>
  )
}

export default App
