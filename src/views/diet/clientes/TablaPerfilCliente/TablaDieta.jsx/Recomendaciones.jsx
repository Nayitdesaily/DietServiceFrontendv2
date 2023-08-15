import axios from "axios";
import { useEffect, useState } from "react";
import { Input } from "reactstrap";

export default function Recomendaciones({ clienteSeleccionado }) {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [opcion, setOpcion] = useState(1);

  useEffect(() => {
    axios
      .get(
        `https://dietservice.bitjoins.pe/api/plan-alimentacion/recomendaciones/${clienteSeleccionado?.data?.data.usuario_id}`
      )
      .then((res) => setRecomendaciones(res.data.data));
  }, []);

  useEffect(() => {}, [opcion])

  return (
    <div style={{width: '50rem'}}>
      <Input name="opcion" type="select" onChange={(e) => setOpcion(e.target.value)}>
        {recomendaciones?.map((recomendacion, index) => (
          <option key={index} value={recomendacion?.tipo}>
            {recomendacion?.tipo == 1
              ? "Pautas Generales"
              : recomendacion?.tipo == 2
              ? "Alimentos Permitidos"
              : recomendacion?.tipo == 3
              ? "Prohibidos (Consumo Mensual)"
              : recomendacion?.tipo == 4
              ? "No Olvidar"
              : null}
          </option>
        ))}
      </Input>
      <br />
      {recomendaciones
        .filter((recomendacion) => recomendacion.tipo == opcion)
        .map((recomendacion) => (
          <p style={{ margin: "0", backgroundColor: "#EDEAE0", padding: '1.5rem', borderRadius: '.5rem' }}>{recomendacion?.recomendacion}</p>
        ))}
    </div>
  );
}
