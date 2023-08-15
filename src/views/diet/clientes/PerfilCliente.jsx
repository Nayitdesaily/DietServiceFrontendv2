import StatsVertical from '@components/widgets/stats/StatsVertical'
import {Eye} from 'react-feather'
import TablaPerfilCliente from './TablaPerfilCliente'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PerfilCliente({clienteSeleccionado}){

    const [ultimaEvolucion, setUltimaEvolucion] = useState({})
    const [consultorio, setConsultorio] = useState({});
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        axios.get(`https://dietservice.bitjoins.pe/api/ultima-evolucion/${clienteSeleccionado?.data.data.usuario_id}`)
        .then(res => setUltimaEvolucion(res.data))
        axios.get("https://dietservice.bitjoins.pe/api/consultorios").then((res) => {
            const consultorio = res.data.filter(consultorio => consultorio?.id === clienteSeleccionado?.data.data.consultorio_id);   
            setConsultorio(consultorio)});
        axios.get("https://dietservice.bitjoins.pe/api/empresas").then((res) => setEmpresas(res.data));

    }, [])

    console.log(consultorio)

    return(
        <div style={{display: 'flex', gap: '1rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '30rem', }}>
                <div style={{display: 'flex', flexDirection: 'column', gap: '.25rem'}}>
                    <h4 style={{textAlign: 'center', fontSize: '2rem'}}>{clienteSeleccionado.data.data.nombre} {clienteSeleccionado.data.data.apellido}</h4>
                    <div style={{display: "flex"}}>
                        <p style={{width: '8rem', textAlign: 'right', fontWeight: 700, backgroundColor: '#ACE1AF', margin: 0, padding: '.5rem', borderRadius: '.25rem' }}>Usuario</p>
                        <p style={{width: '15rem', textAlign: 'riht', margin: 0, padding: '.5rem'}}>{clienteSeleccionado.data.data.email}</p>
                    </div>

                    <div style={{display: "flex"    }}>
                        <p style={{width: '8rem', textAlign: 'right', fontWeight: 700, backgroundColor: '#ACE1AF', margin: 0, padding: '.5rem', borderRadius: '.25rem' }}>Telefono</p>
                        <p style={{width: '15rem', textAlign: 'riht', margin: 0, padding: '.5rem'}}>{clienteSeleccionado.data.data.telefono}</p>
                    </div>

                    <div style={{display: "flex"    }}>
                        <p style={{width: '8rem', textAlign: 'right', fontWeight: 700, backgroundColor: '#ACE1AF', margin: 0, padding: '.5rem', borderRadius: '.25rem' }}>Ocupacion</p>
                        <p style={{width: '15rem', textAlign: 'riht', margin: 0, padding: '.5rem'}}>{clienteSeleccionado.data.data.ocupacion}</p>
                    </div>

                    <div style={{display: "flex"    }}>
                        <p style={{width: '8rem', textAlign: 'right', fontWeight: 700, backgroundColor: '#ACE1AF', margin: 0, padding: '.5rem', borderRadius: '.25rem' }}>Distrito</p>
                        <p style={{width: '15rem', textAlign: 'riht', margin: 0, padding: '.5rem'}}>{clienteSeleccionado.data.data.distrito}</p>
                    </div>

                    <div style={{display: "flex"    }}>
                        <p style={{width: '8rem', textAlign: 'right', fontWeight: 700, backgroundColor: '#ACE1AF', margin: 0, padding: '.5rem', borderRadius: '.25rem' }}>Consultorio</p>
                        <p style={{width: '15rem', textAlign: 'riht', margin: 0, padding: '.5rem'}}>{clienteSeleccionado.data.data.consultorio_id}</p>
                    </div>

                    <div style={{display: "flex"    }}>
                        <p style={{width: '8rem', textAlign: 'right', fontWeight: 700, backgroundColor: '#ACE1AF', margin: 0, padding: '.5rem', borderRadius: '.25rem' }}>Empresa</p>
                        <p style={{width: '15rem', textAlign: 'riht', margin: 0, padding: '.5rem'}}>{clienteSeleccionado.data.data.empresa_id}</p>
                    </div>

                    <div style={{display: "flex"    }}>
                        <p style={{width: '8rem', textAlign: 'right', fontWeight: 700, backgroundColor: '#ACE1AF', margin: 0, padding: '.5rem', borderRadius: '.25rem' }}>Ultima Cita</p>
                        <p style={{width: '15rem', textAlign: 'riht', margin: 0, padding: '.5rem'}}>{clienteSeleccionado.data.data.distrito}</p>
                    </div>
                </div>

                <div>
                    <p style={{fontSize: '3rem', textAlign: 'center'}}>{clienteSeleccionado.data.data.talla}</p>
                    <h5 style={{fontSize: '1.5rem', textAlign: 'center'}}>Talla</h5>
                </div>

                <div></div>

            </div>

            <div style={{width: '70rem',  overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                    <StatsVertical icon={<Eye size={21} />} color='info' stats={ultimaEvolucion?.peso} statTitle='Peso Actual' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats={ultimaEvolucion?.p_grasa} statTitle='% Grasa Actual' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats={clienteSeleccionado.data.data.peso_ideal} statTitle='Peso Ideal' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats={clienteSeleccionado.data.data.p_grasa_ideal} statTitle='% Grasa Ideal' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats={clienteSeleccionado.data.data.p_masa_muscular} statTitle='% Masa Muscular Ideal' />
                </div>

                <TablaPerfilCliente clienteSeleccionado={clienteSeleccionado}/>
            </div>
        </div>
    )
}