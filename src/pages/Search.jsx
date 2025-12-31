import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const q = searchParams.get("q")?.toLowerCase() || "";
    const type = searchParams.get("type");

    const minPrice = Number(searchParams.get("minPrice"));
    const maxPrice = Number(searchParams.get("maxPrice"));

    const minBeds = Number(searchParams.get("minBeds"));
    const maxBeds = Number(searchParams.get("maxBeds"));

    const dateFrom = searchParams.get("dateFrom");
    const dateTo = searchParams.get("dateTo");

    const postcode = searchParams.get("postcode");

    const tokens = q.split(/\s+/).filter(Boolean);

    const filtered = propertiesData.properties.filter((p) => {
      /* PRICE */
      if (!isNaN(minPrice) && p.price < minPrice) return false;
      if (!isNaN(maxPrice) && p.price > maxPrice) return false;

      /* TYPE */
      if (type && p.type !== type) return false;

      /* BEDROOMS */
      if (!isNaN(minBeds) && p.bedrooms < minBeds) return false;
      if (!isNaN(maxBeds) && p.bedrooms > maxBeds) return false;

      /* DATE */
      const added = new Date(p.dateAdded);
      if (dateFrom && added < new Date(dateFrom)) return false;
      if (dateTo && added > new Date(dateTo)) return false;

      /* POSTCODE AREA */
      if (postcode) {
        const area = p.postcode?.split(" ")[0];
        if (area !== postcode) return false;
      }

      /* FREE TEXT – STRONG MATCH */
      if (tokens.length) {
        const haystack = `
          ${p.location}
          ${p.description}
          ${p.type}
          ${p.price}
          ${p.bedrooms}
          ${p.postcode}
        `.toLowerCase();

        const allMatch = tokens.every(t => haystack.includes(t));
        if (!allMatch) return false;
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
