import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getHotels, orderBy } from "../../redux/action/action";

export default function Order() {
  const dispatch = useDispatch();
  const [, setOrder] = useState("");

  function handleSort(e) {
    e.preventDefault();
    if (e.target.value === "all") {
      dispatch(getHotels());
    } else {
      dispatch(orderBy(e.target.value));
      setOrder(`Ordenado ${e.target.value}`);
    }
  }

  return (
    <div className="input-group ps-5" id="navbarSupportedContent">
      <select className="form-select form-select-lg mb-3" onChange={(e) => handleSort(e)}>
        <option value="">Order By... </option>
        <option value="all">All Hotels</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
      </select>
    </div>
  );
}
