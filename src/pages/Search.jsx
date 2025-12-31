import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";
import SearchBar from "../components/SearchBar";
export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const dateFromParam = searchParams.get("dateFrom");
    const dateToParam = searchParams.get("dateTo");

    const dateFrom = dateFromParam ? new Date(dateFromParam) : null;
    const dateTo = dateToParam ? new Date(dateToParam) : null;
    const textQuery = searchParams.get("location");
    const type = searchParams.get("type");
    const bedroomsParam = searchParams.get("bedrooms");
    const postcodeParam = searchParams.get("postcode");

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const minPrice = minPriceParam ? Number(minPriceParam) : null;
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : null;

    const tokens = textQuery
      ? textQuery.toLowerCase().split(/\s+/)
      : [];

    const filtered = propertiesData.properties.filter((p) => {
      /* ================= PRICE ================= */
      if (minPrice !== null && p.price < minPrice) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;

      /* ================= TYPE ================= */
      if (type && p.type !== type) return false;

      /* ================= BEDROOMS ================= */
      if (bedroomsParam !== null) {
        const bedrooms = Number(bedroomsParam);
        if (bedrooms === 5) {
          if (p.bedrooms < 5) return false;
        } else {
          if (p.bedrooms !== bedrooms) return false;
        }
      }

      /* ================= POSTCODE AREA ================= */
      if (postcodeParam) {
        const propertyPostcodeArea = p.location
          .trim()
          .split(" ")
          .slice(-1)[0]
          .toUpperCase();
        if (!propertyPostcodeArea.startsWith(postcodeParam.toUpperCase())) {
          return false;
        }
      }
      /* ================= DATE ADDED ================= */
      if (dateFrom || dateTo) {
        const propertyDate = new Date(
          `${p.added.month} ${p.added.day}, ${p.added.year}`
        );

        if (dateFrom && propertyDate < dateFrom) return false;
        if (dateTo && propertyDate > dateTo) return false;
      }
      /* ================= FREE TEXT ================= */
      if (tokens.length > 0) {
        const searchableText = `
          ${p.location}
          ${p.type}
          ${p.description}
          ${p.bedrooms} bedroom
          ${p.bedrooms} bedrooms
        `.toLowerCase();

        const tokenMatch = tokens.some(token =>
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
      <div className="" style={{ maxWidth: "450px" }}>
        <SearchBar />
      </div>
      <div>
        <h4 className="mt-5">
          Search Results ({results.length})
        </h4>
        <hr />
        <Cards properties={results} />
      </div>
    </div>
  );
}
