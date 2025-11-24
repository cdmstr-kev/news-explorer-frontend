import './App.css'
import Header from '../Header/Header.jsx'
import Main from '../Main/Main.jsx'
import {useState} from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    console.log(searchQuery)
    setSearchQuery("")
  }

  return (
    <div className="app">
      <div className="app__content">
        <Header />
        <Main
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmit={handleSearch}
        />
      </div>



    </div>
  )
}

export default App
