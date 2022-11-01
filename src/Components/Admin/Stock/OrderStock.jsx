import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getHotels } from '../../../redux/action/action';
import {  getBooks, orderBooksByDate, orderBooksByHotel }  from '../../../redux/action/actionStripe';
import './FilterStock.css'

function OrderStock() {
  const dispatch = useDispatch()
  const allBooks = useSelector(state => state.reducerStripe.allBooks)
  const hotels = useSelector(state => state.reducerHotel.allHotels)
  
  const [filterWindowVisibility, setFilterWindowVisibility] = useState(false)

  const handleOrderClick = (e) => {
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
  const [order, setOrder] = useState('')
  const [orderDate, setOrderDate] = useState('')

  const handleOrderByHotel = (e) => {
    setEstadolocal(e.target.value)
  }

  const handleApply = (e) => {
    handleOrderClick(e)
    dispatch(orderBooksByHotel(estadolocal))
    setOrder(estadolocal)
    setOrder('')
    dispatch(orderBooksByDate(estadolocal))
    setOrderDate(estadolocal)
    setOrder('')
    console.log('allBOOKKKK',allBooks)
  }

  const handleClearFilter = () => dispatch(getBooks())


  return (
    <>
      {/* FILTER BUTTON */}
      <div className="d-flex flex-column">
        <button onClick={handleOrderClick} style={{ 'width': '5.5em' }} className='btn btn-outline-primary btn-lg'>
          <div className='d-flex align-items-center justify-content-between'>
            Sort
            <i className="bi bi-sliders"></i>
          </div>
        </button>
        <small onClick={handleClearFilter} className='p-0' type='button'>Clear sort</small>
      </div>

      {/* WINDOW */}
      {filterWindowVisibility && <div id='background' onClick={handleOrderClick} className='filter-window-background'>
        <div className='filter-window d-flex flex-column align-items-start p-4 p-sm-5'>
          <p className='fs-5'>Sort by...</p>
          <select onChange={handleOrderByHotel} defaultValue='DEFAULT' className="form-select">
            <option value='DEFAULT' disabled>--select order--</option>            
                <option value='a-z' key='a-z'>Hotels A-Z</option>
                <option value='z-a' key='z-a'>Hotels Z-A</option> 
                <option value='asc' key='asc'>Check Asc </option>
                <option value='desc' key='desc'>Check Desc</option>             
          </select>

          <button id='applyBtn' onClick={handleApply} type="button" className="btn btn-primary mt-4">Apply</button>
        </div>
      </div>}
    </>
  );
}

export default OrderStock;