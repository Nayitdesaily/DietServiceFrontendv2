// ** Logo

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner app-loader'>
      <img className='fallback-logo' src="https://dietservice.pe/wp-content/uploads/2019/10/logo-diet-service.png" alt='logo' style={{width: '10rem'}} />
      <div className='loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
