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
    const minPrice = Number(searchParams.get("minPrice"));
    const maxPrice = Number(searchParams.get("maxPrice"));

    const filtered = propertiesData.properties.filter((p) => {
      if (location && !p.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      if (type && p.type !== type) {
        return false;
      }

      if (bedrooms) {
        const bedroomCount = bedrooms === "Studio" ? 0 : Number(bedrooms[0]);
        if (p.bedrooms !== bedroomCount) return false;
      }

      if (!isNaN(minPrice) && p.price < minPrice) {
        return false;
      }

      if (!isNaN(maxPrice) && p.price > maxPrice) {
        return false;
      }

      return true;
    });

    setResults(filtered);
  }, [searchParams]);

  return (
    <div className="container py-4">
      <SearchBar />
      <h2 className="mt-4">
        Search Results ({results.length})
      </h2>
      <Cards properties={results} />
    </div>
  );
}
