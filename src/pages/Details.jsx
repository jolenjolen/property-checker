import { useParams } from "react-router-dom";
import propertiesData from "../data/properties.json";
import { useTheme } from "../ThemeContext";

export default function Details() {
  const { id } = useParams();
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";

  const property = propertiesData.properties.find(
    (p) => p.id === id
  );

  if (!property) {
    return (
      <div className="container py-5 text-center">
        <h3>Property not found</h3>
      </div>
    );
  }

  return (
    <div className={`container py-4 text-${inverseTheme}`}>
      <h2 className="mb-2">
        £{property.price.toLocaleString()}
      </h2>

      <p className="text-secondary">
        {property.bedrooms} bedroom {property.type} — {property.location}
      </p>

      {/* CAROUSEL PLACEHOLDER */}
      <div className="my-4">
        {/* You’ll add carousel here */}
      </div>

      <h5>Description</h5>
      <p>{property.description}</p>

      <ul className="list-unstyled mt-3">
        <li><strong>Tenure:</strong> {property.tenure}</li>
        <li>
          <strong>Date Added:</strong>{" "}
          {property.added.day} {property.added.month} {property.added.year}
        </li>
      </ul>
    </div>
  );
}
