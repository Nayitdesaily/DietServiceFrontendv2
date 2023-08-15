import { useEffect, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, FormGroup, Input, Label, Row } from "reactstrap";
import { Trash } from "react-feather";

export default function Dieta({ dietas, setDietas }) {
  const [open, setOpen] = useState("1");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const eliminarElemento = (indice) => {
    const nuevosItems = [...dietas];
    nuevosItems.splice(indice, 1);
    setDietas(nuevosItems);
  };


  const [filaHover, setFilaHover] = useState(null);

  const handleMouseEnter = (filaId) => {
    setFilaHover(filaId);
  };

  const handleMouseLeave = () => {
    setFilaHover(null);
  };

  const handleChange = (event, dietaIndex, comidaIndex) => {
    const { value } = event.target;
    setDietas((prevDietas) =>
      prevDietas.map((dieta, index) =>
        index === dietaIndex ? dieta.map((comida, index) => index === comidaIndex ? {...comida, descripcion: value} : comida) : dieta
      )
    );
  };

  return (
    <ul>
      {dietas.map((dieta, index) => (
        <li key={index} style={{ listStyle: "none" }}>
          <Accordion open={open} toggle={toggle} style={{ padding: 0, margin: 0 }}>
            <AccordionItem>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Trash
                  size={20}
                  onClick={() => eliminarElemento(index)}
                  style={{
                    color: filaHover === index ? 'red' : 'black',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                />

                <AccordionHeader targetId={index}> Opcion # {index + 1}</AccordionHeader>
              </div>
              <AccordionBody accordionId={index}>
                {dieta.map((comida, indexComida) => (
                  <Row key={indexComida}>
                    <FormGroup>
                      <Label>
                        {comida.comida == 1
                          ? "Desayuno"
                          : comida.comida == 2
                          ? "Almuerzo"
                          : comida.comida == 3
                          ? "Cena"
                          : comida.comida == 4
                          ? "Merienda"
                          : null}
                      </Label>
                      <Input name="descripcion" placeholder="Ingrese la comida" type="textarea" defaultValue={comida?.descripcion} 
                      onChange={(e) => handleChange(e, index, indexComida)}
                      />
                    </FormGroup>
                  </Row>
                ))}
              </AccordionBody>
            </AccordionItem>
          </Accordion>
        </li>
      ))}
    </ul>
  );
}
