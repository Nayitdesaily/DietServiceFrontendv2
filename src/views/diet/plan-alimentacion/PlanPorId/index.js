import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Tab } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";

export default function PlanPorId() {
  const [tab, setTab] = useState("1");
  const { plan } = useParams();
  const [dietas, setDietas] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/plan-alimentacion/dietas/${plan}`)
      .then((res) => setDietas(res.data.data));

    axios
      .get(`https://dietservice.bitjoins.pe/api/recomendaciones/${plan}`)
      .then((res) => 
        {
          if(Array.isArray(res.data.data) ){
            setRecomendaciones(res.data.data)
          } else {
            setRecomendaciones([res.data.data])
          }
          
        }
      );
  }, [plan]);

  console.log(recomendaciones);

  return (
    <Fragment>
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
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
              {recomendaciones?.map((recomendacion, index) => (
                <Card
                  className="my-2"
                  style={{
                    width: "24rem",
                    minHeight: "20rem",
                  }}
                >
                  <CardBody>
                    <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                      {recomendacion.tipo == 1 ? 'Pautas Generales' : recomendacion.tipo == 2 ? 'Alimentos Permitidos' : recomendacion.tipo == 3 ? 'Prohibidos (Consumo Mensual)' : recomendacion.tipo == 4 ? 'No Olvida' : null}
                    </CardTitle>
                    <CardText>{recomendacion.recomendacion}</CardText>
                  </CardBody>
                </Card>
              ))}
            </div>
          </TabPanel>
        ))}
      </TabContext>
    </Fragment>
  );
}
