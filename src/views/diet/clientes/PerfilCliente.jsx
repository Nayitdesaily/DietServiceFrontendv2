import StatsVertical from '@components/widgets/stats/StatsVertical'
import {Eye} from 'react-feather'
import TablaPerfilCliente from './TablaPerfilCliente'

export default function PerfilCliente({clienteSeleccionado}){
    return(
        <div style={{display: 'flex', gap: '1rem'}}>
            <div style={{display: 'flex', flexDirection: 'column', width: '30rem', border: '1px solid black'}}>
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

            <div style={{width: '70rem', border: '1px solid black', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                    <StatsVertical icon={<Eye size={21} />} color='info' stats='36.9k' statTitle='Peso Actual' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats='36.9k' statTitle='% Grasa Actual' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats='36.9k' statTitle='Peso Ideal' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats='36.9k' statTitle='% Grasa Ideal' />
                    <StatsVertical icon={<Eye size={21} />} color='info' stats='36.9k' statTitle='% Masa Muscular Ideal' />
                </div>

                <TablaPerfilCliente clienteSeleccionado={clienteSeleccionado}/>
            </div>
        </div>
    )
}