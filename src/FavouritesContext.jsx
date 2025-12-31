import { createContext, useContext, useEffect, useState } from "react";
import propertiesData from "./data/properties.json";

const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const removeFavourite = (id) => {
    setFavourites((prev) =>
      prev.filter((favId) => favId !== id)
    );
  };

  const isFavourite = (id) => favourites.includes(id);

  const favProperties = propertiesData.properties.filter((p) =>
    favourites.includes(p.id)
  );

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        favProperties,
        addFavourite,
        removeFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export function useFavourites() {
  const ctx = useContext(FavouritesContext);
  if (!ctx) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return ctx;
}
