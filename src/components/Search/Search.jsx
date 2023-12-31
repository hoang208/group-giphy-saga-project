import SearchItem from "../SearchItem/SearchItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Search() {
  const dispatch = useDispatch();
  const imageList = useSelector((store) => store.imageResultsReducer);
  const [newSearch, setNewSearch] = useState('');

  const getImages = () => {
    dispatch({ type: "GET_IMAGES"});
  };

  // useEffect(() => {
  //   getImages();
  // }, []);

  const handleSearchSubmit = (event) => {
    // console.log(newSearch);
    getImages();
    event.preventDefault();
    dispatch({ type: "GET_IMAGES", payload: newSearch});
    setNewSearch("");
  };

 
  return (
    <>
      <div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={newSearch}
            onChange={(event) => setNewSearch(event.target.value)}
          ></input>
          <button type="submit">Search!</button>
        </form>
          {imageList.map((image) => (
            <SearchItem
            key={image.id}
            id={image.id}
            url={image.images.original.url}
            getImages={getImages}
            />
          ))}
      </div>
    </>
  );
}
export default Search;
