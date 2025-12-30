import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Search() {
  const [results, setResults] = useState(propertiesData.properties);

  const handleSearch = (filters) => {
    const filtered = propertiesData.properties.filter((p) => {

      // LOCATION (LIKE %value%)
      if (filters.location &&
          !p.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      // PROPERTY TYPE
      if (filters.propertyType && p.type !== filters.propertyType) {
        return false;
      }

      // BEDROOMS
      if (filters.bedrooms) {
        const bedroomCount =
          filters.bedrooms === "Studio" ? 0 :
          Number(filters.bedrooms[0]);

        if (p.bedrooms !== bedroomCount) return false;
      }

      // PRICE MIN
      if (filters.minPrice && p.price < filters.minPrice) {
        return false;
      }

      // PRICE MAX
      if (filters.maxPrice && p.price > filters.maxPrice) {
        return false;
      }

      return true;
    });

    setResults(filtered);
  };

  return (
    <div className="container py-4">
      <SearchBar onSearch={handleSearch} />

      <h2 className="mt-4">
        Search Results ({results.length})
      </h2>

      <Cards properties={results} />
    </div>
  );
}
