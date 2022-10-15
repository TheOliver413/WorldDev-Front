import React from "react";
import { useSelector } from "react-redux";
import leftArrow from './arrow-left.svg'
import rightArrow from './arrow-right.svg'
import "./Pagination.css";

function Pagination({ hotels, hotelsPerPage, pages }) {
  const actualPage = useSelector(state => state.reducerPagination.actualPage)
  const minPageNumber = useSelector(state => state.reducerPagination.minPageNumber)
  const maxPageNumber = useSelector(state => state.reducerPagination.maxPageNumber)

  const arrPageNumbers = [];
  const nOfPages = Math.ceil(hotels.length / hotelsPerPage);
  for (let i = 1; i <= nOfPages; i++) arrPageNumbers.push(i);

  //condicion para q no rompa al querer volver a una pag q no existe
  const handlePrev = () => (actualPage-1) && pages(actualPage - 1)
  //condicion para q no rompa al querer avanzar a una pag q no existe
  const handleNext = () => (actualPage!==arrPageNumbers.length) && pages(actualPage + 1)

  return (
    <ul className='paginationContainer'>
      {/* prev */}
      <li className={actualPage === 1 ? 'pageNumberDISABLED' : 'pageNumber'} onClick={handlePrev}>
        <img className='arrow' src={leftArrow} alt='«'/>
      </li>
      
      {/* page n */}
      {arrPageNumbers.slice(minPageNumber, maxPageNumber).map((n) => 
        <li className={actualPage === n ? 'pageNumberACTIVE' : 'pageNumber'} onClick={() => pages(n)} key={n}>{n}</li>
      )}
      
      {/* next */}
      <li className={actualPage === arrPageNumbers.length ? 'pageNumberDISABLED' : 'pageNumber'} onClick={handleNext}>
        <img className='arrow' src={rightArrow} alt='»'/>
      </li>
    </ul>
  );
}

export default Pagination;