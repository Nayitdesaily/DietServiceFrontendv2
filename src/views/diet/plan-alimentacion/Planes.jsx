import { useEffect, useState } from "react";
import { getUserData } from "../../../utility/Utils";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Planes() {
  const [planes, setPlanes] = useState([]);
  const user = getUserData();

  useEffect(() => {
    axios.get(`https://dietservice.bitjoins.pe/api/plan_alimentacion/usuario/web/${user.id}`).then((res) => setPlanes(res.data));
  }, []);

  return (
    <ul
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
      {planes?.map((plan, index) => (
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
            minWidth: "50rem",
            borderRadius: "1rem",
            boxShadow: "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
            textAlign: 'center'
          }}
        >
          {plan.plan}
        </Link>
      ))}
    </ul>
  );
}
