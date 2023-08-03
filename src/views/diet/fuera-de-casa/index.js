import React, { Fragment, useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import mock from "../../../@fake-db/mock";
import axios from "axios";
import { Spinner } from "reactstrap";
import ModalResaturantes from "./ModalRestaurantes";
import Avatar from '@mui/material/Avatar';

export default function FueraDeCasa() {

  mock.restore();
  const [tab, setTab] = useState(1);
  const [categoria, setCategoria] = useState([]);
  const [restaurantes, setRestaurantes] = useState([]);
  const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(null);
  const urlBaseRestaurant = "https://intranet.dietservice.pe/appdiet/images/";
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  function selecccionarRestaurante(restaurante) {
    setRestauranteSeleccionado(restaurante);
  }

  useEffect(() => {
    async function getData() {
      await axios.get("http://localhost:8000/api/categorias-chef").then((res) => setCategoria(res.data.data));
      await axios.get("http://localhost:8000/api/chefs").then((res) => setRestaurantes(res.data.data));
    }
    getData();
  }, []);

  useEffect(() => {
    setTab(categoria?.[0]?.category_id);
  }, [categoria]);

  return (
    <Fragment>
      {restaurantes.length == 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              <Tab icon={<Avatar src={`${urlBaseRestaurant}/${categoria.category_image}`} />}  value={categoria.category_id} label={categoria.category_title} key={index} />
            ))}
          </TabList>

          {categoria.map((categoria, index) => (
            <TabPanel value={categoria.category_id} key={index}>
              <ul
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                }}
              >
                {restaurantes
                  .filter((restaurante) => restaurante.chef_category == categoria.category_id)
                  .map((restaurante, index) => (
                    <li
                      key={index}
                      style={{
                        listStyle: "none",
                        position: "relative",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        borderRadius: "1rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {toggle(); selecccionarRestaurante(restaurante)}}
                    >
                      <div>
                        <h3
                          style={{
                            color: "white",
                            position: "absolute",
                            top: "10%",
                            left: "5%",
                            zIndex: "2",
                            fontSize: "1rem",
                            padding: ".5rem 1rem",
                            backgroundColor: "#568203",
                            borderRadius: ".5rem",
                          }}
                        >
                          {categoria.category_title}
                        </h3>
                        <img
                          src={`${urlBaseRestaurant}/${restaurante.chef_image}`}
                          style={{
                            width: "19rem",
                            height: "10rem",
                            objectFit: "cover",
                            filter: "brightness(30%)",
                            borderRadius: "1rem",
                          }}
                        />
                        <h2
                          style={{
                            position: "absolute",
                            bottom: "5%",
                            left: "5%",
                            margin: "0",
                            color: "white",
                          }}
                        >
                          {restaurante.chef_title}
                        </h2>
                      </div>
                    </li>
                  ))}
              </ul>
            </TabPanel>
          ))}
          <ModalResaturantes modal={modal} toggle={toggle} urlBaseRestaurant={urlBaseRestaurant} restauranteSeleccionado={restauranteSeleccionado} />
        </TabContext>
      )}
    </Fragment>
  );
}
