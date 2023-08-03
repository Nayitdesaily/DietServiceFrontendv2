import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Col, Form, FormGroup, Input, Row, Spinner } from "reactstrap";
import mock from "../../../@fake-db/mock";


export default function TablaListaIntercambio(){

    mock.restore()

    const [intercambios, setIntercambios] = useState([]);
    const [pending, setPending] = useState(true);
    const [categorias, setCategorias] = useState([]);
    const [data, setData] = useState([]);
    const [filtroCategoria, setFiltroCategoria] = useState("")

    const columns = [
        {
            name: "Categoria",
            selector: (row) => row.categoria,
            sortable: true,
            width: '15rem',
            center: true
        },
        {
            name: "Grupo",
            selector: (row) => row.grupo,
            sortable: true,
            width: '16rem',
            center: true
        },
        {
            name: "Alimento",
            selector: (row) => row.alimento,
            width: '15rem',
            center: true
        },
        {
            name: "Media Casera",
            selector: (row) => row.mediacasera,
            sortable: true,
            width: '15rem',
            center: true
        },
        {
            name: "Cantidad Exacta",
            selector: (row) => row.cantidadexacta,
            sortable: true,
            width: '15rem',
            center: true
        }
    ];

    function filter(array) {
        return array.filter(
           (intercambio) =>
              intercambio.categoria.includes(filtroCategoria)
            );
    }

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:8000/api/intercambios").
            then((res) => {
                let categorias = res.data?.map(objeto => objeto.categoria);
                categorias = [...new Set(categorias)];
                setCategorias(categorias); 
                setData(res.data)
            });
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            await axios.get("http://localhost:8000/api/intercambios").
            then((res) => {setIntercambios(res.data); console.log(res.data)});
            setPending(false);
        }
        fetchData();
    }, []);

    useEffect(() => {
        let result = filter(data);
        setIntercambios(result);
    }, [filtroCategoria]);

    return (
    <div>
        <Form>
            <Row>
            <Col md={6}>
                <FormGroup>
                <Input id="exampleEmail" name="email" placeholder="with a placeholder" type="select" onChange={(e) => setFiltroCategoria(e.target.value)}>
                    <option value="">
                        Selecciona la categoria
                    </option>
                    {
                        categorias.map((categoria, index )=> (
                            <option value={categoria} key={index}>
                                {categoria}
                            </option>
                        ))
                    }
                </Input>
                </FormGroup>
            </Col>
            <Col md={6}>
                <FormGroup>
                <Input id="examplePassword" name="password" placeholder="Ejem." type="text" />
                </FormGroup>
            </Col>
            </Row>
        </Form>
        <DataTable
            columns={columns}
            data={intercambios}
            pagination
            noDataComponent={"No hay data"}
            progressPending={pending}
            progressComponent={<Spinner>Loading...</Spinner>}
         />
    </div>)
}