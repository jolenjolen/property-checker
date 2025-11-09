import { useState, useEffect } from "react";
import appLogo from "/logo.png";
import "../App.css";

export default function Nav() {
  // 1️⃣ Initialize theme from localStorage (if available)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // 2️⃣ When theme changes, update localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3️⃣ Toggle function
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // 4️⃣ Set navbar classes dynamically
  const navbarTheme =
    theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark";

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
            <li className="nav-item">
              <a className="nav-link disabled" href="#">
                Disabled
              </a>
            </li>
          </ul>

          <button
            onClick={toggleTheme}
            className="btn btn-outline-secondary"
          >
            Toggle Theme
          </button>
        </div>
      </nav>
    </header>
  );
}
