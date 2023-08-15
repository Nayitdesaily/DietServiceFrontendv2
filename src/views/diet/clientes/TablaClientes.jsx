import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, User } from "react-feather";
import { Button, Spinner } from "reactstrap";
import mock from "../../../@fake-db/mock";


export default function TablaClientes({ setTab, setClienteSeleccionado }) {

   mock.restore()

   const [clientes, setClientes] = useState([]);
   const [pending, setPending] = useState(true);

   useEffect(() => {
      async function fetchData() {
         await axios.get("https://dietservice.bitjoins.pe/api/web/personas").then((res) => {setClientes(res.data.data)});
         setPending(false);
      }
      fetchData();
   }, []);

   async function enviarEditarCliente(id) {
      await axios.get(`https://dietservice.bitjoins.pe/api/web/personas/${id}`).then((res) => {
         setClienteSeleccionado(res);
         if (res.status === 200) {
            setTab("edicion");
         }
      });
   }

   async function EnviarAPerfil(id) {
      await axios.get(`https://dietservice.bitjoins.pe/api/web/personas/${id}`).then((res) => {
         setClienteSeleccionado(res);
         if (res.status === 200) {
            setTab("perfil");
         }
      });
   }

   const columns = [
      {
         name: "Item",
         selector: (row, index) => index + 1,
         center: true,
         maxWidth: "2rem",
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
         sortable: true,
         minWidth: "16rem",
      },
      {
         name: "Telefono",
         selector: (row) => row.telefono,
         center: true,
      },
      {
         name: "Ocupacion",
         selector: (row) => row.ocupacion,
         sortable: true,
         minWidth: "14rem",
         wrap: true,
      },
      {
         name: "Talla",
         selector: (row) => `${row.talla} cm`,
         center: true,
         sortable: true,
      },
      {
         name: "Peso Ideal",
         selector: (row) =>
            row.peso_ideal == null || row.peso_ideal == "-" || row.peso_ideal == "."
               ? `0 kg `
               : `${row.peso_ideal} kg `,
         center: true,
         sortable: true,
      },
      {
         name: "Distrito",
         selector: (row) => row.distrito,
         center: true,
      },
      {
         cell: (row) => (
            <div>
               <Edit color="gray" onClick={() => enviarEditarCliente(row.id)} style={{cursor: 'pointer'}}/>
               <User color="gray" onClick={() => EnviarAPerfil(row.id)} style={{cursor: 'pointer'}}/>
            </div>
         ),
      },
   ];

   return (
      <div>
         <DataTable
            columns={columns}
            data={clientes}
            pagination
            noDataComponent={"No hay data"}
            progressPending={pending}
            progressComponent={<Spinner>Loading...</Spinner>}
         />
      </div>
   );
}
