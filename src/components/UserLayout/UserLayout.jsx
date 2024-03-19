import {Outlet, Navigate} from "react-router-dom";
import React, {useState} from 'react';
import UserNavbar from "./UserNavbar";
import { useContext } from 'react';
import { SessionContext } from "../SessionContext";
import AdminNavbar from "./AdminNavbar";
import FooterSection from "./FooterSection";


export default function UserLayout() {
    const {sessionToken, authorization} = useContext(SessionContext)
    if (!sessionToken) {
        return <Navigate to="/landing" /> 
    }

    return (
        <>
            { authorization ? (
                <> 
                    <AdminNavbar />
                    <Outlet />
                    <FooterSection />
                </>
            ) : (
                <> 
                    <UserNavbar />
                    <Outlet />
                    <FooterSection />
                </>
            )}
            
        </>
    )
}