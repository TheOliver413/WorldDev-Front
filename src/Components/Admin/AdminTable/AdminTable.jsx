import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllAdmins } from "../../../redux/action/actionAuth";
import { useAuth } from "../../../context/AuthContext";
import { Button } from "reactstrap";
import { useEffect } from "react";

export default function AdminTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const allAdmins = useSelector(state => state.reducerAuth.allAdmins)
  const [data, setData] = useState([]);
  const [modalToUpdate, setModalToUpdate] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    hotel: ""
  });
  const { user } = useAuth()

  const datosTotal = useSelector(state => state.reducerAuth.users)

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      dispatch(getAllAdmins(user.uid))
    }
  }, [dispatch, user])

  const showModalToUpdate = (dat) => {
    setModalToUpdate(true);
    setForm(dat)
  };

  const handleDelete = (e) => {
    const option = window.confirm("Are you sure you want to Delete the admin " + e.target.value + "?")
    if (option === true) {
      dispatch(deleteUsers(e.target.id))
      setData([]);
    }
  }

  useEffect(() => {
    dispatch(getAllAdmins())
  }, [dispatch, data])

  return (
    <div>
      {
        datosTotal.rol === 'superAdmin' ?
          <div className="container">
            <div className="row">
              <Link to="/profileSuperAdmin">
                <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
              </Link>

                <table className="table table-striped" style={{ 'max-width': '1500px', 'margin-inline': 'auto' }}>
                  <thead>
                    <tr>
                      <th scope="col">Admin</th>
                      <th scope="col">Email</th>
                      <th scope="col">Hotel</th>
                      <th scope="col">Role</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {allAdmins?.sort(function (a, b) {
                      if (a.hotel?.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() > b.hotel?.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return 1;
                      if (a.hotel?.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() < b.hotel?.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()) return -1;
                      return 0;
                    }).map((dat) => (
                      <tr key={dat.id}>
                        <td>{dat.name}</td>
                        <td>{dat.email}</td>
                        <td>{dat.hotel}</td>
                        <td>{dat.rol}</td>
                        <td>
                          <tr>
                            <Link to="/profileSuperAdmin/editAdmin/:id">
                              <Button outline color="info" onClick={() => showModalToUpdate(dat)}>
                                Edit
                              </Button>
                            </Link>

                          </tr>
                        </td>
                        <td>
                          <tr>
                            <Button outline color="danger" id={dat.id} value={dat.name} onClick={(e) => handleDelete(e)}>
                              Delete
                            </Button>
                          </tr>
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