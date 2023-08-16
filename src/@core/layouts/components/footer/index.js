// ** Icons Import
import { Heart } from 'react-feather'

const Footer = () => {
  return (
    <p className='clearfix mb-0'>
      <span className='float-md-start d-block d-md-inline-block mt-25'>
        COPYRIGHT © {new Date().getFullYear()}{' '}
        <a href='https://dietservice.pe/' target='_blank' rel='noopener noreferrer'>
          DietService
        </a>
        <span className='d-none d-sm-inline-block'>, Todos los derechos reservados</span>
      </span>
      <span className='float-md-end d-none d-md-block'>
        Diseño y Desarrollo, <a href='https://bitjoins.pe/' target='_blank' rel='noopener noreferrer'>
          Bitjoins
        </a>
      </span>
    </p>
  )
}

export default Footer
