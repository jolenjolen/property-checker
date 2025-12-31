import "../App.css";
import { useTheme } from "../ThemeContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [type, setType] = useState("Any");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const [minBeds, setMinBeds] = useState("");
  const [maxBeds, setMaxBeds] = useState("");

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [postcodeArea, setPostcodeArea] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();

    if (query) params.set("q", query);
    if (type && type !== "Any") params.set("type", type);

    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);

    if (minBeds) params.set("minBeds", minBeds);
    if (maxBeds) params.set("maxBeds", maxBeds);

    if (dateFrom) params.set("dateFrom", dateFrom);
    if (dateTo) params.set("dateTo", dateTo);

    if (postcodeArea) params.set("postcode", postcodeArea.toUpperCase());

    navigate(`/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${isExpanded ? "rounded-4" : "rounded-pill"} hero-searchbar-group search-form shadow-sm`}
    >
      {/* MAIN BAR */}
      <div className="input-group">
        <input
          type="text"
          className="m-1 form-control"
          placeholder="Search anything (location, description, features...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button type="submit" className="m-1 rounded-pill btn search-btn">
          <span className="material-symbols-rounded">search</span>
        </button>

        <button
          type="button"
          className="m-1 rounded-pill expand-search-bar"
          onClick={() => setIsExpanded((p) => !p)}
        >
          <span className="material-symbols-rounded">
            {isExpanded ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          </span>
        </button>
      </div>

      {/* ADVANCED */}
      {isExpanded && (
        <div className="extra-search-options d-flex flex-wrap gap-2 p-2 justify-content-center">

          {/* TYPE */}
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option>Any</option>
            <option>House</option>
            <option>Flat</option>
            <option>Bungalow</option>
            <option>Terraced</option>
            <option>Semi-detached</option>
            <option>Detached</option>
          </select>

          {/* PRICE */}
          <input
            type="number"
            className="form-control"
            placeholder="Min £"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <input
            type="number"
            className="form-control"
            placeholder="Max £"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />

          {/* BEDROOMS */}
          <input
            type="number"
            className="form-control"
            placeholder="Min beds"
            value={minBeds}
            onChange={(e) => setMinBeds(e.target.value)}
          />

          <input
            type="number"
            className="form-control"
            placeholder="Max beds"
            value={maxBeds}
            onChange={(e) => setMaxBeds(e.target.value)}
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

          {/* POSTCODE */}
          <input
            type="text"
            className="form-control"
            placeholder="Postcode area (e.g. NW1)"
            value={postcodeArea}
            onChange={(e) => setPostcodeArea(e.target.value)}
          />
        </div>
      )}
    </form>
  );
}
