import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterEventByDate, getAllEvents} from '../../redux/action/action';
//import './Filter.css'

function FilterEvent() {
  const dispatch = useDispatch()
  const eventos = useSelector(state=>state.reducerHotel.allEvents)
  const cop_event = useSelector(state=>state.reducerHotel.copy_allEvents)
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
    dispatch(getAllEvents())
  }, [dispatch])

  // const [selectedInput, setSelectedInput] = useState([])
  const [estadolocal, setEstadolocal] = useState("")

  /* const handleFilterByRoom = (e) => {
    setSelectedInput({...selectedInput, [e.target.value]: e.target.checked})
  } */

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
      <div className="d-flex flex-column">
        <button onClick={handleFilterClick} style={{ 'width': '5.5em' }} className='btn btn-outline-primary btn-lg'>
          <div className='d-flex align-items-center justify-content-between'>
            Filter
            <i className="bi bi-sliders"></i>
          </div>
        </button>
        <small onClick={handleClearFilter} className='p-0' type='button'>Clear filters</small>
      </div>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={handleFilterClick} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          <p className='fs-5'>Filter date...</p>
          
          <select onChange={handleFilterByDate} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select date--</option>
            {cop_event.length && cop_event.sort((a,b)=>{
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