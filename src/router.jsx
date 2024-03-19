import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy } from 'react';

const router = createBrowserRouter([
    {
        path: "/",
        Component: lazy(() => import('./components/DefaultLayout/DefaultLayout.jsx')),
        children: [
                {
                    path: "/landing",
                    Component: lazy(() => import('./views/LandingPage'))
                },
                {
                    path: "/signup",
                    Component: lazy(() => import('./views/SignUpPage/SignUp.jsx'))
                },
        ]
    },
    
    {
        path: "/",
        Component: lazy(() => import('./components/UserLayout/UserLayout.jsx')),
        children: [
                {
                    path: "/store",
                    Component: lazy(() => import('./views/StorePage'))
                },
                {
                    path: "/additem",
                    Component: lazy(() => import('./views/AddItemPage/AddItem.jsx'))
                },
                {
                    path: "/item/:item_id",
                    Component: lazy(() => import('./views/ItemPage/ItemPage.jsx'))
                },

                {
                    path: "/cart",
                    Component: lazy(() => import('./views/UserCart'))
                },
                {
                    path: "/order",
                    Component: lazy(() => import('./views/OrderPage'))
                },
                
        ]
    }
])

export default router