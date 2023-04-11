import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom";


const AddUser = () => {

  const navigate = useNavigate();

  const [users, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
  })


  const {name, website, email,phone} = users;
  
  const onInputChange = (e)=> {
    setUser({...users, [e.target.name]: e.target.value})

  }

  const onSubmit = async(e)=> {
    e.preventDefault();
      await axios.post("http://localhost:3003/users", users)
      navigate("/")
  }

  return (
    <div className="container">
    <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add Patient Details</h2>

        <form onSubmit={e => onSubmit(e)}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Name"
                    name="name"
                    value={name}
                    onChange={e => onInputChange(e)}
                />
            </div>
         
            <div className="form-group">
                <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Enter Your E-mail Address"
                    name="email"
                    value={email}
                    onChange={e => onInputChange(e)}
                />
            </div>
            <div className="form-group">
                <input
                    type="number"
                    className="form-control form-control-lg"
                    placeholder="Enter Your Phone Number"
                    name="phone"
                    value={phone}
                    onChange={e => onInputChange(e)}
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Enter Your website"
                    name="website"
                    value={website}
                    onChange={e => onInputChange(e)}
                />
            </div>

            <button className="btn btn-primary btn-block">Add User Detils</button>
        </form>
    </div>
</div>
  )
}

export default AddUser