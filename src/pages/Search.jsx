import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const location = searchParams.get("location");
    const type = searchParams.get("type");
    const bedrooms = searchParams.get("bedrooms");

    const minPriceParam = searchParams.get("minPrice");
    const maxPriceParam = searchParams.get("maxPrice");

    const minPrice = minPriceParam ? Number(minPriceParam) : null;
    const maxPrice = maxPriceParam ? Number(maxPriceParam) : null;

    const filtered = propertiesData.properties.filter((p) => {

      if (location && !p.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      if (type && p.type !== type) {
        return false;
      }

      if (bedrooms) {
        if (bedrooms === "Studio") {
          if (p.bedrooms !== 0) return false;
        } else if (bedrooms === "5+ Bedrooms") {
          if (p.bedrooms < 5) return false;
        } else {
          const count = Number(bedrooms);
          if (p.bedrooms !== count) return false;
        }
      }

      if (minPrice !== null && p.price < minPrice) return false;
      if (maxPrice !== null && p.price > maxPrice) return false;

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
