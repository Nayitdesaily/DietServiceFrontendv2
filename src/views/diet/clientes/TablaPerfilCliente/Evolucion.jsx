import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Button, Spinner } from "reactstrap";

export default function Evolucion({clienteSeleccionado}){

    const [evolucion, setEvolucion] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        async function fetchData() {
          await axios.get("http://localhost:8000/api/evolucion/6616").then((res) => {
            setEvolucion(res.data.data);
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
            
        </div>
    )
}