import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from '../../../redux/action/action';
import { filterBooksByHotel, getBooks }  from '../../../redux/action/actionStripe';
import './FilterStock.css'

function FilterStock() {
  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.reducerStripe.allBooks)
  const hotels = useSelector(state => state.reducerHotel.allHotels)
  
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
    dispatch(getBooks())
    dispatch(getHotels())
  }, [dispatch])

  const [estadolocal, setEstadolocal] = useState("")

  const handleFilterByHotel = (e) => {
    e.preventDefault()
    setEstadolocal(e.target.value)
  }

  const handleApply = (e) => {
    e.preventDefault()
    handleFilterClick(e)
    dispatch(filterBooksByHotel(estadolocal))
    setEstadolocal('')
    console.log('allBOOKKKK',allBooks)
  }

  const handleClearFilter = (e) => {
    e.preventDefault()
    dispatch(getBooks())
  }

  return (
    <>
      {/* FILTER BUTTON */}
      <div className="d-flex flex-column">
        <button onClick={(e)=>handleFilterClick(e)} style={{ 'width': '5.5em' }} className='btn btn-outline-primary btn-lg'>
          <div className='d-flex align-items-center justify-content-between'>
            Filter
            <i className="bi bi-sliders"></i>
          </div>
        </button>
        <small onClick={(e)=>handleClearFilter(e)} className='p-0' type='button'>Clear filter</small>
      </div>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={(e)=>handleFilterClick(e)} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          <p className='fs-5'>Filter by...</p>
          <p>Hotels</p>
          <select onChange={(e)=>handleFilterByHotel(e)} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select hotel--</option>            
            {hotels?.sort((a,b)=>{
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                                if(a.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1; 
                                return 0; }).map(e =>(
                      <option value={e.name} key={e.name}>{`${e.name}, ${(e.address)}`}</option>
                    ))}
             
          </select>

          <button id='applyBtn' onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}
    </>
  );
}

export default FilterStock;