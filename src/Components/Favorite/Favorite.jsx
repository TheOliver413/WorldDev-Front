import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { cleanFavorite, getFavorites } from "../../redux/action/favoriteAction";
import CardRoom from "../CardRoom/CardRoom";
import { useAuth } from "../../context/AuthContext";
import "./Favorite.css";

function Favorite() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { favorites } = useSelector((state) => state.reducerFavorite);

  useEffect(()=>{
    if(user && user.hasOwnProperty('uid')){
      dispatch(getFavorites(user.uid))
    }
   }, [user])
  const navigate= useNavigate()

  
  useEffect(() => {
    console.log('userfav', user)
    dispatch(getFavorites(user?.uid));
    dispatch(cleanFavorite())
  }, [dispatch, user?.uid]);

  return (
    <div className="favorite-container">
      {favorites.length && Array.isArray(favorites) ? (
        favorites.map((fav) => (
          <CardRoom
            key={fav.id}
            id={fav.id}
            name={fav.name}
            image={fav.image}
            price={fav.price}
            description={fav.description}
          />
        ))
      ) : (
        favorites.length 
          ? <h1 className="favorite-noFavs">{favorites}</h1>
          : <h1 className="favorite-noFavs">Loading favorites...</h1>
      )}
      <div>
      <dd>
        <button className="btn btn-primary mt-1" type="button" onClick={()=>navigate(-1)}>Back</button>
      </dd>
      </div>
    </div>
  );
}

export default Favorite;
