import React, { useContext, useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import usericon from '../Assets/userplus2.jpg'
import { BASE_URL } from '../services/baseurl';
import { useNavigate } from 'react-router-dom';
import { addProfileResponseContext, isAuthTokenContext, profileEditResponseContext } from '../Contexts/ContextShare';
import { headerProfilesAPI } from '../services/allAPI';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)



function Header({admindashboard,adminPage}) {
  const{isAuthToken,setIsAuthToken} = useContext(isAuthTokenContext)
  const{editProfileResponse, setEdipProfileResponse} = useContext(profileEditResponseContext)
  const [candidatelogin , setCandidateLogin] = useState(false)

  // const [headerProfiles,setHeaderProfiles] = useState([])

const navigate = useNavigate()
  const [iscandidate,setIsCandidate] = useState({})
  const [isAdmin,setIsAdmin] = useState({})
  
  useEffect(()=>{
    if(sessionStorage.getItem("existingCandidate")){
        setCandidateLogin(JSON.parse(sessionStorage.getItem("existingCandidate")));
    }
  },[])
  console.log(isAdmin);


  useEffect(()=>{
    if(sessionStorage.getItem("existingProfile")){
        setIsCandidate(JSON.parse(sessionStorage.getItem("existingProfile")));
    }
  },[])

  
  console.log(iscandidate);
  useEffect(()=>{
    if(sessionStorage.getItem("existingAdmin")){
        setIsAdmin(JSON.parse(sessionStorage.getItem("existingAdmin")));
    }
  },[])
  console.log(isAdmin);

  // const handleLogout = ()=>{
  //   sessionStorage.removeItem("token")
  //   sessionStorage.removeItem("existingAdmin")
  //   setIsAuthToken(false)
  //   //navigate
  //   navigate('/')
  // }

  // const handleLogout1 = () => {
  //   sessionStorage.removeItem("token");
  //   sessionStorage.removeItem("existingCandidate");
  //   sessionStorage.removeItem("existingPro");
  //   setIsAuthToken(false);
  //   // navigate
  //   navigate('/');
  // };
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Click Yes to Logout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout actions
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("existingAdmin");
        setIsAuthToken(false);
        // Navigate
        navigate('/');
        
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success"
        });
      }
    });
  };
  
  const handleLogout1 = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Click Yes to Logout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout"
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform logout actions
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("existingCandidate");
        sessionStorage.removeItem("existingPro");
        setIsAuthToken(false);
        // Navigate
        navigate('/');
        
        Swal.fire({
          title: "Logged Out!",
          text: "You have been successfully logged out.",
          icon: "success"
        });
      }
    });
  };





//   const premium = useSelector((state)=>state.premiumReducer) //state represen store  reducer le payload kittullu 
//   console.log('premium', premium);
//   useEffect(() => {
//    setResult(premium);
//  }, [premium]);
const [isheader,setIsHeader] = useState([])

const header = useSelector((state)=>state.headerReducer)
console.log('headerdata',header);
useEffect(()=>{
setIsHeader(header)
},[header ])
console.log('isHeader:',isheader);
const profileImages = isheader.flatMap(item => item.map(entry => entry.profileImage));

console.log('profileImages:', profileImages);


console.log("iscandidate.profile", iscandidate.profileImage);

useEffect(()=>{

},[editProfileResponse])

  return (
    <>
    <Navbar className="bg-secondary" style={{height:"85px"}} >
        <Container>
          <Navbar.Brand href="#home">
           <div className='d-flex mt-2'>
                <img
                className='rounded-circle'
                  alt=""
                  src="https://play-lh.googleusercontent.com/7bvRb0lYxGyYW5HwjUk0qms8SyBa_d1AM1z83WTehoi8Xkjh4tmGIWrUq-rt2MUcv34k=s180"
                  width="50"
                  height="50"
                //   className="d-inline-block align-top"
                />{' '}
              <p className='fs-3 ms-2'>Job Finder</p>
           </div>
          </Navbar.Brand>
          <Nav className="ms-auto fs-6">

          {
    candidatelogin ? (
        <Nav.Link className='me-5 ' href="/dashboard">Dashboard</Nav.Link>
    ) : (
        null
    )
}

          {admindashboard || adminPage?
           
        <Nav.Link className='me-5' href="/admindashboard">Post Jobs</Nav.Link>
      :  <Nav.Link className='me-5' href="/jobs">Find Jobs</Nav.Link>}
          {/* <Nav.Link className='me-5' href="#home">Contact Us</Nav.Link> */}
          
          {admindashboard &&
          <Nav.Link className='me-5' href="#home">Notifications</Nav.Link>}
         
          
         <div>
            {admindashboard || adminPage? (
              <div className='me-5 d-flex'>
                <img className='rounded-5' width={'40px'} height={'40px'} src={`${BASE_URL}/uploads/${isAdmin.profile}`} alt="Admin Profile" />
                <div className='rounded-5' style={{ height: "10px", width: "10px", background: "#53ff1a", marginLeft: "-3px", marginTop: "0px" }}></div>
                <Nav.Link className='me-' href="/dashboard">Profile</Nav.Link>
              </div>
            )
          :
          (
            // <div className='me-5 d-flex'>
            //     <img className='rounded-5' width={'40px'} height={'40px'} src={`${BASE_URL}/uploads/images/${iscandidate.profileImage}`} alt="Admin Profile" />
            //     <div className='rounded-5' style={{ height: "10px", width: "10px", background: "#53ff1a", marginLeft: "-3px", marginTop: "0px" }}></div>
            //     <Nav.Link className='me-' href="#home">Profile</Nav.Link>
            //   </div>

            <div className='me-5 d-flex'>
      {isheader[0]?.map((entry, index) => (
        <div key={index} className='d-flex align-items-center'>
          {entry.profileImage ? (
            <>
              <img
                className='rounded-5'
                width={'40px'}
                height={'40px'}
                src={`${BASE_URL}/uploads/images/${entry.profileImage}`}
                alt={`Profile ${index}`}
              />
              <div
                className='rounded-5'
                style={{ height: '10px', width: '10px', background: '#53ff1a', marginLeft: '-3px', marginTop: '0px' }}
              ></div>
              <Nav.Link className='me-' href='#home'>
                Profile
              </Nav.Link>
            </>
          ) : (
            <span>No profile image</span>
          )}
        </div>
  ))}
</div>

          )}
          </div>


          {/* <div>
            {iscandidate && (
              
            )}
          </div> */}
         
         
         
        {isAdmin?
        <button onClick={handleLogout} className='btn btn-info border rounded-5 ' style={{height:"50px"}}><i class="fa-solid fa-user me-2"></i>Logout</button>
      :
      <button onClick={handleLogout1} className='btn btn-info border rounded-5 ' style={{height:"50px"}}><i class="fa-solid fa-user me-2"></i>Logout</button>
      }
           
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Header