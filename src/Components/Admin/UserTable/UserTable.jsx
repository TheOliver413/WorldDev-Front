import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, blocked, deleteUsers, getDetailUser } from "../../../redux/action/actionAuth";
import { useAuth } from "../../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
} from "reactstrap";
import { useEffect } from "react";

export default function UserTable() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allUsers = useSelector(state => state.reducerAuth.allUsers)
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    user: "",
    email: ""
  });
  const datos = useSelector(state => state.reducerAuth.users)
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.hasOwnProperty('uid')) {
      dispatch(getDetailUser(user.uid))
    }
  }, [user])

  const handleDelete = (e) => {
    const option = window.confirm("Are you sure you want to Delete the user " + e.target.value + "?")
    if (option === true) {
      dispatch(deleteUsers(e.target.id))
      setData([])
    }
  }

  const handleBlockButton = (e) => {
    const option = window.confirm("Are you sure you want to Block the user?")
    if (option === true) {
      dispatch(blocked({ id: e.target.value, blocked: true }))
      setData([])
      refreshPage()
    }
  }

  const handleUnlockButton = (e) => {
    const option = window.confirm("Are you sure you want to Unlock the user?")
    if (option === true) {
      dispatch(blocked({ id: e.target.value, blocked: true }))
      setData([])
      refreshPage()
    }
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, data])

  function refreshPage() {
    window.location.reload()
    setTimeout(() => {
      window.location.reload(false)
    }, 500)
  }

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
              <Container>
                <Table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Email</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allUsers && allUsers?.map((dat) => (
                      <tr key={dat.id}>
                        <td>{dat.name}</td>
                        <td>{dat.email}</td>
                        <td>{dat.rol}</td>
                        <td>
                          <tr>
                            <Button id={dat.id} value={dat.name} outline color="danger" onClick={(e) => handleDelete(e)}>Delete</Button>
                            {dat.blocked && dat.blocked === true ?
                              <Button value={dat.id} color="dark"
                                onClick={handleBlockButton}>
                                Block
                              </Button> :
                              <Button value={dat.id} outline color="secondary"
                                onClick={handleUnlockButton}
                              >
                                Unlock
                              </Button>}
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Container>
            </div>
          </div> : <button className="btn btn-primary mt-1 mx-5 my-4" type="button" onClick={() => navigate(-1)}>Unauthorized entry, Back</button>
      }
    </div>
  )
}