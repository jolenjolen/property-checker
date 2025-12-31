import "../App.css";
import { useTheme } from "../ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";
  const navigate = useNavigate();

  // Controlled state
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  /* ========= DROPDOWN OPTIONS (LABEL vs VALUE) ========= */

  const PROPERTY_OPTIONS = [
    { label: "House", value: "House" },
    { label: "Flat / Apartment", value: "Flat" },
    { label: "Bungalow", value: "Bungalow" },
    { label: "Terraced", value: "Terraced" },
    { label: "Semi-detached", value: "Semi-detached" },
    { label: "Detached", value: "Detached" }
  ];

  const BEDROOM_OPTIONS = [
    { label: "Studio", value: 0 },
    { label: "1 Bedroom", value: 1 },
    { label: "2 Bedrooms", value: 2 },
    { label: "3 Bedrooms", value: 3 },
    { label: "4 Bedrooms", value: 4 },
    { label: "5+ Bedrooms", value: 5 }
  ];

  const PRICE_OPTIONS = [
    50000, 75000, 100000, 150000, 200000,
    250000, 300000, 350000, 400000, 450000, 500000
  ];

  const filteredMaxOptions = minPrice
    ? PRICE_OPTIONS.filter(p => p > minPrice)
    : PRICE_OPTIONS;

  /* ========= SUBMIT ========= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType.value);
    if (bedrooms) params.set("bedrooms", bedrooms.value);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={`hero hero-${theme} m-2`}>
      <h1 className={`text-${inverseTheme}`}>Find Your Next Home</h1>

      <form onSubmit={handleSubmit} className="search-form shadow-sm rounded-4 p-3">
        {/* MAIN BAR */}
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Orpington, BR6"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <button type="submit" className="btn btn-primary">
            Search
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => setIsExpanded(prev => !prev)}
          >
            Filters
          </button>
        </div>

        {/* EXPANDED FILTERS */}
        {isExpanded && (
          <>
            <div className="d-flex gap-2 mt-3 flex-wrap">
              <Dropdown
                label="Property Type"
                selected={propertyType?.label}
                options={PROPERTY_OPTIONS}
                onSelect={setPropertyType}
              />

              <Dropdown
                label="Bedrooms"
                selected={bedrooms?.label}
                options={BEDROOM_OPTIONS}
                onSelect={setBedrooms}
              />
            </div>

            <div className="d-flex gap-2 mt-3 flex-wrap">
              <Dropdown
                label="Min Price"
                selected={minPrice ? `£${minPrice.toLocaleString()}` : null}
                options={PRICE_OPTIONS.map(p => ({
                  label: `£${p.toLocaleString()}`,
                  value: p
                }))}
                onSelect={(opt) => {
                  setMinPrice(opt.value);
                  setMaxPrice(null);
                }}
              />

              <Dropdown
                label="Max Price"
                selected={maxPrice ? `£${maxPrice.toLocaleString()}` : null}
                options={filteredMaxOptions.map(p => ({
                  label: `£${p.toLocaleString()}`,
                  value: p
                }))}
                onSelect={(opt) => setMaxPrice(opt.value)}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
}

/* ========= REUSABLE DROPDOWN ========= */

function Dropdown({ label, selected, options, onSelect }) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-light dropdown-toggle"
        data-bs-toggle="dropdown"
      >
        {selected || label}
      </button>

      <ul className="dropdown-menu">
        {options.map(opt => (
          <li key={opt.value}>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => onSelect(opt)}
            >
              {opt.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
