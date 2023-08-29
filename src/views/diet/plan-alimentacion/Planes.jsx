import { useEffect, useState } from "react";
import { getUserData } from "../../../utility/Utils";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

export default function Planes() {
  const [planes, setPlanes] = useState([]);
  const user = getUserData();

  useEffect(() => {
    axios
      .get(`https://dietservice.bitjoins.pe/api/plan_alimentacion/usuario/web/${user.id}`)
      .then((res) => setPlanes(res.data));
  }, []);

  const ImprimirPlan = (plan) => {
    const urlPDF = `https://intranet.dietservice.pe/clientemovil/impresionplan/${plan}`;

    const a = document.createElement('a');
    a.href = urlPDF;
    a.target = '_blank';
    a.download = 'mi-archivo.pdf';
    a.click();
  };

  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "center",
        // alignItems: "flex-start",  
        gap: "1rem",
      }}
    >
      {planes?.map((plan, index) => (
        <li style={{listStyle: 'none', width: '80rem', display: 'flex',gap: '1rem'}}>
          <Link
            to={`${plan.planalimentacion_id}`}
            key={index}
            style={{
              listStyle: "none",
              cursor: "pointer",
              padding: "1rem 3rem",
              backgroundColor: "#E09540",
              color: "white",
              fontWeight: "700",
              minWidth: "30rem",
              borderRadius: "1rem",
              boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
              textAlign: "center",
            }}
          >
            {plan.plan}
          </Link>
          <span> </span>
          <Button color="success" style={{borderRadius: '1rem', padding: '1rem 3rem'}} onClick={() => ImprimirPlan(plan.planalimentacion_id)}>Imprimir Plan</Button>
        </li>
      ))}
    </ul>
  );
}
