import React, {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import {Link} from "react-router-dom";
import Pagination from './Pagination';
import { CSVLink } from "react-csv";

const headers = [
  { label: "Name", key: "name" },
  { label: "Phone", key: "phone" },
  { label: "Email", key: "email" },
  { label: "website", key: "website" },
];

const Home = () => {
  const [users, setUsers] = useState([])

  const [q, setQ] = useState("");
  const [searchParam] = useState(["name", "email"]);
  const [dataToDownload, setDataToDownload] = useState([]);

  const csvDownloadRef = useRef(0);


useEffect(()=> {
  loadUsers();
}, []);


const loadUsers = async () => {
  const result = await axios.get("http://localhost:3003/users");
  setUsers(result.data.reverse());
}


const fetchDataToDownload = ()=> {
  axios.get("http://localhost:3003/users").then(({data})=> {
    setDataToDownload(data.reverse());
    setTimeout(() => {
      csvDownloadRef.current.link.click();
    }, 500);
  })
 .catch((error) => alert("Somthing went Wrong"))
}

const deleteUser = async (id) => {
  await axios.delete(`http://localhost:3003/users/${id}`);
 loadUsers(); 
};

function search(items) {
  return items.filter((item) => {
      return searchParam.some((newItem) => {
          return (
              item[newItem]
                  .toString()
                  .toLowerCase()
                  .indexOf(q.toLowerCase()) > -1
          );
      });
  });
}

const [showPerPage, setShowPerPage] = useState(5);
const [pagination, setPagination] = useState({
  start: 0,
  end: showPerPage,
});

const onPaginationChange = (start, end) => {
  setPagination({ start: start, end: end });
};


return (
  <div className="container">
    <div className="py-4">
      <h1>Home Page</h1>

      <div className="wrapper" style={{ marginLeft: "45%"}}>
                    <div className="search-wrapper" >
                        <label htmlFor="search-form">
                            <input
                                type="search"
                                name="search-form"
                                id="search-form"
                                className="search-input"
                                placeholder="Search for..."
                                value={q}
                                onChange={(e) => setQ(e.target.value)} 
                            />
                        </label>
                    </div>
        </div>

      <div>
        <CSVLink
          headers={headers}
          data={dataToDownload}
          filename="Drdashboard.csv"
          className="hidden"
          ref={csvDownloadRef}
          target="_blank"
        />
        <button
          className="btn btn-primary mb-2"
          onClick={fetchDataToDownload}
          style={{ marginLeft: "89%" }}
        >
          Export Data
        </button>
      </div>


      <table className="table border shadow">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Sr. No</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone no</th>
            <th scope="col">website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody> 
          {search(users).slice(pagination.start, pagination.end).map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>
                <Link className="btn btn-primary m-2" to={`users/${user.id}`}>
                  View
                </Link>
                <Link
                  className="btn btn-outline-primary m-2"
                  to={`users/edit/${user.id}`}
                >
                  Edit
                </Link>
                
                <button
                  className="btn btn-danger"
                  onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
               
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={users.length}
        />
  </div>
);
}

export default Home;