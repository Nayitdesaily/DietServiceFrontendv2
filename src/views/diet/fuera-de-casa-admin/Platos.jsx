import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Edit, Trash } from "react-feather";
import { Button, Spinner } from "reactstrap";
import RestauranteModal from "./Modals/RestauranteModal";
import PlatoModal from "./Modals/PlatoModal";

export default function Platos() {
  const [restaurantes, setRestaurantes] = useState([]);
  const [pending, setPending] = useState(true);
  const toggle = () => setModal(!modal);
  const [modal, setModal] = useState(false);
  const [platoSelec, setPlatoSelec] = useState(null);
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/chefs").then((res) => {
      setRestaurantes(res.data.data);
      setPending(false);
    });
    axios.get("http://localhost:8000/api/platos-web").then((res) => setPlatos(res.data.data));
  }, []);

  function EditarPlatos(categoria) {
    toggle();
    setPlatoSelec(categoria);
  }

  const columns = [
    {
      name: "Id",
      selector: (row) => row.plate_id,
      width: "6rem",
    },
    {
      name: "Imagen",
      selector: (row) => row.plate_image,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Titulo",
      selector: (row) => row.plate_title,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Restaurante",
      selector: (row) => row.plate_restaurant,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Tipo de comida",
      selector: (row) => row.plate_type_food,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Porcion",
      selector: (row) => row.plate_portion,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Like",
      selector: (row) => row.plate_counter_like,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.plate_status,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Acciones",
      cell: (row) => (
        <div>
          <Edit onClick={() => EditarPlatos(row)} color="gray" style={{ cursor: "pointer" }} />
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
            data={platos}
            pagination
            noDataComponent={"No hay data"}
            progressPending={pending}
            progressComponent={<Spinner>Loading...</Spinner>}
          />
          <PlatoModal
            toggle={toggle}
            modal={modal}
            platoSelec={platoSelec}
            setPlatoSelec={setPlatoSelec}
            restaurantes={restaurantes}
          />
        </div>
      ) : <Spinner>Loading...</Spinner>}
    </div>
  );
}
