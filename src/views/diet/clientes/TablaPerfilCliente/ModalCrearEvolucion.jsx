import axios from "axios";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

export default function ModalCrearEvolucion({ modal, toggle, clienteSeleccionado, setEvolucion }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({});

  const [registroExitoso, setRegistroExitoso] = useState(false)
  const [registroTexto, setRegistroTexto] = useState("Registrar")

  async function CrearEvolucion(data) {
    await axios.post("https://dietservice.bitjoins.pe/api/evolucion/create", data)
    .then(res => {
      if(res.status == 200){
        setRegistroExitoso(true)
      }
    })
  }

  async function ConseguirEvoluciones() {
    await axios.get(`https://dietservice.bitjoins.pe/api/evolucion/${clienteSeleccionado?.data?.data?.usuario_id}`).then((res) => {
      setEvolucion(res.data.data);
    });
  }

  async function onSubmit(data) {
    setRegistroTexto("Registrando...")
    data.usuario_id = clienteSeleccionado?.data?.data?.usuario_id
    data.label_otra = "1"
    await CrearEvolucion(data)
    await ConseguirEvoluciones()
    console.log(data)

    if(registroExitoso == true){
      toggle()
      setRegistroTexto("Registrar")
    }
  }

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={(event) => {
          event.preventDefault();
          toggle();
        }}
        autoFocus={true}
        size="lg"
        fullscreen={"lg"}
      >
        <ModalHeader
          toggle={(event) => {
            event.preventDefault();
            toggle();
          }}
        >
          Registrar Evolucion
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Controller
                name="fecha"
                control={control}
                render={({ field }) => (
                  <FormGroup>
                    <Label>Fecha</Label>
                    <Input placeholder="Ingrese tipo de usuario" type="date" {...field} />
                  </FormGroup>
                )}
              />
            </Row>
            <Row>
              <Col>
                <Controller
                  name="peso"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Peso</Label>
                      <Input placeholder="Ingrese el peso" type="text" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="imc"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>IMC</Label>
                      <Input placeholder="Ingrese el % imc" type="text" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="p_grasa"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>% Grasa</Label>
                      <Input placeholder="Ingrese % de grasa" type="text" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="p_masa"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>% Masa</Label>
                      <Input placeholder="Ingrese % de masa" type="text" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Controller
                  name="cintura"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Medida Cintura</Label>
                      <Input placeholder="Ingrese la medida" type="text" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="otramedida"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Otra Medida</Label>
                      <Input placeholder="Ingrese la medida" type="text" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Controller
                  name="observaciones"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Observaciones</Label>
                      <Input placeholder="Ingrese las observaciones" type="textarea" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="actividades"
                  control={control}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Actividades</Label>
                      <Input placeholder="Ingrese las actividades" type="textarea" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>
            </Row>
            <Button color="success" type="submit" >
              {registroTexto}
            </Button>
            <span></span>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
