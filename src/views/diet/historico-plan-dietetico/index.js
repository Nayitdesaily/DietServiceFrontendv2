import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import { Tab } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "reactstrap";
import axios from "axios";
import mock from "../../../@fake-db/mock";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import PropTypes from "prop-types";
import ModalPlan from "./ModalPlan";

export default function HistoricoPlanDietetico({ direction }) {
  mock.restore();

  const [tab, setTab] = useState("historico");
  const [planAlimentacion, setPlanAlimentacion] = useState([]);
  const [pending, setPending] = useState(true);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [filaSeleccionada, setFilaSeleccionada] = useState({})

  const [modal, setModal] = useState(false);
  const toggleModalPlan = () => setModal(!modal);

  const toggleDropdown = (row) => {
    if (selectedRow === row) {
      setDropdownOpen(!dropdownOpen);
    } else {
      setDropdownOpen(true);
      setSelectedRow(row);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await axios.get("https://dietservice.bitjoins.pe/api/plan_alimentacion").then((res) => {
        setPlanAlimentacion(res.data);
      });
      setPending(false);
    }
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const columns = [
    {
      cell: (row) => (
          <Dropdown isOpen={dropdownOpen && selectedRow === row} toggle={() => toggleDropdown(row)} direction={direction}>
            <DropdownToggle caret>Opciones</DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Detalle</DropdownItem>
              <DropdownItem onClick={toggleModalPlan}>Editar</DropdownItem>
              <DropdownItem onClick={() => {toggleModalPlan(); setFilaSeleccionada(row)}}>Copiar</DropdownItem>
            </DropdownMenu>
          </Dropdown>
      ),
    },
    {
      name: "Item",
      selector: (row, index) => index + 1,
      center: true,
      maxWidth: "2rem",
    },
    {
      name: "Plan",
      selector: (row) => row.plan,
      minWidth: "12rem",
      sortable: true,
    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      minWidth: "12rem",
      sortable: true,
    },
    {
      name: "Cliente",
      selector: (row) => `${row.nombre} ${row.apellido}`,
      minWidth: "12rem",
      sortable: true,
    },
    {
      name: "Usuario",
      selector: (row) => row.email,
      minWidth: "12rem",
      sortable: true,
    },
    {
      name: "Distrito",
      selector: (row) => row.estado,
      minWidth: "12rem",
      sortable: true,
    },
    {
      name: "Fecha",
      selector: (row) => row.fecultimaact,
      minWidth: "12rem",
      sortable: true,
    },
    {
      name: "Nutricionista",
      selector: (row) => row.nutricionista_nombres,
      minWidth: "12rem",
      sortable: true,
    },
    {
      name: "Contacto",
      selector: (row) => row.contacto,
      minWidth: "12rem",
      sortable: true,
    },
  ];

  return (
    <div>
      <Fragment>
        <TabContext value={tab}>
          <TabList onChange={handleChange} aria-label="simple tabs example">
            <Tab value="historico" label="Historico" />
            <Tab value="plan" label="Plan" />
            <Tab value="galeria" label="Galeria" />
          </TabList>

          <TabPanel value="historico">
            <DataTable
              columns={columns}
              data={planAlimentacion}
              pagination
              noDataComponent={"No hay data"}
              progressPending={pending}
              progressComponent={<Spinner>Loading...</Spinner>}
            />
            <ModalPlan modal={modal} toggle={toggleModalPlan} filaSeleccionada={filaSeleccionada} setFilaSeleccionada={setFilaSeleccionada}/>
          </TabPanel>

          <TabPanel value="plan"></TabPanel>

          <TabPanel value="galeria"></TabPanel>
        </TabContext>
      </Fragment>
    </div>
  );
}

HistoricoPlanDietetico.propTypes = {
  direction: "down",
};
