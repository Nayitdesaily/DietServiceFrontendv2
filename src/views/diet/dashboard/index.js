import React, { Fragment, useEffect, useState } from "react";
import Evolucion from "./Evolucion";
import PlanDia from "./PlanDia";
import mock from "../../../@fake-db/mock";
import axios from "axios";
import { getUserData } from "../../../utility/Utils";


const Dashboard = () => {
  mock.restore();

   const [evolution, setEvolution] = useState([])
   const [lastEvolution, setLastEvolution] = useState({});

   const user = getUserData();

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

   useEffect(() => {
      async function fetchData() {
        await axios.get(`https://dietservice.bitjoins.pe/api/evolucion/${user?.id}`).then((res) => {
          setEvolution(res.data.data);
        });
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
