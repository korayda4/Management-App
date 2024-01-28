import { Button, Input, Modal } from 'antd';
import { useState } from 'react';
import MyInput from '../GeneralComponent/Input';

const AddColumnModal = ({selectedBoard,IsOpenColumn,ChangeIsOpenColumn}) => {
    const [inputValue, setInputValue] = useState("");


    return (
      <Modal  
        centered={true}

        title="Yeni Liste Oluştur" 
        open={IsOpenColumn} 
        onOk={null} 
        onCancel={ChangeIsOpenColumn}
        cancelText="Vazgeç"
        okText="Oluştur"
      >
        <MyInput 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Liste Adı Gir"
        />
      </Modal>
      )
}

export default AddColumnModal;