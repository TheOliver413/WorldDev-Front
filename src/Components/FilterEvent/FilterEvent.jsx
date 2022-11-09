import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterEventByDate, getAllEvents} from '../../redux/action/action';
//import './Filter.css'

function FilterEvent() {
  const dispatch = useDispatch()
  //const eventos = useSelector(state=>state.reducerHotel.allEvents)
  const cop_event = useSelector(state=>state.reducerHotel.copy_allEvents)
  const [filterWindowVisibility, setFilterWindowVisibility] = useState(false)

  const handleFilterClick = (e) => {
    if (!filterWindowVisibility) setFilterWindowVisibility(!filterWindowVisibility)
    //si tocas fuera de la ventana o tocas el apply btn se cierra
    else if (e.target.id === 'background' || e.target.id === 'applyBtn') setFilterWindowVisibility(!filterWindowVisibility)
  }

  useEffect(() => {
    dispatch(getAllEvents())
  }, [dispatch])

  const [estadolocal, setEstadolocal] = useState("")

  const handleFilterByDate = (e) => {
    e.preventDefault();
    setEstadolocal(e.target.value)
  }

  const handleApply = (e) => {
    handleFilterClick(e)
    dispatch(filterEventByDate(estadolocal))
  }

  const handleClearFilter = () => dispatch(getAllEvents())

  return (
    <>
      {/* FILTER BUTTON */}
      <div className="navfilters-order-filter d-flex flex-row gap-1 mx-auto mt-4" style={{maxWidth: '1190px'}}>
        <button onClick={handleFilterClick} className='filter-btn btn d-flex align-items-center justify-content-between' type='button'>
          Filter by date
          <i className="ms-2 bi bi-sliders"></i>
        </button>
        <button onClick={handleClearFilter} className='filter-btn btn' type='button'>Clear filters</button>
      </div>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={handleFilterClick} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          <p className='fs-5'>Filter date...</p>
          
          <select onChange={handleFilterByDate} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select date--</option>
            {cop_event.length && cop_event.sort((a,b) => {
              if(a.date.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.date.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
              if(a.date.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.date.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
              return 0; }).map(l => (
                <option value={l.date} key={l}>{l.date.substr(-30,10)}   {l.time.substr(-30,5)}hs</option>
            ))}
          </select>
          <button id='applyBtn' onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}
    </>
  );
}

export default FilterEvent;