import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Spinner } from "reactstrap";

export default function Ejercicios({ clienteSeleccionado }) {
  const [ejercicios, setEjercicios] = useState([]);
  const [planActual, setPlanActual] = useState({});
  const [pending, setPending] = useState(true);


  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/plan_alimentacion/last/${clienteSeleccionado?.data?.data.usuario_id}`)
      .then((res) => setPlanActual(res?.data.data));
  }, []);

  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/ejercicios/${planActual?.id}`)
      .then((res) => res?.data.data ? setEjercicios([res?.data.data]) : setEjercicios([]) );
      setPending(false)
  }, [planActual]);

  const columns = [
    {
      name: "Ejercicio",
      selector: (row) => row?.tipoejercicio,
      sortable: true,
      width: "20rem",
    },
    {
      name: "Instrucciones",
      selector: (row) => row?.observaciones,
      sortable: true,
      width: "30rem",
      wrap: true,
    }
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={ejercicios}
        pagination
        noDataComponent={"No hay data"}
        progressPending={pending}
        progressComponent={<Spinner>Loading...</Spinner>}
      />
    </div>
  );
}
