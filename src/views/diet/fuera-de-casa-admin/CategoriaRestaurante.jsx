import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";
import { Button, Spinner } from "reactstrap";
import CategoriaModal from "./Modals/CategoriaModal";
import CategoriaRestauranteModal from "./Modals/CategoriaRestauranteModal";

export default function CategoriaRestaurante() {
  const [categorias, setCategorias] = useState([]);
  const [pending, setPending] = useState(true);
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [categoriaSelec, setCategoriaSelec] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/categorias-chef").then((res) => {setCategorias(res.data.data); setPending(false);});
    
  }, []);

  function EditarCategoria(categoria) {
    toggle();
    setCategoriaSelec(categoria);
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row.category_id,
      width: "6rem",
    },
    {
      name: "Image",
      selector: (row) => row.category_title,
      width: "20rem",
      sortable: true,
    },
    {
      name: "Titulo",
      selector: (row) => row.category_title,
      width: "50rem",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <Edit onClick={() => EditarCategoria(row)} color="gray" style={{ cursor: "pointer" }} />
          <Trash color="gray" style={{ cursor: "pointer" }} />
        </div>
      ),
      center: true,
      width: "8rem",
    },
    {},
  ];

  return (
    <div>
      {pending == false ? (
        <div>
          <Button onClick={toggle} color="success">
            Nuevo
          </Button>
          <DataTable
            columns={columns}
            data={categorias}
            pagination
            noDataComponent={"No hay data"}
            progressPending={pending}
            progressComponent={<Spinner>Loading...</Spinner>}
          />
          <CategoriaRestauranteModal
            toggle={toggle}
            modal={modal}
            categoriaSelec={categoriaSelec}
            setCategoriaSelec={setCategoriaSelec}
          />
        </div>
      ) : (
        <Spinner>Loading...</Spinner>
      )}
    </div>
  );
}
