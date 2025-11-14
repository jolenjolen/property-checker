import "../App.css";
import { useTheme } from "../ThemeContext";

export default function SearchBar() {
    const { theme, toggleTheme } = useTheme();
    const inverseTheme = theme === "light" ? "dark" : "light";
    return(
        <>
            <div className={`hero hero-${theme} rounded-4 m-2 d-flex flex-column justify-content-center align-items-center text-${inverseTheme}`}>
                <h2>Find The Perfect Destination</h2>
                <p>Explore the vibrant beaches and embrace the serene countryside</p>
                <form className="search-form rounded-pill">
                    <div className="input-group">
                        <span className="m-1 input-group-text material-symbols-rounded">beach_access</span>
                        <input type="text" className=" m-1 form-control" placeholder="Whats on your mind?" />
                        <button type="submit" className="m-1 rounded-pill btn search-btn d-flex justify-content-center align-items-center">
                            <span className="material-symbols-rounded">search</span>
                        </button>
                        <a className="open-map rounded-pill m-1 d-flex justify-content-center align-items-center" href="http://"><span className="material-symbols-rounded">map</span></a>
                    </div>
                </form>
            </div>
        </>
    );
}