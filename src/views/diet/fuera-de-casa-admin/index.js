import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';
import Recetas from './Recetas';
import Categorias from './Categorias';
import Restaurantes from './Restaurantes';
import CategoriaRestaurante from './CategoriaRestaurante';
import Platos from './Platos';
export default function FueraDeCasa() {

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <Box sx={{ width: '100%' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Recetas" value="1" />
            <Tab label="Categorias" value="2" />
            <Tab label="Restaurantes" value="3" />
            <Tab label="Cat. Restaurante" value="4" />
            <Tab label="Platos" value="5" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <Recetas />
        </TabPanel>
        <TabPanel value="2">
            <Categorias />
        </TabPanel>
        <TabPanel value="3">
          <Restaurantes />
        </TabPanel>
        <TabPanel value="4">
          <CategoriaRestaurante />
        </TabPanel>
        <TabPanel value="5">
          <Platos />
        </TabPanel>
      </TabContext>
    </Box>

  );
}
