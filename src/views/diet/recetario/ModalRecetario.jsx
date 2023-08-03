import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

export default function ModalRecetario({ toggle, modal, receta }) {
  const urlBaseReceta = "https://intranet.dietservice.pe/appdiet/images/";

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{receta.recipe_title}</ModalHeader>
        <ModalBody style={{ padding: "0" }}>
          <div>
            <img
              src={`${urlBaseReceta}/${receta.recipe_image}`}
              style={{ width: "100%", height: "20rem", objectFit: "cover" }}
            />
          </div>
          <div style={{padding: '1rem 2rem'}}>
            {receta?.recipe_description}

            <br />
            <br />

            <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
              <div>
                <h5>Tiempo</h5>
                <p>{receta.recipe_time} minutos</p>
              </div>

              <div>
                <h5>Calorias</h5>
                <p>{receta.recipe_cals} calorias</p>
              </div>
            </div>

            <div>
              <h5>Ingredientes</h5>
              <ul>
                {receta?.recipe_ingredients?.split(",").map((ingrediente, index) => (
                  <li key={index}>{ingrediente}</li>
                ))}
              </ul>
            </div>

            <div>
              <h5>Instrucciones</h5>
              <ol>
                {receta?.recipe_directions
                  ?.split(".")
                  .filter((ingrediente) => ingrediente.trim().length > 2)
                  .map((ingrediente, index) => (
                    <li key={index}>{ingrediente}</li>
                  ))}
              </ol>
            </div>

          </div>
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
