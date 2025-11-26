import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import "./App.css";
import Header from "../Header/Header.jsx";
import Main from "../Main/Main.jsx";
import Footer from "../Footer/Footer.jsx";
import SavedNews from "../SavedNews/SavedNews.jsx";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchQuery);
    setSearchQuery("");
  };

  const handleSignOut = (e) => {
    console.log("signOut");
    setIsLoggedIn(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("signIn");
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      <div className="app__content">
        <Header
          handleSignIn={handleSignIn}
          handleSignOut={handleSignOut}
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
            }
          />
          <Route
            path={"/savedNews"}
            element={<SavedNews searchQuery={searchQuery} />}
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
