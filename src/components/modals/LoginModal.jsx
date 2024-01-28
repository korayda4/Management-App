import Buttons from "../GeneralComponent/Button";
import MyInput from "../GeneralComponent/Input";

const LoginModal = (handleChangeClick) => {
    
    return(
        <>
            <div className="LoginContainer">
                Giriş Yap
                <MyInput type="text" placeholder="Email"/>
                <MyInput  type="password" placeholder="Şifre"/>
                <Buttons color="#635FC7" title="Giriş Yap"/>
                <div className="LoginFooter" >
                    Hesabın yok mu? <span style={{textDecoration:"underline",cursor:"pointer"}} onClick={handleChangeClick.handleChange}>Kayıt Ol</span>
                </div>
            </div>
        </>
    )
}

export default LoginModal;