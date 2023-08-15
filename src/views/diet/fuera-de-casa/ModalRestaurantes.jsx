import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap";

export default function ModalResaturantes({ modal, toggle, restauranteSeleccionado, urlBaseRestaurant }) {
  const [platos, SetPlatos] = useState([]);

  useEffect(() => {
    async function getData() {
      await axios.get("https://dietservice.bitjoins.pe/api/platos").then((res) => SetPlatos(res.data.data));
    }
    getData();
  }, []);

  console.log(platos);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{/* {restauranteSeleccionado?.chef_title} */}</ModalHeader>
        <ModalBody style={{ padding: "0" }}>
          <div>
            <img
              src={`${urlBaseRestaurant}/${restauranteSeleccionado?.chef_image}`}
              style={{ width: "100%", height: "20rem", objectFit: "cover" }}
            />
          </div>
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "1rem",
              listStyle: "none",
              alignItems: "center",
              marginTop: "1rem",
              paddingLeft: '0',
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'
            }}
          >
            {platos
              ?.filter((plato) => plato.plate_restaurant == restauranteSeleccionado?.chef_id)
              .map((plato) => (
                <li
                  style={{
                    padding: "1.5rem",
                    width: "60%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: '#E5E4E2',
                    borderRadius: '2rem',
                    color: 'black'
                  }}
                >
                  <h3 style={{color: 'black'}}>{plato.plate_title}</h3>
                  <div style={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: '2rem' }}>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                      <h5 style={{fontWeight: 'bold', color: 'black'}}>Porcion</h5>
                      <p style={{textAlign: 'center'}}>{plato.plate_portion}</p>
                    </div>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                      <h5 style={{fontWeight: 'bold', color: 'black'}}>Tipo de comida</h5>
                      <p style={{textAlign: 'center'}}>{plato.plate_type_food}</p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
