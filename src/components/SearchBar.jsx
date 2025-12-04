import "../App.css";
import { useTheme } from "../ThemeContext";
import { useState } from "react";

export default function SearchBar() {
    const { theme, toggleTheme } = useTheme();
    const inverseTheme = theme === "light" ? "dark" : "light";
    
    const [isRounded, setIsRounded] = useState(true);
    const toggleRounded = () => {
        setIsRounded((prev) => !prev);
    };
    return(
        <>
      <div className={`hero hero-${theme} rounded-4 m-2 d-flex flex-column justify-content-center align-items-center`}>
        <h1 className={`hero-text-heading text-${inverseTheme}`}>
          <span className="heroFirstText">Find</span> Your Next Home
        </h1>

        <p className={`hero-text-slogan text-${inverseTheme}`}>
          Believe in finding it with the UK's largest choice of homes
        </p>

        <form className={`hero-searchbar-group search-form shadow-sm ${isRounded ? "rounded-pill" : "rounded-5"}`}>
          <div className="d-flex flex-column justify-content-center">

            <div className="input-group">
              <span className="m-1 input-group-text material-symbols-rounded">cottage</span>

              <input
                type="text"
                className="m-1 form-control"
                placeholder="e.g. Bath, UB3, or Leeds"
              />

              <button type="submit" className="m-1 rounded-pill btn search-btn d-flex justify-content-center align-items-center">
                <span className="material-symbols-rounded">search</span>
              </button>

              <a className="open-map rounded-pill m-1 d-flex justify-content-center align-items-center">
                <span className="material-symbols-rounded">map</span>
              </a>

              <button
                onClick={toggleRounded}
                type="button"
                className="m-1 rounded-pill d-flex justify-content-center align-items-center expand-search-bar"
                data-bs-toggle="collapse"
                data-bs-target="#expand-search-bar"
              >
                <span className="material-symbols-rounded">
                  {isRounded ? "keyboard_arrow_down" : "keyboard_arrow_up"}
                </span>
              </button>
            </div>

            <div id="expand-search-bar" className="collapse">
                <div className="extra-search-options d-flex justify-content-center gap-2 mt-2">
                
                <div className="dropdown">
                    <button
                    className="btn btn-light rounded p-2 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    >
                    Search Radius
                    </button>
                    <ul className="dropdown-menu">
                    <li><button className="dropdown-item">1 mile</button></li>
                    <li><button className="dropdown-item">3 miles</button></li>
                    <li><button className="dropdown-item">5 miles</button></li>
                    <li><button className="dropdown-item">10 miles</button></li>
                    <li><button className="dropdown-item">15+ miles</button></li>
                    </ul>
                </div>

                
                <div className="dropdown">
                    <button
                    className="btn btn-light rounded p-2 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    >
                    Property Types
                    </button>
                    <ul className="dropdown-menu">
                    <li><button className="dropdown-item">House</button></li>
                    <li><button className="dropdown-item">Flat / Apartment</button></li>
                    <li><button className="dropdown-item">Bungalow</button></li>
                    <li><button className="dropdown-item">Terraced</button></li>
                    <li><button className="dropdown-item">Semi-detached</button></li>
                    <li><button className="dropdown-item">Detached</button></li>
                    </ul>
                </div>

                
                <div className="dropdown">
                    <button
                    className="btn btn-light rounded p-2 dropdown-toggle"
                    data-bs-toggle="dropdown"
                    >
                    Bedrooms
                    </button>
                    <ul className="dropdown-menu">
                    <li><button className="dropdown-item">Studio</button></li>
                    <li><button className="dropdown-item">1 Bedroom</button></li>
                    <li><button className="dropdown-item">2 Bedrooms</button></li>
                    <li><button className="dropdown-item">3 Bedrooms</button></li>
                    <li><button className="dropdown-item">4 Bedrooms</button></li>
                    <li><button className="dropdown-item">5+ Bedrooms</button></li>
                    </ul>
                </div>
                </div>

            </div>


          </div>
        </form>
      </div>

      <h1 className="lol">
        Lorem ipsum dolor sit amet consectetur adipisicing elit…
      </h1>
    </>
    );
}