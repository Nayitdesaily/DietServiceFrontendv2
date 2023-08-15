import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardText, CardTitle, Form, FormGroup, Input, Label, Spinner } from "reactstrap";

export default function SubDieta({ clienteSeleccionado }) {
  const [planActual, setPlanActual] = useState({});
  const [dietas, setDietas] = useState([]);
  const [opcion, setOpcion] = useState(1);
  const [pending, setPending] = useState(false);

  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/plan_alimentacion/last/${clienteSeleccionado?.data?.data.usuario_id}`)
      .then((res) => setPlanActual(res.data.data));

    if(dietas.length == 0){
        setPending(false)
    }
  }, []);

  useEffect(() => {
    axios.get(`https://dietservice.bitjoins.pe/api/plan-alimentacion/dietas/${planActual?.id}`).then((res) => {
      setDietas(res.data.data);
      setPending(true)

    });
  }, [planActual]);

  useEffect(() => {}, [opcion]);

  return (
    <div>
      {
      pending == false ? (
        <Spinner>Loading...</Spinner>
      ) : (
        <div>
          <Input name="opcion" type="select" onChange={(e) => setOpcion(e.target.value)}>
            {dietas?.map((dieta, index) => (
              <option key={index} value={dieta?.opcion}>
                Opcion {index + 1}
              </option>
            ))}
          </Input>
          <br />
          <div style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}>
            <div style={{ display: "flex", alignItems: "center", backgroundColor: "#ACE1AF", borderRadius: "1rem" }}>
              <h5 style={{ width: "10rem", padding: "1rem", fontWeight: "bold", margin: "0" }}>Comida</h5>
              <h5 style={{ width: "40rem", padding: "1rem", fontWeight: "bold", margin: "0" }}>Instrucciones</h5>
            </div>
            {dietas
              ?.filter((dieta) => dieta.opcion == opcion)
              .map((dieta) =>
                dieta?.comidas?.map((comida) => (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "1rem",
                      backgroundColor: "#F7E7CE50",
                    }}
                  >
                    <h5 style={{ width: "10rem", padding: "1rem", verticalAlign: "middle", margin: "0" }}>
                      {comida.comida == 1
                        ? "Desayuno"
                        : comida.comida == 2
                        ? "Almuerzo"
                        : comida.comida == 3
                        ? "Cena"
                        : comida.comida == 4
                        ? "Meriendas"
                        : null}
                    </h5>
                    <h5 style={{ width: "40rem", padding: "1rem", margin: "0" }}>{comida.descripcion}</h5>
                  </div>
                ))
              )}
          </div>
          
        </div>
      )}
    </div>
  );
}
