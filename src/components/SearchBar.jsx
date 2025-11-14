import "../App.css";
import { useTheme } from "../ThemeContext";

export default function SearchBar() {
    const { theme, toggleTheme } = useTheme();
    const inverseTheme = theme === "light" ? "dark" : "light";
    return(
        <>
            <div className={`hero hero-${theme} rounded-4 m-2 d-flex flex-column justify-content-center align-items-center`}>
                <h2 className={`text-${inverseTheme}`}>Find Your Next Home</h2>
                <p className={`text-${inverseTheme}`}>Believe in finding it with the UK's largest choice of homes</p>
                <form className="search-form rounded-pill">
                    <div className="input-group">
                        <span className="m-1 input-group-text material-symbols-rounded">cottage</span>
                        <input type="text" className=" m-1 form-control" placeholder="e.g. Bath, UB3, or Leeds" />
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