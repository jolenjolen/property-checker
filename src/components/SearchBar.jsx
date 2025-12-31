import "../App.css";
import { useTheme } from "../ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";
  const navigate = useNavigate();

  // Controlled form values
  const [location, setLocation] = useState("");

  // IMPORTANT: store VALUES, not labels
  const [propertyType, setPropertyType] = useState(null);
  const [bedrooms, setBedrooms] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [postcode, setPostcode] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  /* ================= OPTIONS ================= */

  
  // label shown in UI → value stored / sent
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
    ? PRICE_OPTIONS.filter(price => price > minPrice)
    : PRICE_OPTIONS;

  const [isExpanded, setIsExpanded] = useState(false);

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    if (bedrooms !== null) params.set("bedrooms", bedrooms);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (postcode) params.set("postcode", postcode);
    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);

    navigate(`/search?${params.toString()}`);
  };

  return (
    <>
      
        <form
          onSubmit={handleSubmit}
          className={`${isExpanded ? "rounded-4" : "rounded-pill"} hero-searchbar-group search-form shadow-sm`}
        >
          <div className="d-flex flex-column justify-content-center">

            {/* MAIN SEARCH BAR */}
            <div className="input-group">
              <span className="m-1 input-group-text material-symbols-rounded">
                cottage
              </span>

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

            {/* DROPDOWNS */}
            <div id="expand-search-bar" className="collapse">

              <div className="extra-search-options d-flex justify-content-center gap-2 mt-2 flex-wrap">

                {/* POSTCODE AREA */}
                <input
                  style={{ maxWidth: "150px" }}
                  type="text"
                  className="form-control rounded p-2 border"
                  placeholder="Postcode (e.g. BR1, NW1)"
                  value={postcode}
                  onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                />

                {/* PROPERTY TYPE */}
                <Dropdown
                  label="Property Types"
                  selected={
                    PROPERTY_OPTIONS.find(o => o.value === propertyType)?.label
                  }
                  options={PROPERTY_OPTIONS.map(o => o.label)}
                  onSelect={(label) => {
                    const match = PROPERTY_OPTIONS.find(o => o.label === label);
                    setPropertyType(match.value);
                  }}
                />

                {/* BEDROOMS */}
                <Dropdown
                  label="Bedrooms"
                  selected={
                    BEDROOM_OPTIONS.find(o => o.value === bedrooms)?.label
                  }
                  options={BEDROOM_OPTIONS.map(o => o.label)}
                  onSelect={(label) => {
                    const match = BEDROOM_OPTIONS.find(o => o.label === label);
                    setBedrooms(match.value);
                  }}
                />
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
                    setMaxPrice(null);
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
              {/* DATE ADDED */}
              <div className="extra-search-options d-flex justify-content-center align-items-center gap-2 m-2 flex-wrap">
                <input
                  placeholder="Date Added From"
                  style={{ maxWidth: "150px" }}
                  type="date"
                  className="form-control rounded p-2 border"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                />

                <span className="text-dark">-</span>

                <input
                  placeholder="Date Added To"
                  style={{ maxWidth: "150px" }}
                  type="date"
                  className="form-control rounded p-2 border"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                />
              </div>

            </div>
          </div>
        </form>
      
    </>
  );
}

/* ========= DROPDOWN (UNCHANGED UI) ========= */
function Dropdown({ label, selected, options, onSelect }) {
  return (
    <div className="dropdown">
      <button
        className="btn btn-light rounded p-2 dropdown-toggle"
        data-bs-toggle="dropdown"
      >
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
