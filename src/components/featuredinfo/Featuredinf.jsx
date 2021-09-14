import "./featuredinf.css";
import {ArrowDownward, ArrowUpward} from '@material-ui/icons';
import { useState,useEffect } from "react";

export default function Featuredinf() {

    const [data,setData] = useState([]);
    const [data1,setData1] = useState([]);
    const [data2,setData2] = useState([]);

    const getData = ()=>{
      
        
        fetch("http://localhost:3008/investor")
        .then((res) => res.json())
        .then((result) => {
            setData(result.length);
        });
       
        fetch("http://localhost:3008/client")
        .then((res) => res.json())
        .then((result) => {    
            setData1(result.length);
        });

        fetch("http://localhost:3008/company")
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
                    <span className="featuredMoney">{data1+1000}</span>
                    <span className="featuredMoneyRate">+{data1+200}
                        <ArrowUpward className="featuredIcon "/>
                        {/* <ArrowDownward className="featuredIcon negetive"/> */}
                    </span>
                </div>
                <span className="featuredSub">Conpared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">StartUp Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{data2+1250}</span>
                    <span className="featuredMoneyRate">+{data2+150}
                        <ArrowUpward className="featuredIcon "/>
                    </span>
                </div>
                <span className="featuredSub">Conpared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Investor Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{data+580}</span>
                    <span className="featuredMoneyRate">+{data+30}
                        <ArrowUpward className="featuredIcon "/>
                    </span>
                </div>
                <span className="featuredSub">Conpared to last month</span>
            </div>
        </div>
    )
}
