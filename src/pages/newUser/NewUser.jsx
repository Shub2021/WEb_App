import { TextField } from "@material-ui/core"
import "./newUser.css"
import Urls from "../../constant";
// import { Alert } from 'react-alert';
import React, { useState, useEffect } from "react";
import { Link,useParams } from "react-router-dom";

export default function NewUser() {

    const {userId} = useParams();
    const [Description, setDescription] = useState("");
    const [Type, setType] = useState("");
    const [Categoty, setCategoty] = useState("");
    
    const [loading,setloading] = useState(true);

    const getData = ()=>{

        var token = "";
        token = localStorage.getItem("token");
        // console.log(token);

        if(token === null){
            window.location.assign("/"); 
        }else{
            setloading(false);
        }
      }
      
      useEffect(() => {
          getData();

        }, []);

    const submitData = () => {
        
        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth();
        const year = d.getFullYear();
        const paymentDate = year + "-" + month + "-" + date;

    
        fetch( "http://localhost:3008/admincomplain/", {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Service_name,
            // Service_type,
            // picture,
            // unitprice,
            // quantity,
            placed_date:paymentDate,
            complian_Category:Categoty,
            type:Type,
            description:Description,
            br_number:userId,
            // company_category,
          }),
        })
          .then((res) => res.json())
          .then((item) => {
            // Alert.alert( "is successfuly added");
            //props.navigation.navigate("packageCard",{item});
            // props.navigation.navigate("ServiceCard");
          });
      };

    return (
        <>
        {loading ? (
            <></>
        ):(
            <div className="newUser">
            <h1 className="newUserTitle">Complain</h1>
            <form id="form1" >
                <div className="newUserForm">
                    <div className="newUserItem">    
                        <label>Type</label>
                        <select 
                            className="newUserSelect" 
                            name="active" 
                            id="active"
                            value={Type}
                            onChange={e => setType(e.target.value)}
                        >
                            <option value="Warning">Warning</option>
                            <option value="Reminder">Reminder</option>
                        </select>
                    </div>
                    <div className="newUserItem">    
                        <label>Complain Category</label>
                        <select 
                            className="newUserSelect" 
                            name="active" 
                            id="active"
                            value={Categoty}
                            onChange={e => setCategoty(e.target.value)}
                            >
                            <option value="Annual Payment">Annual Payment</option>
                            <option value="Annual ">Annual Payment</option>
                            <option value=" Payment">Annual Payment</option>
                        </select>
                    </div>
                </div>
                <div className="newUserForm">
                    <div className="newUserItem">
                        <label>Description</label>
                        <textarea
                        value={Description}
                        onChange={e => setDescription(e.target.value)}
                        style={{width:672}}
                            rows={10}
                            cols={10}
                        />
                    </div>
                    {/* <div className="newUserItem">
                        <label>Email</label>
                        <input type="text" placeholder="hiru@gmail.com" />
                    </div> */}
                    {/* <div className="newUserItem">
                        <label>Gender</label>
                        <div className="newUserGender">
                            <input type="radio" name="gender" id="male" value="male" />
                            <label for="male">Male</label>
                            <input type="radio" name="gender" id="female" value="female" />
                            <label for="female">Female</label>
                        </div>
                    </div>    
                    <div className="newUserItem">    
                        <label>Active</label>
                        <select className="newUserSelect" name="active" id="active">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div> */}
                </div>
                {/* <button onClick={submitData()} className="newUserButton">Create</button> */}
            </form>
            {/* <input type="submit" onSubmit={submitData} className="newUserButton"  value="Create"/>  */}
            <Link to={"/startupusers/"+userId}>
            <button onClick={submitData} className="newUserButton">Submit</button>
            </Link>
        </div>
        )}
        
       </> 
    )
    
}
