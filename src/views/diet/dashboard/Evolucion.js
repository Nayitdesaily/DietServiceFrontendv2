import React, { useEffect, useState } from "react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useSelector } from "react-redux";
import moment from "moment";
import "moment/dist/locale/es";
import "@styles/react/dashboard/dashboard-evolution.scss";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";
import { getUserData } from "../../../utility/Utils";

const Evolucion = ({ lastEvolution }) => {
  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const [evolutions, setEvolutions] = useState([]);
  const [labelDates, setLabelDates] = useState([]);
  const [labelData, setLabelData] = useState([]);
  const [persona, setPersona] = useState({});

  moment.locale("es");

  const user = getUserData();

  console.log(evolutions)

  useEffect(() => {
    setLabelData([]);
    setLabelDates([]);
    const evolutionsCopia = evolutions
    evolutionsCopia.reverse()

    evolutionsCopia.slice(-12).map((date) => {
      setLabelDates((dates) => [
        ...dates,
        moment(date.fecha).format("MMM").charAt(0).toUpperCase().concat(moment(date.fecha).format("MMM DD YY").slice(1)),
      ]);
      setLabelData((data) => [...data, date.peso]);
    });
  }, [evolutions]);

  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://dietservice.bitjoins.pe/api/evolucion/${user?.id}`).then((res) => {
        setEvolutions(res.data.data);
      });
      await axios.get(`https://dietservice.bitjoins.pe/api/web/personas/${user?.persona_id?.id}`).then((res) => {
        setPersona(res.data.data);
      });
    }
    fetchData();
  }, []);

  function PesoIdeal() {
    const pesoIdeal = persona?.peso_ideal;
    if (pesoIdeal?.includes("-")) {
      const pesoMaximo = pesoIdeal.split("-")[1];
      return (parseInt(pesoMaximo) * parseInt(lastEvolution?.peso)) / 100;
    } else {
      return (parseInt(pesoIdeal) * parseInt(lastEvolution?.peso)) / 100;
    }
  }

  function calcularImcIdeal() {
    const talla = parseInt(persona?.talla) / 100;
    const imc = persona?.peso_ideal ? (parseInt(persona?.peso_ideal) / (talla * talla)).toFixed(2) : 0;
    return imc;
  }

  console.log(evolutions);

  const data = {
    labels: labelDates,
    datasets: [
      {
        label: null,
        data: labelData,
        tension: 0.2,
        borderColor: "white",
        borderWidth: 4,
        pointBackgroundColor: "#7C0902   ",
        pointBorderColor: "#7C0902",
        fill: true,
        backgroundColor: "red",
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
          color: "white",
          font: {
            size: 14,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },
    animations: {
      tension: {
        duration: 2000,
        easing: "linear",
        from: 0.5,
        to: 0,
        loop: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: 1,
    },
    backgroundColor: "#E09540",
  };

  return (
    <div>
      <h4 className="principal-title">Evolucion Tratamiento Nutricional</h4>
      <div className="container-progress">
        <div className="container-progress-chart">
          <h4 className="container-progress-chart-title">Grasa</h4>
          <CircularProgressbar
            value={lastEvolution.p_grasa}
            text={lastEvolution.p_grasa == undefined ? "0" : `${lastEvolution.p_grasa}%`}
            styles={buildStyles({
              pathColor: "#24ac90",
              textColor: "#000000",
              textSize: "1rem",
              pathTransitionDuration: 2,
              strokeLinecap: "butt",
            })}
          />
          <h5 className="container-progress-chart-description">Grasa Ideal: {persona?.p_grasa_ideal} % </h5>
        </div>
        <div className="container-progress-chart">
          <h4 className="container-progress-chart-title">IMC</h4>
          <CircularProgressbar
            value={lastEvolution.imc}
            text={
              lastEvolution.imc == undefined
                ? "0"
                : parseInt(lastEvolution.imc) <= 16
                ? "Delgadez Severa"
                : parseInt(lastEvolution.imc) < 17
                ? "Delgadez Moderada"
                : parseInt(lastEvolution.imc) <= 18.49
                ? "Delgadez Aceptable"
                : parseInt(lastEvolution.imc) < 25
                ? "Peso Normal"
                : parseInt(lastEvolution.imc) < 30
                ? "Sobrepeso"
                : parseInt(lastEvolution.imc) < 35
                ? "Obeso Tipo I"
                : parseInt(lastEvolution.imc) <= 40
                ? "Obeso Tipo II"
                : parseInt(lastEvolution.imc) <= 200
                ? "Obeso Tipo III"
                : null
            }
            styles={buildStyles({
              pathColor: "#c074ad",
              textColor: "#000000",
              textSize: ".9rem",
              pathTransitionDuration: 2,
              strokeLinecap: "butt",
            })}
          />
          <h5 className="container-progress-chart-description">IMC Ideal: {calcularImcIdeal()} %</h5>
        </div>
        <div className="container-progress-chart">
          <h4 className="container-progress-chart-title">Masa Muscular</h4>
          <CircularProgressbar
            value={lastEvolution.p_masa}
            text={lastEvolution.p_masa == undefined ? "0" : `${lastEvolution.p_masa}%`}
            styles={buildStyles({
              pathColor: "#c2d45b",
              strokeLinecap: "butt",
              textColor: "#000000",
              textSize: "1rem",
              pathTransitionDuration: 2,
            })}
          />
          <h5 className="container-progress-chart-description">Masa Muscular Ideal: {persona?.p_masa_muscular} %</h5>
        </div>
      </div>
      <h4>Evolucion De Peso</h4>
      <br />
      <div style={{ width: "100%", justifyContent: "center", display: "flex", alignItems: "center" }}>
        <div style={{ width: "70%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Line
            data={data}
            options={options}
            style={{ backgroundColor: "#E09540", borderRadius: "1rem", padding: "1rem", color: "white" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Evolucion;
