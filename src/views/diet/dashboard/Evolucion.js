import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useSelector } from "react-redux";
import moment from 'moment'
import 'moment/dist/locale/es';

import "@styles/react/dashboard/dashboard-evolution.scss";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";


const Evolucion = ({ lastEvolution }) => {
   Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
   const [evolutions, setEvolutions] = useState([])
   const [labelDates, setLabelDates] = useState([]);
   const [labelData, setLabelData] = useState([]);
   
   moment.locale("es")

   useEffect(() => {
      setLabelData([]);
      setLabelDates([]);
      evolutions.map((date) => {
         setLabelDates(dates => 
         [...dates, moment(date.fecha).format("MMM").charAt(0).toUpperCase().concat(moment(date.fecha).format("MMMM DD").slice(1))])  
         setLabelData(data => [...data, date.peso])  
      });
   }, [evolutions]);

   useEffect(() => {
      async function fetchData() {
        await axios.get("http://localhost:8000/api/evolucion/6616").then((res) => {
          setEvolutions(res.data.data);
        });
        setPending(false);
      }
      fetchData();
    }, []);


   const data = {
      labels: labelDates,
      datasets: [
         {
            label: null,
            data: labelData,
            tension: 0.2,
            borderColor: "white",
            borderWidth: 4,
            pointBackgroundColor: '#7C0902   ',
            pointBorderColor: '#7C0902',
            fill: true,
            backgroundColor: 'red'
         },
      ],
   };

   const options = {
      scales: {
         y: {
            grid: {
               display: false,
            },
            ticks: {
               color: 'white', 
               font: {
                 size: 14, 
               },
            }
         },
         x: {
            grid: {
               display: false
            },
            ticks: {
               color: 'white', 
               font: {
                 size: 14, 
               },
            }
         },
      },
      animations: {
         tension: {
           duration: 2000,
           easing: 'linear',
           from: 0.5,
           to: 0,
           loop: true
         }
      },
      plugins: {
         legend: {
           display: false
         }
      },
      layout: {
         padding: 1
      },
      backgroundColor: '#E09540'
   }

   return (
      <div>
         <h4 className="principal-title">Evolucion Tratamiento Nutricional</h4>
         <div className="container-progress">
            <div className="container-progress-chart">
               <h4 className="container-progress-chart-title">Grasa</h4>
               <CircularProgressbar
                  value={lastEvolution.p_grasa}
                  text={lastEvolution.p_grasa == undefined ? '0' : `${lastEvolution.p_grasa}%`}
                  styles={buildStyles({
                     pathColor: "#24ac90",
                     textColor: "#000000",
                     textSize: "1rem",
                     pathTransitionDuration: 2,
                     strokeLinecap: "butt",
                  })}
               />
               <h5 className="container-progress-chart-description">Grasa Ideal:</h5>
            </div>
            <div className="container-progress-chart">
               <h4 className="container-progress-chart-title">IMC</h4>
               <CircularProgressbar
                  value={lastEvolution.imc}
                  text={lastEvolution.imc == undefined ? '0' :`${lastEvolution.imc}%`}
                  styles={buildStyles({
                     pathColor: "#c074ad",
                     textColor: "#000000",
                     textSize: "1rem",
                     pathTransitionDuration: 2,
                     strokeLinecap: "butt",
                  })}
               />
               <h5 className="container-progress-chart-description">IMC Ideal:</h5>
            </div>
            <div className="container-progress-chart">
               <h4 className="container-progress-chart-title">Masa Muscular</h4>
               <CircularProgressbar
                  value={lastEvolution.p_masa}
                  text={lastEvolution.p_masa == undefined ? '0' : `${lastEvolution.p_masa}%`}
                  styles={buildStyles({
                     pathColor: "#c2d45b",
                     strokeLinecap: "butt",
                     textColor: "#000000",
                     textSize: "1rem",
                     pathTransitionDuration: 2,
                  })}
               />
               <h5 className="container-progress-chart-description">Masa Muscular Ideal:</h5>
            </div>
         </div>
         <h4>Evolucion De Peso</h4>
         <br />
         <div style={{width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
            <div style={{width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
             <Line data={data} options={options} style={{backgroundColor: '#E09540', borderRadius: '1rem', padding: '1rem', color: 'white'}} />

            </div>
         </div>
         
      </div>
   );
};

export default Evolucion;
