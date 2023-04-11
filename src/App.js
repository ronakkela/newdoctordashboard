import React from 'react';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Navbar from '../src/components/layout/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import NotFound from './components/pages/NotFound';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import User from './components/users/User';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

         <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={ <About />} />
          <Route exact path="/contact" element={ <Contact />} />
          <Route exact path="/users/add" element={ <AddUser />} />
          <Route exact path="/users/edit/:id" element={ <EditUser />} />
          <Route exact path="/users/:id" element={ <User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
