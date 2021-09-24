import "./otherusers.css"
import { DataGrid } from '@material-ui/data-grid';
import {Delete} from '@material-ui/icons';
import { UserRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Urls from "../../constant";

export default function OtherUsers() {

    const [data,setData] = useState([]);
    const [data1,setData1] = useState([]);

    const [loading,setloading] = useState(true);

    const getData = ()=>{
        let userarray = [];
        var token = "";
        token = localStorage.getItem("token");

        if(token === null){
            window.location.assign("/")
          }else{
        
        fetch("https://startuphub2021.herokuapp.com/investor")
        .then((res) => res.json())
        .then((result) => {
            for(let i=0; i<result.length;i++){
                let user = {
                    id: i+1,
                    _id: result[i]._id,
                    cName:result[i].cName,
                    investArea:result[i].investArea,
                    cAddress:result[i].cAddress,
                    nic:result[i].nic,
                    email:result[i].email,
                    cTel:result[i].cTel
                }
                userarray.push(user);
            }
            setData(userarray);
           

        });
        let userarray1 = [];
        fetch("https://startuphub2021.herokuapp.com/client")
        .then((res) => res.json())
        .then((result) => {
            for(let i=0; i<result.length;i++){
                if(result[i].type === "client"){
                    let user = {
                        id: i+1,
                        _id: result[i]._id,
                        name:result[i].name,
                        email:result[i].email,
                        accountType:result[i].type
                    }
                    userarray1.push(user);
                } 
            }
            setData1(userarray1);
            setloading(false);
            console.log(userarray1);

        });

    }
    }

    useEffect(() => {
        getData();
    
      }, []);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'cName',
          headerName: 'Company Name',
          width: 200,
       
          renderCell:(params)=>{
              return(
                  <div className="userListUser">
                      {/* <img className="userListImg" src={params.row.image} alt=""/> */}
                      {params.row.cName}
                  </div>
              )
          }
        },
        {
          field: 'cAddress',
          headerName: 'Address',
          width: 150,
       
        },
        {
          field: 'nic',
          headerName: 'Investor NIC',
          width: 150,
       
        },
        {
            field: 'investArea',
            headerName: 'Investment Area',
            width: 180,
        },
        {
            field: 'cTel',
            headerName: 'Contact Number',
            width: 180,
        },
        {
            field: 'email',
            headerName: 'Email Address',
            width: 180,
        },
        

      ];

      const columns1 = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'name',
          headerName: 'User Name',
          width: 150,
        
          renderCell:(params)=>{
              return(
                  <div className="userListUser">
                      {/* <img className="userListImg" src={params.row.image} alt=""/> */}
                      {params.row.name}
                  </div>
              )
          }
        },
        {
            field: 'email',
            headerName: 'Email Address',
            width: 200,
        },
        {
            field: 'accountType',
            headerName: 'User Type',
            width: 180,
        },
      ];
    return (
        <>
        {loading ? (
            <></>
        ):(
            <div className="otherusers">
                <div className="userList">  
                    <h1 className="userListTitle">Investor Users</h1>   
                    <DataGrid
                    className="startupUserTable"
                        style={{height: "400px",borderColor:"white"}}
                        rows={data}
                        columns={columns}
                        pageSize={5}
                        id={Math.random()}
                     
                        disableSelectionOnClick
                    />
                </div>

                <div className="userList">  
                    <h1 className="userListTitle">Client Users</h1>   
                    <DataGrid
                        className="startupUserTable"
                        style={{height: "400px"}}
                        rows={data1}
                        columns={columns1}
                        pageSize={5}
                        id={Math.random()}
                    
                        disableSelectionOnClick
                    />
                </div>
            </div>
        )}
            
        </>
    )
}
