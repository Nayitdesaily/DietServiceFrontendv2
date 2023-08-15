// ** Navigation imports
// import apps from './apps'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
// import dashboards from './dashboards'
// import uiElements from './ui-elements'

import { PieChart, Heart } from 'react-feather'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole, faPersonRunning, faUtensils, faClipboardList } from '@fortawesome/free-solid-svg-icons'


// ** Merge & Export

export default [
    {
      id: 'cliente',
      title: 'Cliente',
      icon: <PieChart size={20} />,
      navLink: '/clientes'
    },
    {
      id: 'historico-plan-dietetico',
      title: 'Historico Plan Dietetico',
      icon: <PieChart size={20} />,
      navLink: '/historico-plan-dietetico'
    }
];

