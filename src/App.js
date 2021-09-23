/* eslint-disable no-unused-vars */
import Sidebar from "./components/sidebar/Sidebar";
import React, { useState } from 'react';
import Topbar from "./components/topbar/Topbar";
import "./app.css";
import Home from './pages/home/Home';
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import StartupUsers from "./pages/StartupUsers/StartupUsers";
import OtherUsers from "./pages/otherUsers/OtherUsers";
import Login from "./pages/Login/Login";



function App() {

  
    return(
     <div>
      <Router>   
      <div >
        <Switch>
            <Route exact path="/">
            <div className="login-container">
              <Login  />
            </div>  
            </Route>

          <Route path="/home">
            <Topbar />
            <div className="container">
              <Sidebar/>
              <Home />
            </div>
          </Route>

          <Route path="/users">
            <Topbar />
            <div className="container">
              <Sidebar/>
              <UserList />
            </div>
          </Route>

          <Route path="/user/:userId">
            <Topbar />
            <div className="container">
              <Sidebar/>
              <User />
            </div>
          </Route>

          <Route path="/newUser:userId">
            <Topbar />
            <div className="container">
              <Sidebar/>
              <NewUser />
            </div>
          </Route>

          <Route path="/products">
            <Topbar />
            <div className="container">
              <Sidebar/>
              <ProductList />
            </div>
          </Route>

          <Route path="/product /:productId">
            <Topbar />
            <div className="container">
              <Sidebar/>
              <User />
            </div> 
          </Route>

          <Route path="/startupusers/:userId">
            <Topbar />
            <div className="container">
              <Sidebar/>
              <StartupUsers />
            </div>
          </Route>

          <Route path="/otherUsers">
          <Topbar />
            <div className="container">
              <Sidebar/>
              <OtherUsers/>
            </div>
          </Route>
        </Switch>
      </div>  
      </Router>    
  </div>
  );
  }
 

export default App;
