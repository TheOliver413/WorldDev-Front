import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getHotels, filterHotelByCategory } from '../../redux/action/action';


function FilterCategory() {
  const dispatch = useDispatch()
  const hoteles = useSelector(state=>state.reducerHotel.hotels)
  console.log("info a renderizar: ", hoteles)
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
   dispatch(getHotels())
  }, [dispatch])


  const [estadolocal, setEstadolocal] = useState("")

  const handleFilterByCategory = (e) => {
    e.preventDefault();
    setEstadolocal(e.target.value)
  }

  const handleApply = (e) => {
    e.preventDefault();
    handleFilterClick(e)
    dispatch(filterHotelByCategory(estadolocal))
  }

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
          {/* <button onClick={handleFilterClick} type="button" className="btn align-self-end">x</button> */}
          <p className='fs-5'>Filter by...</p>

          <p>Category</p>
          <select onChange={handleFilterByCategory} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>Select . . .</option>
            {
                hoteles && hoteles?.map(ele=>{
                    return(
                        <option key={ele} value={ele.qualification} >{ ele.qualification } ★</option>
                    )
                })
            }

          </select>

          <button id='applyBtn' onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}
    </>
  );
}

export default FilterCategory;