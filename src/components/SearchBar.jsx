import "../App.css";
import { useTheme } from "../ThemeContext";

export default function SearchBar() {
    const { theme, toggleTheme } = useTheme();

    return(
        <div className={`searchBarSection-${theme} container-fluid p-5 text-center`}>
            <div className="space"></div>
            <h1>My First Bootstrap Page</h1>
            <p>Resize this responsive page to see the effect!</p> 
        </div>
    );
}