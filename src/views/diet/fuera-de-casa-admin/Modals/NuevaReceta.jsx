import { Button, Modal, ModalHeader, ModalBody, Row, FormGroup, Label, Input, Col } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NuevaReceta({ toggle, modal, recetaSelec, setRecetaSelec, categorias }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
        recipe_title: "",
        recipe_description: "",
        recipe_time: "",
        recipe_servings: "",
        recipe_cals: "",
        recipe_category: "",
        recipe_ingredients: "",
        recipe_directions: "",
        recipe_notes: "",
        recipe_status: "",
        recipe_featured: "",
    }
  });

  function Submit(data) {
    if(recetaSelec != null) {
        axios.put(`http://localhost:8000/api/recetas-web/actualizar/${recetaSelec?.recipe_id}`, recetaSelec).then((res) => console.log(res.data.message));
    } else {
        axios.post("http://localhost:8000/api/recetas-web/crear", data).then((res) => console.log(res.data.message));
    }
    toggle();
    setRecetaSelec(null)
    reset();
  }

  function ActualizarReceta(e) {
    if(recetaSelec != null) {
        let propiedad = e.target.name
        setRecetaSelec((receta) => ({
            ...receta,
            [propiedad]: e.target.value,
          }));
    }
  }

  console.log(recetaSelec)

  return (
    <div>
      <Modal isOpen={modal} toggle={() => {toggle(); reset(); setRecetaSelec(null)}} scrollable={true}>
        <ModalHeader toggle={() => {toggle(); reset(); setRecetaSelec(null)}}>Modal title</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(Submit)}>
            <Row>
              <Controller
                name="recipe_title"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Titulo</Label>
                    <Input
                      placeholder="Ingrese el nombre del restaurante"
                      type="text"
                      {...field}
                      defaultValue={recetaSelec?.recipe_title}
                      
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)
                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="recipe_description"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Descripcion</Label>
                    <Input
                      placeholder="Ingrese el nombre del restaurante"
                      type="textarea"
                      {...field}
                      defaultValue={recetaSelec?.recipe_description}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)

                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Col>
                <Controller
                  name="recipe_time"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormGroup>
                      <Label>Tiempo</Label>
                      <Input
                        placeholder="Ingrese el nombre del restaurante"
                        type="text"
                        {...field}
                        defaultValue={recetaSelec?.recipe_time}
                        onChange={(e) => {
                            onChange(e.target.value);
                            ActualizarReceta(e)

                          }}
                      />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="recipe_servings"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormGroup>
                      <Label>Porciones</Label>
                      <Input
                        placeholder="Ingrese el nombre del restaurante"
                        type="text"
                        {...field}
                        defaultValue={recetaSelec?.recipe_servings}
                        onChange={(e) => {
                            onChange(e.target.value);
                        ActualizarReceta(e)

                          }}
                      />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="recipe_cals"
                  control={control}
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormGroup>
                      <Label>Calorias</Label>
                      <Input
                        placeholder="Ingrese el nombre del restaurante"
                        type="text"
                        {...field}
                        defaultValue={recetaSelec?.recipe_cals}
                        onChange={(e) => {
                            onChange(e.target.value);
                        ActualizarReceta(e)

                          }}
                      />
                    </FormGroup>
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Controller
                name="recipe_category"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Categoria</Label>
                    <Input
                      placeholder="Seleccione la categoria"
                      type="select"
                      {...field}
                      defaultValue={recetaSelec?.recipe_category}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)

                      }}
                    >
                        <option value={recetaSelec?.recipe_category}>{recetaSelec?.recipe_category ? recetaSelec.category_title : 'Seleccione el tipo'}</option>
                        {
                            categorias?.filter(categoria => categoria.category_id !== recetaSelec?.recipe_category).map((categoria) => (
                                <option value={categoria.category_id}>{categoria.category_title}</option>

                            ))
                        }
                    </Input>
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="recipe_ingredients"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Ingredientes</Label>
                    <Input
                      placeholder="Ingrese los ingredientes"
                      type="textarea"
                      {...field}
                      defaultValue={recetaSelec?.recipe_ingredients}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)

                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="recipe_directions"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Instrucciones</Label>
                    <Input
                      placeholder="Ingrese las instrucciones"
                      type="textarea"
                      {...field}
                      defaultValue={recetaSelec?.recipe_directions}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)

                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="recipe_notes"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Tips</Label>
                    <Input
                      placeholder="Ingrese algun tip"
                      type="textarea"
                      {...field}
                      defaultValue={recetaSelec?.recipe_notes}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)

                      }}
                    />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
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
            </Row>

            <Row>
              <Controller
                name="recipe_status"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Estado</Label>
                    <Input
                      placeholder="Seleccione el estado"
                      type="select"
                      {...field}
                      defaultValue={recetaSelec?.recipe_status}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e)

                      }}
                    >
                        <option value="">Seleccione el destacado</option>
                        <option value="Draft">Draft</option>
                        <option value="Publish">Publish</option>
                        
                    </Input>
                  </FormGroup>
                )}
              />
            </Row>

            {/* <Row>
              <Controller
                name="recipe_status"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Categoria</Label>
                    <Input
                      placeholder="Seleccione la categoria"
                      type="file"
                      {...field}
                      defaultValue={recetaSelec?.recipe_featured}
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarReceta(e);
                      }}
                    >
                        <option value="">Seleccione el destacado</option>
                        <option value="Draft">Draft</option>
                        <option value="Publish">Publish</option>
                        
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
