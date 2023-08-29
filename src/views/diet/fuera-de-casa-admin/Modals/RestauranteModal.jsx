import { Button, Modal, ModalHeader, ModalBody, Row, FormGroup, Label, Input, Col } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RestauranteModal({ toggle, modal, restauranteSelec, setRestauranteSelec, categorias }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
        chef_title: "",
        chef_image: "",
        chef_category: "",
    }
  });

  function Submit(data) {
    if(restauranteSelec != null) {
        axios.put(`http://localhost:8000/api/chefs/actualizar/${restauranteSelec?.chef_id}`, restauranteSelec).then((res) => console.log(res.data.message));
    } else {
        axios.post("http://localhost:8000/api/chefs/crear", data).then((res) => console.log(res.data.message));
    }
    toggle();
    setRestauranteSelec(null)
    reset();
  }

  function ActualizarRestaurante(e) {
    if(restauranteSelec != null) {
        let propiedad = e.target.name
        setRestauranteSelec((restaurante) => ({
            ...restaurante,
            [propiedad]: e.target.value,
          }));
    }
  }

  console.log(categorias)

  return (
    <div>
      <Modal isOpen={modal} toggle={() => {toggle(); reset(); setRestauranteSelec(null)}} scrollable={true}>
        <ModalHeader toggle={() => {toggle(); reset(); setRestauranteSelec(null)}}>Modal title</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(Submit)}>
            <Row>
              <Controller
                name="chef_title"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      placeholder="Ingrese el nombre de la categoria"
                      type="text"
                      {...field}
                      defaultValue={restauranteSelec?.chef_title}
                      
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarRestaurante(e)
                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="chef_category"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Categoria</Label>
                    <Input
                      placeholder="Ingrese el nombre de la categoria"
                      type="select"
                      {...field}
                      defaultValue={restauranteSelec?.chef_category}
                      
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarRestaurante(e)
                      }}
                    >
                          <option value={restauranteSelec?.chef_category ?  restauranteSelec.chef_category : ""}>{restauranteSelec?.chef_category ?  restauranteSelec.category_title : "Seleccione la categoria"}</option>

                      {
                        categorias.map(categoria => (
                          <option value={categoria.category_id}>{categoria.category_title}</option>

                        ))
                      }
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
