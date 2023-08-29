// ** Navigation imports
// import apps from './apps'
// import pages from './pages'
// import forms from './forms'
// import tables from './tables'
// import others from './others'
// import charts from './charts'
// import dashboards from './dashboards'
// import uiElements from './ui-elements'

import { PieChart, Heart, User } from 'react-feather'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAppleWhole, faPersonRunning, faUtensils, faLeaf, faUtensilSpoon } from '@fortawesome/free-solid-svg-icons'


// ** Merge & Export

export default [
    {
      id: 'cliente',
      title: 'Cliente',
      icon: <User size={20} />,
      navLink: '/clientes'
    },
    {
      id: 'historico-plan-dietetico',
      title: 'Historico Plan Dietetico',
      icon: <FontAwesomeIcon icon={faLeaf} />,
      navLink: '/historico-plan-dietetico'
    },
    {
      id: 'fuera-de-casa-admin',
      title: 'Fuera De Casa',
      icon: <FontAwesomeIcon icon={faUtensilSpoon} />,
      navLink: '/fuera-de-casa/admin'
    }
];

