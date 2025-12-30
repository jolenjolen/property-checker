import "../App.css";
import { useTheme } from "../ThemeContext";
import GlareHover from '../ReactBits/GlareHover';

export default function Cards({ properties }) {
  const { theme } = useTheme();

  return (
    <div className="container">
      <div className="row g-4">
        {properties.map((property) => (
          <div className="col-md-4" key={property.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={property.picture}
                className="card-img-top"
                alt={property.type}
              />

              <div className="card-body">
                <h5 className="card-title">
                  £{property.price.toLocaleString()}
                </h5>

                <p className="card-text">
                  {property.bedrooms} bedroom {property.type}
                </p>

                <p className="text-muted small">
                  {property.location}
                </p>

                <a href={property.url} className="btn btn-primary btn-sm">
                  View Property
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
