import "./startupUsers.css"
import { DataGrid } from '@material-ui/data-grid';
import { UserRows } from "../../dummyData";
import { Link,useParams } from "react-router-dom";
import {Delete} from '@material-ui/icons';
import { useState,useEffect } from "react";
import { MailOutline, PermIdentity, PhoneAndroid, Home,Category,Call } from "@material-ui/icons";
import { confirmAlert } from 'react-confirm-alert';


export default function StartupUsers() {

    
    const {userId} = useParams();
    const [data,setData] = useState([]);
    const [data1,setData1] = useState([]);
    const [data2,setData2] = useState([]);
    const [data3,setData3] = useState([]);
    const [data4,setData4] = useState([]);

    const [loading,setloading] = useState(true);

    const handleDelete = (id) => {
        setData(data.filter((item)=>item.id !== id));
    };

    const getData = ()=>{

        var token = "";
        token = localStorage.getItem("token");

        if(token === null){
          window.location.assign("/")
        }else{  

        fetch("http://localhost:3008/company/"+userId)
        .then((res) => res.json())
        .then((result) => {
        
     
        setData(result);
        // console.log(result);
      });

      fetch("http://localhost:3008/users/br/"+userId)
        .then((res) => res.json())
        .then((result) => {
        let userarray = [];
        for(let i=0; i<result.length;i++){
            let user = {
                id: i+1,
                _id: result[i]._id,
                name:result[i].name,
                email:result[i].email,
                NIC:result[i].NIC,
                img:result[i].img,
                accountType:result[i].accountType,
                mobile:result[i].mobile   
            }
            userarray.push(user);
        }
        setData1(userarray);
        // console.log(result);
      });

      fetch("http://localhost:3008/annualfee/"+userId)
        .then((res) => res.json())
        .then((result) => {
        let userarray2 = [];
        for(let i=0; i<result.length;i++){
            let user = {
                id: i+1,
                _id: result[i]._id,
                paymentDate:result[i].paymentDate,
                amount:result[i].amount,
                year:result[i].year,
            }
            userarray2.push(user);
        }
        setData2(userarray2);
       
        // console.log(userarray2);
      });

      fetch("http://localhost:3008/complaint/br/"+userId)
        .then((res) => res.json())
        .then((result) => {
        let userarray3 = [];
        for(let i=0; i<result.length;i++){
            let user = {
                id: i+1,
                _id: result[i]._id,
                item_id:result[i].item_id.slice(18, 23),
                description:result[i].description,
                placed_date:result[i].placed_date,
                status:result[i].status,
            }
            userarray3.push(user);
        }
        setData3(userarray3);
        // console.log(result);
      });

      fetch("http://localhost:3008/admincomplain/br/"+userId)
        .then((res) => res.json())
        .then((result) => {
        let userarray4 = [];
        for(let i=0; i<result.length;i++){
            let user = {
                id: i+1,
                _id: result[i]._id,
                type:result[i].type,
                description:result[i].description,
                placed_date:result[i].placed_date,
                complian_Category:result[i].complian_Category,
                status:result[i].status,
            }
            userarray4.push(user);
        }
        setData4(userarray4);
        setloading(false);
        // console.log(result);
      });
     }
    }

    const updateban = () =>{

        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth()+1;
        const year = d.getFullYear();
        const paymentDate = year + "-" + month + "-" + date;

      fetch("http://localhost:3008/company/ban/"+userId, {
        method: "PATCH",
        // mode: 'no-cors',
        headers: { "Content-Type": "application/json",'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({
            account_status: "banned",
        }),
      });

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
            complian_Category:"banned",
            type:"warning",
            description:"banned",
            br_number:userId,
            // company_category,
          }),
        })
        
      if(data.type === "product"){
        fetch("http://localhost:3008/product/ban/"+userId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                company_status: "banned",
            }),
      });
      }else{
        fetch("http://localhost:3008/service/ban/"+userId, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                company_status: "banned",
            }),
      });
      }

      console.log("BAN");
    }

    const updateactive = () =>{

        const d = new Date();
        const date = d.getDate();
        const month = d.getMonth()+1;
        const year = d.getFullYear();
        const paymentDate = year + "-" + month + "-" + date;

        fetch("http://localhost:3008/company/ban/"+userId, {
          method: "PATCH",
          // mode: 'no-cors',
          headers: { "Content-Type": "application/json",'Access-Control-Allow-Origin': '*' },
          body: JSON.stringify({
              account_status: "active",
          }),

        });

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
            complian_Category:"Active",
            type:"warning",
            description:"Active",
            br_number:userId,
            // company_category,
          }),
        });
          
        if(data.type === "product"){
          fetch("http://localhost:3008/product/ban/"+userId, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                company_status: "active",
              }),
        });
        }else{
          fetch("http://localhost:3008/service/ban/"+userId, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                company_status: "active",
              }),
        });
        }
  
        console.log("BAN");
      }


    useEffect (() => {
        getData();
    
      }, []);

      

     

      const warning = [
        {
            field: "id",
            headerName: "Complain Id",
            width:150
        },
        {
            field: "placed_date",
            headerName: "Placed Date",
            width: 150,
           
        },
        {
            field: "type",
            headerName: "Warning type",
            width: 150,
         
        },
        {
            field: "complian_Category",
            headerName: "Complian Category",
            width: 200,
         
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
           
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
            editable: true,
          
        },
        
    ];

      const complains = [
        {
            field: "id",
            headerName: "Complain Id",
            width:150
        },
        {
            field: "placed_date",
            headerName: "Complain Date",
            width: 200,
           
        },
        {
            field: "item_id",
            headerName: "Order id",
            width: 150,
          
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
           
        },
        {
            field: "status",
            headerName: "Status",
            width: 150,
           
        },
        
    ];

    const annualFee = [
        {
            field: "id",
            headerName: "Payment Id",
            width:150
        },
        {
            field: "paymentDate",
            headerName: "Payment Date",
            width: 200,
         
        },
        {
            field: "amount",
            headerName: "Amount",
            width: 150,
           
        },
        {
            field: "year",
            headerName: "Payble year",
            width: 150,
           
        },
        
    ];

    const usercolumns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'User Name',
          width: 200,
        //   editable: true,
          renderCell:(params)=>{
              return(
                  <div className="userListUser">
                      <img className="userListImg" src={params.row.img} alt=""/>
                      {params.row.name}
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
          field: 'NIC',
          headerName: 'Identity Card No.',
          width: 200,
          editable: true,
        },
        {
          field: 'accountType',
          headerName: 'Type',
          width: 150,
        },
        {
            field: 'mobile',
            headerName: 'Mobile Number',
            width: 200,
        },
        // {
        //     field:"action",
        //     headerName:"Users",
        //     width:150,
        //     renderCell: (params)=>{
        //         return(
        //             <>
        //             <Link to={"/startupusers/"+params.row.id}>
        //                 <button className="userListEdit">View</button>
        //             </Link>
        //             <Delete className="userListDelete" onClick={()=>handleDelete(params.row.id)}/>
        //             </>
        //         )
        //     }
        // }

      ];
    //   console.log(data);
    return (
        <>
        {loading ? (
            <></>
        ):(
            <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">StartUp Detils</h1>
                <h1 className="userListTitle1">Payment Details</h1>

                <div>
                {data.account_status === "active" ?(
                    <button
                        className="userAddButtonban"
                        onClick={e => {
                            if(window.confirm("Are you sure to BAN this page?")){
                                updateban();
                            }    
                        }}
                    >
                    Ban
                    </button>
                ):(
                    <button
                    className="userAddButtonactive"
                    onClick={e => {
                        if(window.confirm("Are you sure to ACTIVE this page?")){
                            updateactive();
                        }    
                    }}
                    >
                    Active
                    </button>
                )}
                
                <Link to={"/newUser"+userId}>
                    <button  className="userAddButton">Warning</button>
                </Link>
                </div>

            </div> 
            
            <div className="userContainer">
                <div className="userShow">
                    <div className="userShowTop">
                        <img src={data.image} alt="" className="userShowImg"/>
                        <div className="userShowTopToitle">
                            <span className="userShowUsername">{data.company_name}</span>
                            <span className="userShowUserTitle">{data.type}</span>
                        </div>
                    </div>
                    <div className="userShowBottom">
                        <span className="userShowTitle">Account Details</span>
                        <div className="userShowInfo">
                            <Category className="userShowIcon"/>
                            <span className="userShowInfoTitle">{data.category}</span>
                        </div>
                        <div className="userShowInfo">
                            <Home className="userShowIcon"/>
                            <span className="userShowInfoTitle">{data.address}</span>
                        </div>
                        <div className="userShowInfo">
                            <Call className="userShowIcon"/>
                            <span className="userShowInfoTitle">{data.contact}</span>
                        </div>
                        <div className="userShowInfo">
                            <MailOutline className="userShowIcon"/>
                            <span className="userShowInfoTitle">{data.email}</span>
                        </div>
                    </div>
                </div>
                
                <div className="userUpdate">
                    <div className="userList">         
                        <DataGrid  
                            style={{height: "300px"}}
                            rows={data2}
                            columns={annualFee}
                            pageSize={3}
                            
                            disableSelectionOnClick
                        />
                    </div>  
                </div>
            </div>
            <div className="userList">  
            <h1 className="userListTitle3">complains</h1>   
                <DataGrid
                className="startupUserTable1"
                style={{height: "400px"}}
                    rows={data3}
                    columns={complains}
                    pageSize={7}
                 
                    disableSelectionOnClick
                />
            </div>
            <div className="userList">  
            <h1 className="userListTitle3">Warning</h1>   
                <DataGrid
                className="startupUserTable1"
                style={{height: "400px"}}
                    rows={data4}
                    columns={warning}
                    pageSize={7}
                  
                    disableSelectionOnClick
                />
            </div>
            <div className="userList">  
            <h1 className="userListTitle3">Users List</h1>   
                <DataGrid
                className="startupUserTable1"
                style={{height: "400px"}}
                    rows={data1}
                    columns={usercolumns}
                    pageSize={7}
                  
                    disableSelectionOnClick
                />
            </div>
            
        </div>
        )}
        
     </>   
    )
}
