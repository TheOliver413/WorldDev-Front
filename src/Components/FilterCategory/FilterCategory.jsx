import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getHotels, filterHotelByCategory } from '../../redux/action/action';

function FilterCategory() {
  const dispatch = useDispatch()
  const [filterWindowVisibility, setFilterWindowVisibility] = useState(false)

  const handleFilterClick = (e) => {
    if (!filterWindowVisibility) setFilterWindowVisibility(!filterWindowVisibility)
    //si tocas fuera de la ventana o tocas el apply btn se cierra
    else if (e.target.id === 'background' || e.target.id === 'applyBtn') setFilterWindowVisibility(!filterWindowVisibility)
  }

  const [estadolocal, setEstadolocal] = useState("")

  const handleFilterByCategory = (e) => setEstadolocal(e.target.value)

  const handleApply = (e) => {
    handleFilterClick(e)
    dispatch(filterHotelByCategory(estadolocal))
  }

  const num = [1, 2, 3, 4, 5]

  const handleClearFilter = () => dispatch(getHotels())
  return (
    <>
      {/* FILTER BUTTON */}
      <div className="d-flex flex-column">
        <button onClick={handleFilterClick} style={{ 'width': '5.5em' }} className='btn btn-outline-primary btn-lg'>
          <div className='d-flex align-items-center justify-content-between'>
          ★
            <i className="bi bi-sliders"></i>
          </div>
        </button>
        <small onClick={handleClearFilter} className='p-0' type='button'>Clear filters</small>
      </div>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={handleFilterClick} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          <p className='fs-5'>Filter by...</p>

          <p>Category</p>
          <select onChange={handleFilterByCategory} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select category--</option>
            {num.map(n=>(
              <option key={n} value={n}>{n} ★</option>
            ))}
          </select>

          <button id='applyBtn' onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}
    </>
  );
}

export default FilterCategory;