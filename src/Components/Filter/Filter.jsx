import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterByCity, getLocations } from '../../redux/action/action';
import './Filter.css'

function Filter() {
  const dispatch = useDispatch()
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

  const [estadolocal, setEstadolocal] = useState("")

  const handleFilterByCity = (e) => {
    setEstadolocal(e.target.value)
  }

  const handleApply = (e) => {
    handleFilterClick(e)
    if (!estadolocal) return
    dispatch(filterByCity(estadolocal))
  }

  return (
    <>
      {/* FILTER BUTTON */}
      <div className="d-flex flex-column">
        <button onClick={handleFilterClick} className='filter-btn btn' type='button'>
          <div className='d-flex align-items-center justify-content-between'>
            Filter by city
            <i className="ms-2 bi bi-sliders"></i>
          </div>
        </button>
      </div>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={handleFilterClick} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          <p className='fs-5'>Filter by...</p>

          <p>City</p>
          <select onChange={handleFilterByCity} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select city--</option>
            {location.length && location.sort((a,b) => {
            if (a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
            if (a.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
            return 0;
          }).map(l => (
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