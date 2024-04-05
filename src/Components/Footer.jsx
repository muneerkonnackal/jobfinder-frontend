import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import icon from'../Assets/iconJP.png'

function Footer() {
  return (
    <div className='bg-secondary p-4'>
        <div className='container text-dark' >
            <Row className='d-flex justify-content-between align-items-center' style={{width:"100%"}}>
                <Col>
                
                    <h3 className='text-light'>
                    <img
                className='rounded-circle'
                  alt=""
                  src={icon}
                  width="40"
                  height="40"
                //   className="d-inline-block align-top"
                />
                     Job Finder</h3>
                    <span style={{textAlign:"justify"}}>Lorem ipsum dolor sit amet consectetur, adipisicing , voluptatibus ad totam excepturi cum iste, rem magni commodi velit minima in? Autem, expedita nam.</span>
                </Col>
        
                <Col>
                    <ul style={{listStyle:"none"}}>
                        <li className='text-light'>Services</li>
                        <li className='mt-2'><Link to={""} style={{color:"black", textDecoration:"none"}}>Payments</Link></li>
                        <li><Link to={""} style={{color:"black", textDecoration:"none"}}>Subscription</Link></li>
                        <li><Link to={""} style={{color:"black", textDecoration:"none"}}>Plans</Link></li>
                        <li><Link to={""} style={{color:"black", textDecoration:"none"}}>Offers</Link></li>
                        
                    </ul>
        
                </Col>
        
                <Col>
                    <ul style={{listStyle:"none"}}>
                        <li className='text-light' >USEFUL LINKS</li>
                        <li className='mt-2'>About</li>
                        <li>Setting</li>
                        <li>Jobs</li>
                        <li>Help</li>
                        
                    </ul>
        
                </Col>
        
                <Col>
                    <ul  style={{listStyle:"none",marginTop:"-15px"}}>
                        <li className='text-light'>CONTACTS</li>
                        <li className='mt-3'><i class="fa-solid fa-house me-3"></i>Newyork ,NV 100013 USA</li>
                        <li><i class="fa-solid fa-envelope me-3"></i>www.jobfinder@gmail.com</li>
                        <li><i class="fa-solid fa-phone  me-3"></i>+97 21111568676</li>
                        <li></li>
                        
                    </ul>
        
                </Col>
        
        
                
            </Row>
        </div>
   </div>
  )
}

export default Footer