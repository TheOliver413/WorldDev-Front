import React from "react";
import { Link } from "react-router-dom";
import { connect} from "react-redux";
import { getAllUsers, blocked } from "../../../redux/action/actionAuth";
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

 class UserTable extends React.Component {
  state = {
    info:{
      id:"",
      blocked:true
    },
    button:false,
    data: this.props.data,
    modalToUpdate: false,
    form: {
      user: "",
      email: "",
    },
  };

  showModalToUpdate = (dat) => {
    this.setState({
      form: dat,
      modalToUpdate: true,
    });
  };

  closeModalToUpdate = () => {
    this.setState({ modalToUpdate: false });
  };

  edit = (dat) => {
    var count = 0;
    var setting = this.state.data;
    setting.map((register) => {
      if (dat.id === register.id) {
        setting[count].user = dat.user;
        setting[count].email = dat.email;
      }
      count++;
    });
    this.setState({ data: setting, modalToUpdate: false });
  };

  delete = (dat) => {
    var option = window.confirm("Are you sure you want to Delete the item? "+dat.id);
    if (option === true) {
      var count = 0;
      var  setting = this.state.data;
      setting.map((register) => {
        if (dat.id === register.id) {
          setting.splice(count, 1);
        }
        count++;
      });
      this.setState({ data: setting, modalToUpdate: false });
    }
  };
 
   add= ()=>{
    var newValue= {...this.state.form};
    newValue.id=this.state.data.length+1;
    var list= this.state.data;
    if(typeof list.find(e => e.id === newValue.id) === 'object'){
      list.push(newValue);
      this.setState({ modalInsert: false, data: list });
    }  
  } 

   handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleBlockButton = (e) => {
    this.setState({
      button: true,
      info:{blocked:true,
      id:e.target.value} ,
      //data: {blocked:true}
    })
    this.props.blocked(this.state.info);
  }


  handleUnlockButton = (e) => {
    this.setState({
      button: false,
      info:{blocked:false,
      id:e.target.value}  ,
      //data: {blocked:false}
    })
    this.props.blocked(this.state.info);
    
    
  }

  componentDidMount() {
    this.props.getAllUsers();
  }

  componentWillUnmount = () => {
    
  }



  render() {
    
    return (
      <>
        <Link to= "/profileSuperAdmin/formsSuperAdmin">
            <button>
                Back
            </button>
        </Link>
        <div>
            <h1>User Table</h1>
        </div>
        <Container>
          <Table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data && this.state.data?.map((dat) => (
                <tr key={dat.id}>
                  <td>{dat.name}</td>
                  <td>{dat.email}</td>
                  <td>
{console.log("Data",this.state.data[0])}
                    <tr>
                      <Button outline color="danger" onClick={()=> this.delete(dat)}>Delete</Button>
                      {this.state.button === false? 
                      <Button value={dat.id} color="dark" onClick={(e)=>this.handleBlockButton(e)}>
                        Block
                      </Button> : 
                      <Button  value={dat.id} outline color="secondary" onClick={(e)=>this.handleUnlockButton(e)}>
                        Unlock
                      </Button>}
                    </tr>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalToUpdate}>
          <ModalHeader>
           <div><h3>Edit Register</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
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
                onChange={this.handleChange}
                value={this.state.form.user}//
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
                onChange={this.handleChange}
                value={this.state.form.email}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.edit(this.state.form)}
            >
              Done
            </Button>
            <Button
              color="danger"
              onClick={() => this.closeModalToUpdate()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsert}>
          <ModalBody>
            <FormGroup>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
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
                onChange={this.handleChange}
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
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export const mapStateToProps = state => ({
  data: state.reducerAuth.allUsers
}); 
export const mapDispatchToProps=(dispatch)=>{
  return {getAllUsers: () => dispatch(getAllUsers()),
          blocked: (info) => dispatch(blocked(info))}
}
export default connect(mapStateToProps, mapDispatchToProps)(UserTable);