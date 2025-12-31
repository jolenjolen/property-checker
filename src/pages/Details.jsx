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
        <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
            <button className="nav-link active">Description</button>
        </li>
        <li className="nav-item">
            <button className="nav-link">Gallery</button>
        </li>
        <li className="nav-item">
            <button className="nav-link">Map</button>
        </li>
        </ul>

        <div className="tab-content">
        <div className="tab-pane fade show active">
            {/* description */}
        </div>

        <div className="tab-pane fade">
            {/* CAROUSEL PLACEHOLDER */}
            <div className="my-4">
                {/* IMAGE CAROUSEL */}
                <div
                id={`propertyCarousel-${property.id}`}
                className="carousel slide mb-4"
                data-bs-ride="carousel"
                >
                {/* INDICATORS */}
                <div className="carousel-indicators">
                    {property.pictures.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#propertyCarousel-${property.id}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                    />
                    ))}
                </div>

                {/* SLIDES */}
                <div className="carousel-inner rounded shadow-sm">
                    {property.pictures.map((img, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                        <img
                        src={img}
                        className="d-block w-100"
                        alt={`Property image ${index + 1}`}
                        style={{ height: "420px", objectFit: "cover" }}
                        />
                    </div>
                    ))}
                </div>

                {/* CONTROLS */}
                <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target={`#propertyCarousel-${property.id}`}
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" />
                </button>

                <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target={`#propertyCarousel-${property.id}`}
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" />
                </button>
                </div>


            </div>
        </div>

        <div className="tab-pane fade">
            {/* 👇 MAP GOES HERE */}
            {/* GOOGLE MAP */}
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
