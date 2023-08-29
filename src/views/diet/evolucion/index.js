import { Fragment } from "react";
import TablaEvolucion from "./TablaEvolucion";
import GraficoEvolucionPeso from "./GraficoEvolucionPeso";
import GraficoEvolucionIMC from "./GraficoEvolucionIMC";
import GraficoEvolucionGrasa from "./GraficoEvolucionGrasa";
import mock from "../../../@fake-db/mock";

export default function Evolucion() {

mock.restore()

    return (
        <Fragment>
            <div>
                <h4>Evolucion Tratamiento Nutricional</h4>
                <TablaEvolucion/>
                <GraficoEvolucionPeso />
                <br />
                <GraficoEvolucionIMC />
                <br />
                <GraficoEvolucionGrasa />
            </div>
        </Fragment>
    )
}