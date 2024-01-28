import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";

export const routes = createBrowserRouter([
            { 
                path: "/login-page", 
                element: <LoginPage/>,
            },
            {
                path: '/',
                element: <MainPage/>,
            }
        ]
)