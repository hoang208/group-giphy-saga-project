import { useDispatch } from "react-redux";
import App from "../App/App";
import Search from "../Search/Search";
import { useState } from "react";
// import { useState } from "react";

function SearchItem(props) {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(true);
  const toggleClick = () => setClicked((value) => !value);

  const favoriteButton = () => {
    console.log("We Saved:", props.url);
    toggleClick();
    dispatch({ type: "ADD_FAVORITE", payload: { url: props.url } });
  };

  return (
    <>
      <div>
        <img src={props.url} alt={props.url}></img>

        {clicked ? (
          <button onClick={favoriteButton}>Favorite</button>
        ) : (
          <button onClick={favoriteButton} disabled>
            Favorite
          </button>
        )}
      </div>
    </>
  );
}
export default SearchItem;
