import "../App.css";
import { useFavourites } from "../FavouritesContext";
import { useTheme } from "../ThemeContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

/* -----------------------------
   Lazy Image Component
-------------------------------- */
function LazyImage({ src, alt }) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "150px" }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={imgRef}
      className="card-img-top position-relative overflow-hidden rounded"
      style={{ height: "200px", background: "#e9ecef" }}
    >
      {!loaded && (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
          <div className="spinner-border text-secondary" />
        </div>
      )}

      {shouldLoad && (
        <img
          src={src}
          alt={alt}
          className="w-100 h-100 position-absolute top-0 start-0 object-fit-cover"
          onLoad={() => setLoaded(true)}
          style={{ display: loaded ? "block" : "none" }}
        />
      )}
    </div>
  );
}

/* -----------------------------
   Cards Component
-------------------------------- */
export default function Cards({ properties }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();
  const { theme } = useTheme();
  const inverseTheme = theme === "light" ? "dark" : "light";
  // ✅ ADD THIS BLOCK
  const sortedProperties = [...properties].sort((a, b) => {
    const dateA = new Date(`${a.added.month} ${a.added.day}, ${a.added.year}`);
    const dateB = new Date(`${b.added.month} ${b.added.day}, ${b.added.year}`);
    return dateB - dateA; // newest first
  });
  return (
    <div className="container-fluid">
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {sortedProperties.map((property) => {
          const fav = isFavourite(property.id);

          return (
            <div
              key={property.id}
              style={{ width: "320px" }}   // 🔒 fixed width
            >
              <div
                className={`card h-100 border-0 shadow-sm bg-${theme} text-${inverseTheme}`}
              >
                <LazyImage
                  src={property.pictures?.[0]}
                  alt={property.type}
                />

                <div className="card-body d-flex flex-column">
                  <h5 className="mb-1">
                    £{property.price.toLocaleString()}
                  </h5>

                  <p className="mb-1">
                    {property.bedrooms} bedroom {property.type}
                  </p>

                  <p className="text-secondary small mb-3">
                    {property.location}
                  </p>

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <a
                      to={`/properties/${property.id}`}
                      className={`btn btn-outline-${inverseTheme} btn-sm`}
                    >
                      View More
                    </a>

                    <button
                      className={`favouriteBtn btn btn-sm rounded-pill d-flex justify-content-center align-items-center ${
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
