import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";

export default function Dieta() {
  const [planActual, setPlanActual] = useState({});
  const [dietas, setDietas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/plan_alimentacion/last/6616").then((res) => setPlanActual(res.data.data));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/plan-alimentacion/dietas/${planActual.id}`)
      .then((res) => setDietas(res.data.data));
  }, [planActual]);

  console.log(dietas);

  return (
    <div>
      <h4>Dieta</h4>
      {dietas?.length == 0 ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Spinner>Loading...</Spinner>
        </div>
      ) : (
        <ul>
          {dietas?.map((dieta, index) => (
            <li key={index} style={{ listStyle: "none" }}>
              <h4>
                Dieta # {index + 1} | {
                dieta.fecha_inicio_dia == "Monday" ? "Lunes" :  
                dieta.fecha_inicio_dia == "Tuesday" ? "Martes" : 
                dieta.fecha_inicio_dia == "Wednesday" ? "Miercoles" : 
                dieta.fecha_inicio_dia == "Thursday" ? "Jueves" : 
                dieta.fecha_inicio_dia == "Friday" ? "Viernes" : 
                dieta.fecha_inicio_dia == "Saturday" ? "Sabado" : 
                dieta.fecha_inicio_dia == "Sunday" ? "Domingo" : 
                null}
              </h4>
              <ul>
                {dieta?.comidas?.map((comida, index) => (
                  <li key={index} style={{ listStyle: "none" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", justifyContent: "flex-start" }}>
                      <h5 style={{ minWidth: "7rem" }}>
                        {comida?.comida == 1
                          ? "Desayuno"
                          : comida?.comida == 2
                          ? "Almuerzo"
                          : comida?.comida == 3
                          ? "Cena"
                          : comida?.comida == 4
                          ? "Meriendas"
                          : null}
                      </h5>
                      <p
                        style={{
                          width: "50rem",
                          padding: "1rem",
                          backgroundColor: "#E5B359",
                          color: "white",
                          borderRadius: "1rem",
                        }}
                      >
                        {comida?.descripcion}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
