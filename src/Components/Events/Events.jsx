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
    <div className='container'>
      <FilterEvent />

      <div>
        {
          eventos && eventos?.map((ele) => {
            return (
              <div className="card">
                <div className="row g-0">
                  <div className="col-sm-4">
                    <img src={ele.image} style={{ width: "100%", height: "100%", borderRadius: '2% 0% 0% 2%' }} alt={ele.image} />
                  </div>
                  <div className="col-sm-8 ">
                    {ele.Hotels?.map(ele => {
                      return (
                        <div className='card-header'>
                          <Link style={{ textDecoration: 'none' }} className='color' to={`/hotel/${ele.id}`} ><h5>{ele.name}</h5> </Link>
                        </div>
                      )
                    })}

                    <div className="card-body mb-5">
                      <h3 className="card-title col-sm-10">{ele.name}</h3>
                      <div className="row mb1">
                        <p className="card-text col-sm-1">Date: </p>
                        <p className="card-text col-sm-2">{ele.date.substr(-30, 10)}</p>
                        <p className="card-text col-sm-2">{ele.time.substr(-30, 6)} Hs</p>
                      </div>
                      <p className="card-text">{ele.description}</p>
                    </div>

                    <div className='card-footer text-muted'>
                      <span>{ele.Hotels.map(ele => ele.address)}</span>,
                      <span> {ele.Hotels.map(ele => ele.Locations.map(e => e.city))}</span>.
                      <span> {ele.Hotels.map(ele => ele.Locations.map(e => e.department))}</span>,
                      <span>  {ele.Hotels.map(ele => ele.Locations.map(e => e.state))}</span>.
                    </div>
                  </div>
                </div>
              </div>
            )
          })

        }
      </div>
    </div>
  )
}

