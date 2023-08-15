import { lazy } from 'react'

const Cliente = lazy(() => import('../../views/diet/clientes'))
const HistoricoPlan = lazy(() => import('../../views/diet/historico-plan-dietetico'))

const DietRoutes = [
  {
    path: '/clientes',
    element: <Cliente />
  },
  {
    path: '/historico-plan-dietetico',
    element: <HistoricoPlan />
  }
]

export default DietRoutes