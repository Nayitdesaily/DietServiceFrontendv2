// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigationCliente from '@src/navigation/vertical'
import navigationAdmin from '@src/navigation/admin'


const VerticalLayout = props => {
  // const [menuData, setMenuData] = useState([])

  // ** For ServerSide navigation
  // useEffect(() => {
  //   axios.get(URL).then(response => setMenuData(response.data))
  // }, [])

  const userData = JSON.parse(localStorage.getItem('userData'))


  return (
    <Layout menuData={userData.role == 'client' ?navigationCliente : navigationAdmin} {...props}>
      <Outlet />
    </Layout>
  )
}

export default VerticalLayout
