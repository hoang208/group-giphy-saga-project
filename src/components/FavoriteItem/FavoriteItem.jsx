import { useDispatch } from "react-redux";
import Favorites from "../Favorites/Favorites";

function FavoriteItem(props) {
    const dispatch=useDispatch()

    const handleRadioChange = (event) => {
      console.log(event.target.value)
        dispatch({ type: "UPDATE_CATEGORY", payload: {id: props.id, category: event.target.value} });
      };
      
  return (
    <>
      <div>
        <img src={props.url} alt={props.url}></img>
        <div>
          <input type="radio" id="funny"  name={props.id} value="funny" onChange={handleRadioChange} />
          <label for="funny">Funny</label>
        </div>

        <div>
          <input type="radio" id="cute"  name={props.id} value="cute" onChange={handleRadioChange}/>
          <label for="cute">Cute</label>
        </div>

        <div>
          <input type="radio" id="awesome"  name={props.id} value="awesome" onChange={handleRadioChange}/>
          <label for="awesome">Awesome</label>
        </div>  
      </div>
    </>
  );
}
export default FavoriteItem;
