import { Button, Modal, ModalHeader, ModalBody, Row, FormGroup, Label, Input, Col } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlatoModal({ toggle, modal, platoSelec, setPlatoSelec, restaurantes }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      plate_title: "",
      plate_restaurant: "",
      plate_description: "",
      plate_type_food: "",
      plate_portion: "",
      plate_counter_like: "",
      plate_status: "",
    },
  });

  function Submit(data) {
    if (platoSelec != null) {
      axios
        .put(`http://localhost:8000/api/categorias/actualizar/${platoSelec?.plate_id}`, platoSelec)
        .then((res) => console.log(res.data.message));
    } else {
      axios.post("http://localhost:8000/api/platos/create", data).then((res) => console.log(res.data.message));
    }
    toggle();
    setPlatoSelec(null);
    reset();
  }

  function ActualizarPlato(e) {
    if (platoSelec != null) {
      let propiedad = e.target.name;
      setPlatoSelec((plato) => ({
        ...plato,
        [propiedad]: e.target.value,
      }));
    }
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => {
          toggle();
          reset();
          setPlatoSelec(null);
        }}
        scrollable={true}
      >
        <ModalHeader
          toggle={() => {
            toggle();
            reset();
            setPlatoSelec(null);
          }}
        >
          Modal title
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(Submit)}>
            <Row>
              <Controller
                name="plate_title"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      placeholder="Ingrese el nombre"
                      type="text"
                      {...field}
                      defaultValue={platoSelec?.plate_title}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarPlato(e);
                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="plate_restaurant"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      placeholder="Seleccione el restaurante"
                      type="select"
                      {...field}
                      defaultValue={platoSelec?.plate_restaurant}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarPlato(e);
                      }}
                    >
                      <option value={platoSelec?.plate_restaurant ? platoSelec.plate_restaurant : ""}>
                        {platoSelec?.plate_restaurant ? platoSelec.chef_title : "Seleccione el restaurante"}
                      </option>

                      {restaurantes.map((restaurante) => (
                        <option value={restaurante.chef_id}>{restaurante.chef_title}</option>
                      ))}
                    </Input>
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="plate_description"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Descripcion</Label>
                    <Input
                      placeholder="Ingrese la descripcion"
                      type="textarea"
                      {...field}
                      defaultValue={platoSelec?.plate_description}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarPlato(e);
                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="plate_type_food"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Tipo de comida</Label>
                    <Input
                      placeholder="Seleccione el restaurante"
                      type="select"
                      {...field}
                      defaultValue={platoSelec?.plate_type_food}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarPlato(e);
                      }}
                    >
                      <option value={platoSelec?.plate_type_food ? platoSelec.plate_type_food : ""}>
                        {platoSelec?.plate_type_food ? platoSelec.plate_type_food : "Selecciona el tipo de comida"}
                      </option>
                      <option value="Desayuno">Desayuno</option>
                      <option value="Almuerzo">Almuerzo</option>
                      <option value="Merienda">Merienda</option>
                      <option value="Cena">Cena</option>
                    </Input>
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="plate_portion"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Porcion</Label>
                    <Input
                      placeholder="Ingrese la porcion"
                      type="textarea"
                      {...field}
                      defaultValue={platoSelec?.plate_portion}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarPlato(e);
                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="plate_counter_like"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Likes</Label>
                    <Input
                      placeholder="Ingrese la porcion"
                      type="number"
                      {...field}
                      defaultValue={platoSelec?.plate_counter_like ? platoSelec?.plate_counter_like : 0}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarPlato(e);
                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="plate_status"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Tipo de comida</Label>
                    <Input
                      placeholder="Seleccione el restaurante"
                      type="select"
                      {...field}
                      defaultValue={platoSelec?.plate_status}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarPlato(e);
                      }}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Publish">Publish</option>
                    </Input>
                  </FormGroup>
                )}
              />
            </Row>

            {/* <Row>
              <Controller
                name="recipe_featured"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Destacado</Label>
                    <Input
                      placeholder="Seleccione el destacado"
                      type="select"
                      {...field}
                      defaultValue={recetaSelec?.recipe_featured}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)

                      }}
                    >
                        <option value="">Seleccione el destacado</option>
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                        
                    </Input>
                  </FormGroup>
                )}
              />
            </Row> */}

            <Button color="success" type="submit">
              Ok
            </Button>
            <Button color="secondary">Cancel</Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
