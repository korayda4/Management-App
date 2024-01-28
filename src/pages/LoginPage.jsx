import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import { useState } from "react";


const LoginPage = () => {
    const [isTrue , SetValue] = useState(true);

    const handleChange = () => {
        SetValue(!isTrue);
    };

    return(
        <>
            <div className="LoginPageContainer">
               {isTrue ? <LoginModal handleChange={handleChange}/>:<RegisterModal handleChange={handleChange}/>} 
            </div>
        </>
    )
}

export default LoginPage;