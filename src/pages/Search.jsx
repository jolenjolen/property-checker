import { useState } from "react";
import SearchBar from "../components/SearchBar";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Search() {
  const [results, setResults] = useState(propertiesData.properties);

  const handleSearch = (filters) => {
    const filtered = propertiesData.properties.filter((p) => {
      return (
        (!filters.propertyType || p.type === filters.propertyType) &&
        (!filters.bedrooms || p.bedrooms === Number(filters.bedrooms[0])) &&
        (!filters.minPrice || p.price >= filters.minPrice) &&
        (!filters.maxPrice || p.price <= filters.maxPrice) &&
        (!filters.location || p.location.toLowerCase().includes(filters.location.toLowerCase()))
      );
    });

    setResults(filtered);
  };

  return (
    <div className="container py-4">
      <SearchBar onSearch={handleSearch} />
      <h2 className="mt-4">Search Results</h2>
      <Cards properties={results} />
    </div>
  );
}
