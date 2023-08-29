import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash, User } from "react-feather";
import { Button, Spinner } from "reactstrap";
import NuevaReceta from "./Modals/NuevaReceta";

export default function Recetas() {
  const [recetas, setRecetas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [pending, setPending] = useState(true);
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [recetaSelec, setRecetaSelec] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/recetas-web").then((res) => {setRecetas(res.data.data); setPending(false);});
    axios.get("http://localhost:8000/api/categorias").then((res) => setCategorias(res.data.data));
  }, []);

  function EditarReceta(receta) {
    toggle();
    setRecetaSelec(receta);
  }

  const columns = [
    {
      name: "Titulo",
      selector: (row) => row.recipe_title,
      width: "25rem",
    },
    {
      name: "Categoria",
      selector: (row) => row.category_title,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Tiempo",
      selector: (row) => row.recipe_time,
      sortable: true,
      width: "8rem",
    },
    {
      name: "Porciones",
      selector: (row) => row.recipe_servings,
      center: true,
    },
    {
      name: "Calorias",
      selector: (row) => row.recipe_cals,
      sortable: true,
      width: "8rem",
      wrap: true,
    },
    {
      name: "Destacado",
      selector: (row) => row.recipe_featured,
      center: true,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Status",
      selector: (row) => row.recipe_status,
      center: true,
      sortable: true,
      width: "10rem",
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <Edit onClick={() => EditarReceta(row)} color="gray" style={{ cursor: "pointer" }} />
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
            data={recetas}
            pagination
            noDataComponent={"No hay data"}
            progressPending={pending}
            progressComponent={<Spinner>Loading...</Spinner>}
          />
          <NuevaReceta
            toggle={toggle}
            modal={modal}
            recetaSelec={recetaSelec}
            setRecetaSelec={setRecetaSelec}
            categorias={categorias}
          />
        </div>
      ) : (
        <Spinner>Loading...</Spinner>
      )}
    </div>
  );
}
