import "./widgetLg.css"
import { DataGrid } from '@material-ui/data-grid';
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";

export default function WidgetLg() {
    const Button =({type}) =>{
        return <button className={"widgetLgButton "+type}>{type}</button>
    }
    const [data,setData] = useState([]);
    const [data1,setData1] = useState([]);
    let userarray = [];
    let userarray1 = [];
     const brArray = [];

     const date = new Date();
     const Year = date.getFullYear().toString();
     const Month = (date.getMonth()+1);

    const getData = ()=>{
        fetch("https://startuphub2021.herokuapp.com/annualfee/")
        .then((res) => res.json())
        .then((result) => {
        for(let i=0; i<result.length;i++){
            let user = {
                id: i+1,
                br_number: result[i].br_number,
                _id: result[i]._id,
                paymentDate:result[i].paymentDate,
                amount:result[i].amount,
                year:result[i].year,
            }
            userarray.push(user);
        }
        setData(userarray);
           // console.log(userarray);

        for(let j=0;j<userarray.length;j++){
            if(Year === userarray[j].year){
                brArray.push(userarray[j].br_number)
            }
        }
        console.log(brArray);
      });


      fetch("https://startuphub2021.herokuapp.com/company")
        .then((res) => res.json())
        .then((result) => {
        
        for(let i=0; i<result.length;i++){ 
             if(!brArray.includes(result[i].br_number) && (Month >= result[i].payment_month)){      
                let user = {
                    id: i+1,
                    _id: result[i]._id,
                    company_name:result[i].company_name,
                    email:result[i].email,
                    type:result[i].type,
                    image:result[i].image,
                    category:result[i].category,
                    Br_number:result[i].br_number, 
                    payment_month:result[i].payment_month,
                    last_payment:result[i].last_payment,  
                }
                userarray1.push(user);
            }
        }
        setData1(userarray1);
       // console.log(userarray1);
        // console.log(result);
      });

    }

    useEffect(() => {
        getData();
    
      }, []);


    const columns = [
        { field: 'id', headerName: 'ID', width: 60 , hide: true },
        {
          field: 'company_name',
          headerName: 'Company Name',
          width: 220,
          editable: false,
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
            width: 220,
            editable: false,
        },
        {
            field: 'last_payment',
            headerName: 'Last Payment Date',
            width: 200,
            editable: false,
        },

        {
            field:" ",
            headerName:"",
            width:60,
            renderCell: (params)=>{
                return(
                    <>
                    <Link to={"/startupusers/"+params.row.Br_number}>
                        <button className="userListEdit">View</button>
                    </Link>
                   
                    </>
                )
            }
        }

        

      ];

    return (
        <div className="widgetLg">
            <span className="widgetLgTitle">Pending Payment List</span>
            <DataGrid
                style={{height: "400px",borderColor:"white"}}
                rows={data1}
                columns={columns}
                pageSize={5}
                id={Math.random()}
                disableSelectionOnClick
            />
        </div>
    )
}
