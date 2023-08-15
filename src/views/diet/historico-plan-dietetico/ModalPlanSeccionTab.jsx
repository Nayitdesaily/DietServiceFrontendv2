import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import Dieta from "./SeccionTab/Dieta";
import axios from "axios";

export default function ModalPlanSeccionTab({planSeleccionado, dietas, setDietas}) {
  const [value, setValue] = useState("dieta");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://dietservice.bitjoins.pe/api/plan-alimentacion/dietas/web/${planSeleccionado?.planalimentacion_id}`).then((res) => {
        setDietas(res.data);
      });
    }
    fetchData();
  }, []);

  
  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Dieta" value="dieta" />
              <Tab label="Recomendaciones" value="recomendaciones" />
              <Tab label="Ejercicios" value="ejercicios" />
              <Tab label="Patologia" value="patologia" />
            </TabList>
          </Box>
          <TabPanel value="dieta">
            <Dieta dietas={dietas} setDietas={setDietas}/>
          </TabPanel>
          <TabPanel value="recomendaciones">Item Two</TabPanel>
          <TabPanel value="ejercicios">Item Three</TabPanel>
          <TabPanel value="patologia">Item Three</TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
