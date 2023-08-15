import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";
import { Button, Spinner } from "reactstrap";
import ModalObservacion from "./ModalObservacion";

export default function TablaEvolucion() {
  const [evolucion, setEvolucion] = useState([]);
  const [pending, setPending] = useState(true);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [observacion, setObservacion] = useState("");

  function verObservacion(observacion) {
    setObservacion(observacion);
  }

  useEffect(() => {
    async function fetchData() {
      await axios.get("https://dietservice.bitjoins.pe/api/evolucion/6616").then((res) => {
        setEvolucion(res.data.data);
        console.log(res.data.data);
      });
      setPending(false);
    }
    fetchData();
  }, []);

  console.log(evolucion);

  const columns = [
    {
      name: "Fecha",
      selector: (row) => row.fecha,
      sortable: true,
      width: "8rem",
    },
    {
      name: "Estado Peso",
      selector: (row) => row.fecha,
      sortable: true,
      width: "9rem",
    },
    {
      name: "Peso",
      selector: (row) => row.peso,
      width: "8rem",
    },
    {
      name: "Estado Imc",
      selector: (row) => row.imc,
      sortable: true,
      width: "9rem",
      wrap: true,
    },
    {
      name: "% grasa",
      selector: (row) => row.p_grasa,
      sortable: true,
      width: "8rem",
    },
    {
      name: "% Masa corporal",
      selector: (row) => row.p_masa,
      sortable: true,
      width: "10.8rem",
      center: true,
    },
    {
      name: "Cintura",
      selector: (row) => row.cintura,
      width: "6rem",
    },
    {
      name: "Otra medida",
      selector: (row) => row.otramedida,
      width: "8rem",
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
