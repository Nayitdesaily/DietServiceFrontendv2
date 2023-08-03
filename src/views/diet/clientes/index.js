import React, { Fragment, useState } from "react";

import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Typography from "@mui/material/Typography";
import TablaClientes from "./TablaClientes";
import EditarClientes from "./EditarCliente";
import PerfilCliente from "./PerfilCliente";

export default function Clientes() {
   const [tab, setTab] = useState("clientes");
   const [clienteSeleccionado, setClienteSeleccionado] = useState({});

   const handleChange = (event, newValue) => {
      setTab(newValue);
   };

   console.log(clienteSeleccionado)

   return (
      <Fragment>
         <TabContext value={tab}>
            <TabList onChange={handleChange} aria-label="simple tabs example">
               <Tab value="clientes" label="Clientes" />
               <Tab value="perfil" label="Perfil" />
               <Tab value="edicion" label="Edicion" />
            </TabList>

            <TabPanel value="clientes">
               <TablaClientes setTab={setTab} setClienteSeleccionado={setClienteSeleccionado}/>
            </TabPanel>

            <TabPanel value="perfil">
               <PerfilCliente clienteSeleccionado={clienteSeleccionado}/>
            </TabPanel>

            <TabPanel value="edicion">
               <EditarClientes clienteSeleccionado={clienteSeleccionado}/>
            </TabPanel>

         </TabContext>
      </Fragment>
   );
}
