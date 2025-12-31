import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import propertiesData from "../data/properties.json";

export default function Rent() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = propertiesData.properties.filter(
      (p) => p.tenure.toLowerCase() === "rent"
    );
    setResults(filtered);
  }, []);

  return (
    <div className="container py-4">
      <h1>Rent Properties</h1>
      <p>Browse available rental properties.</p>
      <hr />
      <Cards properties={results} />
    </div>
  );
}
