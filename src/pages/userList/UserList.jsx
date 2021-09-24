import "./userList.css"
import { DataGrid } from '@material-ui/data-grid';
import {Delete} from '@material-ui/icons';
import { UserRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import Urls from "../../constant";


export default function UserList() {

    const [loading,setloading] = useState(true);
    const [data,setData] = useState([]);
    const handleDelete = (id) => {
        setData(data.filter((item)=>item.id !== id));
    };

    const getData = ()=>{

        var token = "";
        token = localStorage.getItem("token");

        if(token === null){
          window.location.assign("/")
        }else{

        let userarray = []
        fetch("https://startuphub2021.herokuapp.com/company")
        .then((res) => res.json())
        .then((result) => {
        
        for(let i=0; i<result.length;i++){
            let user = {
                id: i+1,
                _id: result[i]._id,
                company_name:result[i].company_name,
                email:result[i].email,
                type:result[i].type,
                image:result[i].image,
                status:result[i].account_status,
                category:result[i].category,
                br_number:result[i].br_number   
            }
            userarray.push(user);
        }
        setData(userarray);
        setloading(false);
        console.log(userarray);
      });
     }
    }

    useEffect(() => {
        getData();
    
      }, []);
    
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'company_name',
          headerName: 'StartUp Name',
          width: 200,
          editable: true,
          renderCell:(params)=>{
              return(
                  <div className="userListUser">
                      <img className="userListImg" src={params.row.image} alt=""/>
                      {params.row.company_name}
                  </div>
              )
          }
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 180,
          editable: true,
        },
        {
          field: 'category',
          headerName: 'Category',
          width: 150,
          editable: true,
        },
        {
          field: 'type',
          headerName: 'Type',
          width: 130,
        },
        {
            field: 'status',
            headerName: 'Account Status',
            width: 200,
        },
        {
            field:"emaill",
            headerName:"Users",
            width:150,
            renderCell: (params)=>{
                return(
                    <>
                    <Link to={"/startupusers/"+params.row.br_number}>
                        <button className="userListEdit">View</button>
                    </Link>
                    {/* <Delete className="userListDelete" onClick={()=>handleDelete(params.row.br_number)}/> */}
                    </>
                )
            }
        }

      ];
      
    
    return (
        <>
        {loading ? (
            <></>
        ):(
            <div className="userList">  
                {/* <h1 className="userListTitle">User List</h1>    */}
                <DataGrid
                    className="userListTable"
                    style={{height:"90%"}}
                    rows={data}
                    columns={columns}
                    pageSize={9}
                    id={Math.random()}
                    
                    disableSelectionOnClick
                />
            </div>
        )}
        </>
    )
}
