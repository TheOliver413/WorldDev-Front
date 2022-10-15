import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCity, getAllServicesHotel, getLocations, getRooms } from '../../redux/action/action';
import './Filter.css'

function Filter() {
  const dispatch = useDispatch()
  const rooms = useSelector(state => state.reducerRoom.rooms)
  const servicesHotel = useSelector(state => state.reducerHotel.servicesHotel)
  const location = useSelector(state => state.reducerHotel.location)
  const [filterWindowVisibility, setFilterWindowVisibility] = useState(false)
  
  const handleFilterClick = () => setFilterWindowVisibility(filterWindowVisibility ? false : true)

  useEffect(()=> {
    dispatch(getRooms())
    dispatch(getAllServicesHotel())
    dispatch(getLocations())
  }, [dispatch])

  /* ================ */
  const [selectedInput, setSelectedInput] = useState([])
  const [estadolocal, setEstadolocal] = useState("")
  
  const handleFilterByRoom = (e) => {
    setSelectedInput({...selectedInput, [e.target.value]: e.target.checked})
  }

  const handleFilterByCity = (e) => {
    setEstadolocal(e.target.value)
  }

  const handleApply = (e) => {
    handleFilterClick()
    dispatch(filterByCity(estadolocal))
  }

  return (
    <>
    {/* BUTTON */}
      <div className='container'>
        <button onClick={handleFilterClick} style={{'width':'5.5em'}} className='btn py-2 px-8 filter-btn'>
          <div className='d-flex align-items-center justify-content-between'>
            Filter
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 22 20" fill="none">
              <path d="M0 16.6667C0 15.9292 0.595833 15.3333 1.33333 15.3333H3.6125C4.125 14.1542 5.3 13.3333 6.66667 13.3333C8.03333 13.3333 9.20833 14.1542 9.72083 15.3333H20C20.7375 15.3333 21.3333 15.9292 21.3333 16.6667C21.3333 17.4042 20.7375 18 20 18H9.72083C9.20833 19.1792 8.03333 20 6.66667 20C5.3 20 4.125 19.1792 3.6125 18H1.33333C0.595833 18 0 17.4042 0 16.6667ZM8 16.6667C8 15.9292 7.40417 15.3333 6.66667 15.3333C5.92917 15.3333 5.33333 15.9292 5.33333 16.6667C5.33333 17.4042 5.92917 18 6.66667 18C7.40417 18 8 17.4042 8 16.6667ZM16 10C16 9.2625 15.4042 8.66667 14.6667 8.66667C13.9292 8.66667 13.3333 9.2625 13.3333 10C13.3333 10.7375 13.9292 11.3333 14.6667 11.3333C15.4042 11.3333 16 10.7375 16 10ZM14.6667 6.66667C16.0333 6.66667 17.2083 7.4875 17.7208 8.66667H20C20.7375 8.66667 21.3333 9.2625 21.3333 10C21.3333 10.7375 20.7375 11.3333 20 11.3333H17.7208C17.2083 12.5125 16.0333 13.3333 14.6667 13.3333C13.3 13.3333 12.125 12.5125 11.6125 11.3333H1.33333C0.595833 11.3333 0 10.7375 0 10C0 9.2625 0.595833 8.66667 1.33333 8.66667H11.6125C12.125 7.4875 13.3 6.66667 14.6667 6.66667ZM8 2C7.2625 2 6.66667 2.59583 6.66667 3.33333C6.66667 4.07083 7.2625 4.66667 8 4.66667C8.7375 4.66667 9.33333 4.07083 9.33333 3.33333C9.33333 2.59583 8.7375 2 8 2ZM11.0542 2H20C20.7375 2 21.3333 2.59583 21.3333 3.33333C21.3333 4.07083 20.7375 4.66667 20 4.66667H11.0542C10.5417 5.84583 9.36667 6.66667 8 6.66667C6.63333 6.66667 5.45833 5.84583 4.94583 4.66667H1.33333C0.595833 4.66667 0 4.07083 0 3.33333C0 2.59583 0.595833 2 1.33333 2H4.94583C5.45833 0.820833 6.63333 0 8 0C9.36667 0 10.5417 0.820833 11.0542 2Z" fill="#201200"/>
            </svg>
          </div>
        </button>
      </div>


      {/* WINDOW */}
      {filterWindowVisibility && <div className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 '>
          <button onClick={handleFilterClick} type="button" className="btn align-self-end">x</button>
          <p>Filter by...</p>

          {/* <p>Type of room</p>
          {rooms?.map(r => (
            <div key={r.id} className="form-check">
              <input onChange={handleFilterByRoom} className="form-check-input" type="checkbox" value={r.name} />
              <label className="form-check-label">
                {r.name}
              </label>
            </div>
          ))}

          <p>Services</p>
          {servicesHotel?.map(s => (
            <div key={s.id} className="form-check">
              <input className="form-check-input" type="checkbox" value={s.name} />
              <label className="form-check-label">
                {s.name}
              </label>
            </div>
          ))}

          <p>Price</p>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="0-100" />
            <label className="form-check-label">
              0 - $100
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="100-200" />
            <label className="form-check-label">
              $100 - $200
            </label>
          </div> */}

          <p>City</p>
          <select onChange={handleFilterByCity} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select city--</option>
            {location.length && location.map(l => (
              <option value={l} key={l}>{l}</option>
            ))}
          </select>

          <button onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}

    </>
  );
}

export default Filter;