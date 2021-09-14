import "./widgetSm.css"
import {Visibility} from '@material-ui/icons';
import { useState,useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import { Link } from "react-router-dom";

export default function WidgetSm() {

    let userarray = []
    const [data,setData] = useState([]);
    

    const getData = ()=>{
        
        fetch("http://localhost:3008/complaint/")
        .then((res) => res.json())
        .then((result) => {
            for(let i=0; i<result.length;i++){
                let user = {
                    id: i+1,
                    _id: result[i]._id,
                    br_number: result[i].br_number,
                    description:result[i].description,
                    placed_date:result[i].placed_date,
                    status:result[i].status,

                }
                userarray.push(user);
            }
        setData(userarray);
        console.log(userarray);
      });

    }

    useEffect(() => {
        getData();
    
      }, []);

      const columns1 = [
        { field: 'id', headerName: 'ID', width: 60, hide: true  },
        {
          field: 'br name',
          headerName: 'User Name',
          width: 145,
          editable: false,
          renderCell:(params)=>{
              return(
                  <div className="userListUser">
                      {/* <img className="userListImg" src={params.row.image} alt=""/> */}
                      {params.row.br_number}
                  </div>
              )
          }
        },
        {
            field: 'placed_date',
            headerName: 'Placed Date',
            width: 150,
        },
        {
            field:"button",
            headerName:"",
            width:60,
            renderCell: (params)=>{
                return(
                    <>
                    <Link to={"/startupusers/"+params.row.br_number}>
                        <button className="userListEdit">View</button>
                    </Link>
                   
                    </>
                )
            }
        }
        

      ];

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">User inquiries</span>
            <DataGrid
                style={{height: "400px",borderColor:"white"}}
                rows={data}
                columns={columns1}
                pageSize={5}
                id={Math.random()}
               
                disableSelectionOnClick
              
            /> 
            
        </div>
    )
}
