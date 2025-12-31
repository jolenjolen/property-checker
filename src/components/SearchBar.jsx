import "../App.css";
import { useTheme } from "../ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";
  const navigate = useNavigate();

  /* ================= STATE ================= */

  const [query, setQuery] = useState("");
  const [type, setType] = useState("Any");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minBedrooms, setMinBedrooms] = useState("");
  const [maxBedrooms, setMaxBedrooms] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [postcode, setPostcode] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

  /* ================= OPTIONS ================= */

  const PROPERTY_TYPES = [
    "Any",
    "House",
    "Flat",
    "Bungalow",
    "Terraced",
    "Semi-detached",
    "Detached"
  ];

  /* ================= VALIDATION ================= */

  const isValidPostcodeArea = (value) =>
    /^[A-Z]{1,2}[0-9][0-9A-Z]?$/.test(value.toUpperCase());

  /* ================= SUBMIT ================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (type !== "Any") params.set("type", type);

    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    if (minBedrooms) params.set("minBedrooms", minBedrooms);
    if (maxBedrooms) params.set("maxBedrooms", maxBedrooms);

    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);

    if (postcode && isValidPostcodeArea(postcode)) {
      params.set("postcode", postcode.toUpperCase());
    }

    navigate(`/search?${params.toString()}`);
  };

  return (
    <div className={`hero hero-${theme} m-2 d-flex flex-column align-items-center`}>
      <h1 className={`hero-text-heading text-${inverseTheme}`}>
        <span className="heroFirstText">Find</span> Your Next Home
      </h1>

      <p className={`hero-text-slogan text-${inverseTheme}`}>
        Believe in finding it with the UK's largest choice of homes
      </p>

      <form
        onSubmit={handleSubmit}
        className={`${isExpanded ? "rounded-4" : "rounded-pill"} hero-searchbar-group shadow-sm`}
      >
        {/* ===== MAIN SEARCH ===== */}
        <div className="input-group">
          <span className="m-1 input-group-text material-symbols-rounded">
            cottage
          </span>

          <input
            type="text"
            className="m-1 form-control"
            placeholder="Town, city, or keyword"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            type="submit"
            className="m-1 rounded-pill btn search-btn"
          >
            <span className="material-symbols-rounded">search</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded((prev) => !prev)}
            className="m-1 rounded-pill expand-search-bar"
          >
            <span className="material-symbols-rounded">
              {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
            </span>
          </button>
        </div>

        {/* ===== ADVANCED SEARCH ===== */}
        <div className={`collapse ${isExpanded ? "show" : ""}`}>
          <div className="extra-search-options d-flex flex-wrap gap-3 mt-3">

            {/* TYPE */}
            <select
              className="form-select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            {/* PRICE */}
            <input
              type="number"
              className="form-control"
              placeholder="Min price (£)"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <input
              type="number"
              className="form-control"
              placeholder="Max price (£)"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />

            {/* BEDROOMS */}
            <input
              type="number"
              className="form-control"
              placeholder="Min bedrooms"
              value={minBedrooms}
              onChange={(e) => setMinBedrooms(e.target.value)}
            />

            <input
              type="number"
              className="form-control"
              placeholder="Max bedrooms"
              value={maxBedrooms}
              onChange={(e) => setMaxBedrooms(e.target.value)}
            />

            {/* DATE */}
            <input
              type="date"
              className="form-control"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />

            <input
              type="date"
              className="form-control"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />

            {/* POSTCODE AREA */}
            <input
              type="text"
              className="form-control"
              placeholder="Postcode area (e.g. NW1)"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
