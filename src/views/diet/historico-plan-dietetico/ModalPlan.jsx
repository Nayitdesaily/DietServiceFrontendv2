import { Button, Modal, ModalHeader, ModalBody, Row, FormGroup, Label, Input, Col } from "reactstrap";
import { Controller, useForm } from "react-hook-form";
import ModalPlanSeccionTab from "./ModalPlanSeccionTab";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ModalPlan({ modal, toggle, filaSeleccionada, setFilaSeleccionada, editarCopiar }) {
  const { handleSubmit, control, reset } = useForm({});
  const [dietas, setDietas] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [nutricionistas, setNutricionistas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [patologia, setPatologia] = useState([]);

  async function Submit(data) {
    if (editarCopiar == "Copiar") {
      await axios.post("https://dietservice.bitjoins.pe/api/plan_alimentacion/create_web", data).then((res) => {
        if ((res.status = 200)) {
          console.log(res)
          const planAlimentacionId = res?.data?.data?.id;
          dietas.map((dieta) => {
            dieta.map((comida) => {
              comida.planalimentacion_id = planAlimentacionId.toString();
              axios.post("https://dietservice.bitjoins.pe/api/dieta/create", comida).then((res) => console.log(res));
            });
          });
          recomendaciones.map((recomendacion) => {
            recomendacion.planalimentacion_id = planAlimentacionId.toString();
            axios.post("https://dietservice.bitjoins.pe/api/recomendaciones/create", recomendacion).then((res) => console.log(res));
          })
          ejercicios.map((ejercicio) => {
            ejercicio.planalimentacion_id = planAlimentacionId.toString();
            axios.post("http://localhost:8000/api/ejercicios/create", ejercicio).then((res) => console.log(res));
          })
          patologia?.map((patologia) => {
            patologia.planalimentacion_id = planAlimentacionId.toString();
            axios
              .post(`http://localhost:8000/api/crear-patologia-web`, patologia)
              .then((res) => {
                console.log(res);
              });
          });
        }
      });
    }

    if (editarCopiar == "Editar") {
      await axios
        .put(`http://localhost:8000/api/plan_alimentacion/actualizar/${filaSeleccionada?.planalimentacion_id}`, data)
        .then((res) => {
          if ((res.status = 200)) {
            console.log(res.data);
            const planAlimentacionId = filaSeleccionada?.planalimentacion_id;
            dietas.map((dieta) => {
              dieta.map((comida) => {
                comida.planalimentacion_id = planAlimentacionId.toString();
                if (comida?.id !== "") {
                  axios
                    .put(`http://localhost:8000/api/dieta/actualizar/${comida?.id}`, comida)
                    .then((res) => console.log(res.data.message));
                } else {
                  axios
                    .post("https://dietservice.bitjoins.pe/api/dieta/create", comida)
                    .then((res) => console.log(res.data.message));
                }
              });
            });

            recomendaciones.map((recomendacion) => {
              recomendacion.planalimentacion_id = planAlimentacionId.toString();
              if (recomendacion?.id != "") {
                axios
                  .put(`http://localhost:8000/api/recomendaciones/actualizar/${recomendacion?.id}`, recomendacion)
                  .then((res) => console.log(res.data));
              } else {
                axios
                  .post("https://dietservice.bitjoins.pe/api/recomendaciones/create", recomendacion)
                  .then((res) => console.log(res.data.message));
              }
            });

            ejercicios.map((ejercicio) => {
              ejercicio.planalimentacion_id = planAlimentacionId.toString();
              if (ejercicio?.id != "") {
                axios
                  .put(`http://localhost:8000/api/ejercicios/actualizar/${ejercicio?.id}`, ejercicio)
                  .then((res) => console.log(res.data.message));
              } else {
                axios.post("http://localhost:8000/api/ejercicios/create", ejercicio).then((res) => console.log(res.data.message));
              }
            });

            patologia?.map((patologia) => {
              patologia.planalimentacion_id = planAlimentacionId.toString();
              if(patologia.patologia_por_plan_id == '') {
                axios
                .post(`http://localhost:8000/api/crear-patologia-web`, patologia)
                .then((res) => {
                  console.log(res);
                });
              }
              
            });
          }
        });
    }

    toggle();
  }

  useEffect(() => {
    async function fetchData() {
      await axios.get(`https://dietservice.bitjoins.pe/api/nutricionistas`).then((res) => {
        setNutricionistas(res.data);
      });
      await axios.get(`https://dietservice.bitjoins.pe/api/usuarios-web`).then((res) => {
        setUsuarios(res.data);
      });
    }
    fetchData();
  }, []);

  return (
    <div>
      <Modal
        isOpen={modal}
        toggle={() => {
          toggle();
          setDietas([]);
          setRecomendaciones([]);
          setEjercicios([]);
          setPatologia([]);
          reset();
          setFilaSeleccionada({});
        }}
        fullscreen={true}
        scrollable={true}
      >
        <ModalHeader
          toggle={() => {
            toggle();
            setDietas([]);
            setRecomendaciones([]);
            setEjercicios([]);
            setPatologia([]);
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
                name="fecultimaact"
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
                name="nombre"
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
                  name="usuario_id"
                  control={control}
                  defaultValue={filaSeleccionada?.usuario_id}
                  render={({ field: { onChange, value } }) => (
                    <FormGroup>
                      <Label>Cliente</Label>
                      <Input
                        placeholder="Seleccione el cliente"
                        type="select"
                        onChange={(e) => onChange(e.target.value)}
                      >
                        <option value={filaSeleccionada?.usuario_id}>
                          {filaSeleccionada?.nombre} {filaSeleccionada?.apellido}
                        </option>

                        {usuarios
                          ?.filter((usuario) => usuario.usuario_id != filaSeleccionada?.usuario_id)
                          .map((usuario, index) => (
                            <option key={index} value={usuario?.usuario_id}>
                              {usuario?.nombre} {usuario?.apellido}
                            </option>
                          ))}
                      </Input>
                    </FormGroup>
                  )}
                />
              </Col>

              <Col>
                <Controller
                  name="nutricionista_id"
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

            <ModalPlanSeccionTab
              planSeleccionado={filaSeleccionada}
              dietas={dietas}
              setDietas={setDietas}
              recomendaciones={recomendaciones}
              setRecomendaciones={setRecomendaciones}
              ejercicios={ejercicios}
              setEjercicios={setEjercicios}
              patologia={patologia}
              setPatologia={setPatologia}
              editarCopiar={editarCopiar}
            />

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
