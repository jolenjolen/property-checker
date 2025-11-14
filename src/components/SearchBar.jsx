import "../App.css";
import { useTheme } from "../ThemeContext";

export default function SearchBar() {
    const { theme, toggleTheme } = useTheme();

    return(
        <>
            <div className="space"></div>
            <div className={`hero hero-${theme} rounded-4 m-2 d-flex flex-column justify-content-center align-items-center`}>
                <h2>Find The Perfect Destination</h2>
                <p>Explore the vibrant beaches and embrace the serene countryside</p>
                <form className="search-form rounded-pill">
                    <div classname="input-group">
                        <span classname="m-1 input-group-text material-symbols-rounded">beach_access</span>
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