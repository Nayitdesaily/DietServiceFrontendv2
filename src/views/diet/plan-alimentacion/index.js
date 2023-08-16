import mock from "../../../@fake-db/mock";
import Planes from "./Planes";

export default function PlanAlimentacion() {

    mock.restore()

    return  (
    <div>
        <h4>Plan Alimentacion</h4>
        <br />
        <Planes />
    </div>)
}