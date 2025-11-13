import appLogo from "/logo.png";
import "../App.css";
import { useTheme } from "../ThemeContext";


export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  const navbarTheme = theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark";
  const inverseTheme = theme === "light" ? "dark" : "light";
  return (
    <header className="sticky-top p-2">
      <nav className={`rounded-pill p-1 shadow-sm navbar navbar-expand-sm ${navbarTheme}`}>
        <div className="container-fluid">
          <a className="navbar-brand d-flex justify-content-start align-items-center" href="" height="50">
            <img className="rounded-pill" src={appLogo} alt="Logo" width="45" height="45" />
            &nbsp;
            <span>PROP80</span>
          </a>

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <button className="nav-link"></button>
            </li>
            <li className="nav-item">
              <a className="nav-link" to="/pages/contact">
                
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Another Link
              </a>
            </li>
          </ul>
          <button data-bs-toggle="offcanvas" data-bs-target="#favourites" className={`favouriteBtn mx-1 p-1 border-2 d-flex justify-content-center align-items-center rounded-pill btn btn-outline-danger`} title="View Your Favourites">
            <span className="label">&nbsp;&nbsp;My&nbsp;Favourites&nbsp;&nbsp;</span>
            <span className="m-0 material-symbols-rounded bg-danger text-white rounded-pill d-flex justify-content-center align-items-center">
              favorite
            </span>
            
          </button>
          <button onClick={toggleTheme} className={`mx-1 themeToggle d-flex justify-content-center align-items-center rounded-pill btn btn-${inverseTheme}`} title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
            <span className="material-symbols-rounded">
              {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
          </button>
        </div>
      </nav>
      <div className={`offcanvas offcanvas-end bg-${theme} text-${inverseTheme}`} id="favourites">
        <div className="offcanvas-header d-flex justify-content-between align-items-center">
          <h4 className="offcanvas-title">My Favourites</h4>
          <button data-bs-dismiss="offcanvas" className={`mx-1 closeFavourites d-flex justify-content-center align-items-center rounded-pill btn btn-${inverseTheme}`} title="Close Favourites"><span className="material-symbols-rounded">close</span></button>
        </div>
        <div className="offcanvas-body">

        </div>
      </div>
    </header>
    
  );
}
