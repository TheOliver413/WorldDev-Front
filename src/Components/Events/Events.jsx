/*-------------IMPORTS----------- */
//import { Icon } from '@mui/material';
import {React, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents, getHotels } from '../../redux/action/action';

//----------AGREGAR FILTRO DE EVENTOS X FECHA-------//
//----------AGREGAR FILTRO DE EVENTOS X HOTELES-------//


export default function Events(){
    
    const dispatch = useDispatch();
    const eventos = useSelector(state=>state.reducerHotel.allEvents)
    const hoteles = useSelector((state)=>state.reducerHotel.allHotels)
    console.log("eventos para mostrar: ",eventos)
    //console.log("hoteles para mostrar: ",hoteles)
/*------------USEEFFECT--------- */    
    useEffect(() => {
      dispatch(getAllEvents())
    }, [dispatch])
    
    
    return(
        <div className="card" >
        {
         eventos?.map( (ele, i)=>{
            return(
                 
                <div className="row g-0">
                <div className="col-sm-4 mb-3">
                  <img src={ele.image} className="img-fluid rounded-start" alt={ele.image} />
                </div>
                <div className="col-sm-8 mt-1">
                      {/* <h5 > Hotel agua Marina, calle de agua 123, carlos Paz, cordoba. </h5> */}
                  <div className="card-body">
                      <h2 className="card-title col-sm-10">{ele.name}</h2>
                    <div className="row mb1">
                      <label>Date:</label>
                      <p className="card-text col-sm-2">{ele.date.substr(-30,10)}</p>
                      <p className="card-text col-sm-2">{ele.time} Hs</p>
                    </div>
                    <p className="card-text">{ele.description}</p>
                    <div className="d-grid gap-2 d-sm-block">
                      {/* <button className="btn btn-primary mt-4" type="button">Suscribe now</button> */}
                    </div>
                  </div>
                </div>
              </div>  

            )
         })   

        }
        </div>
    )
}

