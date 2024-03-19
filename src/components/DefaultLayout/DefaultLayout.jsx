import { Outlet, Navigate } from "react-router-dom";
import DefaultNavbar from "./Navbar";
import SignIn from "../../views/SignInModal/SignIn";
import React, { useState, useContext } from 'react';
import { SessionContext } from "../SessionContext";
import {motion, AnimatePresence} from "framer-motion"

export default function DefaultLayout() {
    
    const {sessionToken} = useContext(SessionContext)
    if (sessionToken) {
        return <Navigate to="/store" /> 
    }

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    
    const LoginOpenedModal = () => {
        if (!isLoginOpen) setIsLoginOpen(true);
    }
    const LoginClosedModal = () => {
        setIsLoginOpen(false);
    } 

    return (
        <> 
            <AnimatePresence>
                {isLoginOpen && <section className="background-modal"> 
                    <SignIn loginModalClose={LoginClosedModal} showModal={isLoginOpen}/>
                </section>
                }
            </AnimatePresence>
            <DefaultNavbar loginModalOpened={LoginOpenedModal}/>
            <Outlet />
        </>
    )
}