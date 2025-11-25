import './App.css'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import {useState} from "react";
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
        setIsLoggedIn={setIsLoggedIn}
        />
        <Main
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmit={handleSearch}
        />
        <Footer/>
      </div>
    </div>
  )
}

export default App
