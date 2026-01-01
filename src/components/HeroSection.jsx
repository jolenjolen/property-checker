// src/components/HeroSection.jsx
import "../App.css";
import { useTheme } from "../ThemeContext";
import SearchBar from "./SearchBar";
import PropertiesMap from "./PropertiesMap";
import { useState } from "react";
import propertiesData from "../data/properties.json";

export default function HeroSection() {
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";
  const [showMap, setShowMap] = useState(false);

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

      <SearchBar onOpenMap={() => setShowMap(true)} />

      {showMap && (
        <PropertiesMap
          properties={propertiesData.properties}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}
