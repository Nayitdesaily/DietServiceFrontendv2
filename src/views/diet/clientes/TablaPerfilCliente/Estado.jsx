import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import {  Spinner } from "reactstrap";

export default function Estado({clienteSeleccionado}) {
  const [evolucion, setEvolucion] = useState([]);
  const [pending, setPending] = useState(true);

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
  ];

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`http://localhost:8000/api/evolucion/${clienteSeleccionado?.data?.data?.usuario_id}`)
        .then((res) => {
          setEvolucion(res.data.data);
        });
      setPending(false);
    }
    fetchData();
  }, []);

  return (
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
  );
}
