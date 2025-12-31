import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const textQuery = searchParams.get("location");
    const type = searchParams.get("type");
    const bedroomsParam = searchParams.get("bedrooms");

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const minPrice = minPriceParam ? Number(minPriceParam) : null;
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : null;

    // Split free-text into searchable tokens
    const tokens = textQuery
      ? textQuery.toLowerCase().split(/\s+/)
      : [];

    const filtered = propertiesData.properties.filter((p) => {
      /* ================= PRICE ================= */
      if (minPrice !== null && p.price < minPrice) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;

      /* ================= DROPDOWNS (PRIORITY) ================= */
      if (type && p.type !== type) return false;

      if (bedroomsParam !== null) {
        const bedrooms = Number(bedroomsParam);
        if (bedrooms === 5) {
          if (p.bedrooms < 5) return false;
        } else {
          if (p.bedrooms !== bedrooms) return false;
        }
      }

      /* ================= FREE TEXT SEARCH ================= */
      if (tokens.length > 0) {
        const searchableText = `
          ${p.location}
          ${p.type}
          ${p.description}
          ${p.bedrooms} bedroom
          ${p.bedrooms} bedrooms
        `.toLowerCase();

        // Match if ANY token matches ANY field
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
    <div className="container py-4">
      <h2 className="mt-4">
        Search Results ({results.length})
      </h2>
      <Cards properties={results} />
    </div>
  );
}
