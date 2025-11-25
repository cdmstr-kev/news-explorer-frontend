import React from 'react'
import './Main.css'
import SearchForm from "../SearchForm/SearchForm.jsx";
import avatarPlaceholder from '../../assets/avatar-placeholder.png';

export const Main = ( {searchQuery, setSearchQuery, onSubmit }) => {
  return (
      <main className="main__container">
        <div className="main__main">
          <h1 className="main__title">
            What's going on in<br/> the world?
          </h1>
          <h2 className="main__subtitle">
            Find the lastest news on any topic and save the in your personal account.
          </h2>
        <SearchForm
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSubmit={onSubmit}
        />
        </div>
        <section className="main__author">
          <img className={"main__author-img"} src={avatarPlaceholder} alt={"avatarPlaceholder"} />
          <div className="main__author-info">
            <h2 className="main__author-title">About the author</h2>
            <p className="main__author-desc">
              This block describes the project author. Here you should indicate your<br/>
              name, what you do, and which development technologies you know.
            </p>
            <p className="main__author-desc">You can also talk about your experience with TripleTen, what you learned<br/>
              there, and how you can help potential customers.</p>
          </div>
        </section>

      </main>
  )
}

export default Main