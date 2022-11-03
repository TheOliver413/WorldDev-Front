import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCity, getHotels, /* getAllServicesHotel, */ getLocations/* , getRooms */ } from '../../redux/action/action';
import './Filter.css'

function Filter() {
  const dispatch = useDispatch()
  // const rooms = useSelector(state => state.reducerRoom.rooms)
  // const servicesHotel = useSelector(state => state.reducerHotel.servicesHotel)
  const location = useSelector(state => state.reducerHotel.location)
  const [filterWindowVisibility, setFilterWindowVisibility] = useState(false)

  const handleFilterClick = (e) => {
    if (!filterWindowVisibility) {
      setFilterWindowVisibility(!filterWindowVisibility)
    }
    //si tocas fuera de la ventana o tocas el apply btn se cierra
    else if (e.target.id === 'background' || e.target.id === 'applyBtn') {
      setFilterWindowVisibility(!filterWindowVisibility)
    }
  }

  useEffect(() => {
    // dispatch(getRooms())
    // dispatch(getAllServicesHotel())
    dispatch(getLocations())
  }, [dispatch])

  // const [selectedInput, setSelectedInput] = useState([])
  const [estadolocal, setEstadolocal] = useState("")

  /* const handleFilterByRoom = (e) => {
    setSelectedInput({...selectedInput, [e.target.value]: e.target.checked})
  } */

  const handleFilterByCity = (e) => {
    setEstadolocal(e.target.value)
  }

  const handleApply = (e) => {
    handleFilterClick(e)
    if (!estadolocal) return
    dispatch(filterByCity(estadolocal))
  }

  const handleClearFilter = () => dispatch(getHotels())

  return (
    <>
      {/* FILTER BUTTON */}
      <div className="d-flex flex-column">
        <button onClick={handleFilterClick} style={{ 'width': '5.5em' }} className='btn btn-outline-primary btn-lg'>
          <div className='d-flex align-items-center justify-content-between'>
            City
            <i className="bi bi-sliders"></i>
          </div>
        </button>
        <small onClick={handleClearFilter} className='p-0' type='button'>Clear filters</small>
      </div>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={handleFilterClick} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          {/* <button onClick={handleFilterClick} type="button" className="btn align-self-end">x</button> */}
          <p className='fs-5'>Filter by...</p>

          <p>City</p>
          <select onChange={handleFilterByCity} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select city--</option>
            {location.length && location.map(l => (
              <option value={l} key={l}>{l}</option>
            ))}
          </select>

          <button id='applyBtn' onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}
    </>
  );
}

export default Filter;