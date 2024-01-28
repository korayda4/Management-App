import { Button } from "antd";
import MyInput from "./Input";

const Modal = (props) => {
    return (
        <div className={props.className}>
            {props.title}
            {<MyInput type={props.type} placeholder={props.placeholder}/>*props.input}
            {<Button color={props.color}  title={props.color}/>*props.button}
            {props.footer}
        </div>
    )
}

export default Modal;