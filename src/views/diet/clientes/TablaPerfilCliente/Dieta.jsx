import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SubDieta from "./TablaDieta.jsx/SubDieta";
import Recomendaciones from "./TablaDieta.jsx/Recomendaciones";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Card, CardBody, CardText, CardTitle } from "reactstrap";
import Ejercicios from "./TablaDieta.jsx/Ejercicios";
import Patologia from "./TablaDieta.jsx/Patologia";

export default function Dieta({ clienteSeleccionado }) {
  const [value, setValue] = useState("1");
  const [tips, setTips] = useState([]);
  const [planActual, setPlanActual] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function quitarTips(texto) {
    const lineas = texto?.split("\n");
    return lineas;
  }

  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/plan_alimentacion/last/${clienteSeleccionado?.data?.data.usuario_id}`)
      .then((res) => setPlanActual(res.data.data));
  }, []);

  useEffect(() => {
    setTips(quitarTips(planActual?.tips));
  }, [planActual]);

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Dieta" value="1" />
              <Tab label="Recomendaciones" value="2" />
              <Tab label="Ejercicios" value="3" />
              <Tab label="Patologias" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <SubDieta clienteSeleccionado={clienteSeleccionado} />
          </TabPanel>
          <TabPanel value="2">
            <Recomendaciones clienteSeleccionado={clienteSeleccionado} />
          </TabPanel>
          <TabPanel value="3">
            <Ejercicios clienteSeleccionado={clienteSeleccionado} />
          </TabPanel>
          <TabPanel value="4">
            <Patologia clienteSeleccionado={clienteSeleccionado} />
          </TabPanel>
        </TabContext>

        <div style={{ display: "flex" }}>
          <Card
            className="my-2"
            style={{
              width: "24rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                Tips
              </CardTitle>
              <CardText>
                {tips?.map((tip) => (
                  <p>{tip}</p>
                ))}
              </CardText>
            </CardBody>
          </Card>

          <Card
            className="my-2"
            style={{
              width: "25rem",
            }}
          >
            <CardBody>
              <CardTitle tag="h5" style={{ fontWeight: "bold" }}>
                Notas
              </CardTitle>
              <CardText>{planActual?.notas}</CardText>
            </CardBody>
          </Card>
        </div>
      </Box>
    </div>
  );
}
