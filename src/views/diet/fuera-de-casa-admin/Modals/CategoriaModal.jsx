import { Button, Modal, ModalHeader, ModalBody, Row, FormGroup, Label, Input, Col } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoriaModal({ toggle, modal, categoriaSelec, setCategoriaSelec }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
        category_title: "",
    }
  });

  function Submit(data) {
    if(categoriaSelec != null) {
        axios.put(`http://localhost:8000/api/categorias/actualizar/${categoriaSelec?.category_id}`, categoriaSelec).then((res) => console.log(res.data.message));
    } else {
        axios.post("http://localhost:8000/api/categorias/crear", data).then((res) => console.log(res.data.message));
    }
    toggle();
    setCategoriaSelec(null)
    reset();
  }

  function ActualizarCategoria(e) {
    if(categoriaSelec != null) {
        let propiedad = e.target.name
        setCategoriaSelec((categoria) => ({
            ...categoria,
            [propiedad]: e.target.value,
          }));
    }
  }

  return (
    <div>
      <Modal isOpen={modal} toggle={() => {toggle(); reset(); setCategoriaSelec(null)}} scrollable={true}>
        <ModalHeader toggle={() => {toggle(); reset(); setCategoriaSelec(null)}}>Modal title</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(Submit)}>
            <Row>
              <Controller
                name="category_title"
                control={control}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormGroup>
                    <Label>Nombre</Label>
                    <Input
                      placeholder="Ingrese el nombre de la categoria"
                      type="text"
                      {...field}
                      defaultValue={categoriaSelec?.category_title}
                      
                      onChange={(e) => {
                        onChange(e.target.value);
                        ActualizarCategoria(e)
                      }}
                    />
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
