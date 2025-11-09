import appLogo from "/logo.png";
import "../App.css";
import { useTheme } from "../ThemeContext";

export default function Nav() {
  const { theme, toggleTheme } = useTheme();

  const navbarTheme = theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark";
  const inverseTheme = theme === "light" ? "dark" : "light";
  return (
    <header>
      <nav className={`navbar navbar-expand-sm ${navbarTheme}`}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={appLogo} alt="Logo" width="30" height="30" />
          </a>

          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Active
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Another Link
              </a>
            </li>
          </ul>

          <button onClick={toggleTheme} className={`btn btn-outline-${inverseTheme}`} title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
            <span className="material-symbols-rounded">
              {theme === "light" ? "dark_mode" : "light_mode"}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
