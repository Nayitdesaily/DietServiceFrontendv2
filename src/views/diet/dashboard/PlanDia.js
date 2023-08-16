import React, { useEffect, useState } from "react";
import axios from "axios";
import {getUserData} from '../../../utility/Utils'

export default function PlanDia() {
  const [dieta, setDieta] = useState(null);
  const [idPlan, setIdPlan] = useState(null);
  const user = getUserData()

  useEffect(() => {
    async function ConseguirPlan() {
      await axios.get(`https://dietservice.bitjoins.pe/api/plan_alimentacion/last/${user.id}`).then((res) => {
        setIdPlan(res.data.data.id);
      });
    }
    ConseguirPlan();
  }, []);

  useEffect(() => {
    async function GetDietaHoy() {
      await axios.get(`https://dietservice.bitjoins.pe/api/plan-alimentacion-web/dieta-of-today/${idPlan}`).then((res) => {
        setDieta(res.data.data);
      });
    }
    GetDietaHoy();
  }, [idPlan]);

  return (
    <div>
      <h4>Plan Del Dia</h4>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          padding: "2rem 5rem",
          gap: "2rem",
        }}
      >
        {dieta?.length == 0 ? (
          <h5>No tienes un plan</h5>
        ) : (
          dieta?.comidas?.map((comida, index) => (
            <div
              key={index}
              style={{ display: "flex", justifyContent: "flex-start", gap: "5rem", alignItems: "center" }}
            >
              <p style={{ minWidth: "5rem" }}>
                {comida.comida == 1
                  ? "Desayuno"
                  : comida.comida == 2
                  ? "Almuerzo"
                  : comida.comida == 3
                  ? "Cena"
                  : comida.comida == 4
                  ? "Merienda"
                  : null}
              </p>
              <div
                style={{ flex: "1", padding: "1rem", backgroundColor: "#E5B359", color: "white", borderRadius: "1rem" }}
              >
                {comida.descripcion}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
