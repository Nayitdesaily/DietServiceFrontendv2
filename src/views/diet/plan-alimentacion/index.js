import Dieta from "./Dieta";
import mock from "../../../@fake-db/mock";


export default function PlanAlimentacion() {

    mock.restore()

    return  (
    <div>
        <h4>Plan Alimentacion</h4>
        <Dieta />
    </div>)
}