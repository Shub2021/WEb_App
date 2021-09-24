import "./login.css"
import React, {useState} from "react"
import { Details } from "@material-ui/icons";
import { Link } from "react-router-dom";
import UserProfile from "./../../userAthontication"

export default function Login({Logininfo, error}) {

    

        const[data,setData] = useState({name: "" ,email: "" , password: ""});
        const submitHandler = e =>{
            e.preventDefault();

            // Logininfo(data);
        }

        const logginSubmit= () =>{

            fetch("https://startuphub2021.herokuapp.com/admin/login", {
                method: "post",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   email:data.email,
                   password:data.password,
                }),
              })
                .then((res) => res.json())
                .then((result) => {
              if (result.message === "Auth successful") {
                //   console.log(result);
                    localStorage.setItem("token",result.token);
                    window.location.assign("/home")

              }else{
                alert("Incorrect Email or Password");
              }
          });
          
        }
    
    return (
       <div  className="form-outer">
        <form className="form" onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="name" >Name</label>
                    <input type="text" name="name" id="name" onChange={e => setData({...data, name: e.target.value})} value={Details.name}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email" >Email</label>
                    <input type="email" name="email" id="email" onChange={e => setData({...data, email: e.target.value})} value={Details.email}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" >Password</label>
                    <input type="password" name="password" id="password" onChange={e => setData({...data, password: e.target.value})} value={Details.password}/>
                </div>
               
                <input onClick={logginSubmit} type="submit"   value="LOGIN"/> 
               
            </div>
        </form>
        </div>
    )
}
