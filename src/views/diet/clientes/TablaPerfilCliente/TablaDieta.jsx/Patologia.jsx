import React, { useEffect, useState } from "react";
import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from "reactstrap";
import axios from "axios";

export default function Patologia({clienteSeleccionado}) {
  const [open, setOpen] = useState("1");
  const [planActual, setPlanActual] = useState({});
  const [patologia, setPatologia] = useState({})

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/plan_alimentacion/last/${clienteSeleccionado?.data?.data.usuario_id}`)
      .then((res) => setPlanActual(res?.data?.data));
  }, []);

  useEffect(() => {
    if(planActual != undefined){
        axios
        .get(`https://dietservice.bitjoins.pe/api/patologias/${planActual?.id}`)
        .then((res) => setPatologia(res?.data));
    }
   
  },[planActual])

  console.log(patologia)

  return (
    <div>
      <Accordion open={open} toggle={toggle} style={{width: '50rem'}}>
        <AccordionItem>
          <AccordionHeader targetId="1">{patologia.nombre ? patologia.nombre : 'Ninguna'}</AccordionHeader>
          <AccordionBody accordionId="1">
            {patologia?.descripcion}
          </AccordionBody>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
