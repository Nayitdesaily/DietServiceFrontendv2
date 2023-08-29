import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";
import { Button, Spinner } from "reactstrap";
import RestauranteModal from "./Modals/RestauranteModal";

export default function Restaurantes() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [pending, setPending] = useState(true);
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [restauranteSelec, setRestauranteSelec] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/chefs").then((res) => {
      setRestaurantes(res.data.data);
      setPending(false);
    });
    axios.get("http://localhost:8000/api/categorias-chef").then((res) => setCategorias(res.data.data));
  }, []);

  function EditarRestaurante(categoria) {
    toggle();
    setRestauranteSelec(categoria);
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row.chef_id,
      width: "6rem",
    },
    {
      name: "Imagen",
      selector: (row) => row.chef_image,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Nombre",
      selector: (row) => row.chef_title,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Categoria",
      selector: (row) => row.category_title,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <Edit onClick={() => EditarRestaurante(row)} color="gray" style={{ cursor: "pointer" }} />
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
            data={restaurantes}
            pagination
            noDataComponent={"No hay data"}
            progressPending={pending}
            progressComponent={<Spinner>Loading...</Spinner>}
          />
          <RestauranteModal
            toggle={toggle}
            modal={modal}
            restauranteSelec={restauranteSelec}
            setRestauranteSelec={setRestauranteSelec}
            categorias={categorias}
          />
        </div>
      ) : <Spinner>Loading...</Spinner>}
    </div>
  );
}
