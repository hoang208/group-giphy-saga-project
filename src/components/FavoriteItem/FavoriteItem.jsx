import { useDispatch } from "react-redux";

function FavoriteItem(props) {
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: { id: props.id, category: event.target.value },
    });
  };

  const deleteFavorite = () => {
    dispatch({ type: "DELETE_FAVORITE", payload: { id: props.id } });
  };

  return (
    <>
      <div>
        <img src={props.url} alt={props.url}></img>
        <div>
          <input
            type="radio"
            id="funny"
            name={props.id}
            value="funny"
            onChange={handleRadioChange}
          />
          <label for="funny">Funny</label>
        </div>

        <div>
          <input
            type="radio"
            id="cute"
            name={props.id}
            value="cute"
            onChange={handleRadioChange}
          />
          <label for="cute">Cute</label>
        </div>

        <div>
          <input
            type="radio"
            id="awesome"
            name={props.id}
            value="awesome"
            onChange={handleRadioChange}
          />
          <label for="awesome">Awesome</label>
        </div>
      </div>
      <button onClick={deleteFavorite}>❌</button>
    </>
  );
}
export default FavoriteItem;
