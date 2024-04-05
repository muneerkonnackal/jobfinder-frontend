import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Form } from 'react-bootstrap'
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AdminLoginAPI, adminRegisterAPI } from '../services/allAPI';
import { isAuthTokenContext } from '../Contexts/ContextShare';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)



function AuthAdmin({adminregister}) {
  const{isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const [adminData , setAdminData]=useState({
    //*to hold the value from the input box
    username:"",
    email:"",
    password:""
})
console.log(adminData);

const navigate = useNavigate()

 const registerForm = adminregister?true:false

 //*register function
 const handleRegister =async(e)=>{
  e.preventDefault()

  const {username, email, password} = adminData
  if(!username || !email || !password){
    toast.warn("Please fill the form completely")
  }
  else{
  const result =  await adminRegisterAPI(adminData)
  // console.log(result.data);
  if(result.status===200){
    // toast.success(`${result.data.username} is successfully registered`)
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${result.data.username} Successfully Registered`,
      showConfirmButton: false,
      timer: 2000})
    setAdminData({
      username:"",
      email:"",
      password:""
    })
    setTimeout(1500)
    //*navigate to login
    navigate('/adminlogin')
  }
  else{
    toast.error(result.response.data)
  }
  }


 }

 //*login function
 const handleLogin = async(e)=>{ //(e) ye pass cheythale e.preventdefault il e ye kittuvollu
  e.preventDefault()
  //*destructure
  const {email,password} = adminData
  if(!email || !password){
    toast.warn("Please fill the form completely")
  }
  else{
    const result = await AdminLoginAPI(adminData)
    console.log(result);

    if(result.status===200){
      // toast.success("Login Successful")
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Logged in",
        showConfirmButton: false,
        timer: 1500})
      // setIsAuthToken(true)
      sessionStorage.setItem("existingAdmin",JSON.stringify(result.data.existingAdmin))
      sessionStorage.setItem("token",result.data.token)

      setAdminData({
        username:"",
        email:"",
        password:""
      })
      setTimeout(2000);

      navigate('/')

    }
    else{
      toast.error(result.response.data)
    }
  }

 }
  return (
    <>
    <div style={{width:"100%",height:'100vh', backgroundImage: "linear-gradient(135deg, #ABDCFF 30%, #0396FF 100%)"  }} className=' d-flex justify-content-center   align-items-center bg-info'>
      <div className='w-75 container ' > 
          <Link style={{textDecoration:"none",color:'black'}} to={'/'}><i class="fa-solid fa-arrow-left me-3"></i>Back to Home</Link>
          <div style={{backgroundImage:`url("https://michellewaterworth.com/wp-content/uploads/2021/05/recruitment-agency-michelle-waterworth.jpg")` , backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}} className=' card bg-info rounded-5 p-5'>

          <div className=' row  align-item-center'>
              <div className="col-lg-6">
                  <img src="" alt="" width={'100%'}/>
              </div>
              <div style={{backgroundColor:"rgba(255, 255, 255, 0.75)", WebkitBackdropFilter:" blur(16px) saturate(180%)",backdropFilter:"blur(16px) saturate(180%)",border:"1px solid rgba(209, 213, 219, 0.3)"}} className="col-lg-6 p-5 rounded-4">
                  <div className='d-flex align-items-center flex-column fa-2x'>
                      <h1 className='text-black'><img
              className='rounded-circle mb-3 me-2'
                alt=""
                src="https://play-lh.googleusercontent.com/7bvRb0lYxGyYW5HwjUk0qms8SyBa_d1AM1z83WTehoi8Xkjh4tmGIWrUq-rt2MUcv34k=s180"
                width="50"
                height="50"
              //   className="d-inline-block align-top"
              />Job Finder</h1>
                      <h5 className='text-primary mt-3 ms-5'>
                          {
                              registerForm? "Sign up to your account"  : "Sign In to your account" 
                          }
                      </h5>
                      <Form className='mt-5 w-100'>
                          {
                              registerForm &&
                              <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Control className='rounded-4' type="text"   placeholder="Username" value={adminData.username} onChange={(e)=>setAdminData({...adminData,username:e.target.value})} />
                              
                            </Form.Group>
                          }

                          <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Control className='rounded-4'  type="email" placeholder="Email ID" value={adminData.email} onChange={(e)=>setAdminData({...adminData,email:e.target.value})} />
                              
                            </Form.Group>


                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Control className='rounded-4'  type="Password" placeholder="Password" value={adminData.password} onChange={(e)=>setAdminData({...adminData,password:e.target.value})} />
                              
                            </Form.Group>

                            {
                              registerForm?
                              <div>
                                  <button onClick={handleRegister} className='btn btn-success rounded-5  '>Register</button>
                                  <h6 className='mt-3 text-black'>Already a user? Click here to <Link to={'/adminlogin'} style={{color:"Blue"}}>Login</Link></h6>
                              </div> :
                               <div>
                               <button onClick={handleLogin} className='btn btn-success rounded-5 '>Login</button>
                               <h6 className='mt-3 text-black'>New user? Click here to <Link to={'/adminregister'} style={{color:"Blue"}}>Register</Link></h6>
                           </div>

                            }

                      </Form>
                  </div>

              </div>
          </div>
              
       </div>
      
      </div>
      <ToastContainer  position="top-center" autoClose={1500}  />
  </div>
  </>
  )
}

export default AuthAdmin