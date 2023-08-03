import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import moment from 'moment'
import 'moment/dist/locale/es';
import axios from "axios";


export default function GraficoEvolucionPeso(){

    Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
    const [evolucion, setEvolucion] = useState([])
    const [labelDates, setLabelDates] = useState([]);
    const [labelData, setLabelData] = useState([]);
    moment.locale("es")

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:8000/api/evolucion/6616").
            then((res) => {setEvolucion(res.data.data); console.log(res.data.data)});
        }
        fetchData();
    }, []);

   
    useEffect(() => {
        setLabelData([]);
        setLabelDates([]);
        evolucion.map((date) => {
           setLabelDates(dates => 
           [...dates, moment(date.fecha).format("MMM").charAt(0).toUpperCase().concat(moment(date.fecha).format("MMMM DD").slice(1))])  
           setLabelData(data => [...data, date.peso])  
        });
    }, [evolucion]);

    const data = {
    labels: labelDates,
    datasets: [
        {
            label: null,
            data: labelData,
            fill: false,
            tension: 0.2,
            borderColor: "white",
            borderWidth: 4,
            pointBackgroundColor: '#7C0902',
            pointBorderColor: '#7C0902'
        },
    ],
    };

    const options = {
    scales: {
        y: {
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
    }
    }


    return (
    <div>
        <h4>Grafico Evolucion Peso</h4>
        <br />
        <div style={{ width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Line data={data} options={options} style={{ backgroundColor: '#E09540', borderRadius: '1rem', padding: '1rem', color: 'white' }} />

            </div>
        </div>
         <br />
    </div>)
}