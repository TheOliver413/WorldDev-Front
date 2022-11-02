import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { getDetailUser } from "../../../redux/action/actionAuth";
import './ProfileUsers.css'

const ProfileUsers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const datos = useSelector((state) => state.reducerAuth.users);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.uid) dispatch(getDetailUser(user.uid));
  }, [dispatch, user]);

  return (
    <div className="profileUser-container d-flex flex-column gap-0 w-75 mx-auto my-4 card p-4 p-md-5" style={{ maxWidth: "600px" }}>
      <button aria-label="Edit profile" className='profileUser-edit-btn' onClick={() => navigate('/profileusers/EditUser')} type="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M19.7882 10.312L19.258 10.8423L18.1974 11.9028L8.57723 21.5227C8.26751 21.8324 7.8827 22.0624 7.46035 22.1844L1.44423 23.9535C1.05004 24.0708 0.622998 23.9629 0.332047 23.6672C0.0410958 23.3716 -0.0715306 22.954 0.0457885 22.5551L1.81496 16.5438C1.93697 16.1215 2.16692 15.7367 2.47664 15.427L12.0968 5.80712L13.1574 4.74659L13.6877 4.21632L15.2785 5.80712L18.1927 8.72124L19.7836 10.312H19.7882ZM4.50391 16.5814L4.06749 17.0178C4.02525 17.06 3.9924 17.1163 3.97363 17.1773L2.78636 21.213L6.82214 20.0258C6.88314 20.007 6.93946 19.9741 6.98169 19.9319L7.41812 19.4955H5.25476C4.84179 19.4955 4.50391 19.1576 4.50391 18.7447V16.5814ZM21.2712 0.879867L23.1201 2.72876C24.2933 3.90192 24.2933 5.80243 23.1201 6.97558L22.4397 7.65601L21.3791 8.71655L20.8488 9.24681L19.258 7.65601L16.3438 4.74189L14.7482 3.1511L15.2785 2.62083L16.3391 1.5603L17.0195 0.879867C18.1927 -0.293289 20.0933 -0.293289 21.2665 0.879867H21.2712Z" fill="#201200"/>
        </svg>
      </button>

      <div className="d-flex flex-column flex-md-row align-items-md-center gap-4 mb-3 mb-md-4">
        {user?.photoURL
          ? <img src={user?.photoURL} alt={user?.displayName} />
          : <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
              <path d="M124.688 120.062C117.781 108.062 104.812 100 90 100H70C55.1875 100 42.2188 108.062 35.3125 120.062C46.3125 132.312 62.25 140 80 140C97.75 140 113.688 132.281 124.688 120.062ZM160 80C160 124.188 124.188 160 80 160C35.8125 160 0 124.188 0 80C0 35.8125 35.8125 0 80 0C124.188 0 160 35.8125 160 80ZM80 85C92.4375 85 102.5 74.9375 102.5 62.5C102.5 50.0625 92.4375 40 80 40C67.5625 40 57.5 50.0625 57.5 62.5C57.5 74.9375 67.5625 85 80 85Z" fill="#56A5AF"/>
            </svg>
        }
        <h2 className="overflow-auto col">Welcome, {user?.displayName ? user?.displayName : datos.name}</h2>
      </div>
      
      <h4>Personal info</h4>
      <p className="my-1">Name: {datos.name}</p>
      <p className="my-1">Last name: {datos.lastname}</p>
      <p className="my-1">Address: {datos.address}</p>
      <p className="my-1">City: {datos.city}</p>
      <p className="my-1">Country: {datos.country}</p>

      <div className="d-flex flex-column gap-2 mt-3">
        <button
          onClick={() => navigate("/profileusers/bookingHistory")}
          type="button"
          className="btn btn-primary"
        >
          Booking history
        </button>
        <button
          onClick={() => navigate("/favorite")}
          type="button"
          className="btn btn-primary"
        >
          Favorites
        </button>
      </div>
    </div>
  );
};

export default ProfileUsers;
