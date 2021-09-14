import "./sidebar.css";
import {LineStyle, People, Timeline, TrendingUp} from '@material-ui/icons';
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";

export default function Sidebar() {

    const [loading,setloading] = useState(true);

    const getData = ()=>{

        var token = "";
        token = localStorage.getItem("token");
        // console.log(token);

        if(token !== null){
            setloading(false)
        }
      }
      
      useEffect(() => {
          getData();

        }, []);

    return (
           <>
            {loading ? (
                <>
                </>
            ):(
                <div className="sidebar">
                <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h1 className="sidebarTitle">Dashboard</h1>
                    <ul className="sidebarList">
                    <Link to="/home" className="link">
                        <li className="sidebarListItem">
                            <LineStyle className="sidebarIcon" />
                            Home
                        </li>
                    </Link>  
                    <Link to="/users" className="link">  
                        <li className="sidebarListItem">
                            <People className="sidebarIcon"/>
                           StartUp Users
                        </li>
                    </Link>
                    <Link to="/otherUsers" className="link">  
                        <li className="sidebarListItem">
                            <TrendingUp className="sidebarIcon"/>
                            Other Users
                        </li>
                    </Link>    
                    </ul>
                </div>
                <div className="sidebarMenu">   
                </div>
            </div> 
            </div>
             )}   
         </>
        
    )
}
