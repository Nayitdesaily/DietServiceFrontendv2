import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import Dieta from "./SeccionTab/Dieta";
import axios from "axios";
import {
  Input,
  Label,
  Row,
  FormGroup,
  Col,
  AccordionHeader,
  AccordionItem,
  Accordion,
  AccordionBody,
  Button,
} from "reactstrap";
import { Trash } from "react-feather";
import { Controller, useForm } from "react-hook-form";

export default function ModalPlanSeccionTab({
  planSeleccionado,
  dietas,
  setDietas,
  recomendaciones,
  setRecomendaciones,
  ejercicios,
  setEjercicios,
  patologia,
  setPatologia,
  editarCopiar
}) {
  const [value, setValue] = useState("dieta");
  const { control } = useForm({});
  const [filaHover, setFilaHover] = useState(null);
  const [open, setOpen] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    async function fetchData() {
      await axios
        .get(
          `https://dietservice.bitjoins.pe/api/plan-alimentacion/dietas/web/${planSeleccionado?.planalimentacion_id}`
        )
        .then((res) => {
          setDietas(res.data);
        });

      await axios
        .get(`https://dietservice.bitjoins.pe/api/recomendaciones-web/${planSeleccionado?.planalimentacion_id}`)
        .then((res) => {
          setRecomendaciones(res.data);
        });

      await axios
        .get(`http://localhost:8000/api/ejercicios-web/${planSeleccionado?.planalimentacion_id}`)
        .then((res) => {
          setEjercicios(res.data);
        });

      await axios
        .get(`http://localhost:8000/api/patologias-web/${planSeleccionado?.planalimentacion_id}`)
        .then((res) => {
          setPatologia(res.data);
        })
    }

    fetchData();

    
  }, []);

  useEffect(() => {
    if(editarCopiar == 'Copiar') {
      patologia?.map(patologia => {
        patologia.patologia_por_plan_id = ''
      })
    }
  }, patologia)

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const handleMouseEnter = (filaId) => {
    setFilaHover(filaId);
  };

  const handleMouseLeave = () => {
    setFilaHover(null);
  };

  const handleChangeRecomendacion = (event, recomendacionIndex) => {
    const { value } = event.target;
    setRecomendaciones((prevRecomendacion) =>
      prevRecomendacion.map((recomendacion, index) =>
        index === recomendacionIndex ? { ...recomendacion, recomendacion: value } : recomendacion
      )
    );
  };

  const handleChangeTipo = (event, recomendacionIndex) => {
    const { value } = event.target;
    setRecomendaciones((prevRecomendacion) =>
      prevRecomendacion.map((recomendacion, index) =>
        index === recomendacionIndex ? { ...recomendacion, tipo: value } : recomendacion
      )
    );
  };

  function agregarRecomendacion() {
    setRecomendaciones((recomendaciones) => [
      ...recomendaciones,
      {
        recomendacion: "",
        id: "",
        tipo: "",
        planalimentacion_id: "",
      },
    ]);
  }

  const handleChangeTipoEjercicio = (event, ejercicioIndex) => {
    const { value } = event.target;
    setEjercicios((prevEjercicio) =>
      prevEjercicio.map((ejercicio, index) =>
        index === ejercicioIndex ? { ...ejercicio, tipoejercicio: value } : ejercicio
      )
    );
  };

  const handleChangeTiempo = (event, ejercicioIndex) => {
    const { value } = event.target;
    setEjercicios((prevEjercicio) =>
      prevEjercicio.map((ejercicio, index) => (index === ejercicioIndex ? { ...ejercicio, tiempo: value } : ejercicio))
    );
  };

  const handleChangeObservaciones = (event, ejercicioIndex) => {
    const { value } = event.target;
    setEjercicios((prevEjercicio) =>
      prevEjercicio.map((ejercicio, index) =>
        index === ejercicioIndex ? { ...ejercicio, observaciones: value } : ejercicio
      )
    );
  };

  function agregarEjercicio() {
    setEjercicios((ejercicio) => [
      ...ejercicio,
      {
        tipoejercicio: "",
        id: "",
        tiempo: "",
        planalimentacion_id: "",
        observaciones: "",
      },
    ]);
  }

  console.log(patologia)

  function eliminarRecomendacion(indice, id){

    const nuevosItems = [...recomendaciones];

    if(editarCopiar == 'Copiar'){
      nuevosItems.splice(indice, 1);
      setRecomendaciones(nuevosItems);
    }

    if(editarCopiar == 'Editar') {
      if(id != ''){
        axios.delete(`http://localhost:8000/api/recomendaciones/eliminar/${id}`).then((res) => {
          console.log(res.data)
        });
        nuevosItems.splice(indice, 1);
        setRecomendaciones(nuevosItems);
      } else {
        nuevosItems.splice(indice, 1);
        setRecomendaciones(nuevosItems);
      } 
    }
  };
  
  function eliminarEjercicio(indice, id){
    const nuevosItems = [...ejercicios];

    if(editarCopiar == 'Copiar') {
      nuevosItems.splice(indice, 1);
      setEjercicios(nuevosItems);
    }

    if(editarCopiar == 'Editar') {
      if(id != ''){
        axios.delete(`http://localhost:8000/api/ejercicios/eliminar/${id}`).then((res) => {
          console.log(res.data)
        });
        nuevosItems.splice(indice, 1);
        setEjercicios(nuevosItems);
      } else {
        nuevosItems.splice(indice, 1);
      setEjercicios(nuevosItems);
      }
    }
  };

  return (
    <div>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Dieta" value="dieta" />
              <Tab label="Recomendaciones" value="recomendaciones" />
              <Tab label="Ejercicios" value="ejercicios" />
              <Tab label="Patologia" value="patologia" />
            </TabList>
          </Box>

          <TabPanel value="dieta">
            <Dieta dietas={dietas} setDietas={setDietas} editarCopiar={editarCopiar} plan_id={planSeleccionado?.planalimentacion_id}/>
          </TabPanel>

          <TabPanel value="recomendaciones">
            <Button color="success" onClick={() => agregarRecomendacion()}>
              Agregar opcion
            </Button>

            <ul>
              {recomendaciones.map((recomendacion, index) => (
                <li key={index} style={{ listStyle: "none" }}>
                  <Accordion open={open} toggle={toggle} style={{ padding: 0, margin: 0 }}>
                    <AccordionItem>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Trash
                          size={20}
                    onClick={() => eliminarRecomendacion(index, recomendacion?.id)}
                          style={{
                            color: filaHover === index ? "red" : "black",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        />
                        <AccordionHeader targetId={index}> Opcion {index + 1}</AccordionHeader>
                      </div>

                      <AccordionBody accordionId={index}>
                        <Row>
                          <Col>
                            <Controller
                              name="tipo"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                  <Label>Tipo</Label>
                                  <Input
                                    placeholder="Ingrese el tipo"
                                    type="select"
                                    defaultValue={recomendacion?.tipo}
                                    onChange={(e) => {
                                      handleChangeTipo(e, index);
                                      onChange(e.target.value);
                                    }}
                                  >
                                    <option value="">Seleccione el tipo</option>
                                    <option value="1">Pautas Generales</option>
                                    <option value="2">Alimentos Prohibidos</option>
                                    <option value="3">Prohibidos (Consumo Mensual)</option>
                                    <option value="4">No olvidar</option>
                                  </Input>
                                </FormGroup>
                              )}
                            />
                          </Col>

                          <Col>
                            <Controller
                              name="recomendacion"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                  <Input
                                    placeholder="Ingrese la recomendacion"
                                    type="textarea"
                                    onChange={(e) => {
                                      handleChangeRecomendacion(e, index);
                                      onChange(e.target.value);
                                    }}
                                    defaultValue={recomendacion?.recomendacion}
                                  />
                                </FormGroup>
                              )}
                            />
                          </Col>
                        </Row>
                      </AccordionBody>
                    </AccordionItem>
                  </Accordion>
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel value="ejercicios">
            <Button color="success" onClick={() => agregarEjercicio()}>
              Agregar opcion
            </Button>

            <ul>
              {ejercicios.map((ejercicio, index) => (
                <li key={index} style={{ listStyle: "none" }}>
                  <Accordion open={open} toggle={toggle} style={{ padding: 0, margin: 0 }}>
                    <AccordionItem>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Trash
                          size={20}
                          onClick={() => eliminarEjercicio(index, ejercicio?.id)}
                          style={{
                            color: filaHover === index ? "red" : "black",
                            cursor: "pointer",
                          }}
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
                        />
                        <AccordionHeader targetId={index}> Opcion {index + 1}</AccordionHeader>
                      </div>

                      <AccordionBody accordionId={index}>
                        <Row>
                          <Col>
                            <Controller
                              name="tipoejercicio"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                  <Label>Tipo Ejercicio</Label>
                                  <Input
                                    placeholder="Ingrese el tipo"
                                    type="text"
                                    defaultValue={ejercicio?.tipoejercicio}
                                    onChange={(e) => {
                                      handleChangeTipoEjercicio(e, index);
                                      onChange(e.target.value);
                                    }}
                                  />
                                </FormGroup>
                              )}
                            />
                          </Col>

                          <Col>
                            <Controller
                              name="tiempo"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                  <Label>Tiempo</Label>
                                  <Input
                                    placeholder="Ingrese la recomendacion"
                                    type="textarea"
                                    onChange={(e) => {
                                      handleChangeTiempo(e, index);
                                      onChange(e.target.value);
                                    }}
                                    defaultValue={ejercicio?.tiempo}
                                  />
                                </FormGroup>
                              )}
                            />
                          </Col>

                          <Col>
                            <Controller
                              name="observaciones"
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <FormGroup>
                                  <Label>Observaciones</Label>
                                  <Input
                                    placeholder="Ingrese la recomendacion"
                                    type="textarea"
                                    onChange={(e) => {
                                      handleChangeObservaciones(e, index);
                                      onChange(e.target.value);
                                    }}
                                    defaultValue={ejercicio?.observaciones}
                                  />
                                </FormGroup>
                              )}
                            />
                          </Col>
                        </Row>
                      </AccordionBody>
                    </AccordionItem>
                  </Accordion>
                </li>
              ))}
            </ul>
          </TabPanel>

          <TabPanel value="patologia">
            {patologia.length < 1 ? (
              "No tiene patologias"
            ) : (
              <ul>
                {patologia?.map((patologia, index) => (
                  <li key={index} style={{ listStyle: "none" }}>
                    <Accordion open={open} toggle={toggle} style={{ padding: 0, margin: 0 }}>
                      <AccordionItem>
                        <AccordionHeader targetId={index}> {patologia.nombre}</AccordionHeader>

                        <AccordionBody accordionId={index}>
                          <div dangerouslySetInnerHTML={{ __html: patologia.descripcion }} />
                        </AccordionBody>
                      </AccordionItem>
                    </Accordion>
                  </li>
                ))}
              </ul>
            )}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
}
