import Buttons from "../GeneralComponent/Button";
import Input from "../GeneralComponent/Input";

const RegisterModal = (handleChangeClick) => {
    return(
        <>
            <div className="LoginContainer">
                Giriş Yap
                <Input type="text" placeholder="Email"/>
                <Input type="text" placeholder="Kullanıcı Adı"/>
                <Input type="text" placeholder="Şifre"/>
                <Buttons color="#635FC7" title="Giriş Yap"/>
                <div className="LoginFooter" >
                    Hesabın var mı? <span style={{textDecoration:"underline",cursor:"pointer"}} onClick={handleChangeClick.handleChange}>Giriş yap</span>
                </div>
            </div>
        </>
    )
}

export default RegisterModal;