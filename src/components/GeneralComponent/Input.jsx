import { Input } from 'antd';

const MyInput = ({type,placeholder,onChange,value,marginB}) => {
    return (
        <Input 
            style={{marginBottom:marginB}}
            value={value} 
            onChange={onChange} 
            type={type} 
            placeholder={placeholder} 
        />
    )
}

export default MyInput;