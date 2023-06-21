import { useEffect, useState } from 'react'
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUsers, getDetailUser, modifyUsers } from '../../../redux/action/actionAuth';

const EditUser = () => {
  const usersG = useSelector(state => state.reducerAuth.users)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { user } = useAuth()

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      dispatch(getDetailUser(user.uid))
    }
  }, [dispatch, user])


  const [inputU, setInputU] = useState({
    id: '',
    email: '',
    displayName: '',
    name: '',
    lastname: '',
    rol: 'user',
    photoURL: '',
    country: '',
    city: '',
    address: '',
    favorite: [],
    create: true,
  });

  function refreshPage() {
    window.location.reload()
    setTimeout(() => {
      window.location.reload(false);
    }, 50);
  }

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      setInputU({
        ...inputU,
        id: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        favorite: user.favorite
      })
    }
  }, [user])

  function handleChangeData(e) {
    e.preventDefault();
    setInputU({
      ...inputU,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // const {user} = useAuth()
    // let createUser= {
    //   id: user.uid,
    //   name: inputU.name,
    //   displayName: user.displayName,
    //   email: user.email,
    //   photoURL: user.photoURL,
    //   lastname: inputU.lastname,
    //   rol: 'user',
    //   country: inputU.country,
    //   city: inputU.city,
    //   address: inputU.address,
    //   create: true,
    // };
    if (inputU.create === true) {
      dispatch(modifyUsers(inputU))
      navigate('/profileusers')
      refreshPage()
    } else {
      dispatch(createUsers(inputU))
      navigate('/profileusers')
      refreshPage()
    }
    // }
    // setInputU({
    //   id: "",
    //   name: "",
    //   lastname: '',
    //   rol: 'user',
    //   country: '',
    //   city: '',
    //   address: ''
    // })
  }



  return (
    <>
      {usersG.rol === 'user' ? (
        <form onSubmit={handleSubmit}>
          <div className="profileUser-container d-flex flex-column gap-0 w-75 mx-auto my-4 card p-4 p-md-5" style={{ maxWidth: "600px" }}>
            <div className="d-flex flex-column flex-md-row align-items-md-center gap-4 mb-3 mb-md-4">
              {user?.photoURL
                ? <img src={user?.photoURL} alt={user?.displayName} />
                : <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
                    <path d="M124.688 120.062C117.781 108.062 104.812 100 90 100H70C55.1875 100 42.2188 108.062 35.3125 120.062C46.3125 132.312 62.25 140 80 140C97.75 140 113.688 132.281 124.688 120.062ZM160 80C160 124.188 124.188 160 80 160C35.8125 160 0 124.188 0 80C0 35.8125 35.8125 0 80 0C124.188 0 160 35.8125 160 80ZM80 85C92.4375 85 102.5 74.9375 102.5 62.5C102.5 50.0625 92.4375 40 80 40C67.5625 40 57.5 50.0625 57.5 62.5C57.5 74.9375 67.5625 85 80 85Z" fill="#56A5AF"/>
                  </svg>
              }
              <h2 className="overflow-auto col">Welcome, {user.displayName || inputU.name? user.displayName : user.email || inputU.name}</h2>
            </div>
            <div className="my-2">
              <label>Name</label>
              <input type="text" className="form-control" value={inputU.name} name='name' placeholder="Name" onChange={handleChangeData} />
            </div>
            <div className="my-2">
              <label>Lastname</label>
              <input type="text" className="form-control" value={inputU.lastname} name='lastname' placeholder="Lastname" onChange={handleChangeData} />
            </div>
            <div className="my-2">
              <label>Address</label>
              <input type="text" className="form-control" value={inputU.address} name='address' placeholder="1234 Main St" onChange={handleChangeData}/>
            </div>
            <div className="my-2">
              <label>City</label>
              <input type="text" className="form-control" value={inputU.city} name='city' placeholder='City...' onChange= {handleChangeData}/>
            </div>
            <div className="my-2">
              <label>Country</label>
              <input type="text" className="form-control" value={inputU.country} name='country' placeholder='Country...' onChange= {handleChangeData}/>
            </div>
            <button type="submit" className="btn btn-primary mt-4">Update</button>
          </div>
        </form>
      ) : (
        <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
      )}
    </>
  )
}

export default EditUser
