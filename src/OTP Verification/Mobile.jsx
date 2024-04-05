import React, { useState } from 'react'

function Mobile() {
  const [mobile,setMobile] = useState("")
console.log(mobile);

const handleClick=()=>{

}

  return (
    <>
    
    <div style={{height:'100vh',}} className='d-flex justify-content-center align-items-center mt-5 mb-5'>
      <input type="number" value={mobile} className='form-control  rounded w-25' onChange={(e)=>setMobile({...setMobile,mobile:e.target.value})} placeholder='Enter Your Mobile Number'  />
      <button className='btn btn-warning ms-3 rounded ' onClick={handleClick}>Verify</button>
    </div>

    
    </>
  )
}

export default Mobile