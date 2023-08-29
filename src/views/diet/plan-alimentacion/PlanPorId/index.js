import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Tab } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";

export default function PlanPorId() {
  const [tab, setTab] = useState("1");
  const [tabRecomendaciones, setTabRecomendaciones] = useState("1");
  const { plan } = useParams();
  const [dietas, setDietas] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleChangeRecomendaciones = (event, newValue) => {
    setTabRecomendaciones(newValue);
  };

  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/plan-alimentacion/dietas/${plan}`)
      .then((res) => setDietas(res.data.data));

    axios.get(`https://dietservice.bitjoins.pe/api/recomendaciones-web/${plan}`).then((res) => {
      if (Array.isArray(res.data)) {
        setRecomendaciones(res.data);
      } else {
        setRecomendaciones([res.data]);
      }
    });
  }, [plan]);

  useEffect(() => {
    setTabRecomendaciones(recomendaciones?.[0]?.tipo)
  }, [recomendaciones])

  function RecomendacionSaltoLinea(texto) {
    const lineas = texto.split('\n');

    const lineasFiltradas = lineas.filter((linea) => linea.trim() !== '.');

    const elementosDeParrafo = lineasFiltradas.map((linea, index) => (
    <p key={index}>{linea}</p>
    ));
    return elementosDeParrafo
  }

  return (
    <Fragment>
      <Link to={`/plan-alimentacion`} style={{color: 'white',position: 'fixed', right: '2rem', zIndex: 999 }}>
        <Button color="warning">
          Regresar
        </Button>
      </Link>
      
      
      <TabContext value={tab}>
        <TabList onChange={handleChange} aria-label="simple tabs example">
          {dietas.map((dieta, index) => (
            <Tab
              key={index}
              value={dieta.opcion}
              label={
                dieta.fecha_inicio_dia == "Monday"
                  ? `Lunes ${dieta?.fecha_inicio?.split("-")[2]}`
                  : dieta.fecha_inicio_dia == "Tuesday"
                  ? `Martes ${dieta?.fecha_inicio?.split("-")[2]}`
                  : dieta.fecha_inicio_dia == "Wednesday"
                  ? `Miercoles ${dieta?.fecha_inicio?.split("-")[2]}`
                  : dieta.fecha_inicio_dia == "Thursday"
                  ? `Jueves ${dieta?.fecha_inicio?.split("-")[2]}`
                  : dieta.fecha_inicio_dia == "Friday"
                  ? `Viernes ${dieta?.fecha_inicio?.split("-")[2]}`
                  : dieta.fecha_inicio_dia == "Saturday"
                  ? `Sabado ${dieta?.fecha_inicio?.split("-")[2]}`
                  : dieta.fecha_inicio_dia == "Sunday"
                  ? `Domingo ${dieta?.fecha_inicio?.split("-")[2]}`
                  : null
              }
            />
          ))}
        </TabList>
        {dietas.map((dieta, index) => (
          <TabPanel value={dieta.opcion}>
            <ul style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {dieta?.comidas?.map((comida, index) => (
                <li key={index} style={{ listStyle: "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "2rem", justifyContent: "flex-start" }}>
                    <h5 style={{ minWidth: "7rem" }}>
                      {comida?.comida == 1
                        ? "Desayuno"
                        : comida?.comida == 2
                        ? "Almuerzo"
                        : comida?.comida == 3
                        ? "Cena"
                        : comida?.comida == 4
                        ? "Meriendas"
                        : null}
                    </h5>
                    <p
                      style={{
                        width: "50rem",
                        padding: "1rem",
                        backgroundColor: "#E5B359",
                        color: "white",
                        borderRadius: "1rem",
                      }}
                    >
                      {comida?.descripcion}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Fragment>
              <TabContext value={tabRecomendaciones}>
                <TabList onChange={handleChangeRecomendaciones} aria-label="simple tabs example">
                  {recomendaciones?.map((recomendacion, index) => (
                    <Tab
                      key={index}
                      value={recomendacion?.tipo}
                      label={
                        recomendacion?.tipo == 1
                          ? "Pautas Generales"
                          : recomendacion?.tipo == 2
                          ? "Alimentos Permitidos"
                          : recomendacion?.tipo == 3
                          ? "Prohibidos (Consumo Mensual)"
                          : recomendacion?.tipo == 4
                          ? "No Olvida"
                          : null
                      }
                    />
                  ))}
                </TabList>

                {recomendaciones?.map((recomendacion, index) => (
                  <TabPanel key={index} value={recomendacion?.tipo}>
                    {RecomendacionSaltoLinea(recomendacion?.recomendacion)}
                  </TabPanel>
                ))}
              </TabContext>
            </Fragment>
          </TabPanel>
        ))}
      </TabContext>
    </Fragment>
  );
}
