import "../App.css";
import { useTheme } from "../ThemeContext";
import { useState } from "react";

export default function SearchBar() {
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";

  // Controlled form values
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);

  // Dropdown options
  const RADIUS_OPTIONS = ["1 mile", "3 miles", "5 miles", "10 miles", "15+ miles"];
  const PROPERTY_OPTIONS = ["House", "Flat / Apartment", "Bungalow", "Terraced", "Semi-detached", "Detached"];
  const BEDROOM_OPTIONS = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4 Bedrooms", "5+ Bedrooms"];
  const PRICE_OPTIONS = [
    50000, 75000, 100000, 150000, 200000,
    250000, 300000, 350000, 400000, 450000, 500000
  ];
  const filteredMaxOptions = minPrice
    ? PRICE_OPTIONS.filter(price => price > minPrice)
    : PRICE_OPTIONS;
    const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault(); // prevents reload
    console.log({
      location,
      radius,
      propertyType,
      bedrooms,
      minPrice,
      maxPrice,
    });
  };

  const selectOption = (setter, value) => {
    setter(value);
  };

  return (
    <>
      <div className={`hero hero-${theme} rounded-4 m-2 d-flex flex-column justify-content-center align-items-center`}>
        <h1 className={`hero-text-heading text-${inverseTheme}`}>
          <span className="heroFirstText">Find</span> Your Next Home
        </h1>

        <p className={`hero-text-slogan text-${inverseTheme}`}>
          Believe in finding it with the UK's largest choice of homes
        </p>

        <form onSubmit={handleSubmit} className="hero-searchbar-group search-form shadow-sm rounded-4">
          <div className="d-flex flex-column justify-content-center">

            {/* MAIN SEARCH BAR */}
            <div className="input-group">
              <span className="m-1 input-group-text material-symbols-rounded">cottage</span>

              <input
                type="text"
                className="m-1 form-control"
                placeholder="e.g. Bath, UB3, or Leeds"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <button
                type="submit"
                className="m-1 rounded-pill btn search-btn d-flex justify-content-center align-items-center"
              >
                <span className="material-symbols-rounded">search</span>
              </button>

              <button
                type="button"
                className="open-map rounded-pill m-1 d-flex justify-content-center align-items-center"
              >
                <span className="material-symbols-rounded">map</span>
              </button>

              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                type="button"
                className="m-1 rounded-pill d-flex justify-content-center align-items-center expand-search-bar"
                data-bs-toggle="collapse"
                data-bs-target="#expand-search-bar"
              >
                <span className="material-symbols-rounded">
                  {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
                </span>
              </button>
            </div>

            {/* DROPDOWN SECTION */}
            <div id="expand-search-bar" className={`collapse ${/*isExpanded ? "show" : ""*/""}`}>
              
              <div className="extra-search-options d-flex justify-content-center gap-2 mt-2 flex-wrap">

                {/* RADIUS */}
                <Dropdown label="Search Radius" selected={radius} options={RADIUS_OPTIONS}
                  onSelect={(value) => selectOption(setRadius, value)} />

                {/* PROPERTY TYPE */}
                <Dropdown label="Property Types" selected={propertyType} options={PROPERTY_OPTIONS}
                  onSelect={(value) => selectOption(setPropertyType, value)} />

                {/* BEDROOMS */}
                <Dropdown label="Bedrooms" selected={bedrooms} options={BEDROOM_OPTIONS}
                  onSelect={(value) => selectOption(setBedrooms, value)} />

              </div>

              {/* PRICE RANGE */}
              <div className="extra-search-options d-flex justify-content-center align-items-center gap-2 m-2 flex-wrap">

                <Dropdown
                  label="Minimum"
                  selected={minPrice ? `£${minPrice.toLocaleString()}` : null}
                  options={PRICE_OPTIONS.map(p => `£${p.toLocaleString()}`)}
                  onSelect={(value) => {
                    const numeric = Number(value.replace(/[£,]/g, ""));
                    setMinPrice(numeric);
                    setMaxPrice(null); // reset max if min changes
                  }}
                />

                <span className="text-dark">-</span>

                <Dropdown
                  label="Maximum"
                  selected={maxPrice ? `£${maxPrice.toLocaleString()}` : null}
                  options={filteredMaxOptions.map(p => `£${p.toLocaleString()}`)}
                  onSelect={(value) => {
                    const numeric = Number(value.replace(/[£,]/g, ""));
                    setMaxPrice(numeric);
                  }}
                />


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


/* REUSABLE DROPDOWN COMPONENT */
function Dropdown({ label, selected, options, onSelect }) {
  return (
    <div className="dropdown">
      <button className="btn btn-light rounded p-2 dropdown-toggle" data-bs-toggle="dropdown">
        {selected || label}
      </button>

      <ul className="dropdown-menu">
        {options.map((item) => (
          <li key={item}>
            <button
              className="dropdown-item"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onSelect(item);
              }}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
