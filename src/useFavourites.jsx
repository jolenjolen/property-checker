import { useEffect, useState } from "react";
import propertiesData from "./data/properties.json";

export function useFavourites() {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist to localStorage
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

  return {
    favourites,
    favProperties,
    addFavourite,
    removeFavourite,
    isFavourite,
  };
}
