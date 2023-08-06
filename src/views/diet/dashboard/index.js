import React, { Fragment, useEffect, useState } from "react";
import Evolucion from "./Evolucion";
import { useSelector } from "react-redux";
import PlanDia from "./PlanDia";
import mock from "../../../@fake-db/mock";
import axios from "axios";


const Dashboard = () => {
  mock.restore();

   const [evolution, setEvolution] = useState([])
   const [lastEvolution, setLastEvolution] = useState({});

   useEffect( () => {
      if(evolution.length > 0) {
         const latestEvolution = evolution?.reduce((acc, item) => {
            if (acc.fecha > item.fecha) {
               return acc;
            } else {
               return item;
            }
         })
         setLastEvolution(latestEvolution);
      }
      
   }, [evolution]);

   console.log(evolution)

   useEffect(() => {
      async function fetchData() {
        await axios.get("http://localhost:8000/api/evolucion/6616").then((res) => {
          setEvolution(res.data.data);
        });
        setPending(false);
      }
      fetchData();
    }, []);

   return (
      <Fragment>
         <div>
            <Evolucion lastEvolution={lastEvolution}/>
            <br />
            <PlanDia />
         </div>
      </Fragment>
   );
};

export default Dashboard;