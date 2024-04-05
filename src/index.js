import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';
import ContextShare from './Contexts/ContextShare';
import { Provider } from 'react-redux';
import store from './Redux/store';
import ScrollToTop from './Components/scrollToTop';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

   <Provider store={store}>
      <ContextShare>
        <BrowserRouter>
        <ScrollToTop/>
             <App />
        </BrowserRouter>
      </ContextShare>
   </Provider>

  </React.StrictMode>
);


