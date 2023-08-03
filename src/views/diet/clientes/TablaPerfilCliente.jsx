import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState } from "react";
import Evolucion from "./TablaPerfilCliente/Evolucion";
import { Button, Spinner } from "reactstrap";
import ModalCrearEvolucion from "./TablaPerfilCliente/ModalCrearEvolucion";

export default function TablaPerfilCliente({clienteSeleccionado}) {
  const [value, setValue] = useState(0);
  const [modal, setModal] = useState(false);
  const toggle = () => {setModal(!modal)};

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }

  return (
    <div style={{display: 'flex', justifyContent: 'flex-start', width: '100%', overflowX: 'auto'}}>
      <Box sx={{bgcolor: "background.paper", display: "flex", }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}>

          <Tab label="Estado" {...a11yProps(0)} />
          <Tab label="Evolucion" {...a11yProps(1)} />
          <Tab label="Dieta" {...a11yProps(2)} />

        </Tabs>

        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1} >
                <Button type="submit" onClick={(event) => {event.preventDefault(); toggle() }}>Nueva Evolucion</Button>
                <br />
                <br />
                <Evolucion clienteSeleccionado={clienteSeleccionado} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>

      </Box>
      <ModalCrearEvolucion toggle={toggle} modal={modal}/>

    </div>
  );
}
