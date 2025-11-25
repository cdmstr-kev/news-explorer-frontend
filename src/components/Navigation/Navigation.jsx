import logoutIcon from "../../assets/logout.png";
import "./Navigation.css"

const Navigation = ({isLoggedIn}) => {
  return (
      <div className={"nav"}>
        <a className={`nav__title ${!isLoggedIn ? "nav__title_position_right" : ""} `} href="https://vitejs.dev" target="_blank">HOME</a>
        {isLoggedIn && (
            <a className={"nav__title nav__title_position_right "} href="https://vitejs.dev" target="_blank">Saved articles</a>
        )}
        {isLoggedIn ? (
            <button type="button" className="nav__btn">
              <div className={"nav__signout-btn"}>
                <a href="https://react.dev" target="_blank">Sign out</a>
                <img src={logoutIcon} alt="logout-icon"/>
              </div>
            </button>




        ):(
            <button type="button" className="nav__btn">
              <a href="https://react.dev" target="_blank">Sign in</a>
            </button>
        )}
      </div>
  )
}
export default Navigation
