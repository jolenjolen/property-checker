import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Buy() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = propertiesData.properties.filter(
      (p) => p.tenure.toLowerCase() !== "rent"
    );
    setResults(filtered);
  }, []);

  return (
    <div className="container py-4">
      <h1>Buy Properties</h1>
      <p>Explore properties available for sale.</p>
      <hr />
      <Cards properties={results} />
    </div>
  );
}

