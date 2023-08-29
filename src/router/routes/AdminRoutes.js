import { lazy } from 'react'

const Cliente = lazy(() => import('../../views/diet/clientes'))
const HistoricoPlan = lazy(() => import('../../views/diet/historico-plan-dietetico'))
const FueraDeCasa = lazy(() => import('../../views/diet/fuera-de-casa-admin'))

const DietRoutes = [
  {
    path: '/clientes',
    element: <Cliente />
  },
  {
    path: '/historico-plan-dietetico',
    element: <HistoricoPlan />
  },
  {
    path: '/fuera-de-casa/admin',
    element: <FueraDeCasa />
  }
]

export default DietRoutes