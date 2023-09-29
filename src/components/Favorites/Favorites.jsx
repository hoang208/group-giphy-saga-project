import App from "../App/App";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import FavoriteItem from "../FavoriteItem/FavoriteItem";

function Favorites() {
  const dispatch = useDispatch();
  const favoritesList = useSelector((store) => store.favoritesReducer);
  console.log(favoritesList)

  const getFavorites = () => {
    dispatch({ type: "GET_FAVORITES"});
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (

    <>
      <div>
          {favoritesList.map((favorite) => (
            <FavoriteItem
            key={favorite.id}
            id={favorite.id}
            url={favorite.url}
            />
          ))}
      </div>
    </>
  );
}
export default Favorites;
