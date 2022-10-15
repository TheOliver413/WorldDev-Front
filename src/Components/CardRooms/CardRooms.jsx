import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRooms } from "../../redux/action/action";
import CardRoom from "../CardRoom/CardRoom";
import Loader from "../Loader/Loader";

function CardRooms() {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.reducerRoom.rooms);

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

  return (
    <>
      {rooms.length ?
        rooms.map((r) => (
          <CardRoom
            key={r.id}
            id={r.id}
            name={r.name}
            image={r.image}
            price={r.price}
            description={r.description}
          />
        )): <Loader />}
    </>
  );
}

export default CardRooms;
