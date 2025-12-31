import { Link } from "react-router-dom";
import appLogo from "/logo.png";
import "../App.css";
import { useTheme } from "../ThemeContext";
import propertiesData from "../data/properties.json";
import { useFavourites } from "../FavouritesContext";


export default function Nav() {
  const { favourites, removeFavourite } = useFavourites();

  const favProperties = propertiesData.properties.filter((p) =>
    favourites.includes(p.id)
  );
  const { theme, toggleTheme } = useTheme();

  const navbarTheme = theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark";
  const inverseTheme = theme === "light" ? "dark" : "light";
  return (
    <header className="sticky-top p-2">
      <nav className={`border border-1 border-secondary rounded-pill shadow-sm navbar navbar-expand-sm ${navbarTheme} bg-${theme}-blur`}>
        <div className="container-fluid">
          <Link className="navbar-brand d-flex justify-content-start align-items-center" to="/" height="50">
            <img className="rounded-pill" src={appLogo} alt="Logo" width="45" height="45" />
            &nbsp;
            <span>PROP80</span>
          </Link>

          <ul className="navbar-nav me-auto d-none d-md-flex">
            <li className="nav-item">
              <Link className="nav-link" to="/buy">Buy</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rent">Rent</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/agent">Agent</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="d-flex justify-content-end">
            <button data-bs-toggle="offcanvas" data-bs-target="#favourites" className={`favouriteBtn mx-2 d-flex justify-content-center align-items-center rounded-pill btn btn-danger`} title="View Your Favourites">
              <span className="material-symbols-rounded">
                favorite
              </span>
            </button>
            <button onClick={toggleTheme} className={`themeToggle d-flex justify-content-center align-items-center rounded-pill btn btn-${inverseTheme}`} title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}>
              <span className="material-symbols-rounded">
                {theme === "light" ? "dark_mode" : "light_mode"}
              </span>
            </button>
            <button
              data-bs-toggle="offcanvas"
              data-bs-target="#menuCanvas"
              className={`menuToggle mx-2 d-flex d-md-none justify-content-center align-items-center rounded-pill btn btn-${inverseTheme}`}
              title="Open the Hamburger menu"
            >
              <span className="material-symbols-rounded">
                menu
              </span>
            </button>
          </div>
          

        </div>
      </nav>
      <div className={`offcanvas offcanvas-end bg-${theme} text-${inverseTheme}`} id="favourites">
        <div className="offcanvas-header d-flex justify-content-between align-items-center">
          <h4 className="offcanvas-title">My Favourites</h4>
          <button data-bs-dismiss="offcanvas" className={`mx-1 closeFavourites d-flex justify-content-center align-items-center rounded-pill btn btn-${inverseTheme}`} title="Close Favourites"><span className="material-symbols-rounded">close</span></button>
        </div>
        <div className="offcanvas-body">

          {/* DELETE DROP ZONE */}
          <div
            className="fav-delete-zone mb-3"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const id = e.dataTransfer.getData("propertyId");
              if (id) removeFavourite(id);
            }}
          >
            <span className="material-symbols-rounded">
              delete
            </span>
            &nbsp;
            Drag here to remove
          </div>

          {favProperties.length === 0 && (
            <p className="text-muted text-center mt-4">
              No favourites yet.
            </p>
          )}

          {favProperties.map((property) => (
            <div
              key={property.id}
              className="d-flex align-items-center mb-3 p-2 rounded border fav-item"
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("propertyId", property.id);
                e.dataTransfer.effectAllowed = "move";
              }}
            >
              <img
                src={property.pictures?.[0]}
                width="60"
                height="60"
                className="rounded me-2 object-fit-cover"
                draggable={false}
                alt={property.type}
              />

              <div className="flex-grow-1 overflow-hidden">
                <div className="fw-semibold text-truncate">
                  £{property.price.toLocaleString()}
                </div>
                <small className="text-muted text-truncate d-block">
                  {property.location}
                </small>
              </div>

              {/* MOBILE / ACCESSIBLE REMOVE */}
              <button
                className="btn closeMenu btn-outline-danger ms-2 rounded-pill d-flex justify-content-center align-items-center"
                onClick={() => removeFavourite(property.id)}
                aria-label="Remove favourite"
              >
                <span className="material-symbols-rounded">
                  close_small
                </span>
              </button>
            </div>
          ))}
        </div>

      </div>
      <div className={`offcanvas offcanvas-end bg-${theme} text-${inverseTheme}`} id="menuCanvas">
        <div className="offcanvas-header d-flex justify-content-between align-items-center">
          <h4 className="offcanvas-title">Main Menu</h4>
          <button data-bs-dismiss="offcanvas" className={`mx-1 closeMenu d-flex justify-content-center align-items-center rounded-pill btn btn-${inverseTheme}`} title="Close Hamburger Menu"><span className="material-symbols-rounded">close</span></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/buy" data-bs-dismiss="offcanvas">Buy</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/rent" data-bs-dismiss="offcanvas">Rent</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/agent" data-bs-dismiss="offcanvas">Agent</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact" data-bs-dismiss="offcanvas">Contact</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
    
  );
}
