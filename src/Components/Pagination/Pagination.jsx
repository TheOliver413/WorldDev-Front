import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActualPage } from "../../redux/action/action";
import "./Pagination.css";

function Pagination({ hotels, hotelsPerPage, pages }) {
  const actualPage = useSelector(state => state.reducerPagination.actualPage)
  const minPageNumber = useSelector(state => state.reducerPagination.minPageNumber)
  const maxPageNumber = useSelector(state => state.reducerPagination.maxPageNumber)
  const dispatch = useDispatch()

  const arrPageNumbers = [];
  const nOfPages = Math.ceil(hotels.length / hotelsPerPage);
  for (let i = 1; i <= nOfPages; i++) arrPageNumbers.push(i);

  //condicion para q no rompa al querer volver a una pag q no existe
  const handlePrev = () => (actualPage - 1) && pages(actualPage - 1)
  //condicion para q no rompa al querer avanzar a una pag q no existe
  const handleNext = () => (actualPage !== arrPageNumbers.length) && pages(actualPage + 1)

  const topPage = () => (dispatch(setActualPage(1)))
  const endPage = () => (dispatch(setActualPage(arrPageNumbers.length)))

  return (
    <ul className='paginationContainer'>
      {/* Vuelve al Principio */}
      <li className={actualPage === 1 ? 'pageNumberDISABLED' : 'pageNumber'} onClick={handlePrev}>
        <i class="bi bi-chevron-double-left"></i>
      </li>

      {/* prev */}
      <li className={actualPage === 1 ? 'pageNumberDISABLED' : 'pageNumber'} onClick={handlePrev}>
        <i class="bi bi-chevron-left"></i>
      </li>

      {/* page n */}
      {arrPageNumbers.slice(minPageNumber, maxPageNumber).map((n) =>
        <li className={actualPage === n ? 'pageNumberACTIVE' : 'pageNumber'} onClick={() => pages(n)} key={n}>{n}</li>
      )}

      {/* next */}
      <li className={actualPage === arrPageNumbers.length ? 'pageNumberDISABLED' : 'pageNumber'} onClick={handleNext}>
        <i class="bi bi-chevron-right"></i>
      </li>

      {/* va hasta el final */}
      <li className={actualPage === arrPageNumbers.length ? 'pageNumberDISABLED' : 'pageNumber'} onClick={endPage}>
        <i class="bi bi-chevron-double-right"></i>
      </li>
    </ul>
  );
}

export default Pagination;