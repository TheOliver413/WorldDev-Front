import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllServicesHotel } from '../../redux/action/action.js';

const ServicesHotel = () => {
  const dispatch = useDispatch();
  const services = useSelector(state => state.reducerHotel)

  useEffect( () => {
    dispatch(getAllServicesHotel())
  },[dispatch])

  return (
    <div>
      <h1>Whats this place offers</h1>
      { 
        services.map(({name, image, description}) => {
          return(
            <div>
              <h2>{name}</h2>
              <img src={image} alt='services'></img>
              <p>{description}</p>
            </div>
          )
        })
    }
  </div>
)
};

export default ServicesHotel;
