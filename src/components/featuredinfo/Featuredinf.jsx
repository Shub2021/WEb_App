import "./featuredinf.css";
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import { useState,useEffect } from "react";

export default function Featuredinf() {

    const [data,setData] = useState([]);
    const [data1,setData1] = useState([]);
    const [data2,setData2] = useState([]);

    const getData = ()=>{
      
        
        fetch("https://startuphub2021.herokuapp.com/investor")
        .then((res) => res.json())
        .then((result) => {
            setData(result.length);
        });
       
        fetch("https://startuphub2021.herokuapp.com/client")
        .then((res) => res.json())
        .then((result) => {    
            setData1(result.length);
        });

        fetch("https://startuphub2021.herokuapp.com/company")
        .then((res) => res.json())
        .then((result) => {    
            setData2(result.length);
        });
    }

    useEffect(() => {
        getData();
    
      }, []);

    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Client Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{data1-data}</span>
                    {/* <span className="featuredMoneyRate">+{data1}
                        <ArrowUpward className="featuredIcon "/>
                        
                    </span> */}
                </div>
                {/* <span className="featuredSub">Conpared to last month</span> */}
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">StartUp Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{data2}</span>
                    {/* <span className="featuredMoneyRate">+{data2}
                        <ArrowUpward className="featuredIcon "/>
                    </span> */}
                </div>
                {/* <span className="featuredSub">Conpared to last month</span> */}
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Investor Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{data}</span>
                    {/* <span className="featuredMoneyRate">+{data}
                        <ArrowUpward className="featuredIcon "/>
                    </span> */}
                </div>
                {/* <span className="featuredSub">Conpared to last month</span> */}
            </div>
        </div>
    )
}
