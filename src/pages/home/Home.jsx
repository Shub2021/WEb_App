
import Chart from "../../components/charts/Chart"
import Featuredinf from "../../components/featuredinfo/Featuredinf"
import WidgetLg from "../../components/widgetLg/WidgetLg"
import WidgetSm from "../../components/widgetSm/WidgetSm"
import { userData } from "../../dummyData"
import { useState,useEffect } from "react";
import UserProfile from "../../userAthontication"
import "./home.css"



export default function Home() {

    const [data1,setData1] = useState([]);
    const [loading,setloading] = useState(true);
    let userarray1 = [
        {
            name: "Jan",
            "Income Profit": 0,
          },
          {
            name: "Feb",
            "Income Profit": 0,
          },
          {
            name: "Mar",
            "Income Profit": 0,
          },
          {
            name: "Apr",
            "Income Profit": 0,
          },
          {
            name: "May",
            "Income Profit": 0,
          },
          {
            name: "Jun",
            "Income Profit": 0,
          },
          {
            name: "Jul",
            "Income Profit": 0,
          },
          {
            name: "Agu",
            "Income Profit": 0,
          },
          {
            name: "Sep",
            "Income Profit": 0,
          },
          {
            name: "Oct",
            "Income Profit": 0,
          },
          {
            name: "Nov",
            "Income Profit": 0,
          },
          {
            name: "Dec",
            "Income Profit": 0,
          },
    ];


    const getData = ()=>{

        var token = "";
        token = localStorage.getItem("token");
        // console.log(token);

        if(token === null){
          window.location.assign("/")
        }else{  
          
        fetch("http://localhost:3008/company")
          .then((res) => res.json())
          .then((result) => {
          
          for(let i=0; i<result.length;i++){ 
     
                switch(result[i].payment_month){
                    case 1:
                        userarray1[0]["Income Profit"] += 1000;
                        break;
                    
                    case 2:
                        userarray1[1]["Income Profit"] += 1000;
                        break;
                    
                    case 3:
                        userarray1[2]["Income Profit"] += 1000;
                        break;
                    
                    case 4:
                        userarray1[3]["Income Profit"] += 1000;
                        break;

                    case 5:
                        userarray1[4]["Income Profit"] += 1000;
                        break;

                    case 6:
                        userarray1[5]["Income Profit"] += 1000;
                        break;

                    case 7:
                        userarray1[6]["Income Profit"] += 1000;
                        break;

                    case 8:
                        userarray1[7]["Income Profit"] += 1000;
                        break;

                    case 9:
                        userarray1[8]["Income Profit"] += 1000;
                        break;

                    case 10:
                        userarray1[9]["Income Profit"] += 1000;
                        break;
                        
                    case 11:
                        userarray1[10]["Income Profit"] += 1000;
                        break;

                    case 12:
                        userarray1[11]["Income Profit"] += 1000;
                        break;

                    default:
                        break;
                }
          }
          setData1(userarray1);
          setloading(false);
          console.log(userarray1);
          // console.log(result);
        });

        }
      }
      
      useEffect(() => {
          getData();

        }, []);


    return (
       <>
       {loading ? (
        <></>
      ):( 
        <div className="home">
            <Featuredinf/>
            <Chart data={data1} title="Monthly Income" dataKey1="Income Profit"  grid/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
       )} 
     </>  
    )
}
