import './App.css'

function Spinner({isLoaded}) {
  return (
  <div className='loader' hidden={isLoaded ? true : false}></div>
  )
}

export default Spinner
