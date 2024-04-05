
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Auth from './Components/Auth';
import Dashboard from './Pages/Dashboard';
import JobPage from './Pages/JobPage';
import AdminPage from './Pages/AdminPage';
import Footer from './Components/Footer';
import AuthAdmin from './Components/AuthAdmin';
import AdminDashboard from './Components/AdminDashboard';
import PaymentPremium from './Pages/PaymentPremium';
import OpenPdf from './Components/OpenPdf';
import Mobile from './OTP Verification/Mobile';
import Otp from './OTP Verification/Otp';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import SuperOffer from './Components/SuperOffer';
import EditOffers from './Components/EditOffers';
import PaySuccess from './Pages/PaySuccess';
import PayFail from './Pages/PayFail';



function App() {
  return (
   
      <div className="App">
      <Routes>
  
      <Route path='/' element={<Home/>} />
  
      <Route path='/userlogin' element={<Auth/>} />
  
      <Route path='/userregister' element={<Auth userregister/>} />
  
      <Route path='/adminlogin' element={<AuthAdmin/>} />
  
      <Route path='/adminregister' element={<AuthAdmin adminregister/>} />
  
      <Route path='/dashboard' element={<Dashboard/>} />
  
      <Route path='/admindashboard' element={<AdminDashboard/>} />
  
      <Route path='/jobs' element={<JobPage/>} />
  
      <Route path='/openpdf' element={<OpenPdf/>} />
      
      <Route path='/payment' element={<PaymentPremium/>} />
  
      <Route path='/admin' element={<AdminPage/>} />
  
      <Route path='/mobile' element={<Mobile/>} />
  
      <Route path='/otp' element={<Otp/>} />
      
      <Route path='/paysuccess' element={<PaySuccess/>} />
      <Route path='/payfail' element={<PayFail/>} />

  
  
  
      </Routes>
  
      
  
      </div>
   
  );
}

export default App;
