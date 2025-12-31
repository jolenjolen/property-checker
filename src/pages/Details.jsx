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
        <ul className="nav nav-tabs mb-3" role="tablist">
            <li className="nav-item" role="presentation">
                <button
                className="nav-link active"
                id={`description-tab-${property.id}`}
                data-bs-toggle="tab"
                data-bs-target={`#description-${property.id}`}
                type="button"
                role="tab"
                aria-controls={`description-${property.id}`}
                aria-selected="true"
                >
                Description
                </button>
            </li>

            <li className="nav-item" role="presentation">
                <button
                className="nav-link"
                id={`gallery-tab-${property.id}`}
                data-bs-toggle="tab"
                data-bs-target={`#gallery-${property.id}`}
                type="button"
                role="tab"
                aria-controls={`gallery-${property.id}`}
                aria-selected="false"
                >
                Gallery
                </button>
            </li>

            <li className="nav-item" role="presentation">
                <button
                className="nav-link"
                id={`map-tab-${property.id}`}
                data-bs-toggle="tab"
                data-bs-target={`#map-${property.id}`}
                type="button"
                role="tab"
                aria-controls={`map-${property.id}`}
                aria-selected="false"
                >
                Map
                </button>
            </li>
        </ul>

        <div className="tab-content">
            {/* DESCRIPTION */}
            <div
                className="tab-pane fade show active"
                id={`description-${property.id}`}
                role="tabpanel"
                aria-labelledby={`description-tab-${property.id}`}
            >
                <p>{property.description}</p>
                <ul className="list-unstyled mt-3">
                <li><strong>Tenure:</strong> {property.tenure}</li>
                <li>
                    <strong>Date Added:</strong>{" "}
                    {property.added.day} {property.added.month} {property.added.year}
                </li>
                </ul>
            </div>

            {/* GALLERY */}
            <div
                className="tab-pane fade"
                id={`gallery-${property.id}`}
                role="tabpanel"
                aria-labelledby={`gallery-tab-${property.id}`}
            >
                {/* 🔁 YOUR CAROUSEL HERE */}
            </div>

            {/* MAP */}
            <div
                className="tab-pane fade"
                id={`map-${property.id}`}
                role="tabpanel"
                aria-labelledby={`map-tab-${property.id}`}
            >
                <div className="ratio ratio-16x9 rounded shadow-sm">
                <iframe
                    title="Property location"
                    src={`https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}&z=15&output=embed`}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
                </div>
            </div>
            </div>

      <h2 className="mb-2">
        £{property.price.toLocaleString()}
      </h2>

      <p className="text-secondary">
        {property.bedrooms} bedroom {property.type} — {property.location}
      </p>

      

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
