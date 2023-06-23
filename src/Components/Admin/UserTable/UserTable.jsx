import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, deleteUsers, getDetailUser } from "../../../redux/action/actionAuth";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "reactstrap";

export default function UserTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.reducerAuth.allUsers)
  const [data, setData] = useState([]);
  const datos = useSelector(state => state.reducerAuth.users)
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      dispatch(getDetailUser(user.uid))
    }
  }, [dispatch, user])

  const handleDelete = (e) => {
    const option = window.confirm("Are you sure you want to Delete the user " + e.target.value + "?")
    if (option === true) {
      dispatch(deleteUsers(e.target.id))
      setData([])
    }
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, data])

  return (
    <div>
      {
        datos.rol === 'superAdmin' || datos.rol === 'admin' ?
          <div className="container">
            <div className="row">
              {datos && datos?.rol === "superAdmin" ?
                <Link to="/profileSuperAdmin">
                  <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
                </Link> :
                <Link to="/profileAdmin">
                  <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
                </Link>}
              <table className="table table-striped" style={{ 'max-width': '1500px', 'margin-inline': 'auto' }}>
                <thead>
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Delete</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {allUsers && allUsers?.sort(function (a, b) {
                    if (a.email.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.email.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                    if (a.email.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.email.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                    return 0;
                  }).map((dat) => (
                    <tr key={dat.id}>
                      <td>{dat.name}</td>
                      <td>{dat.email}</td>
                      <td>{dat.rol}</td>
                      <td>
                        <tr>
                          <Button id={dat.id} value={dat.name} outline color="danger" onClick={(e) => handleDelete(e)}>
                            Delete
                          </Button>
                        </tr>
                        {/* {dat.blocked && dat.blocked === true ?
                              <Button value={dat.id} color="dark"
                                onClick={handleBlockButton}>
                                Block
                              </Button> :
                              <Button value={dat.id} outline color="secondary"
                                onClick={handleUnlockButton}
                              >
                                Unlock
                              </Button>} */}

                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div> : <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
      }
    </div>
  )
}