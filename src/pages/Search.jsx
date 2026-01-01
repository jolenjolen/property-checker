import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import PropertiesMap from "../components/PropertiesMap";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    /* ================= RAW PARAMS ================= */
    const textQuery = searchParams.get("location");
    const type = searchParams.get("type");
    const bedroomsParam = searchParams.get("bedrooms");
    const postcodeParam = searchParams.get("postcode");

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const dateFromParam = searchParams.get("dateFrom");
    const dateToParam = searchParams.get("dateTo");

    /* ================= NORMALISED VALUES ================= */
    const minPrice = minPriceParam ? Number(minPriceParam) : null;
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : null;

    const dateFrom = dateFromParam ? new Date(dateFromParam) : null;
    const dateTo = dateToParam ? new Date(dateToParam) : null;

    const tokens = textQuery
      ? textQuery.toLowerCase().split(/\s+/)
      : [];

    /* ================= INFERRED VALUES (ONLY IF DROPDOWNS EMPTY) ================= */

    const inferredBedrooms =
      !bedroomsParam
        ? tokens.find((t) => /^\d+$/.test(t))
        : null;

    const inferredType =
      !type
        ? [
            "flat",
            "house",
            "bungalow",
            "detached",
            "semi-detached",
            "terraced",
          ].find((t) => tokens.includes(t))
        : null;

    const inferredTenure = tokens.includes("leasehold")
      ? "Leasehold"
      : tokens.includes("freehold")
      ? "Freehold"
      : null;

    const inferredMaxPrice =
      !maxPrice
        ? (() => {
            const underIndex = tokens.indexOf("under");
            if (underIndex !== -1 && tokens[underIndex + 1]) {
              const num = Number(tokens[underIndex + 1]);
              return isNaN(num) ? null : num;
            }
            return null;
          })()
        : null;

    /* ================= FILTERING ================= */
    const filtered = propertiesData.properties.filter((p) => {
      /* ---------- PRICE ---------- */
      const maxPriceToCheck = maxPrice ?? inferredMaxPrice;
      if (minPrice !== null && p.price < minPrice) return false;
      if (maxPriceToCheck !== null && p.price > maxPriceToCheck) return false;

      /* ---------- TYPE ---------- */
      const typeToCheck = type || inferredType;
      if (
        typeToCheck &&
        p.type.toLowerCase() !== typeToCheck.toLowerCase()
      )
        return false;

      /* ---------- BEDROOMS ---------- */
      const bedroomsToCheck = bedroomsParam
        ? Number(bedroomsParam)
        : inferredBedrooms
        ? Number(inferredBedrooms)
        : null;

      if (bedroomsToCheck !== null) {
        if (bedroomsToCheck === 5) {
          if (p.bedrooms < 5) return false;
        } else {
          if (p.bedrooms !== bedroomsToCheck) return false;
        }
      }

      /* ---------- POSTCODE ---------- */
      if (postcodeParam) {
        const propertyPostcodeArea = p.location
          .trim()
          .split(" ")
          .slice(-1)[0]
          .toUpperCase();

        if (
          !propertyPostcodeArea.startsWith(postcodeParam.toUpperCase())
        )
          return false;
      }

      /* ---------- DATE ADDED ---------- */
      if (dateFrom || dateTo) {
        const propertyDate = new Date(
          `${p.added.month} ${p.added.day}, ${p.added.year}`
        );

        if (dateFrom && propertyDate < dateFrom) return false;
        if (dateTo && propertyDate > dateTo) return false;
      }

      /* ---------- TENURE (INFERRED) ---------- */
      if (inferredTenure && p.tenure !== inferredTenure) return false;

      /* ---------- FREE TEXT MATCH ---------- */
      if (tokens.length > 0) {
        const searchableText = `
          ${p.location}
          ${p.type}
          ${p.description}
          ${p.bedrooms} bedroom
          ${p.bedrooms} bedrooms
          ${p.tenure}
        `.toLowerCase();

        const tokenMatch = tokens.some((token) =>
          searchableText.includes(token)
        );

        if (!tokenMatch) return false;
      }

      return true;
    });

    setResults(filtered);
  }, [searchParams]);

  return (
    <div className="container py-4 d-flex flex-column align-items-center">
      <div style={{ maxWidth: "450px" }}>
        <SearchBar onOpenMap={() => setShowMap(true)} />
      </div>

      <div className="w-100">
        <h4 className="mt-5">
          Search Results ({results.length})
        </h4>
        <hr />
        <Cards properties={results} />
      </div>
      {showMap && (
        <PropertiesMap
          properties={results}
          onClose={() => setShowMap(false)}
        />
      )}
    </div>
  );
}
