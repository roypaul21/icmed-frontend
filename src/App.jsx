import 'bootstrap/dist/css/bootstrap.min.css';
import {RouterProvider} from "react-router-dom";
import { useState, Suspense } from 'react'
import router from './router';
import './App.css'
import { SessionProvider } from './components/SessionContext';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";

function App() {

  return (
    <>
      <SessionProvider>
        <Suspense fallback={<section style={{backgroundColor:"white", width:"100%", height:"100vh", display:"flex", textAlign:"center", justifyContent:"center", alignItems:"center", color:"#E55F34"}}>
          <h1>Shopping....</h1>
          </section>}>
          <RouterProvider router={router} />   
        </Suspense>
      </SessionProvider>
    </>
    
  )
}

export default App
