import { useEffect, useState } from "react";

const FAV_KEY = "favouriteProperties";

export function useFavourites() {
  const [favourites, setFavourites] = useState([]);

  // Load once
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(FAV_KEY)) || [];
    setFavourites(stored);
  }, []);

  // Persist
  useEffect(() => {
    localStorage.setItem(FAV_KEY, JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (id) => {
    setFavourites((prev) =>
      prev.includes(id) ? prev : [...prev, id]
    );
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((fav) => fav !== id));
  };

  const isFavourite = (id) => favourites.includes(id);

  return {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
  };
}
