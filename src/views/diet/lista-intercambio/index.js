import TablaListaIntercambio from "./TablaListaIntercambio";
import mock from "../../../@fake-db/mock";

export default function ListaIntercambio() {

    mock.restore()

    return (

    <div>
      <h4>Lista Intercambio</h4>
      
      <TablaListaIntercambio />
    </div>
  );
}
