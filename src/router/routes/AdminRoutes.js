import { lazy } from 'react'

const Cliente = lazy(() => import('../../views/diet/clientes'))

const DietRoutes = [
  {
    path: '/clientes',
    element: <Cliente />
  }
]

export default DietRoutes