import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = searchParams.get("q");
    const type = searchParams.get("type");
    const postcode = searchParams.get("postcode");

    const minPrice = searchParams.get("minPrice")
      ? Number(searchParams.get("minPrice"))
      : null;

    const maxPrice = searchParams.get("maxPrice")
      ? Number(searchParams.get("maxPrice"))
      : null;

    const minBedrooms = searchParams.get("minBedrooms")
      ? Number(searchParams.get("minBedrooms"))
      : null;

    const maxBedrooms = searchParams.get("maxBedrooms")
      ? Number(searchParams.get("maxBedrooms"))
      : null;

    const dateFrom = searchParams.get("dateFrom")
      ? new Date(searchParams.get("dateFrom"))
      : null;

    const dateTo = searchParams.get("dateTo")
      ? new Date(searchParams.get("dateTo"))
      : null;

    const tokens = q ? q.toLowerCase().split(/\s+/) : [];

    const filtered = propertiesData.properties.filter((p) => {

      /* ===== FREE TEXT ===== */
      if (tokens.length > 0) {
        const searchable = `
          ${p.location}
          ${p.type}
          ${p.description}
        `.toLowerCase();

        if (!tokens.some(token => searchable.includes(token))) {
          return false;
        }
      }

      /* ===== TYPE ===== */
      if (type && p.type !== type) return false;

      /* ===== POSTCODE AREA ===== */
      if (postcode) {
        const propertyPostcode = p.location.split(" ")[0].toUpperCase();
        if (!propertyPostcode.startsWith(postcode)) return false;
      }

      /* ===== PRICE ===== */
      if (minPrice !== null && p.price < minPrice) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;

      /* ===== BEDROOMS ===== */
      if (minBedrooms !== null && p.bedrooms < minBedrooms) return false;
      if (maxBedrooms !== null && p.bedrooms > maxBedrooms) return false;

      /* ===== DATE ADDED ===== */
      if (dateFrom || dateTo) {
        const addedDate = new Date(
          p.added.year,
          p.added.month - 1,
          p.added.day
        );

        if (dateFrom && addedDate < dateFrom) return false;
        if (dateTo && addedDate > dateTo) return false;
      }

      return true;
    });

    setResults(filtered);
  }, [searchParams]);

  return (
    <div className="container py-4">
      <h4 className="mt-4">
        Search Results ({results.length})
      </h4>
      <hr />
      <Cards properties={results} />
    </div>
  );
}
