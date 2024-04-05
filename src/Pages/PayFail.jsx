import React from 'react'
import { Link } from 'react-router-dom'

function PayFail() {
  return (
    <>  
    <div style={{height:"100vh",background:
    'linear-gradient(90deg, rgba(207,164,238,0.9579481450783438) 0%, rgba(144,63,248,1) 100%)' }} className='d-flex w-100 justify-content-center align-items-center'>
      
      <div style={{ width: '900px', height: '500px'}} className='animate__animated animate__zoomIn  text-success bg-light rounded-5 border border-warning  shadow d-flex justify-content-center align-items-center flex-column'>
        
        <h1 style={{fontSize:"55px"}} className=' animate__animated animate__zoomInUp'>OOPS!!! </h1>
        <h2 className='text- animate__animated animate__zoomIn'>Payment Failed</h2>
       <h3>Try again ....</h3>
      </div>
      <Link to={'/dashboard'}><button className='btn btn- rounded-5 mt-3 border border-2 border-danger '><i class="fa-solid fa-left-long fa-beat me-2"></i> Dashboard</button></Link>
    </div>
    </>
  )
}

export default PayFail