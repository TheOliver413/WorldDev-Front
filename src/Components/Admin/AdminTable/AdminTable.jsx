import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUsers, getAllAdmins } from "../../../redux/action/actionAuth";
import { useAuth } from "../../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import { useEffect } from "react";

export default function AdminTable() {
  const dispatch = useDispatch();
  const allAdmins = useSelector(state =>state.reducerAuth.allAdmins)
  const [data, setData] = useState([]);
  const [modalToUpdate, setModalToUpdate] = useState(false);
  const [form , setForm] = useState({
    name:"",
    email:"",
    hotel:""
  });
  const datos= useSelector(state => state.reducerAuth.Alladmins)
  const {user} = useAuth()

  const handleChange = (e) => {
    setForm({...form,[e.target.name]: e.target.value});
  };

  useEffect(()=>{
    if(user && user.hasOwnProperty('uid')){
      dispatch(getAllAdmins(user.uid))
    }
   }, [user])

   const showModalToUpdate = (dat) => {
    setModalToUpdate(true);
    setForm(dat)
  }; 

  const handleDelete = (e) => {
    const option = window.confirm("Are you sure you want to Delete the admin " + e.target.value + "?")
    if (option === true) {
    dispatch(deleteUsers(e.target.id))
    setData([]);}
  }
  
    useEffect(() => {
      dispatch(getAllAdmins())
    }, [dispatch,data])

    console.log("datos:",datos)
    return (
      <div className="container">
        <div className="row">
      <Link to= "/profileSuperAdmin">
      <dd><button className="btn btn-primary mt-1" type="button">Back</button></dd>
      </Link>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Admin</th>
              <th>Email</th>
              <th>Hotel</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allAdmins && allAdmins?.map((dat) =>(
              <tr key={dat.id}>
                <td>{dat.name}</td>
                <td>{dat.email}</td>
                <td>{dat.hotel}</td>
                <td>{dat.rol}</td>
                <td>
                  <tr>
                    <Link to="/profileSuperAdmin/editAdmin/:id">
                    <Button
                      color="primary"
                      onClick={() => showModalToUpdate(dat)}
                    >
                      Edit
                    </Button>
                    </Link>
                    
                  </tr>
                  </td>
                  <td>
                  <tr>
                  <Button  id={dat.id} value={dat.name} outline color="danger" onClick={(e)=>handleDelete(e)}>Delete</Button>
                  </tr>
                  </td>
              </tr>     
            ))}
          </tbody>
        </Table>
      </Container>
     {/*  <Modal isOpen={modalToUpdate}>
          <ModalHeader>
           <div><h3>Edit Register</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                User: 
              </label>
              <input
                className="form-control"
                name="user"
                type="text"
                onChange={handleChange}
                value={form.user}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Email: 
              </label>
              <input
                className="form-control"
                name="email"
                type="text"
                onChange={handleChange}
                value={form.email}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
           <Link>
            <Button
              color="primary"
              onClick={() => handleClickEdit(form)}
            >
              Done
            </Button>
           </Link>
            <Button
              color="danger"
              onClick={() => closeModalToUpdate()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal> */}
      </div>
    </div>
  )
}