import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";
import { Button, Spinner } from "reactstrap";
import ModalObservacion from "./ModalObservacion";
import {getUserData} from '../../../utility/Utils'

export default function TablaEvolucion() {
  const [evolucion, setEvolucion] = useState([]);
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [observacion, setObservacion] = useState("");
  const user = getUserData()

  function verObservacion(observacion) {
    setObservacion(observacion);
  }

  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://dietservice.bitjoins.pe/api/evolucion/${user.id}`).then((res) => {
        setEvolucion(res.data.data);
        console.log(res.data.data);
      });
      setPending(false);
    }
    fetchData();
  }, []);

  const columns = [
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      width: "10rem",
      center: true
    },
    {
      name: "Estado Peso",
      selector: (row) => row.fecha,
      sortable: true,
      width: "10rem",
      center: true

    },
    {
      name: "Peso",
      selector: (row) => row.peso,
      width: "10rem",
      center: true

    },
    {
      name: "Estado Imc",
      selector: (row) => row.imc,
      sortable: true,
      width: "10rem",
      wrap: true,
      center: true

    },
    {
      name: "% grasa",
      selector: (row) => row.p_grasa,
      sortable: true,
      width: "10rem",
      center: true

    },
    {
      name: "% Masa corporal",
      selector: (row) => row.p_masa,
      sortable: true,
      width: "13rem",
      center: true,
      center: true

    },
    {
      name: "Cintura",
      selector: (row) => row.cintura,
      width: "10rem",
      center: true

    },
    {
      name: "Otra medida",
      selector: (row) => row.otramedida,
      width: "10rem",
      center: true,
    },
    {
      name: "Observacion",
      cell: (row) => (
        <Button
          color="warning"
          onClick={() => {
            toggle();
            verObservacion(row.observacion);
          }}
        >
          Ver Observacion
        </Button>
      ),
      center: true,
      width: "20rem",
      style: "padding: 1rem",
    },
  ];

  return (
    <div>
      <div>
        <DataTable
          columns={columns}
          data={evolucion}
          pagination
          noDataComponent={"No hay data"}
          progressPending={pending}
          progressComponent={<Spinner>Loading...</Spinner>}
        />
      </div>
      <ModalObservacion modal={modal} toggle={toggle} observacion={observacion} />
    </div>
  );
}
