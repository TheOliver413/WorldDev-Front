/*-------------IMPORTS----------- */

import { React, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getHotels } from '../../redux/action/action';
import FilterEvent from '../FilterEvent/FilterEvent';
import { Link } from 'react-router-dom';


export default function Events() {

  const dispatch = useDispatch();
  const eventos = useSelector(state => state.reducerHotel.allEvents)
  const hoteles = useSelector((state) => state.reducerHotel.allHotels)

  /*------------USEEFFECT--------- */
  useEffect(() => {
    dispatch(getAllEvents())
    dispatch(getHotels())
  }, [dispatch])


  return (
    <div className="card" >
      <FilterEvent />
      {
        eventos && eventos?.map((ele) => {
          return (

            <div className="row g-0">
              <div className="col-sm-4 mb-3">
                <img src={ele.image} className="img-fluid rounded-start" alt={ele.image} />
              </div>
              <div className="col-sm-8 mt-1">
                {ele.Hotels?.map(ele => {
                  return (
                    <div>
                      <Link to={`/hotel/${ele.id}`} ><h5>{ele.name}</h5> </Link>
                    </div>
                  )})}

                <span>{ele.Hotels.map(ele => ele.address)}</span>,
                <span> {ele.Hotels.map(ele => ele.Locations.map(e => e.city))}</span>.
                <div>
                  <span> {ele.Hotels.map(ele => ele.Locations.map(e => e.department))}</span>,
                  <span>  {ele.Hotels.map(ele => ele.Locations.map(e => e.state))}</span>.
                </div>


                <div className="card-body">
                  <h3 className="card-title col-sm-10">{ele.name}</h3>
                  <div className="row mb1">
                    <p className="card-text col-sm-1">Date: </p>
                    <p className="card-text col-sm-2">{ele.date.substr(-30, 10)}</p>
                    <p className="card-text col-sm-2">{ele.time.substr(-30, 6)} Hs</p>
                  </div>
                  <p className="card-text">{ele.description}</p>
                  {/* <div className="d-grid gap-2 d-sm-block">
                      <button className="btn btn-primary mt-4" type="button">Suscribe</button>
                    </div> */}
                </div>
              </div>
            </div>
          )
        })

      }
    </div>
  )
}

