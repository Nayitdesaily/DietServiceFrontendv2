import { lazy } from 'react'

const Dashboard = lazy(() => import('../../views/diet/dashboard'))
const Evolucion = lazy(() => import('../../views/diet/evolucion'))
const PlanAlimentacion = lazy(() => import('../../views/diet/plan-alimentacion'))
const PlanPorId = lazy(() => import('../../views/diet/plan-alimentacion/PlanPorId'))
const ListaIntercambio = lazy(() => import('../../views/diet/lista-intercambio'))
const FueraDeCasa = lazy(() => import('../../views/diet/fuera-de-casa'))
const Recetario = lazy(() => import('../../views/diet/recetario'))
const Entrenamiento = lazy(() => import('../../views/diet/entrenamiento'))

const DietRoutes = [
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/evolucion',
    element: <Evolucion />
  },
  {
    path: '/plan-alimentacion',
    element: <PlanAlimentacion />
  },
  {
    path: '/plan-alimentacion/:plan',
    element: <PlanPorId />
  },
  {
    path: '/lista-intercambio',
    element: <ListaIntercambio />
  },
  {
    path: '/fuera-de-casa',
    element: <FueraDeCasa />
  },
  {
    path: '/recetario',
    element: <Recetario />
  },
  {
    path: '/entrenamiento',
    element: <Entrenamiento />
  }
]

export default DietRoutes
