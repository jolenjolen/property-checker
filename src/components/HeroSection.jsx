// src/components/HeroSection.jsx
import "../App.css";
import { useTheme } from "../ThemeContext";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";

  return (
    <div
      className={`hero hero-${theme} m-2 d-flex flex-column justify-content-center align-items-center`}
    >
      <h1 className={`hero-text-heading text-${inverseTheme}`}>
        <span className="heroFirstText">Find</span> Your Next Home
      </h1>

      <p className={`hero-text-slogan text-${inverseTheme}`}>
        Believe in finding it with the UK's largest choice of homes
      </p>

      <SearchBar onOpenMap={() => setShowMap(true)}/>
      {showMap && (
        <PropertiesMap
          properties={results}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}
