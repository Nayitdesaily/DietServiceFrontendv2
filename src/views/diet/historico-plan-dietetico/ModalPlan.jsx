import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, FormGroup, Label, Input, Col } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import ModalPlanSeccionTab from "./ModalPlanSeccionTab";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalPlan({ modal, toggle, filaSeleccionada, setFilaSeleccionada }) {
  const { handleSubmit, control, reset } = useForm({});
  const [dietas, setDietas] = useState([]);
  const [nutricionistas, setNutricionistas] = useState([]);
  
  function Submit(data) {
    console.log(data);
    console.log(dietas);
  }

  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://dietservice.bitjoins.pe/api/nutricionistas`).then((res) => {
        setNutricionistas(res.data);
      });
    }
    fetchData();
  }, []);

  console.log(nutricionistas);
  console.log(filaSeleccionada);

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle} fullscreen={true} scrollable={true}>
        <ModalHeader
          toggle={() => {
            toggle();
            reset();
            setFilaSeleccionada({});
          }}
        >
          Modal title
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(Submit)}>
            <Row>
              <Controller
                name="fecha de inicio"
                control={control}
                render={({ field: { value, ...field } }) => (
                  <FormGroup>
                    <Label>Fecha</Label>
                    <Input placeholder="Ingrese la fecha de inicio" type="date" {...field} />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Controller
                name="plan"
                control={control}
                defaultValue={filaSeleccionada?.plan}
                render={({ field }) => (
                  <FormGroup>
                    <Label>Plan</Label>
                    <Input placeholder="Ingrese el nombre del plan" type="text" {...field} />
                  </FormGroup>
                )}
              />
            </Row>

            <Row>
              <Col>
                <Controller
                  name="cliente"
                  control={control}
                  defaultValue={filaSeleccionada?.nutricionista_nombres}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Cliente</Label>
                      <Input placeholder="Seleccione el cliente" type="text" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="nutricionista"
                  control={control}
                  defaultValue={filaSeleccionada?.nutricionista_id}
                  render={({ field: { onChange, value } }) => (
                    <FormGroup>
                      <Label>Nutricionista</Label>
                      <Input
                        placeholder="Seleccione el nutricionista"
                        type="select"
                        onChange={(e) => onChange(e.target.value)}
                      >
                        <option value={filaSeleccionada?.nutricionista_id}>
                          {filaSeleccionada?.nutricionista_nombres}
                        </option>

                        {nutricionistas?.map((nutricionista, index) => (
                          <option key={index} value={nutricionista?.id}>
                            {nutricionista?.nombres}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  )}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Controller
                  name="tips"
                  control={control}
                  defaultValue={filaSeleccionada?.tips}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Tips</Label>
                      <Input placeholder="Ingrese el tip" type="textarea" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="notas"
                  control={control}
                  defaultValue={filaSeleccionada?.notas}
                  render={({ field }) => (
                    <FormGroup>
                      <Label>Notas</Label>
                      <Input placeholder="Ingresa las notas" type="textarea" {...field} />
                    </FormGroup>
                  )}
                />
              </Col>
            </Row>

            <ModalPlanSeccionTab planSeleccionado={filaSeleccionada} dietas={dietas} setDietas={setDietas} />

            <Button color="success" type="submit">
              Ok
            </Button>
            <Button
              color="secondary"
              onClick={() => {
                toggle();
                reset();
                setFilaSeleccionada({});
              }}
            >
              Cancel
            </Button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}
