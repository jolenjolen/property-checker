import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import propertiesData from "../data/properties.json";
import Cards from "../components/Cards";
import { FilterProperties } from "../utils/FilterProperties";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    setResults(
      FilterProperties(propertiesData.properties, searchParams)
    );
  }, [searchParams]);

  return (
    <div className="container py-4">
      <SearchBar />
      <br />
      <h4>Search Results ({results.length})</h4>
      <Cards properties={results} />
    </div>
  );
}
