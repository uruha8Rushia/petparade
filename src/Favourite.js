import React, { createContext, useState, useContext, useEffect } from "react";

const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  // Fetch favourites for the logged-in user
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (!username) {
      setFavourites([]); // Clear favourites if no user is logged in
      return;
    }

    const fetchFavourites = async () => {
      try {
        const response = await fetch(`/api/favourites?username=${username}`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setFavourites(data); // Sync favourites with the backend
          } else {
            console.error("Invalid favourites format from backend");
            setFavourites([]); // Clear on invalid data
          }
        } else {
          console.error("Failed to fetch favourites");
          setFavourites([]); // Clear on failure
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setFavourites([]); // Clear on error
      }
    };

    fetchFavourites();
  }, []);

  // Add product to favourites
  const addToFavourites = async (product) => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("No username found in localStorage");
      return;
    }

    try {
      const response = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          action: "add",
          username,
          productId: product.id,
        }),
      });

      if (response.ok) {
        setFavourites((prev) => {
          if (prev.some((item) => item.id === product.id)) {
            console.warn("Product already in favourites");
            return prev; // Avoid duplicates
          }
          return [...prev, product];
        });
      } else {
        console.error("Failed to add to favourites");
      }
    } catch (error) {
      console.error("Error adding to favourites:", error);
    }
  };

  // Remove product from favourites
  const removeFromFavourites = async (productId) => {
    const username = localStorage.getItem("username");
    if (!username) {
      console.error("No username found in localStorage");
      return;
    }

    try {
      const response = await fetch("/api/favourites", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          action: "remove",
          username,
          productId,
        }),
      });

      if (response.ok) {
        setFavourites((prev) => prev.filter((item) => item.id !== productId));
      } else {
        console.error("Failed to remove from favourites");
      }
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  };

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        setFavourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouriteContext);
