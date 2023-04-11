import React, {useState, useEffect} from 'react';
import  {useParams, Link} from 'react-router-dom';
import axios from "axios";


const User = () => {

  const [user, setUser] = useState({
    name: "",
    city: "",
    email: "",
    phone: "",
})


const {id} = useParams();

useEffect ( () => {
  loadUser();
}, []);

const loadUser =  async () => {
const userresult = await axios.get(`http://localhost:3003/users/${id}`)
setUser(userresult.data)
}


  return (
    <div className="container py-4">
    <Link className="btn btn-primary" to="/">
      Back to Home
    </Link>

    <h1 className="display-4">User Id: {id}</h1>

    <hr />
    <ul className="list-group w-50">
      <li className="list-group-item">Name: {user.name}</li>
      <li className="list-group-item">Email: {user.email}</li>
      <li className="list-group-item">Phone: {user.phone}</li>
      <li className="list-group-item">Website: {user.website}</li>
    </ul>
  </div>
  )
}

export default User;