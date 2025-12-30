import { useFavourites } from "../useFavourites";
import "../App.css";
import { useTheme } from "../ThemeContext";
import GlareHover from '../ReactBits/GlareHover';

export default function Cards({ properties }) {
  const { addFavourite, removeFavourite, isFavourite } = useFavourites();

  return (
    <div className="container">
      <div className="row g-4">
        {properties.map((property) => {
          const fav = isFavourite(property.id);

          return (
            <div className="col-md-4" key={property.id}>
              <GlareHover 
                glareOpacity={0.3}
                glareAngle={-30}
                glareSize={300}
                transitionDuration={800}
                playOnce={false}
              >
                <div
                  className="card h-100 border-0"
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("propertyId", property.id)
                  }
                >
                  <img src={property.picture} className="card-img-top" />

                  <div className="card-body">
                    <h5>£{property.price.toLocaleString()}</h5>
                    <p>{property.bedrooms} bedroom {property.type}</p>

                    <div className="d-flex justify-content-between align-items-center">
                      <a href={property.url} className="btn btn-primary btn-sm">
                        View More
                      </a>

                      <button
                        className={`btn btn-sm ${fav ? "btn-danger" : "btn-outline-danger"}`}
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
              </GlareHover>
            </div>
          );
        })}
      </div>
    </div>
  );
}

