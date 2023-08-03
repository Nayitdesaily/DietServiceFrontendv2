import React, { Fragment, useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import mock from "../../../@fake-db/mock";
import axios from "axios";
import ModalRecetario from "./ModalRecetario";
import { Spinner } from "reactstrap";

export default function Recetario() {
  mock.restore();

  const [tab, setTab] = useState(1);
  const [categoria, setCategoria] = useState([]);
  const [recetas, setRecetas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState({});
  const [modal, setModal] = useState(false);
  const urlBaseReceta = "https://intranet.dietservice.pe/appdiet/images/";

  const toggle = () => setModal(!modal);

  useEffect(() => {
    async function getData() {
      await axios.get("http://localhost:8000/api/categorias").then((res) => setCategoria(res.data.data));

      await axios.get("http://localhost:8000/api/recetas").then((res) => setRecetas(res.data.data));
    }

    getData();
  }, []);

  useEffect(() => {
    setTab(categoria?.[0]?.category_id);
  }, [categoria]);

  function SeleccionarReceta(receta) {
    setRecetaSeleccionada(receta);
  }

  console.log(recetas)

  return (
    <Fragment>
      {recetas?.length == 0 ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Spinner>Loading...</Spinner>
        </div>
      ) : (
        
        <TabContext value={tab}>
          <TabList
            onChange={(e, newValue) => {
              setTab(newValue);
            }}
            aria-label="simple tabs example"
          >
            {categoria.map((categoria, index) => (
              <Tab value={categoria.category_id} label={categoria.category_title} key={index} />
            ))}
          </TabList>

          {categoria.map((categoria, index) => (
            <TabPanel value={categoria.category_id} key={index}>
              <ul style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
                {recetas
                  .filter((receta) => receta.recipe_category == categoria.category_id)
                  .map((receta, index) => (
                    <li
                      key={index}
                      style={{
                        listStyle: "none",
                        cursor: "pointer",
                        width: "25rem",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                        borderRadius: "1.5rem 1.5rem 0 0",
                      }}
                      onClick={() => {
                        toggle();
                        SeleccionarReceta(receta);
                      }}
                    >
                      <img
                        src={`${urlBaseReceta}/${receta.recipe_image}`}
                        style={{
                          width: "100%",
                          height: "15rem",
                          objectFit: "cover",
                          borderRadius: "1.5rem 1.5rem 0 0",
                        }}
                      />
                      <h3 style={{ fontSize: "1.25rem", textAlign: "center", paddingTop: ".5rem" }}>
                        {receta.recipe_title}
                      </h3>
                    </li>
                  ))}
              </ul>
            </TabPanel>
          ))}
        </TabContext>
      )}

      <ModalRecetario toggle={toggle} modal={modal} receta={recetaSeleccionada} />
    </Fragment>
  );
}
