import React, { createContext, useState, useContext } from "react";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (product) => {
    if (!favourites.find((item) => item.id === product.id)) {
        console.log(`Adding ${product.name} to favourites`); // Debugging message
      setFavourites([...favourites, product]);
    }
  };

  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter((item) => item.id !== id));
  };

  return (
    <FavouriteContext.Provider value={{ favourites, addToFavourites, removeFromFavourites }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);
