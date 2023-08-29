// ** Navigation imports
import apps from './apps'
import pages from './pages'
import forms from './forms'
import tables from './tables'
import others from './others'
import charts from './charts'
import dashboards from './dashboards'
import uiElements from './ui-elements'

import { PieChart, Heart } from 'react-feather'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole, faPersonRunning, faUtensils, faClipboardList } from '@fortawesome/free-solid-svg-icons'


// ** Merge & Export

export default [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <PieChart size={20} />,
      navLink: '/dashboard'
    },
    {
      id: 'evolucion',
      title: 'Evolución',
      icon: <Heart size={20} />,
      navLink: '/evolucion'
    },
    {
      id: 'plan-alimentacion',
      title: 'Plan Alimentación',
      icon: <FontAwesomeIcon icon={faAppleWhole} />,   
      navLink: '/plan-alimentacion'
    },
    {
      id: 'entrenamiento',
      title: 'Entrenamiento',
      icon: <FontAwesomeIcon icon={faPersonRunning} />,   
      navLink: '/entrenamiento'
    },
    {
      id: 'fuera-de-casa',
      title: 'Fuera De Casa',
      icon: <FontAwesomeIcon icon={faUtensils} />,   
      navLink: '/fuera-de-casa'
    },
    {
      id: 'recetario',
      title: 'Recetario',
      icon: <FontAwesomeIcon icon={faClipboardList} />,   
      navLink: '/recetario'
    },
];

