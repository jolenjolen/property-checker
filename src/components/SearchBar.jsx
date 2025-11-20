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
                <h1 className={`hero-text-heading text-${inverseTheme}`}><span className="heroFirstText">Find</span> Your Next Home</h1>
                <p className={`hero-text-slogan text-${inverseTheme}`}>Believe in finding it with the UK's largest choice of homes</p>
                <form className={`sticky-top hero-searchbar-group search-form shadow-sm ${isRounded ? "rounded-pill" : "rounded"}`}>
                    <div className="display-flex flex-column justify-content-center">
                        <div className="input-group">
                            <span className="m-1 input-group-text material-symbols-rounded">cottage</span>
                            <input type="text" className=" m-1 form-control" placeholder="e.g. Bath, UB3, or Leeds" />
                            <button type="submit" className="m-1 rounded-pill btn search-btn d-flex justify-content-center align-items-center">
                                <span className="material-symbols-rounded">search</span>
                            </button>
                            <a className="open-map rounded-pill m-1 d-flex justify-content-center align-items-center" href="http://"><span className="material-symbols-rounded">map</span></a>
                            <button onClick={toggleRounded} type="button" className="m-1 rounded-pill d-flex justify-content-center align-items-center expand-search-bar" data-bs-toggle="collapse" data-bs-target="#expand-search-bar"><span className="material-symbols-rounded">{isRounded ? "keyboard_arrow_down" : "keyboard_arrow_up"}</span></button>
                        </div>
                        <div id="expand-search-bar" class="collapse">
                            <button>Search radius</button>
                            <button>Property types</button>
                            <button>No. of bedrooms</button>
                        </div>
                    </div>
                </form>
            </div>
            <h1 className="lol">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates excepturi hic, labore quidem consectetur perspiciatis impedit maxime. Velit, nesciunt esse libero aliquam est, dolor voluptatem minima possimus dignissimos eaque quisquam.</h1>
        </>
    );
}