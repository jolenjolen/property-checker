import "../App.css";
import { useFavourites } from "../FavouritesContext";

import { useTheme } from "../ThemeContext";
export default function Cards({ properties }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const { theme, toggleTheme } = useTheme();

  const navbarTheme = theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark";
  const inverseTheme = theme === "light" ? "dark" : "light";
  return (
    <div className="container">
      <div className="row g-4">
        {properties.map((property) => {
          const fav = isFavourite(property.id);

          return (
            <div className="col-md-4" key={property.id}>
              <div className={`card h-100 border-0 shadow-sm bg-${theme} text-${inverseTheme}`}>
                <img
                  src={property.picture}
                  className="card-img-top"
                  alt={property.type}
                />

                <div className="card-body d-flex flex-column">
                  <h5>£{property.price.toLocaleString()}</h5>

                  <p className="mb-1">
                    {property.bedrooms} bedroom {property.type}
                  </p>

                  <p className="text-muted small mb-3">
                    {property.location}
                  </p>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <a
                      href={property.url}
                      className={`btn btn-${inverseTheme}`}
                    >
                      View More
                    </a>

                    <button
                      className={`btn btn-sm ${
                        fav ? "text-danger" : "text-secondary"
                      }`}
                      onClick={() =>
                        fav
                          ? removeFavourite(property.id)
                          : addFavourite(property.id)
                      }
                      aria-label="Toggle favourite"
                    >
                      <span className="material-symbols-rounded">
                        favorite
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
